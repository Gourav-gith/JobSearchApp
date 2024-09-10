import { Component } from '@angular/core';
import { JobsByCatagories, JobsByCatagoriesResponce } from 'src/app/model/workassist.modal';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-jobs-category',
  templateUrl: './jobs-category.component.html',
  styleUrls: ['./jobs-category.component.css']
})
export class JobsCategoryComponent {

  jobsByCatagoryList !: Array<JobsByCatagories>

  constructor(
    private dataService : DataService
  ){
    if(!this.jobsByCatagoryList){
      this.jobsByCatagoryList = [] as Array <JobsByCatagories>
    }
   }

  ngOnInit(){
    this.dataService.jobsByCategorySearch().subscribe((res : JobsByCatagoriesResponce)=>{
      this.jobsByCatagoryList = res.data as Array<JobsByCatagories>
    })
  }

  showIndustryOnTitle(industry: any) {
    let value
    
    return value = industry

  }

}
