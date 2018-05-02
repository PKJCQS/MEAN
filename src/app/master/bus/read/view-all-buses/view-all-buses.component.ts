import { Component, OnInit, AfterViewInit } from '@angular/core';
import {BusService} from '../../bus.service';
import {Router} from '@angular/router';
import {PageEvent} from '@angular/material';
declare var $: any;

@Component({
  selector: 'app-view-all-buses',
  templateUrl: './view-all-buses.component.html',
  styleUrls: ['./view-all-buses.component.css']
})
export class ViewAllBussComponent implements OnInit, AfterViewInit {
  public buss: any;
    public pages: number;
    public pageIndex = 0;
    public pageSize = 5;
    public pageSizeOptions = [5, 10, 25, 100];
    public columns = [
        { key: 'sn', title: 'S. No.', isSortable: false },
        { key: 'busNo', title: 'Bus No.', isSortable: true},
        { key: 'driver', title: 'Driver', isSortable: true},
        { key: 'route', title: 'Route', isSortable: true},
        { key: 'school', title: 'School', isSortable: true},
        { key: 'isActive', title: 'IsActive', isSortable: true},
        { key: 'action', title: 'Action', isSortable: false}
    ];
    color = 'primary';
    public query = {
        sortBy: 'busNo',
        isSortAscending: 1
    };
  constructor(private busService: BusService, private route: Router) {
    this.busService.getBuss(this.pageIndex, this.pageSize, this.query).subscribe(response => {
        this.buss = response['data'];
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
        this.busService.getBuss(this.pageIndex, this.pageSize, this.query).subscribe(response => {
            this.buss = response['data'];
            this.pages = Math.ceil(response['total'] / this.pageSize);
        });
    }
    public changeStatus(event: any, bus: any) {
        bus['isActive'] =  event.checked;
        this.busService.save(bus).subscribe(response1 => {
            if (response1) {
                this.busService.getBuss(this.pageIndex, this.pageSize, this.query).subscribe(response => {
                    this.buss = response['data'];
                    this.pages = Math.ceil(response['total'] / this.pageSize);
                });
            }
        });
    }
    public SortBy(sortKey: string) {
        this.query.sortBy = sortKey;
        this.query.isSortAscending = this.query.isSortAscending === -1 ? 1 : -1;
        this.busService.getBuss(this.pageIndex, this.pageSize, this.query).subscribe(response => {
            this.buss = response['data'];
            this.pages = Math.ceil(response['total'] / this.pageSize);
        });
    }
  public deleteBus(id: string) {
      if (confirm('Are you sure!')) {
          this.busService.delete( id).subscribe(response => {
              this.buss = response['data'];
              this.pages = Math.ceil(response['total'] / this.pageSize);
              this.route.navigate(['cpanel/master/bus/view-all']);
          });
      }
  }
}
