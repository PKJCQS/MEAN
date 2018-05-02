import { Component, OnInit, AfterViewInit } from '@angular/core';
import {IdcardService} from '../../idcard.service';
import {Router} from '@angular/router';
import {PageEvent} from '@angular/material';
declare var $: any;

@Component({
  selector: 'app-view-all-idcards',
  templateUrl: './view-all-idcards.component.html',
  styleUrls: ['./view-all-idcards.component.css']
})
export class ViewAllIdcardsComponent implements OnInit, AfterViewInit {
  public idcards: any;
    public pages: number;
    public pageIndex = 0;
    public pageSize = 5;
    public pageSizeOptions = [5, 10, 25, 100];
    public columns = [
        { key: 'sn', title: 'S. No.', isSortable: false },
        { key: 'uuid', title: 'UUID', isSortable: true},
        { key: 'mac', title: 'MAC', isSortable: true},
        { key: 'major', title: 'Major', isSortable: true},
        { key: 'minor', title: 'Minor', isSortable: true},
        { key: 'password', title: 'Password', isSortable: true},
        { key: 'school', title: 'School', isSortable: false},
        { key: 'isActive', title: 'IsActive', isSortable: true},
        { key: 'action', title: 'Action', isSortable: false}
    ];
    color = 'primary';
    public query = {
        sortBy: 'name',
        isSortAscending: 1
    };
  constructor(private idcardService: IdcardService, private route: Router) {
    this.idcardService.getIdcards(this.pageIndex, this.pageSize, this.query).subscribe(response => {
        this.idcards = response['data'];
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
        this.idcardService.getIdcards(this.pageIndex, this.pageSize, this.query).subscribe(response => {
            this.idcards = response['data'];
            this.pages = Math.ceil(response['total'] / this.pageSize);
        });
    }
    public changeStatus(event: any, idcard: any) {
        idcard['isActive'] =  event.checked;
        this.idcardService.save(idcard).subscribe(response1 => {
            if (response1) {
                this.idcardService.getIdcards(this.pageIndex, this.pageSize, this.query).subscribe(response => {
                    this.idcards = response['data'];
                    this.pages = Math.ceil(response['total'] / this.pageSize);
                });
            }
        });
    }
    public SortBy(sortKey: string) {
        this.query.sortBy = sortKey;
        this.query.isSortAscending = this.query.isSortAscending === -1 ? 1 : -1;
        this.idcardService.getIdcards(this.pageIndex, this.pageSize, this.query).subscribe(response => {
            this.idcards = response['data'];
            this.pages = Math.ceil(response['total'] / this.pageSize);
        });
    }
  public deleteIdcard(id: string) {
      if (confirm('Are you sure!')) {
          this.idcardService.delete( id).subscribe(response => {
              this.idcards = response['data'];
              this.pages = Math.ceil(response['total'] / this.pageSize);
              this.route.navigate(['cpanel/master/idcard/view-all']);
          });
      }
  }
}
