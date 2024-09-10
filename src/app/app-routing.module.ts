import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './component/homepage/homepage.component';
// import { LoginComponent } from './component/login/login.component';
// import { OtpComponent } from './component/otp/otp.component';
import { JoblistingComponent } from './component/Jobs/joblisting/joblisting.component';
import { IndividualJobComponent } from './component/Jobs/individual-job/individual-job.component';
import { SeekerRegisterComponent } from './component/seeker-register/seeker-register.component';
import { SeekerbodyComponent } from './seekerhome/seekerbody/seekerbody.component';
import { IndividualBlogComponent } from './component/blogs/individual-blog/individual-blog.component';
import { RecruiterDashboardComponent } from './Recruiter/recruiter-dashboard/recruiter-dashboard.component';
import { RegistraionComponent } from './Surya-UI-Pages/registration-from/registraion/registraion.component';
import { EditProfileComponent } from './Surya-UI-Pages/edit-profile/edit-profile.component';
import { RecruiterRegisterComponent } from './Recruiter/recruiter-register/recruiter-register.component';
import { ProfileViewEditComponent } from './Recruiter/profile-view-edit/profile-view-edit.component';
import { authGuard } from './auth.guard';
import { EditbodyComponent } from './editprofile/editbody/editbody.component';
import { ProfilebodyComponent } from './publicprofile/profilebody/profilebody.component';
import { LoginComponent } from './component/login/login.component';
import { OtpComponent } from './component/otp/otp.component';
import { ProfessionalDetailsModelComponent } from './Surya-UI-Pages/professional-details-model/professional-details-model.component';

import { UpdateMobileComponent } from './component/having-trouble/update-mobile/update-mobile.component';
import { VerifyEmailComponent } from './component/having-trouble/verify-email/verify-email.component';
import { PostJobComponent } from './Recruiter/post-job/post-job.component';
import { PostJobStep1Component } from './Recruiter/post-job-step1/post-job-step1.component';
import { PostJobStep2Component } from './Recruiter/post-job-step2/post-job-step2.component';
import { PostJobStep3Component } from './Recruiter/post-job-step3/post-job-step3.component';
import { PreviewPostComponent } from './Recruiter/post-job-step2/preview-post/preview-post.component';
import { ManageJobsPageComponent } from './Recruiter/manage-jobs-page/manage-jobs-page.component';
import { JobPreviewComponent } from './Recruiter/manage-jobs-page/job-preview/job-preview.component';
import { ManageCandidatesComponent } from './Recruiter/manage-candidates/manage-candidates.component';
import { CandidatesPreviewPageComponent } from './Recruiter/candidates-preview-page/candidates-preview-page.component';
import { ReportsComponent } from './Recruiter/reports/reports.component';

const routes: Routes = [
  // {path: '' , pathMatch: 'full' , redirectTo : 'home'},
  // {path:'home', children:[
    // {path: '' , pathMatch: 'full' , redirectTo : 'header'},
    {path:'',component:HomepageComponent},      
    {path:'login',component:LoginComponent},      
    {path:'otp',component:OtpComponent} ,     
    {path:'verify-email',component:VerifyEmailComponent} ,     
    {path:'update-mobile',component:UpdateMobileComponent} ,     
    {path:'job-seeker-register',component:SeekerRegisterComponent} ,     
  // ]} ,

  {path:'seeker-dashboard',component:SeekerbodyComponent} ,     
  {path:'seeker-profile',component:EditbodyComponent},      
  {path:'public-profile',component:ProfilebodyComponent},      
  {path:'search-jobs/:id',component:JoblistingComponent} ,     
  {path:'individual-job',component:IndividualJobComponent},     
  {path:'individual-blog/:id',component:IndividualBlogComponent},  
  
  {path:'recruiter-register',component:RecruiterRegisterComponent},
  {path:'recruiter-dashboard',component:RecruiterDashboardComponent} ,
  {path:'recuiter-viewEdit',component:ProfileViewEditComponent},
  {path:'recuiter-edit-model',component:ProfessionalDetailsModelComponent},
  
  {path:'recruiter-postjob1',component:PostJobStep1Component},
  {path:'recruiter-postjob2',component:PostJobStep2Component},
  {path:'recruiter-previewpost',component:PreviewPostComponent},
  {path:'recruiter-postjob3',component:PostJobStep3Component},
  {path:'recruiter-manage-jobs',component:ManageJobsPageComponent},
  {path:'recruiter-job-preview/:id',component:JobPreviewComponent},
  {path:'recruiter-manage-candidate/:id',component:ManageCandidatesComponent},
  {path:'recruiter-candidates-preview-page',component:CandidatesPreviewPageComponent},
  {path:'recruiter-reports',component:ReportsComponent}

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
