import { IdcardService } from '../../idcard.service';
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
  selector: 'app-add-idcard',
  templateUrl: './add-idcard.component.html',
  styleUrls: ['./add-idcard.component.css']
})
export class AddIdcardComponent implements OnInit, AfterViewInit {
    /*public myControl = new FormControl();
    public filteredOptions: any;*/
    public idcard: any;
    public idcardId: string;
    private options: any;
    constructor( private idcardService: IdcardService,
                 private route: Router,
                 private schoolService: SchoolService,
                 private route1: ActivatedRoute) {
      this.idcard = [];
      this.idcard.password = 'minew123';
      const idcardId = this.route1.params.subscribe(params => {
          this.idcardId =  params['id']; // (+) converts string 'id' to a number

          // In a real app: dispatch action to load the details here.
      });
      // this.myControl = new FormControl();
      // params( 'id' );
      if ( this.idcardId ) {
          this.idcardService.getIdcard( this.idcardId).subscribe(response => {
              this.idcard = response;
          });
      }
        this.schoolService.getAllSchoolsWithFilter('').subscribe(response => {
            this.options = response;
        });
       /* this.filteredOptions = this.myControl.valueChanges
            .pipe(
                startWith(null),
                debounceTime(200),
                distinctUntilChanged(),
                switchMap(val => {
                    return this.filterFunction(val || '');
                })
            );*/
  }
    /*filterFunction(val: string): any {
        this.schoolService.getAllSchoolsWithFilter(val).subscribe(response => {
            return response;
        });
    }*/
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

  public saveIdcard(event) {
      if ($('#form_validation').valid()) {
          this.idcardService.save(this.idcard).subscribe(response => {
              this.idcard = response;
              this.route.navigate(['cpanel/master/idcard/view-all']);
          });
      }
      // this.cookieService.put('putting', 'putty');
   }
}
