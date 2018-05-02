import { SubjectService } from '../../subject.service';
import {Component, OnInit, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
declare var $: any;


@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.css']
})
export class AddSubjectComponent implements OnInit, AfterViewInit {
    public subject: any;
    public subjectId: string;
    @ViewChild('search')
        public searchElementRef: ElementRef;
    constructor( private subjectService: SubjectService, private route: Router, private route1: ActivatedRoute) {
        this.subject = [];
        const subjectId = this.route1.params.subscribe(params => {
            this.subjectId =  params['id'];
        });
        if ( this.subjectId ) {
            this.subjectService.getSubject( this.subjectId).subscribe(response => {
                this.subject = response;
            });
        }
  }

  ngOnInit() {
  }
  ngAfterViewInit() {
      $('#form_validation').validate({
          rules: {
              'checkbox': {
                  required: true
              },
              'gender': {
                  required: true
              }
          },
          highlight: function (input) {
              $(input).parents('.form-line').addClass('error');
          },
          unhighlight: function (input) {
              $(input).parents('.form-line').removeClass('error');
          },
          errorPlacement: function (error, element) {
              $(element).parents('.form-group').append(error);
          }
      });
  }
    public saveSubject(event) {
        if ($('#form_validation').valid()) {
            this.subjectService.save(this.subject).subscribe(response => {
                this.subject = response;
                this.route.navigate(['cpanel/master/subject/view-all']);
            });
        }
        // this.cookieService.put('putting', 'putty');
    }
}
