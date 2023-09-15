import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/AuthenticationService';
@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  constructor(
    public authService: AuthenticationService,
    public router: Router,
  ) {}

  ngOnInit(): void {
    if(this.authService.isLoggedIn)
      this.authService.SignOut();
  }
}
