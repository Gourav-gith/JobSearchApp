import { Component, OnInit } from '@angular/core';
import { RecruiterService } from '../recruiter.service';
import { RecentPost, RecentJobPostResponse, RequiterDashboard, RequiterDashboardResponse, RecentApplicationResponse, RecentBlogResponse, RecentBlog } from 'src/app/model/recruiter/dashboard';

@Component({
  selector: 'app-recruiter-dashboard',
  templateUrl: './recruiter-dashboard.component.html',
  styleUrls: ['./recruiter-dashboard.component.css']
})
export class RecruiterDashboardComponent implements OnInit {
  headerCounter!:RequiterDashboard
  postJob!:RecentJobPostResponse
  application!:RecentApplicationResponse
  blog!:RecentBlogResponse

  constructor(
    private _service : RecruiterService
  ){

    if(!this.headerCounter){
      this.headerCounter = {} as RequiterDashboard
    }

    if(!this.postJob){
      this.postJob = {} as RecentJobPostResponse
    }

    if(!this.postJob.data){
      this.postJob.data = [] as Array<RecentPost>
    }
    if(!this.blog){
      this.blog = {} as RecentBlogResponse
    }

    if(!this.blog.data){
      this.blog.data = [] as Array<RecentBlog>
    }

  }

  ngOnInit(){
    this.headerCards()
    this.recentJob()
    this.recentApplication()
    this.blogPost()
   
  }

  truncateString(input: string, length: number): string {
    if (input.length > length) {
      return input.substring(0, length) + '...';
    }
    return input;
  }


  headerCards(){
    this._service.headerCardsApi().subscribe((res : RequiterDashboardResponse)=>{
      console.log(res)
      this.headerCounter = res.data as RequiterDashboard
    })
  }

  recentJob(){
    this._service.recentPostJobApi().subscribe((res:RecentJobPostResponse)=>{
      // console.log(res)
      this.postJob = res as RecentJobPostResponse
      console.log(this.postJob,'greger')
    })
  }

  recentApplication(){
    this._service.recentAppliactionApi().subscribe((res:RecentApplicationResponse)=>{
      this.application = res
      console.log(this.application,'appli----')

    })
  }

  blogPost(){
    this._service.blogRecentPostApi().subscribe((res:RecentBlogResponse)=>{
      this.blog = res
      console.log( this.blog,'blog----')

    })
  }


}
