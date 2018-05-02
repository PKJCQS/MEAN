import { RouteService } from '../../route.service';
import {Component, OnInit, AfterViewInit} from '@angular/core';
import { } from 'googlemaps';
import {ActivatedRoute, Router} from '@angular/router';
import {PickupService} from '../../../pickup/pickup.service';
import { AmazingTimePickerService } from 'amazing-time-picker';
import {Title} from '@angular/platform-browser';
declare var $: any;


@Component({
    selector: 'app-add-route',
    templateUrl: './add-route.component.html',
    styleUrls: ['./add-route.component.css']
})
export class AddRouteComponent implements OnInit, AfterViewInit {
    public rout: any;
    public routeId: string;
    private options: any;
    private pickups: Array<any> = [];
    private newAttribute: any = {pickup1: '' , time: '08:00'};
    constructor( private routeService: RouteService,
                 private route: Router,
                 private pickupService: PickupService,
                 private atp: AmazingTimePickerService,
                 private titleService: Title,
                 private route1: ActivatedRoute) {
        this.rout = [];
        this.titleService.setTitle( 'Add Route' );
        const routeId = this.route1.params.subscribe(params => {
            this.routeId =  params['id']; // (+) converts string 'id' to a number

            // In a real app: dispatch action to load the details here.
        });
        // this.myControl = new FormControl();
        // params( 'id' );
        if ( this.routeId ) {
            this.titleService.setTitle( 'Add Route' );
            this.routeService.getRoute( this.routeId).subscribe(response => {
                this.rout = response;
                this.pickups = response['pickups'];
            });
        }
        this.pickupService.getAllPickupsWithFilter('').subscribe(response => {
            this.options = response;
        });
    }
    open() {
        const amazingTimePicker = this.atp.open();
        amazingTimePicker.afterClose().subscribe(time => {
            console.log(time);
        });
    }
    addRow() {
        var p =  this.pickups;
        p.push(this.newAttribute);
        this.pickups = p;
    }

    deleteRow(index) {
        console.log(this.pickups);
        this.pickups.splice(index, 1);
        console.log(this.pickups);
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

    public saveRoute(event) {
        if ($('#form_validation').valid()) {
            this.rout['pickups'] = this.pickups;
            this.routeService.save(this.rout).subscribe(response => {
                this.rout = response;
                this.route.navigate(['cpanel/master/route/view-all']);
            });
        }
        // this.cookieService.put('putting', 'putty');
    }
}
