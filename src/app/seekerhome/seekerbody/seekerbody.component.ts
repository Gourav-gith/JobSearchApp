import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seekerbody',
  templateUrl: './seekerbody.component.html',
  styleUrls: ['./seekerbody.component.css']
})
export class SeekerbodyComponent {

  constructor(
    private router : Router
  ){}

  seekerProfile(){
    this.router.navigate(['seeker-profile'])
  }

}
