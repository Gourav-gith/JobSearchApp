import { Component, Inject, OnInit } from '@angular/core';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { RecruiterService } from '../recruiter.service';
import { Companydetail, IndustryServe } from 'src/app/model/recruiter/companydetails';
import { DataService } from 'src/app/service/data.service';
// import { IDropdownSettings } from 'ng-multiselect-dropdown';


export interface DropdownSettings {
  singleSelection: boolean;
  idField: string;
  textField: string;
  selectAllText: string;
  unSelectAllText: string;
  itemsShowLimit: number;
  allowSearchFilter: boolean;
}

@Component({
  selector: 'app-company-details-update',
  templateUrl: './company-details-update.component.html',
  styleUrls: ['./company-details-update.component.css']
})


export class CompanyDetailsUpdateComponent implements OnInit {
  companyDetails!: Companydetail;
  entityResult!: [];
  dropdownList = [];
  selectedItems = [];
  dropdownSettings !: DropdownSettings;

  image_path:any
  flag:boolean = false
  flagYear:boolean = false
  panDocument: boolean = false
  gstDocument : boolean = false

  companyName !:string

selectedPanDocument: File | null = null;



  constructor(@Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<null, Companydetail>,
    private service: RecruiterService,
    private dataService: DataService) {
    console.log(this.context.data)

    if (context.data) {
      this.companyDetails = context.data
    }
    if (!this.companyDetails?.industry_serves) {
      this.companyDetails.industry_serves = [] as Array<IndustryServe>
    }
    if (!this.companyDetails?.industry_serves) {
      this.companyDetails.industry_serves.push({} as IndustryServe)
    }
    sessionStorage.getItem('companyName')
    console.log('dgdgdg--',sessionStorage.getItem('companyName'))

  }

  error = {
    'company_name': '',
    'email': '',
    'website_url': '',
    'address_line_1': '',
    'pincode': '',
    'city_id': '',
    'state_id': '',
    'country_id': '',
    'pan_number': '',
    'company_type_id': '',
    'cin_number': '',
    'company_size': '',
    'linkedin_url': '',
    'recruiter_id': '',
    'pan_document': '',
    'gst_document': '',
    'industry_serve_id': ''

  }

  ngOnInit(): void {
    console.log(this.companyDetails.pan_document)

 

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };


