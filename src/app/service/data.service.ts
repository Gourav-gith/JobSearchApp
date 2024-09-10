import { HttpClient, HttpHeaders, HttpParams, HttpParamsOptions } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { TuiAlertService } from '@taiga-ui/core';
import { Message } from '../model/workassist.modal';
// import { Message } from '../component/otp/otp.component';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // mobileNo !: string
  user = {
    mobile_number : '',
    type : '',
    otp : 0
  }
  userName !: string
  baseURL = 'https://workassist.tech/api/v1/'
  header = new HttpHeaders().set(
    "authkey",
     "yPehu2u7yBe9eguuyAeAugeHaQynuRuyuvyp"
      
  );
  message !: Message
  showLoginButton : boolean = true
  queryParam !: string

  constructor(
    private http : HttpClient,
    @Inject(TuiAlertService) private readonly alerts: TuiAlertService
  ) { 
    // sessionStorage.setItem('user-authkey' , 'a213d00ad5d1d16651c6a87be21d03d4')
  }

                                                //-------------------- Auth ----------------------------//

generateOTP(payload : any){
  return this.http.post(this.baseURL + 'otp/generate' , payload , {headers : this.header} )
}

verifyOTP(payload : any){
  return this.http.post(this.baseURL + 'otp/verify' , payload , {headers : this.header} )
}
                                              
jobSeekerRegister(payload : any ){
  return this.http.post(this.baseURL + 'job-seeker/register' , payload , {headers : this.header} )
}

// ---------------------------recuriter register--------------------------------
recuriterRegister(payload : any ){
  return this.http.post(this.baseURL + 'recruiter/register' , payload , {headers : this.header} )
}

generateEmailOTP(payload : any){
  return this.http.post(this.baseURL + 'otp/generate/mobile' , payload , {headers : this.header} )
}

verifyEmail(payload : any){
  return this.http.post(this.baseURL + 'otp/generate/mobile/verify' , payload , {headers : this.header} )
}

updateMobile(payload : any){
  return this.http.post(this.baseURL + 'otp/generate/mobile/update' , payload , {headers : this.header} )
}

                                                //-------------------------------------------------------//



  NotificationService(content : string , label : string , status : any ,autoClose : any) {
    this.alerts.open(content, { label: label , status: status, autoClose : autoClose }).subscribe();
  }

  search(payload : any){
    return this.http.get( this.baseURL + 'search' , payload)
  }

  recentSearch(){
    return this.http.get(this.baseURL + 'recent-search' , {headers : this.header} )
  }

  suggestionSearch(payload: any){
    return this.http.get(this.baseURL + 'job-suggestion-search' , payload )
  }

  locationSearch(payload: any){
    return this.http.get(this.baseURL + 'location-suggestion-search' , payload )
  }

  catagorySearch(payload: any){
    return this.http.get(this.baseURL + 'category-suggestion-search' , payload )
  }

  // generateOTP(payload : any){
  //   return this.http.post(this.baseURL + 'otp/generate' , payload , {headers : this.header} )
  // }

  // verifyOTP(payload : any){
  //   return this.http.post(this.baseURL + 'otp/verify' , payload , {headers : this.header} )
  // }

  // jobSeekerRegister(payload : any ){
  //   return this.http.post(this.baseURL + 'job-seeker/register' , payload , {headers : this.header} )
  // }

  blogCatagoriesSearch(){
    return this.http.get(this.baseURL + 'blog-categories' , {headers : this.header} )
  }

  blogListSearch(){
    return this.http.get(this.baseURL + 'blogs' , {headers : this.header} )
  }

  singleBlogSearch(payload : any){
    return this.http.get(this.baseURL + 'single-blog' , payload )
  }

  jobsByCategorySearch(){
    return this.http.get(this.baseURL + 'jobs-by-category' , {headers : this.header}  )
  }

  popularJobsSearch(){
    return this.http.get(this.baseURL + 'popular-jobs' , {headers : this.header}  )
  }

  // entitySearch(entityName : string ){
  //   let myObject = {
  //     "type" : entityName
  //   }
  //   let header = new HttpHeaders().set( "authKey", 'yPehu2u7yBe9eguuyAeAugeHaQynuRuyuvyp' );
  //   const httpParams: HttpParamsOptions = { fromObject: myObject } as HttpParamsOptions;
  //   const options = { params: new HttpParams(httpParams), headers: header };
  //   return this.http.get(this.baseURL + 'entity' , options )
  // }

  functionalAreaSearch(){
    let header = new HttpHeaders().set( "authKey", 'yPehu2u7yBe9eguuyAeAugeHaQynuRuyuvyp' );
    return this.http.get(this.baseURL + 'functional-areas' , {headers : header} )
  }


                                                //-------------------- Common ----------------------------//

  //-------------------- state ----------------------------//

  stateSearch(){
    return this.http.get(this.baseURL + 'get-all-states' , {headers : this.header}  )
  }

  citySearch(){
    return this.http.get(this.baseURL + 'get-all-cities' , {headers : this.header}  )
  }

  getLocationByPincode(payload : any){
    return this.http.get(this.baseURL + 'location-by-pincode' , payload  )
  }

  entitySearch(entityName : string ){
    let myObject = {
      "type" : entityName
    }
    let header = new HttpHeaders().set( "authKey", 'yPehu2u7yBe9eguuyAeAugeHaQynuRuyuvyp' );
    const httpParams: HttpParamsOptions = { fromObject: myObject } as HttpParamsOptions;
    const options = { params: new HttpParams(httpParams), headers: header };
    return this.http.get(this.baseURL + 'entity' , options )
  }

  institutesSearch(){
    let header = new HttpHeaders().set( "authKey", 'yPehu2u7yBe9eguuyAeAugeHaQynuRuyuvyp' );
    return this.http.get(this.baseURL + 'institutes' , {headers : header} )
  }

  schoolsSearch(){
    let header = new HttpHeaders().set( "authKey", 'yPehu2u7yBe9eguuyAeAugeHaQynuRuyuvyp' );
    return this.http.get(this.baseURL + 'schools'  )
  }

