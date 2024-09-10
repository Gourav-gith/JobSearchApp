// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-admindash',
//   templateUrl: './admindash.component.html',
//   styleUrls: ['./admindash.component.css']
// })
// export class AdmindashComponent {

  
// }


import { Component } from '@angular/core';

@Component({
  selector: 'app-admindash',
  templateUrl: './admindash.component.html',
  styleUrls: ['./admindash.component.css']
})
export class AdmindashComponent {
  isCollapsed = false;

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
}
