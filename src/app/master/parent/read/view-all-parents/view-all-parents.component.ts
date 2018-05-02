import { Component, OnInit, AfterViewInit } from '@angular/core';
import {ParentService} from '../../parent.service';
import {Router} from '@angular/router';
import {PageEvent} from '@angular/material';
declare var $: any;

@Component({
    selector: 'app-view-all-parents',
    templateUrl: './view-all-parents.component.html',
    styleUrls: ['./view-all-parents.component.css']
})
export class ViewAllParentsComponent implements OnInit, AfterViewInit {
    public parents: any;
    public pages: number;
    public pageIndex = 0;
    public pageSize = 5;
    public pageSizeOptions = [5, 10, 25, 100];
    public columns = [
        { key: 'sn', title: 'S. No.', isSortable: false },
        { key: 'name', title: 'Name', isSortable: true},
        { key: 'email', title: 'Email', isSortable: true},
        { key: 'aadhar', title: 'Aadhar', isSortable: true},
        { key: 'address', title: 'Address', isSortable: true},
        { key: 'mobile', title: 'Mobile', isSortable: true},
        { key: 'school', title: 'School', isSortable: true},
        { key: 'pitStop', title: 'Pitstop', isSortable: false},
        { key: 'isActive', title: 'IsActive', isSortable: true},
        { key: 'action', title: 'Action', isSortable: false}
    ];
    color = 'primary';
    public query = {
        sortBy: 'name',
        isSortAscending: 1
    };
    constructor(private parentService: ParentService, private route: Router) {
        this.parentService.getParents(this.pageIndex, this.pageSize, this.query).subscribe(response => {
            this.parents = response['data'];
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
        this.parentService.getParents(this.pageIndex, this.pageSize, this.query).subscribe(response => {
            this.parents = response['data'];
            this.pages = Math.ceil(response['total'] / this.pageSize);
        });
    }
    public changeStatus(event: any, parent: any) {
        parent['isActive'] =  event.checked;
        this.parentService.save(parent).subscribe(response1 => {
            if (response1) {
                this.parentService.getParents(this.pageIndex, this.pageSize, this.query).subscribe(response => {
                    this.parents = response['data'];
                    this.pages = Math.ceil(response['total'] / this.pageSize);
                });
            }
        });
    }
    public SortBy(sortKey: string) {
        this.query.sortBy = sortKey;
        this.query.isSortAscending = this.query.isSortAscending === -1 ? 1 : -1;
        this.parentService.getParents(this.pageIndex, this.pageSize, this.query).subscribe(response => {
            this.parents = response['data'];
            this.pages = Math.ceil(response['total'] / this.pageSize);
        });
    }
    public deleteParent(id: string) {
        if (confirm('Are you sure!')) {
            this.parentService.delete( id).subscribe(response => {
                this.parents = response['data'];
                this.pages = Math.ceil(response['total'] / this.pageSize);
                this.route.navigate(['cpanel/master/parent/view-all']);
            });
        }
    }
}
