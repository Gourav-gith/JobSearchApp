import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { TuiRootModule, TuiDialogModule, TuiAlertModule, TUI_SANITIZER } from "@taiga-ui/core";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HeroComponent } from './homepage/hero/hero.component';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderComponent } from './homepage/header/header.component';

import { FooterComponent } from './homepage/footer/footer.component';
import { BlogComponent } from './homepage/blog/blog.component';
import { PopularJobsComponent } from './homepage/popular-jobs/popular-jobs.component';
import { JobsCategoryComponent } from './homepage/jobs-category/jobs-category.component';
import { RecruiterStepsComponent } from './homepage/recruiter-steps/recruiter-steps.component';
import { SeekerStepsComponent } from './homepage/seeker-steps/seeker-steps.component';
import { ResumeComponent } from './homepage/resume/resume.component';
import { SeekerheadComponent } from './seekerhome/seekerhead/seekerhead.component';
import { SeekerbodyComponent } from './seekerhome/seekerbody/seekerbody.component';
import { EditbodyComponent } from './editprofile/editbody/editbody.component';
import { ProfilebodyComponent } from './publicprofile/profilebody/profilebody.component';
import { JobseekersetComponent } from './seekersetting/jobseekerset/jobseekerset.component';
import { AdmindashComponent } from './Admin/admindash/admindash.component';
import { BlogListComponent } from './component/blogs/blog-list/blog-list.component';
import { IndividualBlogComponent } from './component/blogs/individual-blog/individual-blog.component';
import { AdminSideBarComponent } from './Admin/admin-side-bar/admin-side-bar.component';
import { BasicDetailsComponent } from './editprofile/inner-content/basic-details/basic-details.component';
import { SummaryComponent } from './editprofile/inner-content/summary/summary.component';
import { PersonalDetailsComponent } from './editprofile/inner-content/personal-details/personal-details.component';
import { HomepageComponent } from './component/homepage/homepage.component';
import { IndividualJobComponent } from './component/Jobs/individual-job/individual-job.component';
import { JoblistheadComponent } from './component/Jobs/joblisthead/joblisthead.component';
import { JoblistingComponent } from './component/Jobs/joblisting/joblisting.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AutocompleteLibModule } from "angular-ng-autocomplete";
import { UploadResumeComponent } from "./editprofile/inner-content/upload-resume/upload-resume.component";
import { SeekerRegisterComponent } from "./component/seeker-register/seeker-register.component";
import { NotificationDialogComponent } from './shared/dialog/notification-dialog/notification-dialog.component';
import { NumberFilterPipe } from "./pipes/numberPipes";
import { AlphabetFilterPipe } from "./pipes/alphabetPipe";
import { JobLocationFilterPipe } from "./pipes/jobLocationPipe";
import { CoursesComponent } from "./editprofile/inner-content/courses/courses.component";
import { EducationalDetailsComponent } from "./editprofile/inner-content/educational-details/educational-details.component";
import { EmploymentDetailsComponent } from "./editprofile/inner-content/employment-details/employment-details.component";
import { PreferredJobsComponent } from "./editprofile/inner-content/preferred-jobs/preferred-jobs.component";
import { ProDetailsComponent } from "./editprofile/inner-content/pro-details/pro-details.component";
import { RecruiterDashboardComponent } from './Recruiter/recruiter-dashboard/recruiter-dashboard.component';
import { RecruiterSidemenuComponent } from './Recruiter/recruiter-sidemenu/recruiter-sidemenu.component';
import { RecruiterRegisterComponent } from './Recruiter/recruiter-register/recruiter-register.component';
import { ProfileViewEditComponent } from './Recruiter/profile-view-edit/profile-view-edit.component';
import { ProfessionalDetailsComponent } from './Recruiter/professional-details/professional-details.component';
import { CompanyDetailsUpdateComponent } from './Recruiter/company-details-update/company-details-update.component';
import { AboutCompanyComponent } from './Recruiter/about-company/about-company.component';
import { OtpComponent } from "./component/otp/otp.component";
import { LoginComponent } from "./component/login/login.component";

