import { HttpClient, HttpHeaders, HttpParams, HttpParamsOptions } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobList, JoblistResponse } from 'src/app/model/workassist.modal';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-joblisting',
  templateUrl: './joblisting.component.html',
  styleUrls: ['./joblisting.component.css']
})
export class JoblistingComponent {

  key : string[] = []
  location !: string
  catagory !: string

  jobListResponse = {} as JoblistResponse
  jobList !: Array<JobList>

  value !: string

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService : DataService
  ){
    if(!this.jobList){
      this.jobList = [] as Array<JobList>
    }
  }

  ngOnInit() {
    const queryParameter = this.route.snapshot.paramMap.get('id');
    const query = queryParameter?.split('?')[1].split('&')
    if(query![0])
    this.key.push( query![0].split('=')[1])
    if(query![1])
    this.location = query![1].split('=')[1]
    if(query![2])
    this.catagory = query![2].split('=')[1]
    console.log(this.key)
    console.log(this.location)
    console.log(this.catagory)


    let myObject = {}
    if(!this.location  && !this.catagory ){
      myObject  = { 'skills[]': this.key};
    }
    else if(!this.catagory){
      myObject  = { 'skills[]': this.key, 'locations[]': this.location};
    }
    else{
      myObject  = { 'skills[]': this.key, 'locations[]': this.location, 'catagory[]': this.catagory};
    }
    
    const httpParams: HttpParamsOptions = { fromObject: myObject } as HttpParamsOptions;
    const options = { params: new HttpParams(httpParams), headers: this.dataService.header };
    // window.location.href = `http://devapi.workassist.in/api/v1/search?skills[]=${this.key}&locations[]=${this.location}&catagory[]=${this.catagory}`
    this.dataService.search(options).subscribe((res:any)=>{
      console.log('Job List >>>>>>>>>>>>>' ,res.data.data )
      this.jobListResponse = res as JoblistResponse
      this.jobList = this.jobListResponse?.data?.data as Array<JobList>
    })    

    let quickApply = sessionStorage.getItem('quickApply')

    if(quickApply == "true"){
      this.quickApply()
      sessionStorage.removeItem('appliedFromQuickApply')
      sessionStorage.removeItem('quickApply')
    }

  }

  individualPage(){
    this.router.navigate(['individual-job'])
  }

  quickApply(){
    let userAuthkey = sessionStorage.getItem('auth_key')
    if(userAuthkey){
      this.dataService.NotificationService('','Applied','success', 3000)
    }else{
      this.router.navigate(['login'])
      sessionStorage.setItem('appliedFromQuickApply' , "true")
    }
    
  }

  getNumber(value : string){
    return value
  }

}
