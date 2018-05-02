import { Component, OnInit, AfterViewInit } from '@angular/core';
import {RouteService} from '../../route.service';
import {Router} from '@angular/router';
import {PageEvent} from '@angular/material';
import {Title} from '@angular/platform-browser';
declare var $: any;

@Component({
    selector: 'app-view-all-routes',
    templateUrl: './view-all-routes.component.html',
    styleUrls: ['./view-all-routes.component.css']
})
export class ViewAllRoutesComponent implements OnInit, AfterViewInit {
    public routes: any;
    public pages: number;
    public pageIndex = 0;
    public pageSize = 5;
    public pageSizeOptions = [5, 10, 25, 100];
    public columns = [
        { key: 'sn', title: 'S. No.', isSortable: false },
        { key: 'name', title: 'Route', isSortable: true},
        { key: 'pickups', title: 'Vai Pickups', isSortable: false},
        { key: 'isActive', title: 'IsActive', isSortable: true},
        { key: 'action', title: 'Action', isSortable: false}
    ];
    color = 'primary';
    public query = {
        sortBy: 'name',
        isSortAscending: 1
    };
    constructor(private routeService: RouteService, private route: Router, private titleService: Title) {
        this.titleService.setTitle( 'Routes' );
        this.routeService.getRoutes(this.pageIndex, this.pageSize, this.query).subscribe(response => {
            this.routes = response['data'];
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
        this.routeService.getRoutes(this.pageIndex, this.pageSize, this.query).subscribe(response => {
            this.routes = response['data'];
            this.pages = Math.ceil(response['total'] / this.pageSize);
        });
    }
    public changeStatus(event: any, route: any) {
        route['isActive'] =  event.checked;
        this.routeService.save(route).subscribe(response1 => {
            if (response1) {
                this.routeService.getRoutes(this.pageIndex, this.pageSize, this.query).subscribe(response => {
                    this.routes = response['data'];
                    this.pages = Math.ceil(response['total'] / this.pageSize);
                });
            }
        });
    }
    public SortBy(sortKey: string) {
        this.query.sortBy = sortKey;
        this.query.isSortAscending = this.query.isSortAscending === -1 ? 1 : -1;
        this.routeService.getRoutes(this.pageIndex, this.pageSize, this.query).subscribe(response => {
            this.routes = response['data'];
            this.pages = Math.ceil(response['total'] / this.pageSize);
        });
    }
    public deleteRoute(id: string) {
        if (confirm('Are you sure!')) {
            this.routeService.delete( id).subscribe(response => {
                this.routes = response['data'];
                this.pages = Math.ceil(response['total'] / this.pageSize);
                this.route.navigate(['cpanel/master/route/view-all']);
            });
        }
    }
}
