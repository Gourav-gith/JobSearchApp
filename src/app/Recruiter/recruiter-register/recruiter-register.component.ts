import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-recruiter-register',
  templateUrl: './recruiter-register.component.html',
  styleUrls: ['./recruiter-register.component.css']
})
export class RecruiterRegisterComponent implements OnInit {

  disabled = true
  agreedTermsAndConditions = false
  whatsupUpdates = false

  error={
    "first_name" : null,
    "middle_name": null,
    "last_name" : null,
    "email" : null,
    "mobile_number" : null,
    "company_name" : null,
    "account_type_id": null

  }

  RecruiterRegister = {
    "first_name" : '',
    "middle_name": '',
    "last_name" : '',
    "email" : '',
    "mobile_number" : '',
    "company_name" : '',
    "account_type_id":''
  }


  constructor(private dataService:DataService,private router:Router){
    this.RecruiterRegister.mobile_number = this.dataService.user.mobile_number

  }

  ngOnInit(){

  }

  ngDoCheck(){
    // console.log(this.whatsupUpdates)
    if(this.agreedTermsAndConditions == true){
      this.disabled = false    
    }
    if(this.agreedTermsAndConditions == false){
      this.disabled = true    
    }
  }

  companyOption(e:any){
    console.log(e.target.value)
    this.RecruiterRegister.account_type_id = e.target.value

  }

  alphabetsOnly(value: string){
    value =  value.charAt(0).toUpperCase() + value.slice(1);
    if(!value.match(/[A-Za-z]$/g)) {  
      value = value.replace(value , value.substring(0 , value.length - 1) )  ;
    }  
    return value;
  }

  numbersOnly( value: string){
    if(!value.match(/[0-9.]$/g)) {  
      value = value.replace(value , value.substring(0 , value.length - 1) )  ;
    }  
    return value;
  }

  goHome(){
    this.router.navigate(['login'])
  }

  submit(){
    console.log(this.RecruiterRegister)
    let payload = new FormData();
    payload.append('first_name', this.RecruiterRegister.first_name);
    payload.append('last_name', this.RecruiterRegister.last_name);
    payload.append('email', this.RecruiterRegister.email);
    payload.append('mobile_number', this.RecruiterRegister.mobile_number);
    payload.append('company_name', this.RecruiterRegister.company_name);
    payload.append('account_type_id', this.RecruiterRegister.account_type_id);

    this.dataService.recuriterRegister(payload).subscribe((res :any)=>{
      console.log(res)
      this.error.first_name = res.data.first_name
      this.error.last_name = res.data.last_name
      this.error.email = res.data.email
      this.error.mobile_number = res.data.mobile_number
      this.error.company_name = res.data.company_name
      this.error.account_type_id = res.data.account_type_id
      if(res.status == 200){
        this.error.first_name = null
        this.error.last_name = null
        this.error.email = null
        this.error.mobile_number = null
        this.error.company_name = null
        this.error.account_type_id = null
        this.dataService.NotificationService(res.message , '', 'success' , 3000)
        setTimeout(() => {
          this.router.navigate(['recruiter-dashboard'])          
        }, 1500);
      }
    })
  }

}
