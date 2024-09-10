import { HttpParams, HttpParamsOptions } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RecentSearchResponce } from 'src/app/model/workassist.modal';
// import { RecentSearchResponce } from 'src/app/model/recentSearches.model';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent {

  value = ''
  skills !: any
  location !: any
  category !: any
  error = false
  recentSearchList : string[] = []
  jobSuggestionList = []
  locationSuggestionList = []
  catagorySuggestionList = []
  keyword='name'
  locationKeyword='city_name'

  constructor(
    private dataService : DataService,
    private router : Router
  ){
    console.log(window.location.href)
  }

  ngOnInit(){
    this.dataService.recentSearch().subscribe((res: RecentSearchResponce)=>{
      // console.log(res)
      this.recentSearchList = res.data as string[]
    })
    // this.suggestionSearch()
    this.dataService.showLoginButton = true
  }

  ngDoCheck(){
    if(this.skills || this.location || this.category ){
      this.error = false
    }
  }

  suggestionSearch(){
    if( this.skills && this.skills.length > 2){
      const myObject: any = { job_query: this.skills};
      const httpParams: HttpParamsOptions = { fromObject: myObject } as HttpParamsOptions;
      const options = { params: new HttpParams(httpParams), headers: this.dataService.header };
      this.dataService.suggestionSearch(options).subscribe((res:any)=>{
        console.log(res.data)
        this.jobSuggestionList = res.data
      })
    }
  }

  locationSearch(search : any){
    this.location = search
    if( this.location && this.location.length > 2){
      const myObject: any = {location_query: this.location};
      const httpParams: HttpParamsOptions = { fromObject: myObject } as HttpParamsOptions;
      const options = { params: new HttpParams(httpParams), headers: this.dataService.header };
      this.dataService.locationSearch(options).subscribe((res:any)=>{
        this.locationSuggestionList = res.data
        console.log(res.data)
      })
    }
  }

  catagorySearch(search : any){
    this.category = search 
    if( this.category && this.category.length > 2){
      const myObject: any = { category_query: this.category};
      const httpParams: HttpParamsOptions = { fromObject: myObject } as HttpParamsOptions;
      const options = { params: new HttpParams(httpParams), headers: this.dataService.header };
      this.dataService.catagorySearch(options).subscribe((res:any)=>{
        console.log(res.data)
        this.catagorySuggestionList = res.data
      })
    }
  }

  selectEvent(item :any) {
    // do something with selected item
    console.log(item.name)
    this.skills = item.name
  }

  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
    // console.log(search)
    this.skills = search
    // if( this.category && this.category.length > 2){
      this.suggestionSearch()
    // }
  }

  onFocused(e : any) {
    // do something
  }

  search(){
    this.error = false
    if(this.skills || this.location || this.category ){
      console.log(this.skills , ',' , this.location , ',' ,  this.category )
      // this.dataService.search()
      // let url = window.location.href.split('/')
      // let baseURL = 'https://www.workassist.in/'
      // let baseURL = url[0] + '/' +  url[1] + '/' +  url[2] + '/'
      // console.log(baseURL)
      // console.log(baseURL + 'search-jobs/'+this.skills+'-jobs-in-'+this.location+'?key='+this.skills+'&location='+this.location+'&category='+this.category)

      // window.location.href = baseURL + 'search-jobs/'+this.skills+'-jobs-in-'+this.location+'?key='+this.skills+'&location='+this.location+'&category='+this.category

      if(!this.location && !this.category){
        this.dataService.queryParam = this.skills +'?key[]='+this.skills
        this.router.navigate(['search-jobs', this.skills +'?key[]='+this.skills])
      }
      else if(!this.category){
        this.dataService.queryParam =  this.skills +'-jobs-in-'+this.location+'?key='+this.skills+'&location='+this.location
        this.router.navigate(['search-jobs', this.skills +'-jobs-in-'+this.location+'?key='+this.skills+'&location='+this.location ])
      }
      else{
        this.dataService.queryParam = this.skills +'-jobs-in-'+this.location+'?key='+this.skills+'&location='+this.location+'&category='+this.category
        this.router.navigate(['search-jobs', this.skills +'-jobs-in-'+this.location+'?key='+this.skills+'&location='+this.location+'&category='+this.category ])
      }

    }
    else{
      this.error = true
    }
  }

}
