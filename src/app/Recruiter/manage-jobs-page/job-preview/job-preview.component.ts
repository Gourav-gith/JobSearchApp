import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecruiterService } from '../../recruiter.service';
import { PreviewPost, PreviewPostResponse } from 'src/app/model/recruiter.modal';

@Component({
  selector: 'app-job-preview',
  templateUrl: './job-preview.component.html',
  styleUrls: ['./job-preview.component.css']
})
export class JobPreviewComponent {
singleView !: PreviewPost



  constructor(private route:ActivatedRoute, private _service:RecruiterService,private router:Router){
    if(!this.singleView){
      this.singleView=  {} as PreviewPost
    }
    

  }

  ngOnInit(): void{
    this.route.params.subscribe((params: any) => {
      let id  = params['id'];
      console.log('prodid-----',id)
    
      if(id !== null){
        this._service.jobPreview(id).subscribe((response:PreviewPostResponse)=>{
            if(response && response.data){
              this.singleView = response.data as PreviewPost
              console.log(this.singleView);
            }

        })
      }
  });

}
    
}