import { UpdateMobileComponent } from './component/having-trouble/update-mobile/update-mobile.component';
import { VerifyEmailComponent } from './component/having-trouble/verify-email/verify-email.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { PostJobComponent } from './Recruiter/post-job/post-job.component';
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { PostJobStep1Component } from "./Recruiter/post-job-step1/post-job-step1.component";
import { PostJobStep2Component } from "./Recruiter/post-job-step2/post-job-step2.component";
import { PostJobStep3Component } from './Recruiter/post-job-step3/post-job-step3.component';
import { MAT_CHIPS_DEFAULT_OPTIONS, MatChipsModule } from "@angular/material/chips";
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatInputModule } from '@angular/material/input';
import { PreviewPostComponent } from './Recruiter/post-job-step2/preview-post/preview-post.component';
import { ManageJobsPageComponent } from './Recruiter/manage-jobs-page/manage-jobs-page.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { JobPreviewComponent } from './Recruiter/manage-jobs-page/job-preview/job-preview.component';
import { ManageCandidatesComponent } from './Recruiter/manage-candidates/manage-candidates.component';
import { CandidatesPreviewPageComponent } from "./Recruiter/candidates-preview-page/candidates-preview-page.component";
import { ReportsComponent } from './Recruiter/reports/reports.component';

// import { SeekerhomeComponent } from './seekerhome/seekerhome.component';



@NgModule({
  declarations: [
    AppComponent,
    HeroComponent,
    HeaderComponent,
    FooterComponent,
    BlogComponent,
    PopularJobsComponent,
    JobsCategoryComponent,
    RecruiterStepsComponent,
    SeekerStepsComponent,
    ResumeComponent,
    SeekerheadComponent,
    SeekerbodyComponent,
    EditbodyComponent,
    ProfilebodyComponent,
    JobseekersetComponent,
    JoblistingComponent,
    JoblistheadComponent,
    AdmindashComponent,
    IndividualJobComponent,
    BlogListComponent,
    IndividualBlogComponent,
    AdminSideBarComponent,
    BasicDetailsComponent,
    SummaryComponent,
    PersonalDetailsComponent,
    HomepageComponent,
    UploadResumeComponent,
    SeekerRegisterComponent,
    NotificationDialogComponent,
    CoursesComponent,
    EducationalDetailsComponent,
    EmploymentDetailsComponent,
    PreferredJobsComponent,
    ProDetailsComponent,
    // SeekerhomeComponent,
    NumberFilterPipe,
    AlphabetFilterPipe,
    JobLocationFilterPipe,
    RecruiterDashboardComponent,
    RecruiterSidemenuComponent,
    RecruiterRegisterComponent,
  
    RecruiterSidemenuComponent,
        ProfileViewEditComponent,
        ProfessionalDetailsComponent,
        CompanyDetailsUpdateComponent,
        AboutCompanyComponent,
        OtpComponent,
        LoginComponent,
    UpdateMobileComponent,
    VerifyEmailComponent,
    PostJobComponent,
    PostJobStep1Component,
    PostJobStep2Component,
    PostJobStep3Component,
    PreviewPostComponent,
    ManageJobsPageComponent,
    JobPreviewComponent,
    ManageCandidatesComponent,
    CandidatesPreviewPageComponent,
    ReportsComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
    AutocompleteLibModule,
    FormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    CKEditorModule,
    MatInputModule,
    MatChipsModule,
    NgxPaginationModule

],
  providers: [
    {provide: TUI_SANITIZER, useClass: NgDompurifySanitizer},
    {
      provide: MAT_CHIPS_DEFAULT_OPTIONS,
      useValue: {
        separatorKeyCodes: [COMMA, ENTER]
      }
    }
    // {provide: HTTP_INTERCEPTORS , useClass: AuthkeyInterceptor , multi : true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }



  