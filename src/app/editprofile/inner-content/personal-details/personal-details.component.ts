import { Component, Inject } from '@angular/core';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { DataService } from 'src/app/service/data.service';
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus';
import { HttpParams, HttpParamsOptions } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { JobSeekerPersonalDetails } from 'src/app/model/workassist.modal';


@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css']
})
export class PersonalDetailsComponent {

  personalDetails !: JobSeekerPersonalDetails
  date !: string
  imagePath !: any
  error={
    "date_of_birth" : "",
    "gender_name" : "",
    "marital_status" : "",
    "nationality" : "",
    "address_line_1" : "",
    "address_line_2" : "",
    "pincode" : "",
    "city_name" : "",
    "state_name" : "",
    "country_name" : "",
    "pan_number" : "",
    "alternate_email" : "",
    "alternate_mobile_number" : "",
    "linkedin" : "",
    "languages" : "",
  }

  stateList !: any
  cityList !: any
  cityControl = new FormControl();

  constructor(
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<null, JobSeekerPersonalDetails>,
    private dataService : DataService
  ){
    if(this.context.data){
      this.personalDetails = this.context.data
    }
    if(!this.personalDetails){
      this.personalDetails = {} as JobSeekerPersonalDetails
    }
    console.log(this.context.data)
   }

   ngOnInit(){
    this.dataService.stateSearch().subscribe((res : any)=>{
      this.stateList = res.data
    })
    // this.dataService.citySearch().subscribe((res : any)=>{
    //   this.cityList = res.data
    // })

   }

   ngDoCheck(){
    // let date  = this.personalDetails.date_of_birth?.split("-")
    // if(date)
    // this.date = date[2] + '-' + date[1] + '-' + date[0]

    // this.personalDetails
   }

   selectDate(event : any){
    let value = event.target.value
    value = value.split('-')
    value = value[2] + '-' + value[1] + '-' + value[0]
    this.personalDetails.date_of_birth = value
    // console.log(this.personalDetails.date_of_birth)
   }

   selectGender(event : any){
    let value = event
    console.log(value)
   }

   maritalStatus(event : any){
    let value = event
    console.log(value)
   }

   nationality(event : any){
    let value = event
    console.log(value)
   }

   selectCity(event : any){
    let value = event
    console.log(value)
   }

   getLocationByPincode(keyword : any){
    let myObject = { "pincode":keyword }
    const httpParams: HttpParamsOptions = { fromObject: myObject } as HttpParamsOptions;
    const options = { params: new HttpParams(httpParams), headers: this.dataService.header };
    this.dataService.getLocationByPincode(options).subscribe((res:any)=>{
      if(res.status == 200){
        this.personalDetails.state_id = res.data.state_id
        this.personalDetails.city_id = res.data.city_id
      }
    })
   }

  submit(): void {
    let value : any = this.personalDetails.date_of_birth!.split('-')
    value = value[2] + '-' + value[1] + '-' + value[0]
    this.personalDetails.date_of_birth = value
    this.personalDetails.languages = undefined
    // let obj = {
    //   "languages":[972,970,975],
    //   "levels":[1838,1839,1840]
    // }
    // let ob = { obj , ... obj}
    console.log(this.personalDetails) 

    this.dataService.jobSeekerPersonalDetailsUpdate(this.personalDetails).subscribe((res : any)=>{
      console.log(res)
      if(res.status == 200){
        this.personalDetails = {}
        this.dataService.NotificationService('','Success.','success',3000)
        this.context.completeWith(null);
      }
      if(res.status == 201){
        this.error = res.data
      }
    })
  }

  cancel(){
    this.personalDetails = {}
    this.context.completeWith(null);
  }

}