//--------------------------------------------------------------------------------------------------------------------------------------//


                                                //-------------------- job-seeker ----------------------------//

  //-------------------- Profile Summary ----------------------------//

  jobSeekerProfileSummarySearch(authkey : string){
    let header = new HttpHeaders().set( "authkey", authkey );
    return this.http.get(this.baseURL + 'job-seeker/profile-summary' , {headers : header}  )
  }

  jobSeekerProfileSummaryUpdate(payload : any){
    let userAuthkey = sessionStorage.getItem('user-authkey')
    let header
    if(userAuthkey){
      header = new HttpHeaders().set( "authkey", userAuthkey );
    }
    return this.http.post(this.baseURL + 'job-seeker/profile-summary/update' , payload ,  {headers : header} )
  }

  //-------------------- Certifications ----------------------------//

  jobSeekerCertificationSearch(authkey : string){
    let header = new HttpHeaders().set( "authkey", authkey );
    return this.http.get(this.baseURL + 'job-seeker/certifications' , {headers : header}  )
  }

  //-------------------- Preferred Jobs ----------------------------//

  jobSeekerPreferredJobsSearch(authkey : string){
    let header = new HttpHeaders().set( "authkey", authkey );
    return this.http.get(this.baseURL + 'job-seeker/preferred-job' , {headers : header}  )
  }

  //-------------------- Professional Details ----------------------------//

  jobSeekerProfessionalDetailsSearch(authkey : string){
    let header = new HttpHeaders().set( "authkey", authkey );
    return this.http.get(this.baseURL + 'job-seeker/professional-details' , {headers : header}  )
  }

  JobSeekerProfessionalDetailsUpdate(payload : any){
    let userAuthkey = sessionStorage.getItem('user-authkey')
    let header
    if(userAuthkey){
      header = new HttpHeaders().set( "authkey", userAuthkey );
    }
    return this.http.post(this.baseURL + 'job-seeker/professional-details/update' , payload ,  {headers : header} )
  }
  // function jobSeekerProfessionalDetailsUpdate(payload: any, any: any) {
  //   throw new Error('Function not implemented.');
  // }

  //-------------------- Educational Details ----------------------------//

  jobSeekerEducationalDetailsSearch(authkey : string){
    let header = new HttpHeaders().set( "authkey", authkey );
    return this.http.get(this.baseURL + 'job-seeker/educational-detail' , {headers : header}  )
  }

  jobSeekerEducationalDetailAdd(payload : any){
    let userAuthkey = sessionStorage.getItem('user-authkey')
    let header
    if(userAuthkey){
      header = new HttpHeaders().set( "authkey", userAuthkey );
    }
    return this.http.post(this.baseURL + 'job-seeker/educational-detail/store' , payload , {headers : header}  )
  }

  jobSeekerEducationalDetailsUpdate(payload : any){
    let userAuthkey = sessionStorage.getItem('user-authkey')
    let header
    if(userAuthkey){
      header = new HttpHeaders().set( "authkey", userAuthkey );
    }
    return this.http.post(this.baseURL + 'job-seeker/educational-detail/update' , payload , {headers : header}  )
  }

  jobSeekerEducationalDetailDelete(id :number){
    let userAuthkey = sessionStorage.getItem('user-authkey')
    let header
    if(userAuthkey){
      header = new HttpHeaders().set( "authkey", userAuthkey );
    }
    let myObject = {
      "id" : id
    }
    const httpParams: HttpParamsOptions = { fromObject: myObject } as HttpParamsOptions;
    const payload = { params: new HttpParams(httpParams), headers: header };
    return this.http.get(this.baseURL + 'job-seeker/educational-detail/delete' , payload  )
  }

  //-------------------- Basic Details ----------------------------//

  jobSeekerBasicDetailsSearch(authkey : string){
    let header = new HttpHeaders().set( "authkey", authkey );
    return this.http.get(this.baseURL + 'job-seeker/basic-details' , {headers : header}  )
  }

  jobSeekerBasicDetailsUpdate(payload : any){
    let userAuthkey = sessionStorage.getItem('user-authkey')
    let header
    if(userAuthkey){
      header = new HttpHeaders().set( "authkey", userAuthkey );
    }
    return this.http.post(this.baseURL + 'job-seeker/basic-details/update' , payload ,  {headers : header} )
  }

  //-------------------- Resume Update ----------------------------//

  jobSeekerResumeUpdate(payload : any){
    let userAuthkey = sessionStorage.getItem('user-authkey')
    let header
    if(userAuthkey){
      header = new HttpHeaders().set( "authkey", userAuthkey );
    }
    return this.http.post(this.baseURL + 'job-seeker/profile-resume/update' , payload ,  {headers : header} )
  }

  //-------------------- Personal Details ----------------------------//

  jobSeekerPersonalDetailsSearch(authkey : string){
    let header = new HttpHeaders().set( "authkey", authkey );
    return this.http.get(this.baseURL + 'job-seeker/personal-details' , {headers : header}  )
  }

  jobSeekerPersonalDetailsUpdate(payload : any){
    let userAuthkey = sessionStorage.getItem('user-authkey')
    let header
    if(userAuthkey){
      header = new HttpHeaders().set( "authkey", userAuthkey );
    }
    return this.http.post(this.baseURL + 'job-seeker/personal-details/update' , payload , {headers : header}  )
  }
}


