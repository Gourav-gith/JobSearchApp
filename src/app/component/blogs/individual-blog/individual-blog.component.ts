import { HttpParamsOptions, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IndividualBlogResponce } from 'src/app/model/workassist.modal';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-individual-blog',
  templateUrl: './individual-blog.component.html',
  styleUrls: ['./individual-blog.component.css']
})
export class IndividualBlogComponent {

  blogSlug !: string 
  individualBlog !: IndividualBlogResponce
  constructor(
    private dataService : DataService,
    private route: ActivatedRoute,
  ){
    const queryParameter = this.route.snapshot.paramMap.get('id');
    this.blogSlug = queryParameter!

    if(!this.individualBlog){
      this.individualBlog = {} as IndividualBlogResponce
    }
    }

  ngOnInit(){
    const myObject: any = {
      "blog_slug": this.blogSlug
    };
    const httpParams: HttpParamsOptions = { fromObject: myObject } as HttpParamsOptions;
    const options = { params: new HttpParams(httpParams), headers: this.dataService.header };

    this.dataService.singleBlogSearch(options).subscribe(( res : any)=>{
      this.individualBlog = res as IndividualBlogResponce
      console.log(this.individualBlog)
    })
  }
}
