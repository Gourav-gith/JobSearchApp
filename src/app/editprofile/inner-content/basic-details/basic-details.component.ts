import { HttpParams, HttpParamsOptions } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { TuiDialogService, TuiDialogContext } from '@taiga-ui/core';
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus';
import { JobSeekerBasicDetails } from 'src/app/model/workassist.modal';
import { DataService } from 'src/app/service/data.service';


@Component({
  selector: 'app-basic-details',
  templateUrl: './basic-details.component.html',
  styleUrls: ['./basic-details.component.css']
})
export class BasicDetailsComponent {

  basicDetails !: JobSeekerBasicDetails
  imagePath !: any
  error={
    "first_name" : "",
    "middle_name" : "",
    "last_name" : "",
    "email" : "",
    "mobile_number" : "",
    "profile_image" : ""
  }

  constructor(
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<null, JobSeekerBasicDetails>,
    private dataService : DataService
  ){
    if(this.context.data){
      this.basicDetails = this.context.data
    }
    if(!this.basicDetails){
      this.basicDetails = {} as JobSeekerBasicDetails
    }
    // console.log(this.context.data)
   }

   profilePictureChange(event : any){
    let file = event.target.files[0]
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imagePath = reader.result; 
      };
    }
    this.basicDetails.profile_image = file
   }

  submit(): void {
    // console.log(this.basicDetails)    
    let payload = new FormData();
    if(this.basicDetails.first_name)
    payload.append('first_name', this.basicDetails.first_name);
    if(this.basicDetails.middle_name)
    payload.append('middle_name', this.basicDetails.middle_name);
    if(this.basicDetails.last_name)
    payload.append('last_name', this.basicDetails.last_name);
    if(this.basicDetails.email)
    payload.append('email', this.basicDetails.email);
    if(this.basicDetails.mobile_number)
    payload.append('mobile_number', this.basicDetails.mobile_number);
    if(this.basicDetails.profile_image)
    payload.append('profile_image', this.basicDetails.profile_image);
    this.dataService.jobSeekerBasicDetailsUpdate(payload).subscribe((res : any)=>{
      console.log(res)
      if(res.status == 200){
        this.basicDetails = {}
        this.dataService.NotificationService('','Success.','success',3000)
        this.context.completeWith(null);
      }
      if(res.status == 201){
        this.error = res.data
      }
    })
  }

  cancel(){
    this.basicDetails = {}
    this.context.completeWith(null);
  }

}
