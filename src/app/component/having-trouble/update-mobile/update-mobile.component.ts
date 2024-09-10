import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UpdateMobileResponse } from 'src/app/model/workassist.modal';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-update-mobile',
  templateUrl: './update-mobile.component.html',
  styleUrls: ['./update-mobile.component.css']
})
export class UpdateMobileComponent {

  mobileNo !: string

  constructor(
    private router : Router,
    private dataService : DataService

  ){}

  submit(){
    let usertype = sessionStorage.getItem('user-type')
    if(usertype){
      let payload = {
        "email" : this.dataService.message.email,
        "mobile_number" : this.mobileNo,
        "type" : JSON.parse(usertype)
      }
      this.dataService.updateMobile(payload).subscribe((res:UpdateMobileResponse)=>{
        // console.log(res)
        if(res.message)
        this.dataService.NotificationService( res.message , 'Success' , 'info' , 5000) 
        setTimeout(() => {
          sessionStorage.removeItem('user-type')
          sessionStorage.setItem('update-mobile' , "true")
          this.router.navigate(['otp'])          
        }, 10);
      })
    }   
  }

}
