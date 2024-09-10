import { Component, Inject } from '@angular/core';
import { TuiDialogService, TuiDialogContext } from '@taiga-ui/core';
import { DataService } from 'src/app/service/data.service';
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus';
import { JobSeekerProfessionalDetails } from 'src/app/model/workassist.modal';
// import { JobSeekerProfessionalDetails } from 'src/app/model/job-seeker-profile-page/job-seeker-professional-details.model';


@Component({
  selector: 'app-pro-details',
  templateUrl: './pro-details.component.html',
  styleUrls: ['./pro-details.component.css']
})
export class ProDetailsComponent {

  professionalDetails !: JobSeekerProfessionalDetails
  error={
    "total_work_exp_months" : "",
    "total_work_exp_years"  : "",
    "industry"  : "",
    "functional_area"  : "",
    // "work_level"  : "",
    // "current_ctc"  : "",
    "joining_availability"  : "",
    "work_mode" : "",
    // "skills"  : "",
    "job_type"  : ""
  }
  constructor(
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<null, JobSeekerProfessionalDetails>,
    private dataService : DataService
  ){
    if(this.context.data){
      this.professionalDetails = this.context.data
    }
    if(!this.professionalDetails){
      this.professionalDetails = {} as JobSeekerProfessionalDetails
    }
    // console.log(this.context.data)

    this.dataService.entitySearch('total_work_exp_years').subscribe((res:any)=>{
      // console.log(res)
    })

    this.dataService.entitySearch('total_work_exp_months').subscribe((res:any)=>{
      // console.log(res)
    })

    this.dataService.entitySearch('industry').subscribe((res:any)=>{
      // console.log(res)
    })

    this.dataService.functionalAreaSearch().subscribe((res:any)=>{
      // console.log(res)
    })

    this.dataService.entitySearch('work_level').subscribe((res:any)=>{
      // console.log(res)
    })

    this.dataService.entitySearch('joining_availability').subscribe((res:any)=>{
      // console.log(res)
    })

    this.dataService.entitySearch('work_mode').subscribe((res:any)=>{
      // console.log(res)
    })

    this.dataService.entitySearch('job_type').subscribe((res:any)=>{
      // console.log(res)
    })
  }


  submit(): void {
    // console.log(this.professionalDetails)    
    let payload = new FormData();
    if(this.professionalDetails.total_work_exp_years)
    payload.append('total_work_exp_years', this.professionalDetails.total_work_exp_years);

    if(this.professionalDetails.total_work_exp_months)
    payload.append('total_work_exp_months', this.professionalDetails.total_work_exp_months);

    if(this.professionalDetails.industry)
    payload.append('industry', this.professionalDetails.industry);

    if(this.professionalDetails.functional_area)
    payload.append('functional_area', this.professionalDetails.functional_area);
    
    if(this.professionalDetails.work_level)
    payload.append('work_level', this.professionalDetails.work_level);

    if(this.professionalDetails.current_ctc)
    payload.append('current_ctc', this.professionalDetails.current_ctc);

    if(this.professionalDetails.joining_availability)
    payload.append('joining_availability', this.professionalDetails.joining_availability);
    
    if(this.professionalDetails.work_mode_name)
    payload.append('work_mode_name', this.professionalDetails.work_mode_name);

    if(this.professionalDetails.job_type)
    payload.append('job_type', this.professionalDetails.job_type);

    this.professionalDetails.skills = undefined
    this.dataService.JobSeekerProfessionalDetailsUpdate(this.professionalDetails).subscribe((res : any)=>{
      // console.log(res)
      if(res.status == 200){
        this.professionalDetails = {}
        this.dataService.NotificationService('','Success.','success',3000)
        this.context.completeWith(null);
      }
      if(res.status == 201){
        this.error = res.data
      }
    })
  }

  years(event :any){
    // console.log(event)
    this.professionalDetails.total_work_exp_years = event
  }

  months(event :any){
    // console.log(event)
    this.professionalDetails.total_work_exp_months = event
  }

  workingIndustry(event :any){
    // console.log(event)
    this.professionalDetails.industry = event
  }

  functionalArea(event :any){
    // console.log(event)
    this.professionalDetails.functional_area = event
  }

  workLevel(event :any){
    // console.log(event)
    this.professionalDetails.work_level = event
  }

  joiningAvailability(event :any){
    // console.log(event)
    this.professionalDetails.joining_availability = event
  }

  workMode(event :any){
    // console.log(event)
    this.professionalDetails.work_mode_name = event
  }

  jobType(event :any){
    // console.log(event)
    this.professionalDetails.job_type = event
  }

  cancel(){
    // this.personalDetails = {}
    this.context.completeWith(null);
  }

}
