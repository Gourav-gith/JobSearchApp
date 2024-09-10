import { Component, Inject, Injector } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus'; 
import { TuiDialogService } from '@taiga-ui/core';
import { BasicDetailsComponent } from '../inner-content/basic-details/basic-details.component';
import { SummaryComponent } from '../inner-content/summary/summary.component';
import { PersonalDetailsComponent } from '../inner-content/personal-details/personal-details.component';
import { EducationalDetailsComponent } from '../inner-content/educational-details/educational-details.component';
import { ProDetailsComponent } from '../inner-content/pro-details/pro-details.component';
import { CoursesComponent } from '../inner-content/courses/courses.component';
import { EmploymentDetailsComponent } from '../inner-content/employment-details/employment-details.component';
import { PreferredJobsComponent } from '../inner-content/preferred-jobs/preferred-jobs.component';
import { UploadResumeComponent } from '../inner-content/upload-resume/upload-resume.component';
import { Router } from '@angular/router';
import { JobSeekerSummaryProfileResponce, JobSeekerCertifications, JobSeekerPreferredJobsResponce, JobSeekerEducationalDetails, JobSeekerBasicDetailsResponce, JobSeekerPersonalDetailsResponce, JobSeekerCertificationsResponce, JobSeekerEducationalDetailsResponce, JobSeekerBasicDetails, JobSeekerSummaryProfile, JobSeekerPersonalDetails, JobSeekerProfessionalDetailsResponce } from 'src/app/model/workassist.modal';

@Component({
  selector: 'app-editbody',
  templateUrl: './editbody.component.html',
  styleUrls: ['./editbody.component.css']
})
export class EditbodyComponent {

  authKey = 'a213d00ad5d1d16651c6a87be21d03d4'

  jobSeekerSummaryProfile !: JobSeekerSummaryProfileResponce
  jobSeekercertifications !: Array<JobSeekerCertifications>
  jobSeekerPreferredJobs !: JobSeekerPreferredJobsResponce
  jobSeekerProfessionalDetails !: JobSeekerProfessionalDetailsResponce
  jobSeekerEducationalDetails !: Array<JobSeekerEducationalDetails>
  jobSeekerBasicDetails !: JobSeekerBasicDetailsResponce
  jobSeekerPersonalDetails !: JobSeekerPersonalDetailsResponce



  constructor(
    private dataService : DataService,
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector, 
    private router : Router
  ){
    if(!this.jobSeekerSummaryProfile){
      this.jobSeekerSummaryProfile = {} as JobSeekerSummaryProfileResponce
    }
    if(!this.jobSeekercertifications){
      this.jobSeekercertifications = [] as Array<JobSeekerCertifications>
    }
    if(!this.jobSeekerPreferredJobs){
      this.jobSeekerPreferredJobs = {} as JobSeekerPreferredJobsResponce
    }
    if(!this.jobSeekerProfessionalDetails){
      this.jobSeekerProfessionalDetails = {} as JobSeekerProfessionalDetailsResponce
    }
    if(!this.jobSeekerEducationalDetails){
      this.jobSeekerEducationalDetails = [] as Array<JobSeekerEducationalDetails>
    }
    if(!this.jobSeekerBasicDetails){
      this.jobSeekerBasicDetails = {} as JobSeekerBasicDetailsResponce
    }
    if(!this.jobSeekerPersonalDetails){
      this.jobSeekerPersonalDetails = {} as JobSeekerPersonalDetailsResponce
    }
  }

  ngOnInit(){
    this.dataService.jobSeekerProfileSummarySearch(this.authKey).subscribe((res:JobSeekerSummaryProfileResponce)=>{
      this.jobSeekerSummaryProfile = res
    })
    this.dataService.jobSeekerCertificationSearch(this.authKey).subscribe((res:JobSeekerCertificationsResponce)=>{
      this.jobSeekercertifications = res.data as Array<JobSeekerCertifications>
    })
    this.dataService.jobSeekerPreferredJobsSearch(this.authKey).subscribe((res:JobSeekerPreferredJobsResponce)=>{
      this.jobSeekerPreferredJobs = res 
    })
    this.dataService.jobSeekerProfessionalDetailsSearch(this.authKey).subscribe((res:JobSeekerProfessionalDetailsResponce)=>{
      this.jobSeekerProfessionalDetails = res 
      console.log(res)
    })
    this.dataService.jobSeekerEducationalDetailsSearch(this.authKey).subscribe((res:JobSeekerEducationalDetailsResponce)=>{
      this.jobSeekerEducationalDetails = res.data as Array<JobSeekerEducationalDetails>
    })
    this.dataService.jobSeekerBasicDetailsSearch(this.authKey).subscribe((res:JobSeekerBasicDetailsResponce)=>{
      this.jobSeekerBasicDetails = res
    })
    this.dataService.jobSeekerPersonalDetailsSearch(this.authKey).subscribe((res:JobSeekerPersonalDetailsResponce)=>{
      this.jobSeekerPersonalDetails = res
    })
  }





  private basicDetailsDialog = this.dialogs.open<JobSeekerBasicDetails>(new PolymorpheusComponent(BasicDetailsComponent, this.injector));

