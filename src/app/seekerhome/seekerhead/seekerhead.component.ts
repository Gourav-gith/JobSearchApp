import { Component } from '@angular/core';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-seekerhead',
  templateUrl: './seekerhead.component.html',
  styleUrls: ['./seekerhead.component.css']
})
export class SeekerheadComponent {

  userName !: string

  constructor(
    private dataService : DataService
  ){
    console.log(this.dataService.userName) 
    this.userName = this.dataService. userName 
  }
  
}
