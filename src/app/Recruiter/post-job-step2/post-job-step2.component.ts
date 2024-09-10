import { Component, OnInit } from '@angular/core';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { RecruiterService } from '../recruiter.service';
import { JobTypeResponse, PostjobStep2, PostjobStep2Response, PreferdGender, PreferdGenderResponse, PreferdShift, PreferdShiftResponse, Workmode, WorkmodeResponse, postJobStep1 } from 'src/app/model/recruiter.modal';
import { JobType } from 'src/app/model/workassist.modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-job-step2',
  templateUrl: './post-job-step2.component.html',
  styleUrls: ['./post-job-step2.component.css']
})
export class PostJobStep2Component implements OnInit {
  // postJobStep1:any
  chk = '2'
  data = 0
  companyNameCondition: boolean = true;
  companyName: any;
  postjobstep2JobBasicDetailId: any
  jobTypeData !: Array<JobType>
  prferdShiftData !: Array<PreferdShift>
  preferdGenderData !: Array<PreferdGender>
  workMode !: Array<Workmode>
  postJobStep2Api !: Array<PostjobStep2>
  jobPostStage !: PostjobStep2
  postStageId: any
  secondStageId : string | null
  chkJobType !:''



  title = 'angular-template-ckeditor5-classic';
  public Editor = ClassicEditor;

  public onReady(editor: any) {
    // console.log("CKEditor5 Angular Component is ready to use!", editor);
  }
  public onChange({ editor }: any) {
    // let data = editor.getData();
    const data = editor.getData();
    this.postJobStep2.job_description = data

    // console.log(editor);
    console.log(this.postJobStep2.job_description);

  }

  changeFromParent() {
    this.data += 1;
  }

  constructor(private _service: RecruiterService, private router: Router) {
     
    this.secondStageId = sessionStorage.getItem('postjobStep-2_id')
    console.log('id2-------',this.secondStageId)
    if (this.secondStageId === this.secondStageId) {
    this.companyName = sessionStorage.getItem('companyName')

      this.postJobStep2 = this._service.getPostJobStep2();
      // console.log('second------', this.postJobStep2); 

      const data = this._service.getPostJobStep2();
      // this.chkJobType = data.job_types
      // console.log('second------', ...this.chkJobType); 

    
      
    }

  }

  ngDoCheck(): void {
    this.postjobstep2JobBasicDetailId = sessionStorage.getItem('postjobStep-1_id')
    this.postJobStep2.job_basic_detail_id = this.postjobstep2JobBasicDetailId
    // console.log(this.postJobStep1)
    this.companyName = sessionStorage.getItem('companyName')
    // this.postJobStep2.display_company_name = this.companyName
    this.postJobStep2.does_reveal_company_name = this.chk
    // console.log('idchk----', this.postJobStep2.does_reveal_company_name)

  }

  error = {
    "job_basic_detail_id": "",
    "does_reveal_company_name": "",
    "display_company_name": "",
    "primary_responsibilty": "",
    "job_description": "",

    "preferred_shift_id": [],
    "job_type_id": [],
    "work_place_id": [],
    "preferred_gender_id": [],
  }


  postJobStep2 = {
    "job_basic_detail_id": "",
    "does_reveal_company_name": "",
    "display_company_name": "",
    "primary_responsibilty": "",
    "job_description": "",

    "preferred_shift_id": [],
    "job_type_id": [],
    "work_place_id": [],
    "preferred_gender_id": [],
    "job_types":[],
    'preferred_gender':[],
    'preferred_shifts':[],
    'work_place_types':[]
  }


  chkUnchk() {
    this.chk = '1'
    this.companyNameCondition = !this.companyNameCondition; // Toggle the checkbox value

    if (this.companyNameCondition) {
      // If checkbox is checked, set value '1' to companyName
      this.chk = '1';
      this.postJobStep2.does_reveal_company_name = this.chk
      // this.postJobStep2.display_company_name = this.companyName


    } else {
      // If checkbox is unchecked, set value '2' to companyName
      this.chk = '2';
      this.postJobStep2.does_reveal_company_name = this.chk
      // this.postJobStep2.display_company_name = this.companyName

    }

  }

  isCheckboxCheckedJob(name:string): boolean {
    let checked : boolean = true
    let value = this.postJobStep2.job_types?.find((element) => element == name);
    if(value){
      checked = true
    }else{
      checked = false
    }
    return checked  
}

isCheckboxCheckedPreshift(name:string):boolean {
  let checked : boolean = true
  let value = this.postJobStep2.preferred_shifts?.find((element) => element == name);
  if(value){
    checked = true
  }else{
    checked = false
  }
  return checked
}

isCheckboxCheckedWorkMode(name:string):boolean {
  let checked : boolean = true
  let value = this.postJobStep2.work_place_types?.find((element) => element == name)
  if(value){
    checked = true
  }else{
    checked = false
  }
  return checked
}

isCheckboxcheckedPreferdGender(name:string):boolean {
  let checked : boolean = true
  let value = this.postJobStep2.preferred_gender?.find((element) => element == name)
  if(value){
    checked = true
  }else {
    checked = false
  }
  return checked

}

  jobArray: any = [];

