import { ParentService } from '../../parent.service';
import {Component, OnInit, AfterViewInit, NgZone, ViewChild, ElementRef, NgModule} from '@angular/core';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import {MapsAPILoader} from '@agm/core';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SchoolService} from '../../../school/school.service';
declare var $: any;

@Component({
  selector: 'app-add-parent',
  templateUrl: './add-parent.component.html',
  styleUrls: ['./add-parent.component.css']
})
export class AddParentComponent implements OnInit, AfterViewInit {
  public parent: any;
    public latitude: number;
    public longitude: number;
    public zoom: number;

    public latitude1: number;
    public longitude1: number;
    public zoom1: number;

    public options: {};
    public parentId: string;
    @ViewChild('search')
        public searchElementRef: ElementRef;
    @ViewChild('search1')
        public searchElementRef1: ElementRef;
    constructor( private parentService: ParentService,
                 private mapsAPILoader: MapsAPILoader,
                 private ngZone: NgZone,
                 private route: Router,
                 private schoolService: SchoolService,
                 private route1: ActivatedRoute) {
      this.parent = [];
      const parentId = this.route1.params.subscribe(params => {
          this.parentId =  params['id'];
      });
      if ( this.parentId ) {
          this.parentService.getParent( this.parentId).subscribe(response => {
              this.parent = response;
          });
      }
        this.schoolService.getAllSchoolsWithFilter('').subscribe(response => {
            this.options = response;
        });
  }

  ngOnInit() {
      this.zoom = 4;
      this.latitude = 39.8282;
      this.longitude = -98.5795;
      this.zoom1 = 4;
      this.latitude1 = 39.8282;
      this.longitude1 = -98.5795;

      // create search FormControl
      this.parent.searchControl = new FormControl();
      this.parent.searchControl1 = new FormControl();
      // set current position
      this.setCurrentPosition();
      this.setCurrentPosition1();

      // load Places Autocomplete
      this.mapsAPILoader.load().then(() => {
          const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
              types: ['address'],
              componentRestrictions: {country: 'in'}
          });
          autocomplete.addListener('place_changed', () => {
              this.ngZone.run(() => {
                  // get the place result
                  const place: google.maps.places.PlaceResult = autocomplete.getPlace();
                  // verify result
                  if (place.geometry === undefined || place.geometry === null) {
                      return;
                  }

                  // set latitude, longitude and zoom
                  this.latitude = place.geometry.location.lat();
                  this.longitude = place.geometry.location.lng();
                  this.parent.address = place.formatted_address;
                  this.parent.lat = place.geometry.location.lat();
                  this.parent.lng = place.geometry.location.lng();
                  this.zoom = 12;
              });
          });
          const autocomplete1 = new google.maps.places.Autocomplete(this.searchElementRef1.nativeElement, {
              types: ['address'],
              componentRestrictions: {country: 'in'}
          });
          autocomplete1.addListener('place_changed', () => {
              this.ngZone.run(() => {
                  // get the place result
                  const place1: google.maps.places.PlaceResult = autocomplete1.getPlace();
                  // verify result
                  if (place1.geometry === undefined || place1.geometry === null) {
                      return;
                  }

                  // set latitude, longitude and zoom
                  this.latitude1 = place1.geometry.location.lat();
                  this.longitude1 = place1.geometry.location.lng();
                  this.parent.pitStop = place1.formatted_address;
                  this.parent.pitLat = place1.geometry.location.lat();
                  this.parent.pitLng = place1.geometry.location.lng();
                  this.zoom1 = 12;
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
            this.parent = data;
        }
    }
    public saveParent(event) {
        if ($('#form_validation').valid()) {
            this.parentService.save(this.parent).subscribe(response => {
                this.parent = response;
                this.route.navigate(['cpanel/master/parent/view-all']);
            });
        }
        // this.cookieService.put('putting', 'putty');
    }
    private setCurrentPosition() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;
                this.parent.lat = position.coords.latitude;
                this.parent.lng = position.coords.longitude;
                this.zoom = 12;
            });
        }
    }
    private setCurrentPosition1() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.latitude1 = position.coords.latitude;
                this.longitude1 = position.coords.longitude;
                this.parent.pitLat = position.coords.latitude;
                this.parent.pitLng = position.coords.longitude;
                this.zoom1 = 12;
            });
        }
    }
}
