import { Component, ElementRef, Inject, Injector, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TuiDialogService } from '@taiga-ui/core';
import { DataService } from 'src/app/service/data.service';
import { NotificationDialogComponent } from 'src/app/shared/dialog/notification-dialog/notification-dialog.component';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { Message, ResendOTPResponse, VerifyEmailResponse } from 'src/app/model/workassist.modal';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent {

  userMobileNo !: string
  otp : { [key: string]: null } = {
    otp1 : null,
    otp2 : null,
    otp3 : null,
    otp4 : null,
    otp5 : null,
    otp6 : null
  }
  message !: Message
  otpIndex !: number

  constructor(
    private dataService : DataService,
    private router : Router,
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector,
  ){
    this.userMobileNo = this.dataService.user.mobile_number
    this.message = this.dataService?.message as Message
    if(!this.message){
      this.message = {} as Message
    }
   }

   ngOnInit(){
    console.log(this.dataService.message)
    // this.showDialog()
   }

  private readonly successDialog = this.dialogs.open<number>(
    new PolymorpheusComponent(NotificationDialogComponent, this.injector),
    {
      data: { status: 'success' },
      dismissible: false,
      closeable: false,
      size: 's'
    },
  );

  showDialogOnSuccessful(): void {
    this.successDialog.subscribe({
      next: data => {
        console.info(`Dialog emitted data = ${data}`);
      },
      complete: () => {
        console.info('Dialog closed');
      },
    });
  }

  resendOTPDialog = this.dialogs.open<any>(new PolymorpheusComponent(NotificationDialogComponent, this.injector));

  showDialogOnResendOTP(message : string): void {
    this.resendOTPDialog = this.dialogs.open<any>(
      new PolymorpheusComponent(NotificationDialogComponent, this.injector),
      {
        data: { status: 'resendOTP' , message : message },
        dismissible: false,
        closeable: false,
        size: 's'
      },
    );
    this.resendOTPDialog.subscribe({
      next: data => {
        this.otp['otp1'] = null
        this.otp['otp2'] = null 
        this.otp['otp3'] = null
        this.otp['otp4'] = null 
        this.otp['otp5'] = null 
        this.otp['otp6'] = null
      },
      complete: () => {
      },
    });
  }

private readonly errorDialog = this.dialogs.open<number>(
  new PolymorpheusComponent(NotificationDialogComponent, this.injector),
  {
      data: {status: 'error'},
      dismissible: false,
      closeable: false,
      size:'s'
  },
);

 showDialogOnError(): void {
  this.errorDialog.subscribe({
      next: data => {
          console.info(`Dialog emitted data = ${data}`);
      },
      complete: () => {
          console.info('Dialog closed');
      },
  });
}

validateInput(event: any , nextIndex : number){
    let value = event.target.value
    this.otpIndex = nextIndex - 1
    const key = event.keyCode || event.charCode;
    if(!value.match(/[0-9]$/g)) {  
      value = value.replace(value , value.substring(0 , value.length - 1) )  ;
    }
    if(value.length > 1){
      value = value.slice(0 , 1);
    }
    if(value.match(/[0-9]$/g)){
      if(nextIndex < 7){
        document.getElementById(`otp${nextIndex}`)?.focus()
      }
    }
    if(key === 8){
      document.getElementById(`otp${this.otpIndex - 1}`)?.focus()
    }
    return value;
   }

   resendOTP(){
    this.dataService.generateOTP(this.dataService.user).subscribe((res:ResendOTPResponse)=>{
      // console.log(res)
      // this.dataService.NotificationService('Resend OTP successful.' , '' , 'success' , 5000)
      this.showDialogOnResendOTP(res?.message as string)
    })
   }

   loginPage(){
    this.router.navigate(['login'])
   }

   verifyEmailPage(){
    this.router.navigate(['verify-email'])
   }

   private readonly continueRegisterDialog = this.dialogs.open<number>(
    new PolymorpheusComponent(NotificationDialogComponent, this.injector),
    {
        data: {status: 'continue'},
        dismissible: false,
        closeable: true,
        size:'s'
    },
);

   submit(){
    if (this.dataService.user.type == "job_seeker") {
    if(this.otp['otp1'] == 1 && this.otp['otp2'] == 2 && this.otp['otp3'] == 3 && this.otp['otp4'] == 4 && this.otp['otp5'] == 5 && this.otp['otp6'] == 6){
      this.dataService.user.otp = this.otp['otp1'] + this.otp['otp2'] + this.otp['otp3'] + this.otp['otp4'] + this.otp['otp5'] + this.otp['otp6']
      console.log(this.dataService.user)
      let emailVerify = sessionStorage.getItem('email-verify')
      if(emailVerify == "true"){
        let userType = sessionStorage.getItem('user-type')
        let email = this.dataService.message.email
        if(userType && email){
          let payload = {
            "email": email,
            "otp"  : this.dataService.user.otp,
            "type" : JSON.parse(userType)
          }
          this.dataService.verifyEmail(payload).subscribe((res:VerifyEmailResponse)=>{
            if(res.message)
            this.dataService.NotificationService( res.message , 'Success' , 'info' , 5000) 
            setTimeout(() => {
              // sessionStorage.removeItem('user-type')
              sessionStorage.removeItem('email-verify')
              // sessionStorage.setItem('update-mobile' , "true")
              this.router.navigate(['update-mobile'])              
            }, 10);         
          })

        }
      }
      if(emailVerify !== "true")
      this.dataService.verifyOTP(this.dataService.user).subscribe((res:any)=>{
        console.log(res.data)
        this.otp['otp1'] = null
        this.otp['otp2'] = null 
        this.otp['otp3'] = null
        this.otp['otp4'] = null 
        this.otp['otp5'] = null 
        this.otp['otp6'] = null
        if(res.data.url){
          // this.dataService.NotificationService('You are now redirecting to the registration page in 5 seconds.' , 'This number is not registered.' , 'info' , 5000)
          this.continueRegisterDialog.subscribe({
            next: data => {
            this.router.navigate(['job-seeker-register'])            
            },
            complete: () => {
            },
        });
        }
        if(res.data.auth_key){
          // this.dataService.NotificationService('Login successful' , '' , 'success' , 5000)
          // this.showDialogOnSuccessful()
          this.successDialog.subscribe({
            next: data => {
                // console.info(`Dialog emitted data = ${data}`);
                sessionStorage.setItem('auth_key' , res.data.auth_key)
                sessionStorage.setItem('userLoggedIn' , 'true')
                sessionStorage.setItem('userName' , res.data.name)
                this.dataService.userName = res.data.name
                let flag = sessionStorage.getItem('appliedFromQuickApply')
                if(flag == "true"){
                  sessionStorage.setItem('quickApply' , "true")
                  this.router.navigate(['search-jobs' , this.dataService.queryParam])
                }else{
                  this.router.navigate(['seeker-dashboard'])
                }
            },
            complete: () => {
                console.info('Dialog closed');
            },
        });
        }
      })
    }
    else{
      this.dataService.verifyOTP(this.dataService.user).subscribe((res:any)=>{
        console.log(res)
        // this.dataService.NotificationService(res.message , '' , 'error' , 5000)
        this.showDialogOnError()
        if(res.message){
        }

      });
      this.otp['otp1'] = null
      this.otp['otp2'] = null 
      this.otp['otp3'] = null
      this.otp['otp4'] = null 
      this.otp['otp5'] = null 
      this.otp['otp6'] = null
    }
   }


   if (this.dataService.user.type == "recruiter") {
    if(this.otp['otp1'] == 1 && this.otp['otp2'] == 2 && this.otp['otp3'] == 3 && this.otp['otp4'] == 4 && this.otp['otp5'] == 5 && this.otp['otp6'] == 6){
      this.dataService.user.otp = this.otp['otp1'] + this.otp['otp2'] + this.otp['otp3'] + this.otp['otp4'] + this.otp['otp5'] + this.otp['otp6']
      console.log(this.dataService.user)
      let emailVerify = sessionStorage.getItem('email-verify')
      if(emailVerify == "true"){
        let userType = sessionStorage.getItem('user-type')
        let email = this.dataService.message.email
        if(userType && email){
          let payload = {
            "email": email,
            "otp"  : this.dataService.user.otp,
            "type" : JSON.parse(userType)
          }
          this.dataService.verifyEmail(payload).subscribe((res:VerifyEmailResponse)=>{
            if(res.message)
            this.dataService.NotificationService( res.message , 'Success' , 'info' , 5000) 
            setTimeout(() => {
              // sessionStorage.removeItem('user-type')
              sessionStorage.removeItem('email-verify')
              // sessionStorage.setItem('update-mobile' , "true")
              this.router.navigate(['update-mobile'])              
            }, 10);         
          })

        }
      }
      if(emailVerify !== "true")
      this.dataService.verifyOTP(this.dataService.user).subscribe((res:any)=>{
        console.log(res.data)
        this.otp['otp1'] = null
        this.otp['otp2'] = null 
        this.otp['otp3'] = null
        this.otp['otp4'] = null 
        this.otp['otp5'] = null 
        this.otp['otp6'] = null
        if(res.data.url){
          // this.dataService.NotificationService('You are now redirecting to the registration page in 5 seconds.' , 'This number is not registered.' , 'info' , 5000)
          this.continueRegisterDialog.subscribe({
            next: data => {
            this.router.navigate(['recruiter-register'])            
            },
            complete: () => {
            },
        });
        }
        if(res.data.auth_key){
          // this.dataService.NotificationService('Login successful' , '' , 'success' , 5000)
          // this.showDialogOnSuccessful()
          this.successDialog.subscribe({
            next: data => {
                // console.info(`Dialog emitted data = ${data}`);
                sessionStorage.setItem('auth_key' , res.data.auth_key)
                sessionStorage.setItem('userLoggedIn' , 'true')
                sessionStorage.setItem('userName' , res.data.name)
                this.dataService.userName = res.data.name
                let flag = sessionStorage.getItem('appliedFromQuickApply')
                if(flag == "true"){
                  sessionStorage.setItem('quickApply' , "true")
                  this.router.navigate(['search-jobs' , this.dataService.queryParam])
                }else{
                  this.router.navigate(['recruiter-dashboard'])
                }
            },
            complete: () => {
                console.info('Dialog closed');
            },
        });
        }
      })
    }
    else{
      this.dataService.verifyOTP(this.dataService.user).subscribe((res:any)=>{
        console.log(res)
        // this.dataService.NotificationService(res.message , '' , 'error' , 5000)
        this.showDialogOnError()
        if(res.message){
        }

      });
      this.otp['otp1'] = null
      this.otp['otp2'] = null 
      this.otp['otp3'] = null
      this.otp['otp4'] = null 
      this.otp['otp5'] = null 
      this.otp['otp6'] = null
    }
   }
  }

  // submit() {
  //   console.log(this.dataService.user)

  //   if (this.dataService.user.type == "job_seeker") {
  //     if (this.otp['otp1'] == 1 && this.otp['otp2'] == 2 && this.otp['otp3'] == 3 && this.otp['otp4'] == 4 && this.otp['otp5'] == 5 && this.otp['otp6'] == 6) {
  //       this.dataService.user.otp = this.otp['otp1'] + this.otp['otp2'] + this.otp['otp3'] + this.otp['otp4'] + this.otp['otp5'] + this.otp['otp6']
  //       console.log(this.dataService.user)
  //       this.dataService.verifyOTP(this.dataService.user).subscribe((res: any) => {
  //         console.log(res.data)
  //         this.otp['otp1'] = null
  //         this.otp['otp2'] = null
  //         this.otp['otp3'] = null
  //         this.otp['otp4'] = null
  //         this.otp['otp5'] = null
  //         this.otp['otp6'] = null
  //         if (this.otp['otp1'] == 1 && this.otp['otp2'] == 2 && this.otp['otp3'] == 3 && this.otp['otp4'] == 4 && this.otp['otp5'] == 5 && this.otp['otp6'] == 6) {
  //           this.dataService.user.otp = this.otp['otp1'] + this.otp['otp2'] + this.otp['otp3'] + this.otp['otp4'] + this.otp['otp5'] + this.otp['otp6']
  //           console.log(this.dataService.user)
  //           let emailVerify = sessionStorage.getItem('email-verify')
  //           if (emailVerify == "true") {
  //             let userType = sessionStorage.getItem('user-type')
  //             let email = this.dataService.message.email
  //             if (userType && email) {
  //               let payload = {
  //                 "email": email,
  //                 "otp": this.dataService.user.otp,
  //                 "type": JSON.parse(userType)
  //               }
  //               this.dataService.verifyEmail(payload).subscribe((res: VerifyEmailResponse) => {
  //                 if (res.message)
  //                   this.dataService.NotificationService(res.message, 'Success', 'info', 5000)
  //                 setTimeout(() => {
  //                   // sessionStorage.removeItem('user-type')
  //                   sessionStorage.removeItem('email-verify')
  //                   // sessionStorage.setItem('update-mobile' , "true")
  //                   this.router.navigate(['update-mobile'])
  //                 }, 10);
  //               })

  //             }
  //           }
  //           if (emailVerify !== "true")
  //             this.dataService.verifyOTP(this.dataService.user).subscribe((res: any) => {
  //               console.log(res.data)
  //               this.otp['otp1'] = null
  //               this.otp['otp2'] = null
  //               this.otp['otp3'] = null
  //               this.otp['otp4'] = null
  //               this.otp['otp5'] = null
  //               this.otp['otp6'] = null
  //               if (res.data.url) {
  //                 console.log(res.data.url, 'joburl')
  //                 // this.dataService.NotificationService('You are now redirecting to the registration page in 5 seconds.' , 'This number is not registered.' , 'info' , 5000)
  //                 this.continueRegisterDialog.subscribe({
  //                   next: data => {
  //                     this.router.navigate(['job-seeker-register'])
  //                   },
  //                   complete: () => {
  //                   },
  //                 });
  //               }
  //               if (res.data.auth_key) {
  //                 // this.dataService.NotificationService('Login successful' , '' , 'success' , 5000)
  //                 // this.showDialogOnSuccessful()
  //                 this.successDialog.subscribe({
  //                   next: data => {
  //                     // console.info(`Dialog emitted data = ${data}`);
  //                     sessionStorage.setItem('auth_key', res.data.auth_key)
  //                     sessionStorage.setItem('userLoggedIn', 'true')
  //                     sessionStorage.setItem('userName', res.data.name)
  //                     sessionStorage.setItem('seeker-dashboard', 'job_seeker')
  //                     this.dataService.userName = res.data.name
  //                     let flag = sessionStorage.getItem('appliedFromQuickApply')
  //                     if (flag == "true") {
  //                       sessionStorage.setItem('quickApply', "true")
  //                       this.router.navigate(['search-jobs', this.dataService.queryParam])
  //                     } else {
  //                       this.router.navigate(['seeker-dashboard'])
  //                     }
  //                   },
  //                   complete: () => {
  //                     console.info('Dialog closed');
  //                   },
  //                 });
  //               }
  //             })
  //         }
  //         else {
  //           this.dataService.verifyOTP(this.dataService.user).subscribe((res: any) => {
  //             console.log(res)
  //             // this.dataService.NotificationService(res.message , '' , 'error' , 5000)
  //             this.showDialogOnError()
  //             if (res.message) {
  //             }

  //           });
  //           this.otp['otp1'] = null
  //           this.otp['otp2'] = null
  //           this.otp['otp3'] = null
  //           this.otp['otp4'] = null
  //           this.otp['otp5'] = null
  //           this.otp['otp6'] = null
  //         }



  //         if (this.dataService.user.type == "recruiter") {
  //           if (this.otp['otp1'] == 1 && this.otp['otp2'] == 2 && this.otp['otp3'] == 3 && this.otp['otp4'] == 4 && this.otp['otp5'] == 5 && this.otp['otp6'] == 6) {
  //             this.dataService.user.otp = this.otp['otp1'] + this.otp['otp2'] + this.otp['otp3'] + this.otp['otp4'] + this.otp['otp5'] + this.otp['otp6']
  //             console.log(this.dataService.user)
  //             this.dataService.verifyOTP(this.dataService.user).subscribe((res: any) => {
  //               console.log(res.data)
  //               this.otp['otp1'] = null
  //               this.otp['otp2'] = null
  //               this.otp['otp3'] = null
  //               this.otp['otp4'] = null
  //               this.otp['otp5'] = null
  //               this.otp['otp6'] = null
  //               if (res.data.url) {
  //                 console.log(res.data.url, 'recurl-----')
  //                 // this.dataService.NotificationService('You are now redirecting to the registration page in 5 seconds.' , 'This number is not registered.' , 'info' , 5000)
  //                 this.continueRegisterDialog.subscribe({
  //                   next: data => {
  //                     this.router.navigate(['/recruiter-register'])
  //                   },
  //                   complete: () => {
  //                   },
  //                 });
  //               }
  //               if (res.data.auth_key) {
  //                 // this.dataService.NotificationService('Login successful' , '' , 'success' , 5000)
  //                 // this.showDialogOnSuccessful()
  //                 this.successDialog.subscribe({
  //                   next: data => {
  //                     // console.info(`Dialog emitted data = ${data}`);
  //                     sessionStorage.setItem('auth_key', res.data.auth_key)
  //                     sessionStorage.setItem('userLoggedIn', 'true')
  //                     sessionStorage.setItem('userName', res.data.name)
  //                     sessionStorage.setItem('recruiter-dashboard', 'recruiter')
  //                     this.dataService.userName = res.data.name
  //                     this.router.navigate(['/recruiter-dashboard'])
  //                   },
  //                   complete: () => {
  //                     console.info('Dialog closed');
  //                   },
  //                 });
  //               }
  //             })
  //           }
  //           else {
  //             this.dataService.verifyOTP(this.dataService.user).subscribe((res: any) => {
  //               console.log(res)
  //               // this.dataService.NotificationService(res.message , '' , 'error' , 5000)
  //               this.showDialogOnError()
  //               if (res.message) {
  //               }

  //             });
  //             this.otp['otp1'] = null
  //             this.otp['otp2'] = null
  //             this.otp['otp3'] = null
  //             this.otp['otp4'] = null
  //             this.otp['otp5'] = null
  //             this.otp['otp6'] = null
  //           }

  //         }
  //       }

  //       )
  //     }
  //   }
  // }

}