  basicDetailsPage() {
    this.basicDetailsDialog = this.dialogs.open<JobSeekerBasicDetails>(
      new PolymorpheusComponent(BasicDetailsComponent, this.injector),
      {
        data: this.jobSeekerBasicDetails.data,
        dismissible: false,
        closeable: false,
        size: 'page'
      },
    );    
    this.basicDetailsDialog.subscribe({
      next: (data: any) => { 
        this.ngOnInit()
      },
      complete: () => { },
    });
  }

  //-------------------------------------------- Summary profile -------------------------------------------------//

  private summaryDialog = this.dialogs.open<JobSeekerSummaryProfile>(new PolymorpheusComponent(SummaryComponent, this.injector));

  summaryPage() {
    this.summaryDialog = this.dialogs.open<JobSeekerSummaryProfile>(
      new PolymorpheusComponent(SummaryComponent, this.injector),
      {
        data: this.jobSeekerSummaryProfile.data,
        dismissible: false,
        closeable: false,
        size: 'page'
      },
    );
    this.summaryDialog.subscribe({
      next: (data: any) => {
        this.ngOnInit()
       },
      complete: () => { },
    });
  }

  //-------------------------------------------- Resume Upload -------------------------------------------------//

  private uploadResumeDialog = this.dialogs.open<null>(new PolymorpheusComponent(UploadResumeComponent, this.injector));

  uploadResumePage() {
    this.uploadResumeDialog = this.dialogs.open<null>(
      new PolymorpheusComponent(UploadResumeComponent, this.injector),
      {
        data: {},
        dismissible: false,
        closeable: false,
        size: 'page'
      },
    );
    this.uploadResumeDialog.subscribe({
      next: (data: any) => {
        this.ngOnInit()
       },
      complete: () => { },
    });
  }

  //-------------------------------------------- Personal Details -------------------------------------------------//

  private personalDetailsDialog = this.dialogs.open<JobSeekerPersonalDetails>(new PolymorpheusComponent(PersonalDetailsComponent, this.injector));

  personalDetailsPage() {
    this.personalDetailsDialog = this.dialogs.open<JobSeekerPersonalDetails>(
      new PolymorpheusComponent(PersonalDetailsComponent, this.injector),
      {
        data: this.jobSeekerPersonalDetails.data,
        dismissible: false,
        closeable: false,
        size: 'page'
      },
    );
    this.personalDetailsDialog.subscribe({
      next: (data: any) => { 
        this.ngOnInit()
      },
      complete: () => { },
    });
  }

  //-------------------------------------------- Educational Details -------------------------------------------------//

  private educationalDetailsDialog = this.dialogs.open<Array<JobSeekerEducationalDetails>>(new PolymorpheusComponent(EducationalDetailsComponent, this.injector));

  educationalDetailsPage() {
    this.educationalDetailsDialog = this.dialogs.open<Array<JobSeekerEducationalDetails>>(
      new PolymorpheusComponent(EducationalDetailsComponent, this.injector),
      {
        data: this.jobSeekerEducationalDetails,
        dismissible: false,
        closeable: false,
        size: 'page'
      },
    );
    this.educationalDetailsDialog.subscribe({
      next: (data: any) => {
        this.ngOnInit()
       },
      complete: () => { },
    });
  }

    //-------------------------------------------- Professional Details -------------------------------------------------//

  private professionalDetailsDialog = this.dialogs.open<any>(new PolymorpheusComponent(ProDetailsComponent, this.injector));

  professionalDetailsPage() {
    this.professionalDetailsDialog = this.dialogs.open<any>(
      new PolymorpheusComponent(ProDetailsComponent, this.injector),
      {
        data: this.jobSeekerProfessionalDetails.data,
        dismissible: false,
        closeable: false,
        size: 'page'
      },
    );
    this.professionalDetailsDialog.subscribe({
      next: (data: any) => {
        this.ngOnInit()
       },
      complete: () => { },
    });
  }

    //-------------------------------------------- Courses/Certification Details -------------------------------------------------//


  private courseCertificationsDialog = this.dialogs.open<number>(
    new PolymorpheusComponent(CoursesComponent, this.injector),
    {
      data: {},
      dismissible: false,
      closeable: false,
      size: 'page'
    },
  );

  courseCertificationsPage() {
    this.courseCertificationsDialog.subscribe({
      next: (data: any) => { },
      complete: () => { },
    });
  }

  //-------------------------------------------- Employment Details -------------------------------------------------//

  private employmentDetailsDialog = this.dialogs.open<number>(
    new PolymorpheusComponent(EmploymentDetailsComponent, this.injector),
    {
      data: {},
      dismissible: false,
      closeable: false,
      size: 'page'
    },
  );

  employmentDetailsPage() {
    this.employmentDetailsDialog.subscribe({
      next: (data: any) => { },
      complete: () => { },
    });
  }

  //-------------------------------------------- Preferred Details -------------------------------------------------//

  private preferredJobsDialog = this.dialogs.open<number>(
    new PolymorpheusComponent(PreferredJobsComponent, this.injector),
    {
      data: {},
      dismissible: false,
      closeable: false,
      size: 'page'
    },
  );

  preferredJobsPage() {
    this.preferredJobsDialog.subscribe({
      next: (data: any) => { },
      complete: () => { },
    });
  }

  

}
