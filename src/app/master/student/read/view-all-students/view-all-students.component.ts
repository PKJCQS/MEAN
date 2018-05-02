import { Component, OnInit, AfterViewInit } from '@angular/core';
import {StudentService} from '../../student.service';
import {Router} from '@angular/router';
import {PageEvent} from '@angular/material';
import {Title} from '@angular/platform-browser';
declare var $: any;

@Component({
    selector: 'app-view-all-students',
    templateUrl: './view-all-students.component.html',
    styleUrls: ['./view-all-students.component.css']
})
export class ViewAllStudentsComponent implements OnInit, AfterViewInit {
    public students: any;
    public pages: number;
    public pageIndex = 0;
    public pageSize = 5;
    public pageSizeOptions = [5, 10, 25, 100];
    public columns = [
        { key: 'sn', title: 'S. No.', isSortable: false },
        { key: 'name', title: 'Name', isSortable: true },
        { key: 'school', title: 'School', isSortable: true},
        { key: 'uuid', title: 'UUID', isSortable: true},
        { key: 'uuid', title: 'MAC', isSortable: false},
        { key: 'parent', title: 'Parent', isSortable: true},
        { key: 'pickup', title: 'Pickup', isSortable: true},
        { key: 'isActive', title: 'IsActive', isSortable: true},
        { key: 'action', title: 'Action', isSortable: false}
    ];
    color = 'primary';
    public query = {
        sortBy: 'name',
        isSortAscending: 1
    };
    constructor(private studentService: StudentService, private route: Router, private titleService: Title ) {
        this.titleService.setTitle( 'Students' );
        this.studentService.getStudents(this.pageIndex, this.pageSize, this.query).subscribe(response => {
            this.students = response['data'];
            this.pages = Math.ceil(response['total'] / this.pageSize);
        });
    }

    ngOnInit() {
    }
    ngAfterViewInit() {
    }
    public setPageData(event: PageEvent) {
        console.log( event );
        this.pageIndex = event.pageIndex;
        this.pageSize = event.pageSize;
        this.studentService.getStudents(this.pageIndex, this.pageSize, this.query).subscribe(response => {
            this.students = response['data'];
            this.pages = Math.ceil(response['total'] / this.pageSize);
        });
    }
    public SortBy(sortKey: string) {
        this.query.sortBy = sortKey;
        this.query.isSortAscending = this.query.isSortAscending === -1 ? 1 : -1;
        this.studentService.getStudents(this.pageIndex, this.pageSize, this.query).subscribe(response => {
            this.students = response['data'];
            this.pages = Math.ceil(response['total'] / this.pageSize);
        });
    }
    public changeStatus(event: any, school: any) {
        // console.log(event, school);
        school['isActive'] =  event.checked;
        // console.log(school);
        this.studentService.save(school).subscribe(response1 => {
            if (response1) {
                this.studentService.getStudents(this.pageIndex, this.pageSize, this.query).subscribe(response => {
                    this.students = response['data'];
                    this.pages = Math.ceil(response['total'] / this.pageSize);
                });
            }
        });

    }
    public deleteStudent(id: string) {
        if (confirm('Are you sure!')) {
            this.studentService.delete( id).subscribe(response => {
                this.students = response['data'];
                this.pages = Math.ceil(response['total'] / this.pageSize);
                this.route.navigate(['cpanel/master/student/view-all']);
            });
        }
    }
}
