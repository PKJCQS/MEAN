import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { ApplicationRoutingModule, routingComponents } from './common/routings/application-routing/application-routing.module';
import { CookieService } from 'angular2-cookie/core';
import { AddCategoryComponent } from './categories/create/add-category/add-category.component';
import { ViewAllCategoriesComponent } from './categories/read/view-all-categories/view-all-categories.component';
import { SchoolService } from './master/school/school.service';
import {AddClassroomComponent} from './master/classroom/create/add-classroom/add-classroom.component';
import {ViewAllClassroomsComponent} from './master/classroom/read/view-all-classrooms/view-all-classrooms.component';
import { ClassroomService } from './master/classroom/classroom.service';

import {AddParentComponent} from './master/parent/create/add-parent/add-parent.component';
import {ViewAllParentsComponent} from './master/parent/read/view-all-parents/view-all-parents.component';
import { ParentService } from './master/parent/parent.service';

import {AddPickupComponent} from './master/pickup/create/add-pickup/add-pickup.component';
import {ViewAllPickupsComponent} from './master/pickup/read/view-all-pickups/view-all-pickups.component';
import { PickupService } from './master/pickup/pickup.service';

import {AddRouteComponent} from './master/route/create/add-route/add-route.component';
import {ViewAllRoutesComponent} from './master/route/read/view-all-routes/view-all-routes.component';
import { RouteService } from './master/route/route.service';

import {AddStudentComponent} from './master/student/create/add-student/add-student.component';
import {ViewAllStudentsComponent} from './master/student/read/view-all-students/view-all-students.component';
import { StudentService } from './master/student/student.service';

import {AddSubjectComponent} from './master/subject/create/add-subject/add-subject.component';
import {ViewAllSubjectsComponent} from './master/subject/read/view-all-subjects/view-all-subjects.component';
import { SubjectService } from './master/subject/subject.service';

import {AddTeacherComponent} from './master/teacher/create/add-teacher/add-teacher.component';
import {ViewAllTeachersComponent} from './master/teacher/read/view-all-teachers/view-all-teachers.component';
import { TeacherService } from './master/teacher/teacher.service';

import {AddGatewayComponent} from './master/gateway/create/add-gateway/add-gateway.component';
import {ViewAllGatewaysComponent} from './master/gateway/read/view-all-gateways/view-all-gateways.component';
import { GatewayService } from './master/gateway/gateway.service';

import {AddIdcardComponent} from './master/idcard/create/add-idcard/add-idcard.component';
import {ViewAllIdcardsComponent} from './master/idcard/read/view-all-idcards/view-all-idcards.component';
import { IdcardService } from './master/idcard/idcard.service';

import {AddBusComponent} from './master/bus/create/add-bus/add-bus.component';
import {ViewAllBussComponent} from './master/bus/read/view-all-buses/view-all-buses.component';
import { BusService } from './master/bus/bus.service';
import {AddDriverComponent} from './master/driver/create/add-driver/add-driver.component';
import {ViewAllDriversComponent} from './master/driver/read/view-all-drivers/view-all-drivers.component';
import { DriverService } from './master/driver/driver.service';

import {
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatPaginatorModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import { ProfileComponent } from './user/profile/profile.component';
import { UserService } from './user/user.service';
import { ViewAllSchoolsComponent } from './master/school/read/view-all-schools/view-all-schools.component';
import { AddSchoolComponent } from './master/school/create/add-school/add-school.component';
import {AgmCoreModule} from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    AddCategoryComponent,
    ViewAllCategoriesComponent,
    ProfileComponent,
    ViewAllSchoolsComponent,
    AddSchoolComponent,
    AddClassroomComponent,
    ViewAllClassroomsComponent,

      AddParentComponent,
      ViewAllParentsComponent,

      AddPickupComponent,
      ViewAllPickupsComponent,

      AddRouteComponent,
      ViewAllRoutesComponent,

      AddStudentComponent,
      ViewAllStudentsComponent,

      AddSubjectComponent,
      ViewAllSubjectsComponent,

      AddTeacherComponent,
      ViewAllTeachersComponent,

      AddGatewayComponent,
      ViewAllGatewaysComponent,

      AddIdcardComponent,
      ViewAllIdcardsComponent,

      AddBusComponent,
      ViewAllBussComponent,

      AddDriverComponent,
      ViewAllDriversComponent
  ],
  imports: [
      BrowserModule,
      HttpClientModule,
      ApplicationRoutingModule,
      MatButtonModule,
      MatFormFieldModule,
      MatInputModule,
      MatTooltipModule,
      BrowserAnimationsModule,
      MatCheckboxModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatPaginatorModule,
      MatAutocompleteModule,
      MatSlideToggleModule,
      MatSelectModule,
      FormsModule,
      AmazingTimePickerModule,
      ReactiveFormsModule,
      AgmCoreModule.forRoot({
          apiKey: 'AIzaSyCewgd_uWWVfRe8OurbMguxE3BABXONUfg',
          libraries: [ 'places' ]
      }),
  ],
   exports: [
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatTooltipModule,
        BrowserAnimationsModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatAutocompleteModule,
        MatSlideToggleModule,
        MatSelectModule,
        MatPaginatorModule
   ],
  providers: [
    AuthService,
    UserService,
    AuthGuard,
    SchoolService,
    ClassroomService,
    ParentService,
    PickupService,
    RouteService,
    StudentService,
    SubjectService,
    TeacherService,
    GatewayService,
    IdcardService,
    CookieService,
    DriverService,
    BusService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
