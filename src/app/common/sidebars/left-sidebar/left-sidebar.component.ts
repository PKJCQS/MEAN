import { Component, OnInit, AfterViewInit } from '@angular/core';
import {UserService} from '../../../user/user.service';

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.css']
})
export class LeftSidebarComponent implements OnInit, AfterViewInit {
  public Name: any;
  public userEmail: any;
  constructor(private userService: UserService) {
    this.userService.getLoggedUserData().subscribe(response => {
        if ( response ) {
            // console.log(data);
            this.Name = response['userInfo']['firstName']
                + ' ' + ( response['userInfo']['middleName'] ? response['userInfo']['middleName'] + ' ' : '')
                + response['userInfo']['lastName'];
            this.userEmail = response['userInfo']['email'];
        }
    });
  }

  ngOnInit() {
  }
  ngAfterViewInit() {
  }
}
