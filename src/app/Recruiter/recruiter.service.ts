import { HttpClient, HttpHeaders, HttpParams, HttpParamsOptions } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { TuiAlertService } from '@taiga-ui/core';

@Injectable({
  providedIn: 'root'
})
export class RecruiterService {
  baseUrl ="https://workassist.tech/api/v1/"
  locationList !: any

  header = new HttpHeaders().set(
    "authkey",
    "a213d00ad5d1d16651c6a87be21d03d4"
  )

  constructor(private _http:HttpClient,@Inject(TuiAlertService) private readonly alerts: TuiAlertService) {
    sessionStorage.setItem('user-authkey' , 'a213d00ad5d1d16651c6a87be21d03d4')

   }

   NotificationService(content : any , label : string , status : any ,autoClose : any) {
    this.alerts.open(content, { label: label , status: status, autoClose : autoClose }).subscribe();
  }
 
// Recruiter Dashboard

  headerCardsApi(){
    return this._http.get(this.baseUrl + 'recruiter/header-cards',{headers:this.header})
  }

  recentPostJobApi(){
    return this._http.get(this.baseUrl + 'recruiter/recent-posted-jobs',{headers:this.header})
  }

  recentAppliactionApi(){
    return this._http.get(this.baseUrl + 'recruiter/recent-applications' , {headers:this.header})
  }

  blogRecentPostApi(){
    return this._http.get(this.baseUrl + 'recruiter/blogs', {headers:this.header})
  }

  

  companyDetailsApi(authkey : string){
    let header = new HttpHeaders().set("authkey", authkey)
    return this._http.get(this.baseUrl + 'recruiter/company-details', {headers:header})

  }
  pinCode(pinCode:string){
    const headers = new HttpHeaders({
      'authkey': 'yPehu2u7yBe9eguuyAeAugeHaQynuRuyuvyp',
    });

    // Convert the payload to query parameters
    const params = new HttpParams()
      .set('pincode', pinCode);


    return this._http.get(this.baseUrl + 'location-by-pincode',{headers,params})
  }

  
  aboutcomapny(authKey:string){
    let header = new HttpHeaders().set('authkey',authKey)
    return this._http.get(this.baseUrl + 'recruiter/about-company' ,{headers:header})
  }


  companyDetailsUpdate(payload:any){
   let authKey = sessionStorage.getItem('user-authkey')
   let header
   if(authKey){
    header = new HttpHeaders().set('authkey',authKey)
   }
   return this._http.post(this.baseUrl + 'recruiter/company-details/update',payload,{headers:header})
  }

  aboutCompanyUpdate(payload:any){
    let authKey = sessionStorage.getItem('user-authkey')
    let header
    if(authKey){
      header = new HttpHeaders().set('authkey',authKey)
    }
    return this._http.post(this.baseUrl + 'recruiter/about-company/update',payload ,{headers:header})
  }

  professionalDetailsApi(authKey : string){
    let header = new HttpHeaders().set("authkey", authKey)
    return this._http.get(this.baseUrl + 'recruiter/professional-details' , {headers:header})
  }
  professionalDetailsUpdate(payload:any){
    let authKey = sessionStorage.getItem('user-authkey')
    let header
    if(authKey){
      header = new HttpHeaders().set('authkey',authKey)
    }
    return this._http.post(this.baseUrl + 'recruiter/professional-details/update', payload,{headers:header})

  }

