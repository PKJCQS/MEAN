import { ClassroomService } from '../../classroom.service';
import {Component, OnInit, AfterViewInit} from '@angular/core';
import { } from 'googlemaps';
import {ActivatedRoute, Router} from '@angular/router';
import {SchoolService} from '../../../school/school.service';
import {GatewayService} from '../../../gateway/gateway.service';
import {Title} from '@angular/platform-browser';
declare var $: any;

@Component({
    selector: 'app-add-classroom',
    templateUrl: './add-classroom.component.html',
    styleUrls: ['./add-classroom.component.css']
})
export class AddClassroomComponent implements OnInit, AfterViewInit {
    public classroom: any;
    public usedGateways: any;
    public classroomId: string;
    public options: {};
    public gateways: {};
    color = 'primary';
    public filteredOptions: any;
    constructor( private classroomService: ClassroomService,
                 private route: Router,
                 private schoolService: SchoolService,
                 private gatewayService: GatewayService,
                 private route1: ActivatedRoute, private titleService: Title ) {
        this.titleService.setTitle( 'Add Classroom' );
        this.classroom = [];
        const classroomId = this.route1.params.subscribe(params => {
            this.classroomId =  params['id']; // (+) converts string 'id' to a number
        });
        // params( 'id' );
        if ( this.classroomId ) {
            this.titleService.setTitle('Edit Classroom');
            this.classroomService.getClassroom( this.classroomId).subscribe(response => {
                this.classroom = response;
            });
        }
        this.schoolService.getAllSchoolsWithFilter('').subscribe(response => {
            this.options = response;
        });
        this.gatewayService.getAllGatewaysNotInClassrrom('').subscribe(response => {
            this.gateways = response;
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
    public saveClassroom(event) {
        if ($('#form_validation').valid()) {
            this.classroomService.save(this.classroom).subscribe(response => {
                this.classroom = response;
                this.route.navigate(['cpanel/master/classroom/view-all']);
            });
        }
        // this.cookieService.put('putting', 'putty');
    }
}
