import { Component, Inject, OnInit } from '@angular/core';
import { RecruiterService } from '../recruiter.service';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus';
import { AboutCompany, AboutCompanyResponse } from 'src/app/model/recruiter/companydetails';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-about-company',
  templateUrl: './about-company.component.html',
  styleUrls: ['./about-company.component.css']
})
export class AboutCompanyComponent implements OnInit {
  aboutCompany!:AboutCompany


  constructor(private service:RecruiterService,
              private dataService:DataService,
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<null, any>,){
      console.log(this.context.data?.about_company)

      this.aboutCompany = this.context.data

      if(!this.aboutCompany){
        this.aboutCompany = {} as AboutCompany
      }
  


  }
  ngOnInit(){

    
  }

  submit(){
    let payload = new FormData()
    if(this.aboutCompany.about_company){
      payload.append('about_company',this.aboutCompany.about_company)
    }
    this.service.aboutCompanyUpdate(payload).subscribe((response:any)=>{
      this.dataService.NotificationService(response.message,'Update successful' , 'success' , 5000)

        console.log(response)
        if(response.status == 200){
         this.context.completeWith(null);

        }

    })

  }

  cancel(){
    this.aboutCompany
    this.context.completeWith(null);
  }

}
