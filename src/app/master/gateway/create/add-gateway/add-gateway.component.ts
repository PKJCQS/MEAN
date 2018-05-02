///<reference path="../../../../../../node_modules/rxjs/add/operator/debounceTime.d.ts"/>
import { GatewayService } from '../../gateway.service';
import {Component, OnInit, AfterViewInit} from '@angular/core';
import { } from 'googlemaps';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {SchoolService} from '../../../school/school.service';
import {FormControl} from '@angular/forms';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import {Title} from '@angular/platform-browser';
declare var $: any;

@Component({
  selector: 'app-add-gateway',
  templateUrl: './add-gateway.component.html',
  styleUrls: ['./add-gateway.component.css']
})
export class AddGatewayComponent implements OnInit, AfterViewInit {
    public gateway: any;
    public gatewayId: string;
    public options: any;
    color = 'primary';
    public filteredOptions: any;
    constructor( private gatewayService: GatewayService,
                 private route: Router,
                 private schoolService: SchoolService,
                 private route1: ActivatedRoute,
                 private titleService: Title ) {
        this.titleService.setTitle( 'Add Gateway' );
      this.gateway = [];
      const gatewayId = this.route1.params.subscribe(params => {
          this.gatewayId =  params['id']; // (+) converts string 'id' to a number

          // In a real app: dispatch action to load the details here.
      });
      // params( 'id' );
      if ( this.gatewayId ) {
          this.titleService.setTitle('Edit Gateway');
          this.gatewayService.getGateway( this.gatewayId).subscribe(response => {
              this.gateway = response;
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
      $(document).ready(function() {
          $('.ip').inputmask('999.999.999.999', { placeholder: '___.___.___.___' });
      });
  }
  public saveGateway(event) {
      if ($('#form_validation').valid()) {
          this.gatewayService.save(this.gateway).subscribe(response => {
              this.gateway = response;
              this.route.navigate(['cpanel/master/gateway/view-all']);
          });
      }
        // this.cookieService.put('putting', 'putty');
   }
}
