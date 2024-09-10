import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GenerateEmailOTPResponse, Message } from 'src/app/model/workassist.modal';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent {

  constructor(
    private router : Router,
    private dataService : DataService
  ){}

  verifyEmail = {
    email : null,
    type : 'job_seeker'
  }

  userType(event : any){
    let value = event.target.value
    this.verifyEmail.type = value
  }

  submit(){
    // console.log(this.verifyEmail)
    this.dataService.generateEmailOTP(this.verifyEmail).subscribe((res:GenerateEmailOTPResponse)=>{
      // console.log(res)
      if(res.message){
        // this.dataService.NotificationService(res.message , 'Success!' , 'info' , 5000)
        let arr = res.message.split(' ')
        if(!this.dataService.message){
          this.dataService.message = {} as Message
        }
        this.dataService.message[0] = arr[0] + ' ' + arr[1] + ' '  + arr[2] + ' '  + arr[3]
        this.dataService.message[1] = arr[4] + ' '  + arr[5] + ' '  + arr[6]
        this.dataService.message['email'] = arr[7]
        // console.log(this.dataService.message)
        sessionStorage.setItem('email-verify', "true")
        sessionStorage.setItem('user-type', JSON.stringify(res.data?.type))
        this.router.navigate(['otp'])
      }
      

    })
    // if(this.verifyEmail.email == "shashank.mor@workassist.in"){
    //   if(this.verifyEmail.userType == 'jobSeeker'){
    //   }
    // }
  }



}
