import {DashboardComponent} from '../../../application/dashboard/dashboard.component';
import {AuthGuard} from '../../../auth/auth.guard';
import {LoginComponent} from '../../../auth/login/login.component';
import {RegisterComponent} from '../../../auth/register/register.component';
import {AddCategoryComponent} from '../../../categories/create/add-category/add-category.component';
import { ViewAllCategoriesComponent } from '../../../categories/read/view-all-categories/view-all-categories.component';
import {HeaderComponent} from '../../header/header.component';
import {LeftSidebarComponent} from '../../sidebars/left-sidebar/left-sidebar.component';
import {RightSidebarComponent} from '../../sidebars/right-sidebar/right-sidebar.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import { ProfileComponent } from '../../../user/profile/profile.component';
import {AddSchoolComponent} from '../../../master/school/create/add-school/add-school.component';
import { ViewAllSchoolsComponent } from '../../../master/school/read/view-all-schools/view-all-schools.component';

import {AddClassroomComponent} from '../../../master/classroom/create/add-classroom/add-classroom.component';
import {ViewAllClassroomsComponent} from '../../../master/classroom/read/view-all-classrooms/view-all-classrooms.component';

import {AddParentComponent} from '../../../master/parent/create/add-parent/add-parent.component';
import {ViewAllParentsComponent} from '../../../master/parent/read/view-all-parents/view-all-parents.component';

import {AddPickupComponent} from '../../../master/pickup/create/add-pickup/add-pickup.component';
import {ViewAllPickupsComponent} from '../../../master/pickup/read/view-all-pickups/view-all-pickups.component';

import {AddRouteComponent} from '../../../master/route/create/add-route/add-route.component';
import {ViewAllRoutesComponent} from '../../../master/route/read/view-all-routes/view-all-routes.component';

import {AddStudentComponent} from '../../../master/student/create/add-student/add-student.component';
import {ViewAllStudentsComponent} from '../../../master/student/read/view-all-students/view-all-students.component';

import {AddSubjectComponent} from '../../../master/subject/create/add-subject/add-subject.component';
import {ViewAllSubjectsComponent} from '../../../master/subject/read/view-all-subjects/view-all-subjects.component';

import {AddTeacherComponent} from '../../../master/teacher/create/add-teacher/add-teacher.component';
import {ViewAllTeachersComponent} from '../../../master/teacher/read/view-all-teachers/view-all-teachers.component';

import {AddGatewayComponent} from '../../../master/gateway/create/add-gateway/add-gateway.component';
import {ViewAllGatewaysComponent} from '../../../master/gateway/read/view-all-gateways/view-all-gateways.component';

import {AddIdcardComponent} from '../../../master/idcard/create/add-idcard/add-idcard.component';
import {ViewAllIdcardsComponent} from '../../../master/idcard/read/view-all-idcards/view-all-idcards.component';

import {AddDriverComponent} from '../../../master/driver/create/add-driver/add-driver.component';
import {ViewAllDriversComponent} from '../../../master/driver/read/view-all-drivers/view-all-drivers.component';

import {AddBusComponent} from '../../../master/bus/create/add-bus/add-bus.component';
import {ViewAllBussComponent} from '../../../master/bus/read/view-all-buses/view-all-buses.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'cpanel'},
  {
    path: 'cpanel', component: DashboardComponent,
    children: [
      {
          path: 'user/profile',
          component: ProfileComponent
      },
      {
          path: 'master/school/add-new',
          component: AddSchoolComponent
      },
      {
          path: 'master/school/edit/:id',
          component: AddSchoolComponent
      },
      {
          path: 'master/school/view-all',
          component: ViewAllSchoolsComponent
      },

        {
            path: 'master/gateway/add-new',
            component: AddGatewayComponent
        },
        {
            path: 'master/gateway/edit/:id',
            component: AddGatewayComponent
        },
        {
            path: 'master/gateway/view-all',
            component: ViewAllGatewaysComponent
        },

        {
            path: 'master/idcard/add-new',
            component: AddIdcardComponent
        },
        {
            path: 'master/idcard/edit/:id',
            component: AddIdcardComponent
        },
        {
            path: 'master/idcard/view-all',
            component: ViewAllIdcardsComponent
        },

        {
            path: 'master/classroom/add-new',
            component: AddClassroomComponent
        },
        {
            path: 'master/classroom/edit/:id',
            component: AddClassroomComponent
        },
        {
            path: 'master/classroom/view-all',
            component: ViewAllClassroomsComponent
        },

        {
            path: 'master/parent/add-new',
            component: AddParentComponent
        },
        {
            path: 'master/parent/edit/:id',
            component: AddParentComponent
        },
        {
            path: 'master/parent/view-all',
            component: ViewAllParentsComponent
        },

        {
            path: 'master/pickup/add-new',
            component: AddPickupComponent
        },
        {
            path: 'master/pickup/edit/:id',
            component: AddPickupComponent
        },
        {
            path: 'master/pickup/view-all',
            component: ViewAllPickupsComponent
        },

        {
            path: 'master/route/add-new',
            component: AddRouteComponent
        },
        {
            path: 'master/route/edit/:id',
            component: AddRouteComponent
        },
        {
            path: 'master/route/view-all',
            component: ViewAllRoutesComponent
        },

        {
            path: 'master/student/add-new',
            component: AddStudentComponent
        },
        {
            path: 'master/student/edit/:id',
            component: AddStudentComponent
        },
        {
            path: 'master/student/view-all',
            component: ViewAllStudentsComponent
        },
        {
            path: 'master/subject/add-new',
            component: AddSubjectComponent
        },
        {
            path: 'master/subject/edit/:id',
            component: AddSubjectComponent
        },
        {
            path: 'master/subject/view-all',
            component: ViewAllSubjectsComponent
        },
        {
            path: 'master/teacher/add-new',
            component: AddTeacherComponent
        },
        {
            path: 'master/teacher/edit/:id',
            component: AddTeacherComponent
        },
        {
            path: 'master/teacher/view-all',
            component: ViewAllTeachersComponent
        },
        {
            path: 'master/driver/add-new',
            component: AddDriverComponent
        },
        {
            path: 'master/driver/edit/:id',
            component: AddDriverComponent
        },
        {
            path: 'master/driver/view-all',
            component: ViewAllDriversComponent
        },
        {
            path: 'master/bus/add-new',
            component: AddBusComponent
        },
        {
            path: 'master/bus/edit/:id',
            component: AddBusComponent
        },
        {
            path: 'master/bus/view-all',
            component: ViewAllBussComponent
        },
      {
        path: 'category/add-new',
        component: AddCategoryComponent
      },
      {
        path: 'category/view-all-categories',
        component: ViewAllCategoriesComponent
      }
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class ApplicationRoutingModule {}

export const routingComponents = [
  HeaderComponent,
  LeftSidebarComponent,
  RightSidebarComponent,
  DashboardComponent,
  LoginComponent,
  RegisterComponent
];