    this.dataService.entitySearch('industry').subscribe((res: any) => {
      this.entityResult = res.data
      // console.log(this.entityResult, 'result---')

    })

  }
  
  ngDoCheck() {
    sessionStorage.getItem('companyName')
    console.log('dgdgdg--',sessionStorage.getItem('companyName'))
    
  }

  arr: any = [];
  onItemSelect(item: any) {
    this.arr?.push(item)
    this.companyDetails.industry_serves = this.arr
    // console.log(this.companyDetails.industry_serves)

  }
  allArray:any = []
  onSelectAll(items: any) {
    console.log(items);
    this.allArray.push(items)
    this.companyDetails.industry_serves = this.allArray
    console.log(this.companyDetails.industry_serves)

  }


  url: any = []

  uploadPanDocument(event: any) {
    this.panDocument = true
    console.log(event.target.files[0])
    let file = event.target.files[0]
    let reader = new FileReader()
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0]
      reader.readAsDataURL(file)

      reader.onload = (event: any) => {
        this.url = event.target.result;
      };

    }
    this.companyDetails.pan_document = file

  }

  
  uploadGstDocument(event: any) {
    this.gstDocument = true
    console.log(event.target.files[0])
    let file = event.target.files[0]
    let reader = new FileReader()
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0]
      reader.readAsDataURL(file)

      reader.onload = (event: any) => { 
        this.url = event.target.result;
      };

    }
    this.companyDetails.gst_document = file
  }

  pinCodechange(e: any) {
    console.log(e.target.value)
    let val = e.target.value
    if (val) {
      this.service.pinCode(val).subscribe((res: any) => {
        console.log(res)
        console.log(res.data.pinCode)
        this.companyDetails.city_id = res.data.city_id
        this.companyDetails.state_id = res.data.state_id
        this.companyDetails.city_name = res.data.city_name
        this.companyDetails.state_name = res.data.state_name
        this.companyDetails.country_id = res.data.country_id
        this.companyDetails.country_name = res.data.country_name
        // this.error.pincode = res.data.pincode
      })


    }
  }
  profilePicture(event:any){
    this.flag = true
    // const files = event.target.files as FileList;
    let file = event.target.files[0]
    console.log(file,'event---')
    let reader = new FileReader()
    if(event.target.files && event.target.files.length > 0){
      let file = event.target.files[0]
        reader.readAsDataURL(file)
        reader.onload = () => {

          this.image_path = reader.result as string;
  
        console.log(file)
      }

    this.companyDetails.company_logo = file

    }
    console.log(this.companyDetails.company_logo,'chklogo---')
  }

  



  submit() {
    let payload = new FormData()
    if(this.flag){
      if(this.companyDetails.company_logo){
        payload.append('company_logo',this.companyDetails.company_logo)
        console.log('img---')
     }
     else{
       console.log('else image')
     }
    }
    if (this.companyDetails.company_name) {
      payload.append('company_name', this.companyDetails.company_name)
    }
    if (this.companyDetails.email) {
      payload.append('email', this.companyDetails.email)
    }
    if (this.companyDetails.website_url) {
      payload.append('website_url', this.companyDetails.website_url)
    }
    if (this.companyDetails.address_line_1) {
      payload.append('address_line_1', this.companyDetails.address_line_1)
    }
    if (this.companyDetails.pincode) {
      payload.append('pincode', this.companyDetails.pincode)
    }
    if (this.companyDetails.city_id) {
      payload.append('city_id', this.companyDetails.city_id)
    }
    if (this.companyDetails.state_id) {
      payload.append('state_id', this.companyDetails.state_id)
    }
    if (this.companyDetails.country_id) {
      payload.append('country_id', this.companyDetails.country_id)
    }
    if (this.companyDetails.company_type_id) {
      payload.append('company_type_id', this.companyDetails.company_type_id)
    }
    if (this.companyDetails.cin_number) {
      payload.append('cin_number', this.companyDetails.cin_number)
    }
    if (this.companyDetails.company_size) {
      payload.append('company_size', this.companyDetails.company_size)
    }
    if (this.companyDetails.linkedin_url) {
      payload.append('linkedin_url', this.companyDetails.linkedin_url)
    }
    if (this.companyDetails.gst_number) {
      payload.append('gst_number', this.companyDetails.gst_number)
    }
    if(this.companyDetails.pan_number){
      payload.append('pan_number',this.companyDetails.pan_number)
    }
  if(this.panDocument){
    if (this.companyDetails.pan_document){
      payload.append('pan_document', this.companyDetails.pan_document)
      console.log('update pandocument')
    }else{
      console.log('pandocumnet')
    }
  }
  
  if(this.gstDocument){
    if (this.companyDetails.gst_document) {
      payload.append('gst_document', this.companyDetails.gst_document)
    }else{
      console.log('gstdocument--')
    }
  }
  if(this.flagYear = true){
    if(this.companyDetails.year_of_establishment){
      payload.append('year_of_establishment',this.companyDetails.year_of_establishment)
      console.log('error_year_of_establishment')
    }else{
      console.log('error_year_of_establishment')
    }
  }
    if (this.companyDetails.industry_serves) {
      this.companyDetails.industry_serves.forEach((res: any) => {
        payload.append('industry_serve_id[]', res.id)

      })
   
    }
    this.service.companyDetailsUpdate(payload).subscribe((response: any) => {
      console.log(response)
      if (response.status == 201) {
        this.error = response.data
        this.dataService.NotificationService(response.message,'Fill Data' , 'error' , 5000)

      }
      if (response.status == 200) {
        this.dataService.NotificationService(response.message,'Update successful' , 'success' , 5000)
        this.companyName = response.data.company_name
        sessionStorage.setItem('companyName',this.companyName)
        this.context.completeWith(null);

      }

    })

  }

  cancel() {
    this.context.completeWith(null);
  }

}
