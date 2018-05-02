import { Component, OnInit, AfterViewInit } from '@angular/core';
import {ClassroomService} from '../../classroom.service';
import {Router} from '@angular/router';
import {PageEvent} from '@angular/material';
import {Title} from '@angular/platform-browser';
declare var $: any;

@Component({
    selector: 'app-view-all-classrooms',
    templateUrl: './view-all-classrooms.component.html',
    styleUrls: ['./view-all-classrooms.component.css']
})
export class ViewAllClassroomsComponent implements OnInit, AfterViewInit {
    public classrooms: any;
    public pages: number;
    public pageIndex = 0;
    public pageSize = 5;
    public pageSizeOptions = [5, 10, 25, 100];
    public columns = [
        { key: 'sn', title: 'S. No.', isSortable: false },
        { key: 'name', title: 'Name', isSortable: true },
        { key: 'school', title: 'School', isSortable: false},
        { key: 'gateway', title: 'Gateway', isSortable: false},
        { key: 'isActive', title: 'IsActive', isSortable: true},
        { key: 'action', title: 'Action', isSortable: false}
    ];
    color = 'primary';
    public query = {
        sortBy: 'name',
        isSortAscending: 1
    };
    constructor(private classroomService: ClassroomService, private route: Router, private titleService: Title ) {
    this.titleService.setTitle( 'Classrooms' );
        this.classroomService.getClassrooms(this.pageIndex, this.pageSize, this.query).subscribe(response => {
            this.classrooms = response['data'];
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
        this.classroomService.getClassrooms(this.pageIndex, this.pageSize, this.query).subscribe(response => {
            this.classrooms = response['data'];
            this.pages = Math.ceil(response['total'] / this.pageSize);
        });
    }
    public SortBy(sortKey: string) {
        this.query.sortBy = sortKey;
        this.query.isSortAscending = this.query.isSortAscending === -1 ? 1 : -1;
        this.classroomService.getClassrooms(this.pageIndex, this.pageSize, this.query).subscribe(response => {
            this.classrooms = response['data'];
            this.pages = Math.ceil(response['total'] / this.pageSize);
        });
    }
    public changeStatus(event: any, school: any) {
        // console.log(event, school);
        school['isActive'] =  event.checked;
        // console.log(school);
        this.classroomService.save(school).subscribe(response1 => {
            if (response1) {
                this.classroomService.getClassrooms(this.pageIndex, this.pageSize, this.query).subscribe(response => {
                    this.classrooms = response['data'];
                    this.pages = Math.ceil(response['total'] / this.pageSize);
                });
            }
        });

    }
    public deleteClassroom(id: string) {
        if (confirm('Are you sure!')) {
            this.classroomService.delete( id).subscribe(response => {
                this.classrooms = response['data'];
                this.pages = Math.ceil(response['total'] / this.pageSize);
                this.route.navigate(['cpanel/master/classroom/view-all']);
            });
        }
    }
}