  // /POST JOB API

// getpostJobStep1(){
//   return this._http.get(this.baseUrl + 'recruiter/post-job' ,{headers:this.header})
// }

entitySearch(entityName:string){
  let myObject = {
    'type' : entityName
  }
  let header = new HttpHeaders().set('authKey','yPehu2u7yBe9eguuyAeAugeHaQynuRuyuvyp')
  let httpParams :HttpParamsOptions ={ fromObject: myObject } as HttpParamsOptions;
  const options = { params: new HttpParams(httpParams), headers: header };
  return this._http.get(this.baseUrl + 'entity' , options)

}
functionalAreaSearch(functional:string){
  let myObject = {
    'type' : functional
  }
  let header = new HttpHeaders().set('authKey','yPehu2u7yBe9eguuyAeAugeHaQynuRuyuvyp')
  let httpParams :HttpParamsOptions ={ fromObject: myObject } as HttpParamsOptions;
  const options = { params: new HttpParams(httpParams), headers: header };
  return this._http.get(this.baseUrl + 'functional-areas' , options)

}
location(){
  let header = new HttpHeaders().set('authKey','yPehu2u7yBe9eguuyAeAugeHaQynuRuyuvyp')
  return this._http.get(this.baseUrl + 'get-all-cities', {headers:header})
}
experience(experience:string){
  let myObject = {
    "type":experience
  }
  let header = new HttpHeaders().set('authKey','yPehu2u7yBe9eguuyAeAugeHaQynuRuyuvyp')
  let httpParams : HttpParamsOptions = { fromObject : myObject} as HttpParamsOptions
  const options = { params : new HttpParams(httpParams), headers:header}
  return this._http.get(this.baseUrl + 'range-entity' , options)
}
workLevel(){
  let header = new HttpHeaders().set('authKey','yPehu2u7yBe9eguuyAeAugeHaQynuRuyuvyp')
  return this._http.get(this.baseUrl + 'competency/work/level' , {headers:header})
}
coreCompetency(workLevelId:number){
  const params = new HttpParams().set('work_level_competency_id', workLevelId);
   let header = new HttpHeaders().set('authKey','yPehu2u7yBe9eguuyAeAugeHaQynuRuyuvyp')
  return this._http.get(this.baseUrl+ 'competency/core',{
    headers: header,
    params: params
  });
}
leaderShipCompetency(workLevelId:number){
  const params = new HttpParams().set('work_level_competency_id', workLevelId.toString());
   let header = new HttpHeaders().set('authKey','yPehu2u7yBe9eguuyAeAugeHaQynuRuyuvyp')
  return this._http.get(this.baseUrl+ 'competency/leadership',{
    headers: header,
    params: params
  });
}



  PostJobStep1(data:any){
    console.log('payload>>>', data)
    let header = new HttpHeaders().set(
      "authkey",
      "decbdf11e49f40e2b5a065cb724f4399"
    )
    return this._http.post(this.baseUrl + 'recruiter/post-job/basic-details-store',data,{headers: header})
  }

  postJobStep2(data:any){
    let header = new HttpHeaders().set(
      "authkey",
      "decbdf11e49f40e2b5a065cb724f4399"
    )
    return this._http.post(this.baseUrl + 'recruiter/post-job/primary-responsibility-details-store',data,{headers:header})
  }

  previewPost(requestBody:string){
    let header = new HttpHeaders().set(
      "authkey",
      "decbdf11e49f40e2b5a065cb724f4399"
    )
    let object = {
      "job_id":requestBody
    }
    let httpParams : HttpParamsOptions = { fromObject : object} as HttpParamsOptions
    const options = { params : new HttpParams(httpParams), headers:header}
    return this._http.get(this.baseUrl+ 'recruiter/job-preview' , options)

  }
  
  screeningQuestion(){
    let header = new HttpHeaders().set(
      "authkey",
      "yPehu2u7yBe9eguuyAeAugeHaQynuRuyuvyp"
    )
    return this._http.get(this.baseUrl + 'screening-questions' ,{headers:header})
  }

  postJobStep3(data:any){
    let header = new HttpHeaders().set(
      "authkey",
      "decbdf11e49f40e2b5a065cb724f4399"
    )
    return this._http.post(this.baseUrl + 'recruiter/post-job/questionnaire-store' ,data, {headers:header})

  }

  postPreviewpost(requestBody:any){
    let header = new HttpHeaders().set(
      "authkey",
      "decbdf11e49f40e2b5a065cb724f4399"
    )
    let object = {
      "job_id":requestBody
    }
    return this._http.post(this.baseUrl + 'recruiter/job-post/submit' ,object, {headers:header})

  }