  jobType(event: any) {
    const selectedValue = event.target.value;
    console.log(selectedValue,'job_type');

    // Push the selected value into jobArray
    this.jobArray.push(selectedValue);
    this.postJobStep2.job_type_id = this.jobArray
  

    console.log('Updated jobArray:', this.jobArray);
    
  }
  preShiftArray: any = [];

  preferdShift(event: any) {
    const selectedValue = event.target.value;
    console.log(selectedValue);

    // Push the selected value into jobArray
    this.preShiftArray.push(selectedValue);
    this.postJobStep2.preferred_shift_id = this.preShiftArray

    console.log('Updated jobArray:', this.preShiftArray);
  }

  preGenderArray: any = [];

  preferdGender(event: any) {
    const selectedValue = event.target.value;
    console.log(selectedValue);

    // Push the selected value into jobArray
    this.preGenderArray.push(selectedValue);
    this.postJobStep2.preferred_gender_id = this.preGenderArray

    console.log('Updated jobArray:', this.preGenderArray);
  }

  workModeArray: any = [];

  workModeEvent(event: any) {
    const selectedValue = event.target.value;
    console.log(selectedValue);

    // Push the selected value into jobArray
    this.workModeArray.push(selectedValue);
    this.postJobStep2.work_place_id = this.workModeArray

    console.log('Updated jobArray:', this.workModeArray);
  }


  ngOnInit() {

    const savedFormData = localStorage.getItem('formData');
    if (savedFormData) {
      // this.postJobStep1 = JSON.parse(savedFormData);
      // Populate your form fields using this.postJobStep1
    }
    this._service.entitySearch('job_type').subscribe((response: JobTypeResponse) => {
      this.jobTypeData = response.data as Array<JobType>
      // console.log(response);
    })
    this._service.entitySearch('preferred_shift').subscribe((response: PreferdShiftResponse) => {
      this.prferdShiftData = response.data as Array<PreferdShift>
      // console.log(response);
    })
    // this._service.entitySearch('work_place').subscribe((response: any) => {
    //   this.prferdShiftData = response.data as Array<PreferdShift>
    //   console.log(response);
    // })
    this._service.entitySearch('preferred_gender').subscribe((response: PreferdGenderResponse) => {
      this.preferdGenderData = response.data as Array<PreferdGender>
      // console.log(response);
    })
    this._service.entitySearch('work_mode').subscribe((response: WorkmodeResponse) => {
      this.workMode = response.data as Array<Workmode>
      // console.log(response);
    })
  }

  
  postJobStep1: any;
  backbtn(){
    this.router.navigate(['recruiter-postjob1'])
    this.postJobStep1 = this._service.getPostJobStep1();
    console.log('chksecond------',this.postJobStep1);
  }

  
  previewPost(){

      this.router.navigate(['recruiter-previewpost'])
    
   
    
  }

  saveButton() {
    console.log(this.postJobStep2)
    let payload = {
      "job_basic_detail_id": this.postJobStep2.job_basic_detail_id,
      "does_reveal_company_name": this.postJobStep2.does_reveal_company_name,
      "display_company_name": this.postJobStep2.display_company_name,
      "primary_responsibilty": this.postJobStep2.primary_responsibilty,
      "job_description": this.postJobStep2.job_description,

      "preferred_shift_id": this.postJobStep2.preferred_shift_id,
      "job_type_id": this.postJobStep2.job_type_id ,
      "work_place_id": this.postJobStep2.work_place_id,
      "preferred_gender_id": this.postJobStep2.preferred_gender_id
    }
    this._service.postJobStep2(payload).subscribe((response: any) => {
      // console.log(response)
      if (response.status == 200) {
        this.jobPostStage = response.data
        console.log(this.jobPostStage);
        this.postStageId = this.jobPostStage.job_post_stage
        sessionStorage.setItem('postJobStep2',JSON.stringify(this.jobPostStage))
        if (this.jobPostStage && typeof this.jobPostStage.id !== 'undefined') {
          const idString = String(this.jobPostStage.id); // Convert the number to a string
          sessionStorage.setItem('postjobStep-2_id', idString);
        }
        this._service.NotificationService(response.message , 'Update Successfully' , 'success', 5000)

        if (this.postStageId == 3) {
          this.router.navigate(['recruiter-postjob3'])

        }
      }
      if(response.status == 201){
        this._service.NotificationService(response.message , 'Fill dtata' , 'error', 5000)

        this.error = response.data
        console.log(this.error);
        
      }
    })

  }

}



// const storedData = sessionStorage.getItem('postJobStep3');
// if (storedData) {
//   this.getScreening = true
//   this.applyPostJobScreening = true
//   const parsedData = JSON.parse(storedData);

//   // this.questionnaire = parsedData;
//   // console.log(this.questionnaire,'----');
//   if (Array.isArray(parsedData)) {
//     this.data = parsedData;
//     console.log(this.questionnaire,'----');
//     if (this.data.length > 0) {
//       console.log(this.data[0].question, 'First Question');
//       console.log(this.data[0].type, 'First Type');
//       console.log(this.data[0].isMandate, 'First isMandate');
//     }
//     // Populate other relevant fields similarly
//   }
  

// }