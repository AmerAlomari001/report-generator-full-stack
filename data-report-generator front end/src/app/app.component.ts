import { Component } from '@angular/core';

import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false
})
export class AppComponent {  title = 'data-report-generator2';

   constructor(public router: Router) {}
    logout() {
    this.router.navigate(['/login']); 
  }
}
