import { AuthService } from './auth/auth.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'app';
  public authService: AuthService;
  constructor(authService: AuthService) {
  this.authService = authService;
  }
  ngOnInit() {
  }
  ngAfterViewInit() {
  }
}
