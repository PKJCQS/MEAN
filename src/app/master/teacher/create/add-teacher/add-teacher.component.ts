import { TeacherService } from '../../teacher.service';
import {Component, OnInit, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SubjectService} from '../../../subject/subject.service';
import {SchoolService} from '../../../school/school.service';
import {IdcardService} from '../../../idcard/idcard.service';
declare var $: any;


@Component({
    selector: 'app-add-teacher',
    templateUrl: './add-teacher.component.html',
    styleUrls: ['./add-teacher.component.css']
})
export class AddTeacherComponent implements OnInit, AfterViewInit {
    public teacher: any;
    public teacherId: string;
    public options: any;
    public schools: any;
    public idCards: any;
    color = 'primary';
    @ViewChild('search')
    public searchElementRef: ElementRef;
    constructor( private teacherService: TeacherService,
                 private route: Router,
                 private route1: ActivatedRoute,
                 private schoolService: SchoolService,
                 private idCardService: IdcardService,
                 private subjectService: SubjectService) {
        this.teacher = [];
        const teacherId = this.route1.params.subscribe(params => {
            this.teacherId =  params['id'];
        });
        if ( this.teacherId ) {
            this.teacherService.getTeacher( this.teacherId).subscribe(response => {
                console.log(response);
                this.teacher = response['data'];
                let subjs = [];
                let i = 0;
                if (response['subjects']) {
                    for (let subj in response['subjects']) {
                        subjs[i] = response['subjects'][subj]['subject'];
                        i++;
                    }
                }
                this.teacher.subjects = subjs;
            });
        }
        this.subjectService.getAllSubjectsWithFilter('').subscribe(response => {
            this.options = response;
        });
        this.schoolService.getAllSchoolsWithFilter('').subscribe(response => {
            this.schools = response;
        });
        this.idCardService.getAllIdCardsWithFilter('').subscribe(response => {
            this.idCards = response;
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
    public saveTeacher(event) {
        if ($('#form_validation').valid()) {
            this.teacherService.save(this.teacher).subscribe(response => {
                this.teacher = response;
                this.route.navigate(['cpanel/master/teacher/view-all']);
            });
        }
        // this.cookieService.put('putting', 'putty');
    }
}
