import { Component, OnInit, AfterViewInit } from '@angular/core';
import {SchoolService} from '../../school.service';
import {Router} from '@angular/router';
import {PageEvent} from '@angular/material';
declare var $: any;


@Component({
  selector: 'app-view-all-schools',
  templateUrl: './view-all-schools.component.html',
  styleUrls: ['./view-all-schools.component.css']
})
export class ViewAllSchoolsComponent implements OnInit, AfterViewInit {
  public schools: any;
  public pages: number;
  public pageIndex = 0;
  public pageSize = 5;
  public pageSizeOptions = [5, 10, 25, 100];
  public columns = [
      { key: 'sn', title: 'S. No.', isSortable: false },
      { key: 'name', title: 'Name', isSortable: true },
      { key: 'address', title: 'Address', isSortable: true},
      { key: 'username', title: 'Username', isSortable: true},
      { key: 'isActive', title: 'IsActive', isSortable: true},
      { key: 'startDate', title: 'Start Date', isSortable: true},
      { key: 'endDate', title: 'End Date', isSortable: true},
      { key: 'action', title: 'Action', isSortable: false}
  ];
  public query = {
      sortBy: 'name',
      isSortAscending: 1
  };
  constructor(private schoolService: SchoolService, private route: Router) {
    this.schoolService.getSchools(this.pageIndex, this.pageSize, this.query).subscribe(response => {
        this.schools = response['data'];
        this.pages = Math.ceil(response['total'] / this.pageSize);
    });
  }

  ngOnInit() {
  }
    ngAfterViewInit() {
        /*$('.js-exportable').DataTable({
            dom: 'Bfrtip',
            responsive: true,
            buttons: [
                'pdf'
            ]
        });*/
    }
    public setPageData(event: PageEvent) {
        console.log( event );
        this.pageIndex = event.pageIndex;
        this.pageSize = event.pageSize;
        this.schoolService.getSchools(this.pageIndex, this.pageSize, this.query).subscribe(response => {
            this.schools = response['data'];
            this.pages = Math.ceil(response['total'] / this.pageSize);
        });
    }
    public SortBy(sortKey: string) {
      this.query.sortBy = sortKey;
      this.query.isSortAscending = this.query.isSortAscending === -1 ? 1 : -1;
        this.schoolService.getSchools(this.pageIndex, this.pageSize, this.query).subscribe(response => {
            this.schools = response['data'];
            this.pages = Math.ceil(response['total'] / this.pageSize);
        });
    }
    public changeStatus(event: any, school: any) {
        // console.log(event, school);
        school['isActive'] = event.target.checked;
        // console.log(school);
        this.schoolService.save(school).subscribe(response1 => {
            if (response1) {
                this.schoolService.getSchools(this.pageIndex, this.pageSize, this.query).subscribe(response => {
                    this.schools = response['data'];
                    this.pages = Math.ceil(response['total'] / this.pageSize);
                });
            }
        });

    }
  public deleteSchool(id: string) {
      if (confirm('Are you sure!')) {
          this.schoolService.delete( id).subscribe(response => {
              this.schools = response['data'];
              this.pages = Math.ceil(response['total'] / this.pageSize);
          });
      }
  }
}
