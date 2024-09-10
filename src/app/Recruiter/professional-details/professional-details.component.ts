import { Component, Inject, Input, OnInit } from '@angular/core';
import { RecruiterService } from '../recruiter.service';
import { ProfessionalDetails, ProfessionalDetailsResponse } from 'src/app/model/recruiter/companydetails';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { DataService } from 'src/app/service/data.service';


@Component({
  selector: 'app-professional-details',
  templateUrl: './professional-details.component.html',
  styleUrls: ['./professional-details.component.css']
})
export class ProfessionalDetailsComponent implements OnInit {
  professionalDetails!: ProfessionalDetails
  image_path: any;
  flag: boolean = false

  @Input() companyName: any

  error = {
    "first_name": '',
    "last_name": '',
    "email": '',
    "mobile_number": '',
    "job_role": '',
    "company_name": '',
    "address_line_1": '',
    "pincode": '',
    "city_id": '',
    "state_id": '',
    "country_id": '',
    "recruiter_id": '',
    "profile_image": ''
  }



  constructor(private service: RecruiterService,
              private dataService:DataService,
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<null, ProfessionalDetails>) {

    if (context.data) {
      this.professionalDetails = this.context.data
    }

  }
  ngDoCheck(){
    console.log('ngonit---', this.companyName)

  }


  ngOnInit() {
    console.log(this.context.data)
    
  }

  
  pinCodechange(e: any) {
    console.log(e.target.value)
    let val = e.target.value
    if (val) {
      this.service.pinCode(val).subscribe((res: any) => {
        console.log(res)
        console.log(res.data.pinCode)
        this.professionalDetails.city_id = res.data.city_id
        this.professionalDetails.state_id = res.data.state_id
        this.professionalDetails.city_name = res.data.city_name
        this.professionalDetails.state_name = res.data.state_name
        this.professionalDetails.country_id = res.data.country_id
        this.professionalDetails.country_name = res.data.country_name
      })


    }
  }


  profilePicture(event: any) {
    this.flag = true
    let file = event.target.files[0]
    console.log(file, 'event---')
    let reader = new FileReader()
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0]
      reader.readAsDataURL(file)
      reader.onload = () => {

        this.image_path = reader.result as string;

        console.log(file)
      }
      this.professionalDetails.profile_image = file
    }



  }

  submit() {
    let payload = new FormData()
    if (this.professionalDetails.first_name) {
      payload.append('first_name', this.professionalDetails.first_name)
    }
    if (this.professionalDetails.middle_name) {
      payload.append('middle_name', this.professionalDetails.middle_name)
    }
    if (this.professionalDetails.last_name) {
      payload.append('last_name', this.professionalDetails.last_name)
    }
    if (this.professionalDetails.email) {
      payload.append('email', this.professionalDetails.email)
    }
    if (this.professionalDetails.mobile_number) {
      payload.append('mobile_number', this.professionalDetails.mobile_number)
    }
    if (this.professionalDetails.job_role) {
      payload.append("job_role", this.professionalDetails.job_role)
    }
    // if(this.professionalDetails.company_name){
    //   payload.append("company_name",this.professionalDetails.company_name)
    // }
    if (this.professionalDetails.address_line_1) {
      payload.append("address_line_1", this.professionalDetails.address_line_1)
    }
    if (this.professionalDetails.pincode) {
      payload.append("pincode", this.professionalDetails.pincode)
    }
    if (this.professionalDetails.city_id) {
      payload.append("city_id", this.professionalDetails.city_id)
    }
    if (this.professionalDetails.state_id) {
      payload.append("state_id", this.professionalDetails.state_id)
    }
    if (this.professionalDetails.country_id) {
      payload.append('country_id', this.professionalDetails.country_id)
    }
    // if(this.professionalDetails.recruiter_id){
    //   payload.append('recruiter_id',this.professionalDetails.recruiter_id)
    // }
    if (this.flag) {
      if (this.professionalDetails.profile_image) {
        payload.append('profile_image', this.professionalDetails.profile_image)
        console.log('upload')

      }

    } else {
      console.log('blank img--')

    }
    if (this.professionalDetails.profile_summary) {
      payload.append('profile_summary', this.professionalDetails.profile_summary)
    }
    this.service.professionalDetailsUpdate(payload).subscribe((res: any) => {
      
      console.log(res)
      if (res.status == 200) {
        this.dataService.NotificationService(res.message,'Update successful' , 'success' , 5000)
        this.professionalDetails = {}
        this.context.completeWith(null)
      }
      if (res.status == '201') {
        this.dataService.NotificationService(res.message,'Fill data' , 'error' , 5000)
        this.error = res.data
      }
    })

  }

  cancel() {
    this.professionalDetails = {}
    this.context.completeWith(null);
  }


}
