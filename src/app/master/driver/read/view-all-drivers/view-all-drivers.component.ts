import { Component, OnInit, AfterViewInit } from '@angular/core';
import {DriverService} from '../../driver.service';
import {Router} from '@angular/router';
import {PageEvent} from '@angular/material';
declare var $: any;

@Component({
  selector: 'app-view-all-drivers',
  templateUrl: './view-all-drivers.component.html',
  styleUrls: ['./view-all-drivers.component.css']
})
export class ViewAllDriversComponent implements OnInit, AfterViewInit {
  public drivers: any;
    public pages: number;
    public pageIndex = 0;
    public pageSize = 5;
    public pageSizeOptions = [5, 10, 25, 100];
    public columns = [
        { key: 'sn', title: 'S. No.', isSortable: false },
        { key: 'name', title: 'Name', isSortable: true},
        { key: 'username', title: 'Username', isSortable: true},
        { key: 'email', title: 'Email', isSortable: true},
        { key: 'licenseNo', title: 'License No.', isSortable: true},
        { key: 'mobileNo', title: 'Mobile', isSortable: true},
        { key: 'school', title: 'School', isSortable: false},
        { key: 'isActive', title: 'IsActive', isSortable: true},
        { key: 'action', title: 'Action', isSortable: false}
    ];
    color = 'primary';
    public query = {
        sortBy: 'name',
        isSortAscending: 1
    };
  constructor(private driverService: DriverService, private route: Router) {
    this.driverService.getDrivers(this.pageIndex, this.pageSize, this.query).subscribe(response => {
        this.drivers = response['data'];
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
        this.driverService.getDrivers(this.pageIndex, this.pageSize, this.query).subscribe(response => {
            this.drivers = response['data'];
            this.pages = Math.ceil(response['total'] / this.pageSize);
        });
    }
    public changeStatus(event: any, driver: any) {
        driver['isActive'] =  event.checked;
        this.driverService.save(driver).subscribe(response1 => {
            if (response1) {
                this.driverService.getDrivers(this.pageIndex, this.pageSize, this.query).subscribe(response => {
                    this.drivers = response['data'];
                    this.pages = Math.ceil(response['total'] / this.pageSize);
                });
            }
        });
    }
    public SortBy(sortKey: string) {
        this.query.sortBy = sortKey;
        this.query.isSortAscending = this.query.isSortAscending === -1 ? 1 : -1;
        this.driverService.getDrivers(this.pageIndex, this.pageSize, this.query).subscribe(response => {
            this.drivers = response['data'];
            this.pages = Math.ceil(response['total'] / this.pageSize);
        });
    }
  public deleteDriver(id: string) {
      if (confirm('Are you sure!')) {
          this.driverService.delete( id).subscribe(response => {
              this.drivers = response['data'];
              this.pages = Math.ceil(response['total'] / this.pageSize);
              this.route.navigate(['cpanel/master/driver/view-all']);
          });
      }
  }
}