  getPostJobStep1(): any {
    const storedData = sessionStorage.getItem('postJobStep1');
    return storedData ? JSON.parse(storedData) : {};
  }
  getPostJobStep2(): any {
    const storedData = sessionStorage.getItem('postJobStep2');
    return storedData ? JSON.parse(storedData) : {};
  }



  manageJob(){
    let header = new HttpHeaders().set(
      "authkey",
      "a213d00ad5d1d16651c6a87be21d03d8"
    )
    return this._http.get(this.baseUrl + 'recruiter/post-job', {headers:header})
  }
  searchJobTitle(object:any){
    let header = new HttpHeaders().set(
      "authkey",
      "a213d00ad5d1d16651c6a87be21d03d8"
    )
    let myObject = {
      "job_title":object
    }
    let httpParams :HttpParamsOptions ={ fromObject: myObject } as HttpParamsOptions;
    const options = { params: new HttpParams(httpParams), headers: header };

    return this._http.get(this.baseUrl + 'recruiter/post-job' , options)
  }

  searchJobType(object:any){
    let header = new HttpHeaders().set(
      "authkey",
      "a213d00ad5d1d16651c6a87be21d03d8"
    )
    let myObject = {
      "job_type":object
    }
    let httpParams :HttpParamsOptions ={ fromObject: myObject } as HttpParamsOptions;
    const options = { params: new HttpParams(httpParams), headers: header };

    return this._http.get(this.baseUrl + 'recruiter/post-job' , options)
  }

  searchfromToDate(fromdate:string,enddate:string){
    let headers = new HttpHeaders().set(
      "authkey",
      "a213d00ad5d1d16651c6a87be21d03d8"
    )
    let params = new HttpParams().
    set(
      "from_date",fromdate, 
    )
    .set(
      "to_date",enddate
    )
    return this._http.get(this.baseUrl + 'recruiter/post-job' , { params: params, headers: headers } )

  }

  searchPostDate(object:any){
    let header = new HttpHeaders().set(
      "authkey",
      "a213d00ad5d1d16651c6a87be21d03d8"
    )
    let myObject = {
      'sort_by': object
    }
    let httpParams : HttpParamsOptions = {fromObject:myObject} as HttpParamsOptions
    const options = { params: new HttpParams(httpParams) , headers:header}

    return this._http.get(this.baseUrl + 'recruiter/post-job' , options)
  }

  headerManageJobs(object:any){
    let header = new HttpHeaders().set(
      "authkey",
      "a213d00ad5d1d16651c6a87be21d03d8"
    )
    let myObject = {
      'status_name': object
    }
    let httpParams : HttpParamsOptions = {fromObject:myObject} as HttpParamsOptions
    const options = { params : new HttpParams(httpParams) , headers:header}
    return this._http.get(this.baseUrl + 'recruiter/post-job' , options)
  }

  paggination(page:number){
    let header = new HttpHeaders().set(
      "authkey",
      "a213d00ad5d1d16651c6a87be21d03d8"
    )
    const url = `https://workassist.tech/api/v1/recruiter/post-job?page=${page}`
    return this._http.get(url,{headers:header})

  }

  jobPreview(id: string) {
    const header = new HttpHeaders({
      'authkey': 'decbdf11e49f40e2b5a065cb724f4399'
    });
  
    const options = {
      headers: header,
      params: {
        'job_id': id
      }
    };
  
    return this._http.get(this.baseUrl + 'recruiter/job-preview', options);
  }

  manageCandidate(id:number){
    const header = new HttpHeaders({
      'authkey' : 'decbdf11e49f40e2b5a065cb724f4399'
    })
    const options = {
      headers : header,
      params:{
        'job_id':id
      }
    }
    return this._http.get(this.baseUrl + 'recruiter/jobs/candidates',options)
  }

}
