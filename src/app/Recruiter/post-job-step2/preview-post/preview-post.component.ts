import { Component, OnInit } from '@angular/core';
import { RecruiterService } from '../../recruiter.service';
import { JobLeadership, PreviewPost, PreviewPostResponse } from 'src/app/model/recruiter.modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preview-post',
  templateUrl: './preview-post.component.html',
  styleUrls: ['./preview-post.component.css']
})
export class PreviewPostComponent implements OnInit {
  job_id:string
  companyname!:string | null
  previePost !: PreviewPost
  joinedRoles: string = '';
  coreCompetencyNames: any[] = [];
  leadership :  JobLeadership[] = [];
  revalCompanyName !: string


 
constructor(private _service:RecruiterService, private router:Router){
  const jobIdFromSession = sessionStorage.getItem('postjobStep-1_id');
  this.job_id = jobIdFromSession !== null ? jobIdFromSession : ''; // Or set to a default string if necessary
  console.log(this.job_id);
  this.companyname = sessionStorage.getItem('companyName') as string
  let data = sessionStorage.getItem('postJobStep2')
  let parsedData = JSON.parse(data!)
  console.log(parsedData);
  if (parsedData) {
    this.revalCompanyName = parsedData.display_company_name;
    console.log('this.revalCompanyName', this.revalCompanyName);
  } else {
    this.companyname = sessionStorage.getItem('companyName') as string
    console.log('No data found in sessionStorage for key postJobStep2');
  }
  

  if(!this.previePost){
    this.previePost = {} as PreviewPost
  }
 
  }

capitalizeFirstLetter(value: string | undefined): string {
  if (!value) return '';
  return value.charAt(0).toUpperCase() + value.slice(1);
}

  ngOnInit(){
    if (this.job_id !== null) {
      this._service.previewPost(this.job_id).subscribe((response: PreviewPostResponse) => {
        this.previePost = response.data as  PreviewPost
        // console.log('previepostresponse------------',this.previePost);
        if (this.previePost && this.previePost.job_role_specific) {
          this.joinedRoles = this.previePost.job_role_specific.map(item => item.role_specific).join(', ');
        }
        
        if (this.previePost && this.previePost.core_competencies) {
          this.coreCompetencyNames = this.previePost.core_competencies
            .filter(comp => comp.core_competency !== undefined)
            .map(comp => comp.core_competency?.name);
            // console.log(this.coreCompetencyNames);
            
        }
      });
    } else {
      
    }

  }

  backBtn(){
    this.router.navigate(['recruiter-postjob2'])
  }

  previePostBtn(){
  if(this.job_id !== null){
    this._service.postPreviewpost(this.job_id).subscribe((response:any)=>{
      console.log(response)
      if(response.status == 200){
        this._service.NotificationService(response.message,'Update successful' , 'success' , 5000)
        this.router.navigate(['recruiter-manage-jobs'])
      }
      if(response.status == 201){
        this._service.NotificationService(response.message,'Fill Data' , 'error' , 5000)

        this.router.navigate(['recruiter-postjob2'])
      }

    })
  }
  }

}
