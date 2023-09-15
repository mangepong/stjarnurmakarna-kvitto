import { Component } from '@angular/core';
import { AuthenticationService } from './shared/AuthenticationService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'stjarnurmakarna-kvitto';
  constructor(
    public authService: AuthenticationService,
    public router: Router,
  ) {}
}
