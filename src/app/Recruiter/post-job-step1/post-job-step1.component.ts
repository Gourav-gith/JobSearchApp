import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { RecruiterService } from '../recruiter.service';
import { CoreCompetency, CoreCompetencyElement, CoreCompetencyResponse, EducationalQualification, EducationalQualificationResponse, Experience, ExperienceResponse, FunctionalAreas, FunctionalAreasResponse, Industry, IndustryResponse, LeaderCompetency, LeaderCompetencyResponse, Location, LocationResponse, PreferdSkills, PreferdSkkilsResponse, WorkLevel, WorkLevelResponse, postJobStep1 } from 'src/app/model/recruiter.modal';
import { MatInputModule } from '@angular/material/input';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { inject} from '@angular/core';
import {MatChipEditedEvent, MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { Router } from '@angular/router';

export interface Fruit {
  name: string;
}



@Component({
  selector: 'app-post-job-step1',
  templateUrl: './post-job-step1.component.html',
  styleUrls: ['./post-job-step1.component.css']
})
export class PostJobStep1Component implements OnInit {
  // customRange:boolean = false
  ctcType = '1';
  postJob!: Array<postJobStep1>
  result: any
  industry!: Array<Industry>
  functionalArea !: Array<FunctionalAreas>
  selectedFunctionalArea: string = 'Select functional area';
  location !: Array<Location>
  experience !: Array<Experience>
  preferdSkills !: Array<PreferdSkills>
  workLevel !: Array<WorkLevel>
  onChangeWorkLevel!: any
  core !: Array<CoreCompetency>
  leaderShip !: Array<LeaderCompetency>
  educationalQualification !: Array<EducationalQualification>
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};

  selectedItemsCore = [];
  selectedItemsLeader = []
  selectedItemsLocation = [];
  dropdownSettingsLocation = {}
  dropdownSettingsCore = {}
  dropdownSettingsLeader = {}
  items!:[];
  jobPostStage:any
  firstStageId !: string | null
  showPlaceholder: boolean = true; 
  selectDropdown !: 'select field'



  postJobStep1 = {
  "job_title":"",
  "industry_id":"",
  "functional_area_id":"",
  "min_experience_id":"",
  "max_experience_id":"",
  "ctc_type":"",
  "min_ctc":"",
  "max_ctc":"",
  "educational_qualification_id":"",
  "num_open_position":"",
  'fixed_ctc':'',
  'job_post_stage':'',
  "job_location_id":[],
  "preferred_skill_id":[],
  "work_level_competency_id":0,
  "core_competency_id":[],
  "leadership_competency_id":[],
  "role_specific":[]
  }

  error = {
    "job_title":"",
    "industry_id":"",
    "functional_area_id":"",
    "min_experience_id":"",
    "max_experience_id":"",
    "ctc_type":"",
    "min_ctc":"",
    "max_ctc":"",
    "educational_qualification_id":"",
    "num_open_position":"",
    'fixed_ctc':'',
    "job_location_id":[],
    "preferred_skill_id":[],
    "work_level_competency_id":'',
    "core_competency_id":[],
    "leadership_competency_id":[],
    "role_specific":[]

  }

  public Editor = ClassicEditor;
  constructor(private _service: RecruiterService,public router:Router) {
    this.getCoreFromSession()
    
    // this.firstStageId = sessionStorage.getItem('postjobStep-1_id')
    // console.log('id-------',this.firstStageId)
    // if (this.firstStageId === this.firstStageId) {
    //   this.postJobStep1 = this._service.getPostJobStep1();
    //   console.log('chkfirst------', this.postJobStep1);  
    //   this.getLocationFromSession()
    // }
  }

  ngDoCheck(): void{
    this.fixed()
  }
  selectedLocation : Location[] = []
  getLocationFromSession(){
    let localArr : Location[] = []
    let flag = true
    // if(this.postJobStep1.job_location_id)
    for (let index = 0; index < this.postJobStep1.job_location_id?.length; index++) {
      const element = this.postJobStep1.job_location_id[index];
      if( index == (this.postJobStep1.job_location_id.length - 1) ){
        flag = true
      }
      // if(flag == false){
        this._service.location().subscribe((response: LocationResponse) => {
          response.data?.forEach((location:any)=>{
            if(location.id == element){
              localArr.push(location)
            }
          })      
          if(flag == true){
            setTimeout(() => {
              this.selectedLocation = localArr
              // console.log(this.selectedLocation)              
            }, 500);
          }
        })
        // }      
      }
  }


  selectedPreferdSkills : PreferdSkills[] = []
  getPreferdSkillsFromSession(){
    let localArr : Location[] = []
    let flag = true
    // if(this.postJobStep1.job_location_id)
    for (let index = 0; index < this.postJobStep1.preferred_skill_id?.length; index++) {
      const element = this.postJobStep1.preferred_skill_id[index];
      if( index == (this.postJobStep1.preferred_skill_id.length - 1) ){
        flag = true
      }
      // if(flag == false){
        this._service.entitySearch('skills').subscribe((response: PreferdSkkilsResponse) => {
          response.data?.forEach((skills:any)=>{
            if(skills.id == element){
              localArr.push(skills)
            }
          })      
          if(flag == true){
            setTimeout(() => {
              this.selectedPreferdSkills = localArr
              // console.log(this.selectedPreferdSkills)              
            }, 500);
          }
        })
        // }      
      }
  }

  
  selectedCore : CoreCompetency[] = []
  getCoreFromSession(){
    let localArr : CoreCompetency[] = []
    let flag = true
    if(this.postJobStep1.core_competency_id)
    for (let index = 0; index < this.postJobStep1.core_competency_id?.length; index++) {
      const element = this.postJobStep1.core_competency_id[index];
      if( index == (this.postJobStep1.core_competency_id.length - 1) ){
        flag = true
      }
      // if(flag == false){
        //  if(this.postJobStep1.work_level_competency_id == element){
          this._service.coreCompetency(this.postJobStep1.work_level_competency_id).subscribe((response: CoreCompetencyResponse) => {
            response.data?.forEach((core:any)=>{
              // console.log(core,'chk----')              
              if(core.id == element){
              localArr.push(core)
            }
          })      
          if(flag == true){
            setTimeout(() => {
              this.selectedCore = localArr
            }, 500);
          }
        })
      //  }
       
        // }      
      }
  }

  selectedLeaderShip : LeaderCompetency[] = []
  getLeaderShipFromSession(){
    let localArr : Location[] = []
    let flag = true
    // if(this.postJobStep1.job_location_id)
    for (let index = 0; index < this.postJobStep1.leadership_competency_id?.length; index++) {
      const element = this.postJobStep1.leadership_competency_id[index];
      if( index == (this.postJobStep1.leadership_competency_id.length - 1) ){
        flag = true
      }
      // if(flag == false){
        this._service.leaderShipCompetency(this.postJobStep1.work_level_competency_id).subscribe((response: LeaderCompetencyResponse) => {
          response.data?.forEach((leader:any)=>{
            if(leader.id == element){
              localArr.push(leader)
            }
          })      
          if(flag == true){
            setTimeout(() => {
              this.selectedLeaderShip = localArr
              // console.log(this.selectedLeaderShip)              
            }, 500);
          }
        })
        // }      
      }
  }




  public onReady(editor: any) {
    console.log("CKEditor5 Angular Component is ready to use!", editor);
  }

  public onChange({ editor }: ChangeEvent) {
    // const data = editor.getData();
    console.log(editor);
  }

  range() {
    // this.customRange = true
    this.ctcType = '2';
    this.postJobStep1.ctc_type = this.ctcType
    console.log(this.postJobStep1.ctc_type)

  }
  fixed() {
    // this.customRange = false
    this.ctcType = '1';
    this.postJobStep1.ctc_type = this.ctcType
    console.log(this.postJobStep1.ctc_type)
  }
  worklevel(event: any) {
    this.onChangeWorkLevel = event.target.value
    console.log(this.onChangeWorkLevel)
    this.getCoreFromSession()
    this._service.coreCompetency(this.onChangeWorkLevel).subscribe((response: CoreCompetencyResponse) => {
      console.log(response)
      this.core = response.data as Array<CoreCompetency>

    })
    this._service.leaderShipCompetency(this.onChangeWorkLevel).subscribe((response: LeaderCompetencyResponse) => {
      // console.log(response)
      this.leaderShip = response.data as Array<LeaderCompetency>


    })

  }
  onChangeEvent(event:any){
    this.postJobStep1.work_level_competency_id = event.target.value
    console.log(this.postJobStep1.work_level_competency_id);
  this.getCoreFromSession()


  }
  onChangeEventIndustry(event:any){
    this.postJobStep1.industry_id = event.target.value
    if (this.postJobStep1.industry_id) {
      this.showPlaceholder = false; // Hide placeholder if industry is selected
    } else {
      this.showPlaceholder = true; // Show placeholder if "Select Industry" is chosen
    }
    
  }
  onChangeEventFunctinalArea(event:any){
    this.postJobStep1.functional_area_id = event.target.value

  }
  onChangeEventMinMax(event:any , type:string){
    // this.postJobStep1.min_experience_id = event.target.value
    // this.postJobStep1.max_experience_id = event.target.value

    const selectedValue = event.target.value;
    if (type === 'min') {
      this.postJobStep1.min_experience_id = selectedValue;
      console.log(this.postJobStep1.min_experience_id);
      
    } else if (type === 'max') {
      this.postJobStep1.max_experience_id = selectedValue;
      console.log(this.postJobStep1.max_experience_id);
      
    }
  }
  onChangeEventEducational(event:any){
    this.postJobStep1.educational_qualification_id = event.target.value
  }

  ngOnChanges(changes: SimpleChanges): void{
    this.ctcType = '1';
}


  ngOnInit() {
    this.fixed()
    console.log(this.onChangeWorkLevel)


    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.dropdownSettingsLocation = {
      singleSelection: false,
      idField: 'id',
      textField: 'city_name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.dropdownSettingsCore = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.dropdownSettingsLeader = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };


    this._service.entitySearch('industry').subscribe((response: IndustryResponse) => {
      // console.log(response)
      this.industry = response.data as Array<Industry>

    })
    this._service.entitySearch('qualification').subscribe((response:EducationalQualificationResponse)=>{
      // console.log(response)
      this.educationalQualification = response.data as Array<EducationalQualification>

    })
    this._service.functionalAreaSearch('functinoalarea').subscribe((response: FunctionalAreasResponse) => {
      // console.log(response)
      this.functionalArea = response.data as Array<FunctionalAreas>

    })
    this._service.location().subscribe((response: LocationResponse) => {
      // console.log(response)
      this.location = response.data as Array<Location>
      this._service.locationList = response.data as Array<Location>
    })
    this._service.experience('experience').subscribe((response: ExperienceResponse) => {
      // console.log(response)
      this.experience = response.data as Array<Experience>

    })
    this._service.entitySearch('skills').subscribe((response: PreferdSkkilsResponse) => {
      // console.log(response)
      this.preferdSkills = response.data as Array<PreferdSkills>
    })
    this._service.workLevel().subscribe((response: WorkLevelResponse) => {
      // console.log(response)
      this.workLevel = response.data as Array<WorkLevel>

    })


this.firstStageId = sessionStorage.getItem('postjobStep-1_id')
console.log('id-------',this.firstStageId)
if (this.firstStageId === this.firstStageId) {
  this.postJobStep1 = this._service.getPostJobStep1();
  console.log('chkfirst------', this.postJobStep1);  
  this.getLocationFromSession()
  this.getPreferdSkillsFromSession()
  this.getCoreFromSession()
  this.getLeaderShipFromSession()
}

  }


  selectLocation:any = []
  onItemSelectLocation(item:any) {
    this.selectLocation.push(item.id)
    this.postJobStep1.job_location_id = this.selectLocation
    console.log('locationId---',this.postJobStep1.job_location_id);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  preferdKeySkills:any = []
  onItemSelectPreferdKey(item:any){
    this.preferdKeySkills.push(item.id)
    this.postJobStep1.preferred_skill_id = this.preferdKeySkills
    console.log(' this.postJobStep1.preferred_skill_id', this.postJobStep1.preferred_skill_id);
    
  }
  

  coreCompetency:any = []
  onItemSelectCore(item:any){
    this.coreCompetency.push(item.id)
    this.postJobStep1.core_competency_id = this.coreCompetency
    console.log('this.postJobStep1.core_competency_id',this.postJobStep1.core_competency_id);
    
  }
  leaderShipCompetency:any = []
  onItemSelectleadership(item:any){
    this.leaderShipCompetency.push(item.id)
    this.postJobStep1.leadership_competency_id = this.leaderShipCompetency
    console.log('this.postJobStep1.leadership_competency_id',this.postJobStep1.leadership_competency_id);
    

  }

  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER];
  roleSpecific:any = [];

  announcer = inject(LiveAnnouncer);

  add(event: MatChipInputEvent): void {
    console.log(event,'event-----');
    
    const value = (event.value || '').trim();

    if (value) {
      this.roleSpecific.push(value);
      this.postJobStep1.role_specific = this.roleSpecific
      console.log(this.postJobStep1.role_specific)
    }
    if (event.input) {
      event.input.value = '';
    }

  }


  saveContinue(){
    console.log(this.postJobStep1)
    let payload = {
      'job_title':this.postJobStep1.job_title,
      'industry_id':this.postJobStep1.industry_id,
      'functional_area_id':this.postJobStep1.functional_area_id,
      'min_experience_id':this.postJobStep1.min_experience_id,
      'max_experience_id':this.postJobStep1.max_experience_id,
      'ctc_type':this.postJobStep1.ctc_type,
      'min_ctc':this.postJobStep1.min_ctc,
      'max_ctc':this.postJobStep1.max_ctc,
      'fixed_ctc':this.postJobStep1.fixed_ctc,
      'educational_qualification_id':this.postJobStep1.educational_qualification_id,
      'num_open_position':this.postJobStep1.num_open_position,
      'job_location_id':this.postJobStep1.job_location_id,
      'preferred_skill_id':this.postJobStep1.preferred_skill_id,
      'work_level_competency_id':this.postJobStep1.work_level_competency_id,
      'core_competency_id':this.postJobStep1.core_competency_id,
      'leadership_competency_id':this.postJobStep1.leadership_competency_id,
      'role_specific':this.postJobStep1.role_specific
    }
    this._service.PostJobStep1(payload).subscribe((response:any)=>{
              console.log(response)
              if (response.status === 200) {
                this.jobPostStage = response.data[0]
                this._service.NotificationService(response.message,'Update successful' , 'success' , 5000)

                sessionStorage.setItem('postjobStep-1_id',this.jobPostStage.id)
                localStorage.setItem('formData', JSON.stringify(this.postJobStep1));
                sessionStorage.setItem('postJobStep1',JSON.stringify(this.postJobStep1))
                this.postJobStep1.job_post_stage = this.jobPostStage.job_post_stage
                if (this.postJobStep1.job_post_stage === this.jobPostStage.job_post_stage) {
                  this.router.navigate(['/recruiter-postjob2'])
                  // this.postJobStep1 = this._service.getPostJobStep1();
                  // console.log('chkfirst------',this.postJobStep1);
            
                }
              
                console.log(this.postJobStep1.job_post_stage,'chk------')
                if(this.postJobStep1.job_post_stage = this.jobPostStage.job_post_stage){
                  this.router.navigate(['/recruiter-postjob2'])

                }
                
              } else if (response.status === 201) {
                this._service.NotificationService(response.message,'Fill data' , 'error' , 5000)

                this.error = response.data
                console.error('Error:', response);
                // Handle error here for status 201
              }

          })
  }

}




 