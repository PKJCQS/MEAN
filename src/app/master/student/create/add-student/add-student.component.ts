import { StudentService } from '../../student.service';
import {Component, OnInit, AfterViewInit} from '@angular/core';
import { } from 'googlemaps';
import {ActivatedRoute, Router} from '@angular/router';
import {SchoolService} from '../../../school/school.service';
import {ClassroomService} from '../../../classroom/classroom.service';
import {Title} from '@angular/platform-browser';
import {ParentService} from '../../../parent/parent.service';
import {PickupService} from '../../../pickup/pickup.service';
import {IdcardService} from '../../../idcard/idcard.service';
declare var $: any;

@Component({
    selector: 'app-add-student',
    templateUrl: './add-student.component.html',
    styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit, AfterViewInit {
    public student: any;
    public parents: {};
    public pickups: {};
    public studentId: string;
    public options: {};
    public idcards: {};
    public classrooms: {};
    color = 'primary';
    public genders: [
        {key: 'M' , name: 'Male'},
        {key: 'F', name: 'Female'}
    ];
    constructor( private studentService: StudentService,
                 private route: Router,
                 private schoolService: SchoolService,
                 private classroomService: ClassroomService,
                 private parentService: ParentService,
                 private pickupService: PickupService,
                 private idcardService: IdcardService,
                 private route1: ActivatedRoute, private titleService: Title ) {
        this.titleService.setTitle( 'Add Student' );
        this.student = [];
        const studentId = this.route1.params.subscribe(params => {
            this.studentId =  params['id']; // (+) converts string 'id' to a number
        });
        // params( 'id' );
        if ( this.studentId ) {
            this.titleService.setTitle('Edit Student');
            this.studentService.getStudent( this.studentId).subscribe(response => {
                this.student = response;
            });
        }
        this.schoolService.getAllSchoolsWithFilter('').subscribe(response => {
            this.options = response;
        });
        this.classroomService.getAllClassroomsWithFilter('').subscribe(response => {
            this.classrooms = response;
        });
        this.parentService.getAllParentsWithFilter('').subscribe(response => {
            this.parents = response;
        });
        this.pickupService.getAllPickupsWithFilter('').subscribe(response => {
            this.pickups = response;
        });
        this.idcardService.getAllIdcardsNotInClassrrom('').subscribe(response => {
            this.idcards = response;
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
    public saveStudent(event) {
        if ($('#form_validation').valid()) {
            this.studentService.save(this.student).subscribe(response => {
                this.student = response;
                this.route.navigate(['cpanel/master/student/view-all']);
            });
        }
        // this.cookieService.put('putting', 'putty');
    }
}
