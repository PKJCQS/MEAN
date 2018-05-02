import { Component, OnInit, AfterViewInit } from '@angular/core';
import {GatewayService} from '../../gateway.service';
import {Router} from '@angular/router';
import {PageEvent} from '@angular/material';
import {Title} from '@angular/platform-browser';
declare var $: any;

@Component({
  selector: 'app-view-all-gateways',
  templateUrl: './view-all-gateways.component.html',
  styleUrls: ['./view-all-gateways.component.css']
})
export class ViewAllGatewaysComponent implements OnInit, AfterViewInit {
  public gateways: any;
    public pages: number;
    public pageIndex = 0;
    public pageSize = 5;
    public pageSizeOptions = [5, 10, 25, 100];
    public columns = [
        { key: 'sn', title: 'S. No.', isSortable: false },
        { key: 'name', title: 'Name', isSortable: true },
        { key: 'location', title: 'Location', isSortable: true},
        { key: 'mac', title: 'MAC', isSortable: true},
        { key: 'ip', title: 'IP', isSortable: true},
        { key: 'school', title: 'School', isSortable: false},
        { key: 'readingDistance', title: 'Reading Capicity', isSortable: true},
        { key: 'isActive', title: 'IsActive', isSortable: true},
        { key: 'action', title: 'Action', isSortable: false}
    ];
    color = 'primary';
    public query = {
        sortBy: 'name',
        isSortAscending: 1
    };
  constructor(private gatewayService: GatewayService, private route: Router, private titleService: Title ) {
      this.titleService.setTitle( 'Gateways' );
    this.gatewayService.getGateways(this.pageIndex, this.pageSize, this.query).subscribe(response => {
        this.gateways = response['data'];
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
        this.gatewayService.getGateways(this.pageIndex, this.pageSize, this.query).subscribe(response => {
            this.gateways = response['data'];
            this.pages = Math.ceil(response['total'] / this.pageSize);
        });
    }
    public SortBy(sortKey: string) {
        this.query.sortBy = sortKey;
        this.query.isSortAscending = this.query.isSortAscending === -1 ? 1 : -1;
        this.gatewayService.getGateways(this.pageIndex, this.pageSize, this.query).subscribe(response => {
            this.gateways = response['data'];
            this.pages = Math.ceil(response['total'] / this.pageSize);
        });
    }
    public changeStatus(event: any, school: any) {
        // console.log(event, school);
        school['isActive'] =  event.checked;
        // console.log(school);
        this.gatewayService.save(school).subscribe(response1 => {
            if (response1) {
                this.gatewayService.getGateways(this.pageIndex, this.pageSize, this.query).subscribe(response => {
                    this.gateways = response['data'];
                    this.pages = Math.ceil(response['total'] / this.pageSize);
                });
            }
        });

    }
    public deleteGateway(id: string) {
      if (confirm('Are you sure!')) {
          this.gatewayService.delete( id).subscribe(response => {
              this.gateways = response['data'];
              this.pages = Math.ceil(response['total'] / this.pageSize);
              this.route.navigate(['cpanel/master/gateway/view-all']);
          });
      }
    }
}
