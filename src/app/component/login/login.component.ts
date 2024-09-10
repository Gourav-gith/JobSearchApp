import { HttpParams, HttpParamsOptions } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'src/app/model/workassist.modal';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  mobileNo !: string
  userType : string = "job_seeker"
  agreedTermsAndConditions : boolean = false
  btnDisabled = true

  constructor( 
    private router : Router ,
    private dataService : DataService
    ){ }

  numbersOnly( value: string){
    // console.log(this.mobileNo)

    if(!value.match(/[0-9.]$/g)) {  
      value = value.replace(value , value.substring(0 , value.length - 1) )  ;
    }  
    this.mobileNo = value
    return value;
  }

  submit(){
    if(this.mobileNo?.length == 10){
      this.dataService.user.mobile_number = this.mobileNo
      this.dataService.user.type = this.userType
      let payload = {
        "mobile_number": this.mobileNo,
        "type": this.userType
      }
      this.dataService.generateOTP(payload).subscribe((res: any)=>{
        console.log(res)
        this.dataService.message = {} as Message
        this.dataService.message = res.data
        this.router.navigate(['otp']) 
      })
    }
  }

  ngDoCheck(){
    if(this.mobileNo?.length == 10 || this.agreedTermsAndConditions){
      this.btnDisabled = false 
    }
    if(this.mobileNo?.length < 10 || !this.agreedTermsAndConditions){
      this.btnDisabled = true
    }
  }

  termsAndConditions(event : any){
    console.log(event.target.checked)
    if(event.target.checked == true)
    this.agreedTermsAndConditions = true
    if(event.target.checked == false)
    this.agreedTermsAndConditions = false
  }

  selectUserType(event : any){
    // console.log(event.target.value)
    this.userType  = event.target.value
  }

  updateMobile(){
    this.router.navigate(['verify-email'])
  }

}
