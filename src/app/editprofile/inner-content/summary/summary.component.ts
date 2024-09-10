import { Component, Inject } from '@angular/core';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { DataService } from 'src/app/service/data.service';
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus';
import { JobSeekerSummaryProfile } from 'src/app/model/workassist.modal';


@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent {

  summaryDetails !: JobSeekerSummaryProfile
  error={
    "profile_summary" : ""
  }

  constructor(
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<null, JobSeekerSummaryProfile>,
    private dataService : DataService
  ){
    if(this.context.data){
      this.summaryDetails = this.context.data
    }
    if(!this.summaryDetails){
      this.summaryDetails = {} as JobSeekerSummaryProfile
    }
    // console.log(this.context.data)
   }

  submit(): void {
    this.dataService.jobSeekerProfileSummaryUpdate(this.summaryDetails).subscribe((res : any)=>{
      console.log(res)
      if(res.status == 200){
        this.summaryDetails = {}
        this.dataService.NotificationService('','Success.','success',3000)
        this.context.completeWith(null);
      }
      if(res.status == 201){ 
        this.error = res.data
      }
    })
  }

  cancel(){
    this.summaryDetails = {}
    this.context.completeWith(null);
  }

}
