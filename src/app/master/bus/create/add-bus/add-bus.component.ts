import { BusService } from '../../bus.service';
import {Component, OnInit, AfterViewInit} from '@angular/core';
import { } from 'googlemaps';

import {ActivatedRoute, Router} from '@angular/router';
import {SchoolService} from '../../../school/school.service';
import {DriverService} from '../../../driver/driver.service';
import {RouteService} from '../../../route/route.service';
declare var $: any;


@Component({
  selector: 'app-add-bus',
  templateUrl: './add-bus.component.html',
  styleUrls: ['./add-bus.component.css']
})
export class AddBusComponent implements OnInit, AfterViewInit {
    public bus: any;
    public busId: string;
    private options: any;
    private routes: any;
    private drivers: any;
    constructor( private busService: BusService,
                 private route: Router,
                 private schoolService: SchoolService,
                 private driverService: DriverService,
                 private routeService: RouteService,
                 private route1: ActivatedRoute) {
      this.bus = [];
      const busId = this.route1.params.subscribe(params => {
          this.busId =  params['id']; // (+) converts string 'id' to a number
      });
      if ( this.busId ) {
          this.busService.getBus( this.busId).subscribe(response => {
              this.bus = response;
          });
      }
        this.schoolService.getAllSchoolsWithFilter('').subscribe(response => {
            this.options = response;
        });
        this.driverService.getAllDriversWithFilter('').subscribe(response => {
            this.drivers = response;
        });
        this.routeService.getAllRoutesWithFilter('').subscribe(response => {
            this.routes = response;
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

  public saveBus(event) {
      if ($('#form_validation').valid()) {
          this.busService.save(this.bus).subscribe(response => {
              this.bus = response;
              this.route.navigate(['cpanel/master/bus/view-all']);
          });
      }
      // this.cookieService.put('putting', 'putty');
   }
}
