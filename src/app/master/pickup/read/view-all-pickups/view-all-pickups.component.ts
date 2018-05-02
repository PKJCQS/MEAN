import { Component, OnInit, AfterViewInit } from '@angular/core';
import {PickupService} from '../../pickup.service';
import {Router} from '@angular/router';
import {PageEvent} from '@angular/material';
declare var $: any;

@Component({
    selector: 'app-view-all-pickups',
    templateUrl: './view-all-pickups.component.html',
    styleUrls: ['./view-all-pickups.component.css']
})
export class ViewAllPickupsComponent implements OnInit, AfterViewInit {
    public pickups: any;
    public pages: number;
    public pageIndex = 0;
    public pageSize = 5;
    public pageSizeOptions = [5, 10, 25, 100];
    public columns = [
        { key: 'sn', title: 'S. No.', isSortable: false },
        { key: 'address', title: 'Address', isSortable: true},
        { key: 'isActive', title: 'IsActive', isSortable: true},
        { key: 'action', title: 'Action', isSortable: false}
    ];
    color = 'primary';
    public query = {
        sortBy: 'address',
        isSortAscending: 1
    };
    constructor(private pickupService: PickupService, private route: Router) {
        this.pickupService.getPickups(this.pageIndex, this.pageSize, this.query).subscribe(response => {
            this.pickups = response['data'];
            this.pages = Math.ceil(response['total'] / this.pageSize);
        });
    }

    ngOnInit() {
    }
    ngAfterViewInit() {
    }
    public setPageData(event: PageEvent) {
        this.pageIndex = event.pageIndex;
        this.pageSize = event.pageSize;
        this.pickupService.getPickups(this.pageIndex, this.pageSize, this.query).subscribe(response => {
            this.pickups = response['data'];
            this.pages = Math.ceil(response['total'] / this.pageSize);
        });
    }
    public changeStatus(event: any, pickup: any) {
        pickup['isActive'] =  event.checked;
        this.pickupService.save(pickup).subscribe(response1 => {
            if (response1) {
                this.pickupService.getPickups(this.pageIndex, this.pageSize, this.query).subscribe(response => {
                    this.pickups = response['data'];
                    this.pages = Math.ceil(response['total'] / this.pageSize);
                });
            }
        });
    }
    public SortBy(sortKey: string) {
        this.query.sortBy = sortKey;
        this.query.isSortAscending = this.query.isSortAscending === -1 ? 1 : -1;
        this.pickupService.getPickups(this.pageIndex, this.pageSize, this.query).subscribe(response => {
            this.pickups = response['data'];
            this.pages = Math.ceil(response['total'] / this.pageSize);
        });
    }
    public deletePickup(id: string) {
        if (confirm('Are you sure!')) {
            this.pickupService.delete( id).subscribe(response => {
                this.pickups = response['data'];
                this.pages = Math.ceil(response['total'] / this.pageSize);
                this.route.navigate(['cpanel/master/pickup/view-all']);
            });
        }
    }
}
