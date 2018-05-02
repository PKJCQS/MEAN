import { Component, OnInit, AfterViewInit } from '@angular/core';
import {TeacherService} from '../../teacher.service';
import {Router} from '@angular/router';
import {PageEvent} from '@angular/material';
declare var $: any;

@Component({
    selector: 'app-view-all-teachers',
    templateUrl: './view-all-teachers.component.html',
    styleUrls: ['./view-all-teachers.component.css']
})
export class ViewAllTeachersComponent implements OnInit, AfterViewInit {
    public teachers: {};
    public pages: number;
    public pageIndex = 0;
    public pageSize = 5;
    public pageSizeOptions = [5, 10, 25, 100];
    public columns = [
        { key: 'sn', title: 'S. No.', isSortable: false },
        { key: 'firstName', title: 'Name', isSortable: true},
        { key: 'email', title: 'Email', isSortable: true},
        { key: 'mobile', title: 'Mobile', isSortable: true},
        { key: 'school', title: 'School', isSortable: false},
        { key: 'uuid', title: 'UUID', isSortable: false},
        { key: 'isActive', title: 'IsActive', isSortable: true},
        { key: 'action', title: 'Action', isSortable: false}
    ];
    color = 'primary';
    public query = {
        sortBy: 'firstName',
        isSortAscending: 1
    };
    constructor(private teacherService: TeacherService, private route: Router) {
        this.teacherService.getTeachers(this.pageIndex, this.pageSize, this.query).subscribe(response => {
            this.teachers = response['data'];
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
        this.teacherService.getTeachers(this.pageIndex, this.pageSize, this.query).subscribe(response => {
            this.teachers = response['data'];
            this.pages = Math.ceil(response['total'] / this.pageSize);
        });
    }
    public changeStatus(event: any, teacher: any) {
        teacher['isActive'] =  event.checked;
        this.teacherService.save(teacher).subscribe(response1 => {
            if (response1) {
                this.teacherService.getTeachers(this.pageIndex, this.pageSize, this.query).subscribe(response => {
                    this.teachers = response['data'];
                    this.pages = Math.ceil(response['total'] / this.pageSize);
                });
            }
        });
    }
    public SortBy(sortKey: string) {
        this.query.sortBy = sortKey;
        this.query.isSortAscending = this.query.isSortAscending === -1 ? 1 : -1;
        this.teacherService.getTeachers(this.pageIndex, this.pageSize, this.query).subscribe(response => {
            this.teachers = response['data'];
            this.pages = Math.ceil(response['total'] / this.pageSize);
        });
    }
    public deleteTeacher(id: string) {
        if (confirm('Are you sure!')) {
            this.teacherService.delete( id).subscribe(response => {
                this.teacherService.getTeachers(this.pageIndex, this.pageSize, this.query).subscribe(response => {
                    this.teachers = response['data'];
                    this.pages = Math.ceil(response['total'] / this.pageSize);
                });
            });
        }
    }
}
