import { Component, OnInit, AfterViewInit } from '@angular/core';
import {SubjectService} from '../../subject.service';
import {Router} from '@angular/router';
import {PageEvent} from '@angular/material';
declare var $: any;

@Component({
  selector: 'app-view-all-subjects',
  templateUrl: './view-all-subjects.component.html',
  styleUrls: ['./view-all-subjects.component.css']
})
export class ViewAllSubjectsComponent implements OnInit, AfterViewInit {
    public subjects: any;
    public pages: number;
    public pageIndex = 0;
    public pageSize = 5;
    public pageSizeOptions = [5, 10, 25, 100];
    public columns = [
        { key: 'sn', title: 'S. No.', isSortable: false },
        { key: 'name', title: 'Name', isSortable: true},
        { key: 'isActive', title: 'IsActive', isSortable: true},
        { key: 'action', title: 'Action', isSortable: false}
    ];
    color = 'primary';
    public query = {
        sortBy: 'name',
        isSortAscending: 1
    };
  constructor(private subjectService: SubjectService, private route: Router) {
      this.subjectService.getSubjects(this.pageIndex, this.pageSize, this.query).subscribe(response => {
          this.subjects = response['data'];
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
        this.subjectService.getSubjects(this.pageIndex, this.pageSize, this.query).subscribe(response => {
            this.subjects = response['data'];
            this.pages = Math.ceil(response['total'] / this.pageSize);
        });
    }
    public changeStatus(event: any, subject: any) {
        subject['isActive'] =  event.checked;
        this.subjectService.save(subject).subscribe(response1 => {
            if (response1) {
                this.subjectService.getSubjects(this.pageIndex, this.pageSize, this.query).subscribe(response => {
                    this.subjects = response['data'];
                    this.pages = Math.ceil(response['total'] / this.pageSize);
                });
            }
        });
    }
    public SortBy(sortKey: string) {
        this.query.sortBy = sortKey;
        this.query.isSortAscending = this.query.isSortAscending === -1 ? 1 : -1;
        this.subjectService.getSubjects(this.pageIndex, this.pageSize, this.query).subscribe(response => {
            this.subjects = response['data'];
            this.pages = Math.ceil(response['total'] / this.pageSize);
        });
    }
    public deleteSubject(id: string) {
        if (confirm('Are you sure!')) {
            this.subjectService.delete( id).subscribe(response => {
                this.subjects = response['data'];
                this.pages = Math.ceil(response['total'] / this.pageSize);
                this.route.navigate(['cpanel/master/subject/view-all']);
            });
        }
    }
}
