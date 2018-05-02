import { DriverService } from '../../driver.service';
import {Component, OnInit, AfterViewInit} from '@angular/core';
import { } from 'googlemaps';

import {ActivatedRoute, Router} from '@angular/router';
import {SchoolService} from '../../../school/school.service';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { catchError, map, tap, startWith, switchMap, debounceTime, distinctUntilChanged, takeWhile, first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators , ValidatorFn, AbstractControl, FormControl} from '@angular/forms'
declare var $: any;


@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.css']
})
export class AddDriverComponent implements OnInit, AfterViewInit {
    /*public myControl = new FormControl();
    public filteredOptions: any;*/
    public driver: any;
    public driverId: string;
    private options: any;
    constructor( private driverService: DriverService,
                 private route: Router,
                 private schoolService: SchoolService,
                 private route1: ActivatedRoute) {
        this.driver = [];
        const driverId = this.route1.params.subscribe(params => {
            this.driverId = params['id']; // (+) converts string 'id' to a number

            // In a real app: dispatch action to load the details here.
        });
        // this.myControl = new FormControl();
        // params( 'id' );
        if (this.driverId) {
            this.driverService.getDriver(this.driverId).subscribe(response => {
                this.driver = response;
            });
        }
        this.schoolService.getAllSchoolsWithFilter('').subscribe(response => {
            this.options = response;
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

  public saveDriver(event) {
      if ($('#form_validation').valid()) {
          this.driverService.save(this.driver).subscribe(response => {
              this.driver = response;
              this.route.navigate(['cpanel/master/driver/view-all']);
          });
      }
      // this.cookieService.put('putting', 'putty');
   }
}
