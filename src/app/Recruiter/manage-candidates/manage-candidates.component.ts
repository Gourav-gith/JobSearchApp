import { Component, OnInit } from '@angular/core';
import { RecruiterService } from '../recruiter.service';
import { CandidatesCount, IndustryResponse, JobRole, JobRoleResponse, ManagecandidateResponse } from 'src/app/model/recruiter.modal';
import { Industry } from 'src/app/model/workassist.modal';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-manage-candidates',
  templateUrl: './manage-candidates.component.html',
  styleUrls: ['./manage-candidates.component.css']
})
export class ManageCandidatesComponent implements OnInit {
  selectedbutton : string = 'allCandidate'
  jobRole !: Array<JobRole>
  industry !: Array<Industry>
  id !: number
  candidateCount !: Array<CandidatesCount>

  constructor(private _Service:RecruiterService,private router:Router,private route:ActivatedRoute){

  }

  changeColour(data:string){
    this.selectedbutton = data
    console.log(this.selectedbutton);
    
  }

  ngOnInit(): void{
    this.route.params.subscribe((params)=>{
      this.id = params['id']
      console.log('id----',this.id);
    })
    if(this.id){
      this._Service.manageCandidate(this.id).subscribe((response:ManagecandidateResponse)=>{
          console.log(response);
          this.candidateCount = response.data?.candidates_Counts as Array<CandidatesCount>
          
      })
    }



    this._Service.entitySearch('job_Role').subscribe((respone:JobRoleResponse)=>{
      this.jobRole = respone.data as Array<JobRole>
      // console.log(this.jobRole);
    })
    this._Service.entitySearch('industry').subscribe((respone:IndustryResponse)=>{
      // console.log(respone);
      this.industry = respone.data as Array<Industry>
    })
}

viewProfile(){
  this.router.navigate(['recruiter-candidates-preview-page'])
}

}
