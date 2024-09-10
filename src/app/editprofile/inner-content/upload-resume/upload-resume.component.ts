import { Component, Inject } from '@angular/core';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { DataService } from 'src/app/service/data.service';
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus';


@Component({
  selector: 'app-upload-resume',
  templateUrl: './upload-resume.component.html',
  styleUrls: ['./upload-resume.component.css']
})
export class UploadResumeComponent {

  resume !: any
  error={
    "resume" : "",
  }

  constructor(
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<null, null>,
    private dataService : DataService
  ){}

   resumeUpload(event : any){
    let file = event.target.files[0]
    this.resume = file
   }

  submit(): void {
    // console.log(this.basicDetails)    
    let payload = new FormData();
    if(this.resume)
    payload.append('resume', this.resume);
    this.dataService.jobSeekerResumeUpdate(payload).subscribe((res : any)=>{
      console.log(res)
      if(res.status == 200){
        this.dataService.NotificationService('','Success.','success',3000)
        this.context.completeWith(null);
      }
      if(res.status == 201){
        this.error = res.data
      }
    })
  }

  cancel(){
    this.context.completeWith(null);
  }

}
