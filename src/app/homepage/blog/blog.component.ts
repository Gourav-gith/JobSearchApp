import { HttpParams, HttpParamsOptions } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BlogCatagories, BlogCatagoriesResponce, BlogList, BlogListResponce } from 'src/app/model/workassist.modal';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent {

  blogList = [] as Array<BlogList>
  blogCatagories = [] as Array<BlogCatagories>

  constructor(
    private dataService : DataService,
    private router : Router
  ){

    if(!this.blogList){
      this.blogList = [] as Array<BlogList>
    }

  }

  ngOnInit(){
    this.dataService.blogListSearch().subscribe((res:BlogListResponce)=>{
      this.blogList = res?.data?.data as Array<BlogList>
      // console.log(' blogList>>>>>>>>>>>>>>',this.blogList)
    })

    this.dataService.blogCatagoriesSearch().subscribe((res: BlogCatagoriesResponce)=>{
      this.blogCatagories = res.data as Array<BlogCatagories>
      // console.log(' blogCatagories>>>>>>>>>>>>>>',this.blogCatagories)

    })
  }

  individualBlog(slug : string | undefined){
    this.router.navigate(['individual-blog' , slug ])
  }

  showBlogTitleOnTitle(blog_title: any) {
    let value
    
    return value = blog_title

  }
}
