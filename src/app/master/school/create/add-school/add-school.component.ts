import { SchoolService } from '../../school.service';
import {Component, OnInit, AfterViewInit, NgZone, ViewChild, ElementRef, NgModule} from '@angular/core';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import {MapsAPILoader} from '@agm/core';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {ActivatedRoute, Router} from '@angular/router';
declare var $: any;


export const MY_FORMATS = {
    parse: {
        dateInput: 'YYYY-MM-DD',
    },
    display: {
        dateInput: 'YYYY-MM-DD',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};
@NgModule({
    providers: [
        {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    ],
})
@Component({
  selector: 'app-add-school',
  templateUrl: './add-school.component.html',
  styleUrls: ['./add-school.component.css'],
    providers: [
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ],
})
export class AddSchoolComponent implements OnInit, AfterViewInit {
  public school: any;
    public latitude: number;
    public longitude: number;
    public zoom: number;
    public schoolId: string;
    @ViewChild('search')
        public searchElementRef: ElementRef;
 constructor( private schoolService: SchoolService, private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, private route: Router, private route1: ActivatedRoute) {
      this.school = [];
      const schoolId = this.route1.params.subscribe(params => {
          this.schoolId =  params['id']; // (+) converts string 'id' to a number

          // In a real app: dispatch action to load the details here.
      });
      // params( 'id' );
      if (typeof this.schoolId !== 'undefined') {
          this.schoolService.getSchool( this.schoolId).subscribe(response => {
              this.school = response;
          });
      }
  }

  ngOnInit() {
      this.zoom = 4;
      this.latitude = 39.8282;
      this.longitude = -98.5795;

      // create search FormControl
      this.school.searchControl = new FormControl();

      // set current position
      this.setCurrentPosition();

      // load Places Autocomplete
      this.mapsAPILoader.load().then(() => {
          let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
              types: ['address'],
              componentRestrictions: {country: 'in'}
          });
          autocomplete.addListener('place_changed', () => {
              this.ngZone.run(() => {
                  // get the place result
                  let place: google.maps.places.PlaceResult = autocomplete.getPlace();
                  // verify result
                  if (place.geometry === undefined || place.geometry === null) {
                      return;
                  }

                  // set latitude, longitude and zoom
                  this.latitude = place.geometry.location.lat();
                  this.longitude = place.geometry.location.lng();
                  this.school.address = place.formatted_address;
                  this.school.latitude = place.geometry.location.lat();
                  this.school.longitude = place.geometry.location.lng();
                  this.zoom = 12;
              });
          });
      });
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
    public setData( data ) {
        if ( data ) {
            // console.log(data);
            this.school = data;
        }
    }
  public saveSchool(event) {
      if ($('#form_validation').valid()) {
          this.schoolService.save(this.school).subscribe(response => {
              this.school = response;
              this.route.navigate(['cpanel/master/school/view-all']);
          });
      }
      // this.cookieService.put('putting', 'putty');
   }
    private setCurrentPosition() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;
                this.school.latitude = position.coords.latitude;
                this.school.longitude = position.coords.longitude;
                this.zoom = 12;
            });
        }
    }
}
