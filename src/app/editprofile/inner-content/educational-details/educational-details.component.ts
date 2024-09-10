import { Component, Inject } from '@angular/core';
import { TuiDialogService, TuiDialogContext } from '@taiga-ui/core';
import { DataService } from 'src/app/service/data.service';
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus';
import { Course, CourseResponse, Institutes, InstitutesResponse, JobSeekerEducationalDetails, PassingYears, PassingYearsResponse, Qualification, QualificationResponse, Schools, SchoolsResponse, Specialization, SpecializationResponse } from 'src/app/model/workassist.modal';


@Component({
  selector: 'app-educational-details',
  templateUrl: './educational-details.component.html',
  styleUrls: ['./educational-details.component.css']
})
export class EducationalDetailsComponent {

  educationalDetails !: Array<JobSeekerEducationalDetails>
  qualification !: Array<Qualification>
  course !: Array<Course>
  specialization !: Array<Specialization>
  passing_years !: Array<PassingYears>
  institutes !: Array<Institutes>
  schools !: Array<Schools>
  // error={
  //   "date_of_birth" : "",
  //   "gender_name" : "",
  //   "marital_status" : "",
  //   "nationality" : "",
  //   "address_line_1" : "",
  //   "address_line_2" : "",
  //   "pincode" : "",
  //   "city_name" : "",
  //   "state_name" : "",
  //   "country_name" : "",
  //   "pan_number" : "",
  //   "alternate_email" : "",
  //   "alternate_mobile_number" : "",
  //   "linkedin" : "",
  //   "languages" : "",
  // }

  constructor(
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<null, Array<JobSeekerEducationalDetails>>,
    private dataService : DataService
  ){
    if(this.context.data){
      this.educationalDetails = this.context.data
    }
    if(!this.educationalDetails){
      this.educationalDetails = [] as Array<JobSeekerEducationalDetails>
    }
    console.log(this.context.data)
    this.dataService.entitySearch('qualification').subscribe((res:QualificationResponse)=>{
      console.log(res)
      this.qualification = res.data as Array<Qualification>
    })
    if(!this.qualification){
      this.qualification = [] as Array<Qualification>
    }
    this.dataService.entitySearch('course').subscribe((res:CourseResponse)=>{
      // console.log(res)
      this.course = res.data as Array<Course>
    })
    if(!this.course){
      this.course = [] as Array<Course>
    }
    this.dataService.entitySearch('specialization').subscribe((res:SpecializationResponse)=>{
      // console.log(res)
      this.specialization = res.data as Array<Specialization>
    })
    if(!this.specialization){
      this.specialization = [] as Array<Specialization>
    }
    this.dataService.entitySearch('passing_years').subscribe((res:PassingYearsResponse)=>{
      // console.log(res)
      this.passing_years = res.data as Array<PassingYears>
    })
    if(!this.passing_years){
      this.passing_years = [] as Array<PassingYears>
    }
    this.dataService.institutesSearch().subscribe((res:InstitutesResponse)=>{
      // console.log(res)
      this.institutes = res.data as Array<Institutes>
    })
    if(!this.institutes){
      this.institutes = [] as Array<Institutes>
    }
    this.dataService.schoolsSearch().subscribe((res:SchoolsResponse)=>{
      console.log(res)
      this.schools = res.data as Array<Schools>
    })
    if(!this.schools){
      this.schools = [] as Array<Schools>
    }
   }

   selectQualification(event : any , index : number){
    this.educationalDetails[index].qualification_id = event
   }

   selectCourse(event : any , index : number){
    this.educationalDetails[index].course_id = event
   }

   selectSpecialization(event : any , index : number){
    this.educationalDetails[index].specialization_id = event
   }

   selectPassingYears(event : any , index : number){
    this.educationalDetails[index].passing_year_id = event
   }

   selectInstitutes(event : any , index : number){
    this.educationalDetails[index].institute_id = event
   }

  addEducationalDetail(){
    // let payload = {
    //   "qualification_id": 1990,
    //   "course_id": 1430,
    //   "specialization_id": 80,
    //   "institute_id": 19,
    //   "passing_year_id": 1972,
    //   "does_current_pursuing": 0,
    //   "board_id": "",
    //   "school_id": "",
    // } 
    // this.dataService.jobSeekerEducationalDetailAdd(payload).subscribe(res=>{
    //   console.log(res)
    // })
    this.educationalDetails.push({} as JobSeekerEducationalDetails )
  }

  removeEducationalDetail(index : number){
    this.educationalDetails.splice(index , 1)
  }

  deleteEducationalDetail(index : number){
    let id = this.educationalDetails[index].id 
    if(id){
      this.dataService.jobSeekerEducationalDetailDelete(id).subscribe(res=>{
   
        console.log(res , ' suceesfully deleted')   
        
      })
    }

  }

  submit(): void {
    console.log(this.educationalDetails) 
    for (let index = 0; index < this.educationalDetails.length; index++) {
      const element = this.educationalDetails[index];
      this.dataService.jobSeekerEducationalDetailsUpdate(element).subscribe((res:any)=>{
        console.log(res)
        if(res.status == 200){
          if(index == (this.educationalDetails.length -1)){
          this.educationalDetails = []
          this.dataService.NotificationService('','Success.','success',3000)
          this.context.completeWith(null);
        }
      }
      if(res.status == 201){
        // this.error = res.data
      }

      })
      
    }
    // this.educationalDetails.forEach((element:JobSeekerEducationalDetails)=>{
    //   let payload = {
    //     id:                    element.id,
    //     qualification_id:      element.qualification_id,
    //     course_id:             element.course_id,
    //     specialization_id:     element.specialization_id,
    //     institute_id:          element.institute_id,
    //     passing_year_id:       element.passing_year_id,
    //     does_current_pursuing: element.does_current_pursuing,
    //     board_id:              element.board_id,
    //     school_id:             element.school_id
    // }


    // })
  }

  cancel(){
    this.educationalDetails = []
    this.context.completeWith(null);
  }

}