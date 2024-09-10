import { Component, Inject, Injector, OnInit } from '@angular/core';
import { RecruiterService } from '../recruiter.service';
import { AboutCompany, AboutCompanyResponse, CompanydetailsResponse, IndustryServe, ProfessionalDetails, ProfessionalDetailsResponse, } from 'src/app/model/recruiter/companydetails';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { ProfessionalDetailsComponent } from '../professional-details/professional-details.component';
import { CompanyDetailsUpdateComponent } from '../company-details-update/company-details-update.component';
import { AboutCompanyComponent } from '../about-company/about-company.component';

@Component({
  selector: 'app-profile-view-edit',
  templateUrl: './profile-view-edit.component.html',
  styleUrls: ['./profile-view-edit.component.css']
})
export class ProfileViewEditComponent implements OnInit {

  authKey = 'a213d00ad5d1d16651c6a87be21d03d4'

  companyDetails!: CompanydetailsResponse
  professionalDetail!: ProfessionalDetailsResponse

  aboutCompany!: AboutCompanyResponse;
  industryServe: any = []
  commaSeparatedString!: string
  companyName: any
  // dataArray:any

  constructor(private _service: RecruiterService,
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector) {
    if (!this.companyDetails) {
      this.companyDetails = {} as CompanydetailsResponse
    }

    if (!this.professionalDetail) {
      this.professionalDetail = {} as ProfessionalDetailsResponse
    }
    if (!this.aboutCompany) {
      this.aboutCompany = {} as AboutCompanyResponse
    }

    if (!this.companyDetails.data || !this.companyDetails.data.industry_serves) {
      this.companyDetails.data = this.companyDetails.data || {};
      this.companyDetails.data.industry_serves = [] as Array<IndustryServe>;
    }
    if (!this.companyDetails.data?.industry_serves) {
      this.companyDetails.data?.industry_serves?.push({} as IndustryServe)
    }

  }

  private professionalDetailDilog = this.dialogs.open<ProfessionalDetails>(
    new PolymorpheusComponent(ProfessionalDetailsComponent, this.injector));

  professionalDetailsDialog(): void {
    this.professionalDetailDilog = this.dialogs.open<ProfessionalDetails>(
      new PolymorpheusComponent(ProfessionalDetailsComponent, this.injector),
      {
        data: this.professionalDetail.data,
        dismissible: true,
        closeable: false,
        // label: 'Heading',
        size: 'page'
      },
    );



    this.professionalDetailDilog.subscribe({
      next: data => {
        this.ngOnInit()
        console.info(`Dialog emitted data = ${data}`);
      },
      complete: () => {
        console.info('Dialog closed');
      },
    });
  }

  private comapnyDetailsDialog = this.dialogs.open<number>(
    new PolymorpheusComponent(CompanyDetailsUpdateComponent, this.injector),

  );


  companydetailsDilouge(): void {
    this.comapnyDetailsDialog = this.dialogs.open<number>(
      new PolymorpheusComponent(CompanyDetailsUpdateComponent, this.injector),
      {
        data: this.companyDetails.data,
        dismissible: true,
        closeable: false,
        size: 'page'
      }
    )

    this.comapnyDetailsDialog.subscribe({
      next: data => {
        this.ngOnInit()
        console.info(`Dialog emitted data = ${data}`);
      },
      complete: () => {
        console.info('Dialog closed');
      },
    });
  }

  private aboutDialoge = this.dialogs.open<number>(
    new PolymorpheusComponent(AboutCompanyComponent, this.injector),

  );

  aboutCompanyDilouge(): void {
    this.aboutDialoge = this.dialogs.open<number>(
      new PolymorpheusComponent(AboutCompanyComponent, this.injector),
      {
        data: this.aboutCompany.data,
        dismissible: true,
        closeable: false
      }
    )

    this.aboutDialoge.subscribe({
      next: data => {
        this.ngOnInit()
        console.info(`Dialog emitted data = ${data}`);
      },
      complete: () => {
        console.info('Dialog closed');
      },
    });
  }

  // ngDoCheck() {
  //   console.log('chkdochk-----', sessionStorage.getItem('companyName'))
  //   this.companyName = sessionStorage.getItem('companyName')

  // }


  ngOnInit() {
    this._service.companyDetailsApi(this.authKey).subscribe((res: CompanydetailsResponse) => {
      this.companyDetails = res
      this.companyName = this.companyDetails.data?.company_name
      console.log(this.companyName)
      sessionStorage.setItem('companyName',this.companyName)
      this.industryServe = this.companyDetails.data?.industry_serves
      if (this.companyDetails?.data?.industry_serves) {
        this.commaSeparatedString = this.companyDetails.data.industry_serves.map(item => item.name).join(', ');

      }
      console.log(this.commaSeparatedString)
    })

    this._service.professionalDetailsApi(this.authKey).subscribe((res: ProfessionalDetailsResponse) => {
      this.professionalDetail = res
      // console.log(res, 'professional---')
      sessionStorage.setItem('userName', res.data?.first_name!)

    })

    this._service.aboutcomapny(this.authKey).subscribe((response: AboutCompanyResponse) => {
      // console.log(response)
      this.aboutCompany = response

    })
  }


}
