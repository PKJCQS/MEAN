import { UserService } from '../user.service';
import {Component, OnInit, AfterViewInit} from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, AfterViewInit {
  public user: any;
  public userInfo: any;
  constructor(private userService: UserService, private cookieService: CookieService, private route: Router) {
      this.user = [];
      this.userInfo = [];
      this.userService.getUserProfileData().subscribe(response => {
          if ( response ) {
              // console.log(data);
              this.user = response;
              this.userInfo = response['userInfo'];
          }
      });
  }

  ngOnInit() {
  }
  ngAfterViewInit() {
        $('#form_validation').validate({
            rules: {
                'checkbox': {
                    required: true
                },
                'gender': {
                    required: true
                }
            },
            highlight: function (input) {
                $(input).parents('.form-line').addClass('error');
            },
            unhighlight: function (input) {
                $(input).parents('.form-line').removeClass('error');
            },
            errorPlacement: function (error, element) {
                $(element).parents('.form-group').append(error);
            }
        });
    }
    public saveProfile(event) {
        console.log(this.user);
        this.userService.updateUserData( this.user, this.userInfo ).subscribe(response => {
            if ( response ) {
                // console.log(data);
                this.user = response;
                this.userInfo = response['userInfo'];
            }
        });
    }
    public updateData(data) {
        if ( data ) {
            console.log(data);
            this.route.navigate(['cpanel/user/profile']);
        }
        return false;
    }
}
