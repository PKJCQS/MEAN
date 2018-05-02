import { PickupService } from '../../pickup.service';
import {Component, OnInit, AfterViewInit, NgZone, ViewChild, ElementRef, NgModule} from '@angular/core';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import {MapsAPILoader} from '@agm/core';
import {ActivatedRoute, Router} from '@angular/router';
declare var $: any;

@Component({
    selector: 'app-add-pickup',
    templateUrl: './add-pickup.component.html',
    styleUrls: ['./add-pickup.component.css']
})
export class AddPickupComponent implements OnInit, AfterViewInit {
    public pickup: any;
    public latitude: number;
    public longitude: number;
    public zoom: number;
    public pickupId: string;
    @ViewChild('search')
        public searchElementRef: ElementRef;
    constructor( private pickupService: PickupService,
                 private mapsAPILoader: MapsAPILoader,
                 private ngZone: NgZone,
                 private route: Router,
                 private route1: ActivatedRoute) {
        this.pickup = [];
        const pickupId = this.route1.params.subscribe(params => {
            this.pickupId =  params['id'];
        });
        if ( this.pickupId ) {
            this.pickupService.getPickup( this.pickupId).subscribe(response => {
                this.pickup = response;
            });
        }
    }

    ngOnInit() {
        this.zoom = 4;
        this.latitude = 39.8282;
        this.longitude = -98.5795;

        // create search FormControl
        this.pickup.searchControl = new FormControl();
        this.pickup.searchControl1 = new FormControl();
        // set current position
        this.setCurrentPosition();

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
                    this.pickup.address = place.formatted_address;
                    this.pickup.lat = place.geometry.location.lat();
                    this.pickup.lng = place.geometry.location.lng();
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
                $(input).parent('.form-line').addClass('error');
            },
            unhighlight: function (input) {
                $(input).parent('.form-line').removeClass('error');
            },
            errorPlacement: function (error, element) {
                $(element).parent('.form-group').append(error);
            }
        });
    }
    public savePickup(event) {
        if ($('#form_validation').valid()) {
            this.pickupService.save(this.pickup).subscribe(response => {
                this.pickup = response;
                this.route.navigate(['cpanel/master/pickup/view-all']);
            });
        }
        // this.cookieService.put('putting', 'putty');
    }
    private setCurrentPosition() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;
                this.pickup.lat = position.coords.latitude;
                this.pickup.lng = position.coords.longitude;
                this.zoom = 12;
            });
        }
    }
}
