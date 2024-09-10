import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { YearsOfExperience, YearsOfExperienceResponse } from 'src/app/model/workassist.modal';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-seeker-register',
  templateUrl: './seeker-register.component.html',
  styleUrls: ['./seeker-register.component.css']
})
export class SeekerRegisterComponent {

  disabled = true
  agreedTermsAndConditions = false
  whatsupUpdates = false
  yearsOfExperience !: Array<YearsOfExperience>
  error = {
    "first_name" : null,
    "last_name" : null,
    "email" : null,
    "mobile_number" : null,
    "work_experience" : null,
  }
  jobSeekerRegister = {
    "first_name" : '',
    "middle_name": '',
    "last_name" : '',
    "email" : '',
    "mobile_number" : '',
    "work_experience" : '',
    "resume"  : ''
  }

  constructor(
    private dataService : DataService,
    private router : Router
  ){ 
    this.jobSeekerRegister.mobile_number = this.dataService.user.mobile_number
    this.dataService.entitySearch('experience').subscribe((res:YearsOfExperienceResponse)=>{
      this.yearsOfExperience = res.data as Array<YearsOfExperience>
    })
    if(!this.yearsOfExperience){
      this.yearsOfExperience = [] as Array<YearsOfExperience>
    }
  }

  experience(event : any){
    // console.log(event.target.value)
    this.jobSeekerRegister.work_experience  = event.target.value
  }

  goToHome(){
    this.router.navigate(['login'])
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

  numbersOnly( value: string){
    if(!value.match(/[0-9.]$/g)) {  
      value = value.replace(value , value.substring(0 , value.length - 1) )  ;
    }  
    return value;
  }

  alphabetsOnly(value: string){
    value =  value.charAt(0).toUpperCase() + value.slice(1);
    if(!value.match(/[A-Za-z]$/g)) {  
      value = value.replace(value , value.substring(0 , value.length - 1) )  ;
    }  
    return value;
  }

  uploadFile(event : any){
    let files = event.target.files[0]
    this.jobSeekerRegister.resume = files
  }

  submit(){
    console.log(this.jobSeekerRegister)
    let payload = new FormData();
    if(this.jobSeekerRegister.first_name)
    payload.append('first_name', this.jobSeekerRegister.first_name);
    if(this.jobSeekerRegister.last_name)
    payload.append('last_name', this.jobSeekerRegister.last_name);
    if(this.jobSeekerRegister.email)
    payload.append('email', this.jobSeekerRegister.email);
    if(this.jobSeekerRegister.mobile_number)
    payload.append('mobile_number', this.jobSeekerRegister.mobile_number);
    if(this.jobSeekerRegister.work_experience)
    payload.append('work_experience', this.jobSeekerRegister.work_experience);
    if(this.jobSeekerRegister.resume)
    payload.append('resume', this.jobSeekerRegister.resume);
    this.dataService.jobSeekerRegister(payload).subscribe((res :any)=>{
      console.log(res)
      this.error.first_name = res.data.first_name
      this.error.last_name = res.data.last_name
      this.error.email = res.data.email
      this.error.mobile_number = res.data.mobile_number
      this.error.work_experience = res.data.work_experience
      if(res.status == 200){
        this.error.first_name = null
        this.error.last_name = null
        this.error.email = null
        this.error.mobile_number = null
        this.error.work_experience = null
        this.dataService.NotificationService(res.message , '', 'success' , 3000)
        setTimeout(() => {
          this.router.navigate(['seeker-dashboard'])          
        }, 1500);
      }
    })
  }
}

// export interface SeekerRegister{
//   first_name : string,
//   first_name : string;
//   first_name : string;
//   first_name : string;
//   first_name : string;


// }
