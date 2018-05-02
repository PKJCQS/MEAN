import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
@Injectable()
export class ClassroomService {
    constructor(private http: HttpClient, private authService: AuthService, private route: Router) {
    }
    public getClassrooms(p: number, ps: number, sort: any) {
        return this.http.get('/api/classrooms.json/' + p + '/' + ps + '/' + sort.sortBy + '/' + sort.isSortAscending, {
            responseType: 'json'
        }).pipe(
            map(res =>  res)
        );
    }
    public getAllClassroomsWithFilter(str: any) {
        const obj = this;
        return this.http.get('/api/classrooms/autocomplete.json/' + str, {
            responseType: 'json'
        }).pipe(
            map(res =>  res)
        );
    }
    public getClassroom(id: string) {
        const obj = this;
        return this.http.get('/api/classrooms/view.json/' + id, {
            responseType: 'json'
        }).pipe(
            map(res =>  res)
        );
    }
    public delete(id: string) {
        const obj = this;
        return this.http.get('/api/classrooms/delete.json/' + id, {
            responseType: 'json'
        }).pipe(
            map(res =>  res)
        );
    }
    public save(data: any) {
        // console.log(data);
        const obj = this;
        let url = '/api/classrooms/add.json';
        let param = {};
        if (data['_id']) {
            url = '/api/classrooms/update.json';
            param = {
                responseType: 'json',
                classroom: {
                    _id: data['_id'],
                    name: data['name'],
                    isActive: data['isActive'],
                    school: data['school'],
                    gateway: data['gateway'],
                    modifiedOn: new Date(),
                    modifiedBy: this.authService.loggedId
                }
            };
        } else {
            param = {
                responseType: 'json',
                classroom: {
                    name: data['name'],
                    school: data['school'],
                    gateway: data['gateway'],
                    isActive: data['isActive'],
                    createdOn: new Date(),
                    createdBy: this.authService.loggedId
                }
            };
        }
        return this.http.post(url, param).pipe(
            map(res =>  res)
        );
    }
}
