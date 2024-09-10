import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  navbarOpen = false;
  userName !: string | null
  userLoggedIn !: boolean
  showLoginButton !: boolean
  path !: 'path'

  recuiterDashboard !: string |null
  job_seekerDashboard !: string |null

  constructor(private router:Router,
    private dataService : DataService){
      console.log(this.router.url)

      this.recuiterDashboard = sessionStorage.getItem('recruiter-dashboard')
      this.job_seekerDashboard = sessionStorage.getItem('seeker-dashboard')
  }

  ngOnInit(){
    // this.userName = this.dataService.userName
    // console.log(this.userName)
  }

  ngDoCheck(){
    this.recuiterDashboard = sessionStorage.getItem('recruiter-dashboard')
    this.job_seekerDashboard = sessionStorage.getItem('seeker-dashboard')
    
    this.showLoginButton = this.dataService.showLoginButton   
    let status = sessionStorage.getItem('userLoggedIn')
    if(status == 'true'){
      this.userLoggedIn = true
    }else{
      this.userLoggedIn = false
    } 
    this.userName = sessionStorage.getItem('userName')
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  } 

  seekerhead(){
    this.router.navigate(['./seekerhead'])
  }

  loginPage(){
    this.dataService.showLoginButton = false
    this.showLoginButton = false
    this.router.navigate(['login'])
  }

  seekerDashboard(){
    this.router.navigate(['seeker-dashboard'])
  }
  recuruiterDashboard(){
    this.router.navigate(['recruiter-dashboard'])
  }

  logout(){
    sessionStorage.clear()
    this.dataService.NotificationService('','Logout Successful.','success',3000)
    this.router.navigate([''])
  }

  
  isNavigationOpen = false;

  toggleNavigation() {
    this.isNavigationOpen = !this.isNavigationOpen;
  }
}
