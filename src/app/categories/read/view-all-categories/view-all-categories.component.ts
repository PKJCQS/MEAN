import {Component, OnInit, AfterViewInit} from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-view-all-categories',
  templateUrl: './view-all-categories.component.html',
  styleUrls: ['./view-all-categories.component.css']
})
export class ViewAllCategoriesComponent implements OnInit, AfterViewInit {

  constructor() {}

  ngOnInit() {
  }
  ngAfterViewInit() {
    $('.js-exportable').DataTable({
      dom: 'Bfrtip',
      responsive: true,
      buttons: [
        'pdf'
      ]
    });
  }
}
