import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
@Injectable()
export class TeacherService {
    constructor(private http: HttpClient, private authService: AuthService, private route: Router) {
    }
    public getTeachers(p: number, ps: number, sort: any) {
        const obj = this;
        return this.http.get('/api/teachers.json/' + p + '/' + ps + '/' + sort.sortBy + '/' + sort.isSortAscending, {
            responseType: 'json'
        }).pipe(
            map(res =>  res)
        );
    }
    public getAllTeachersWithFilter(str: any) {
        const obj = this;
        return this.http.get('/api/teachers/autocomplete.json/' + str, {
            responseType: 'json'
        }).pipe(
            map(res =>  res)
        );
    }
    public getAllTeachersWithFilter1(str: any): Observable<any[]> {
        return this.http.get<any>('/api/teachers/autocomplete.json/' + str, {
            responseType: 'json'
        });
    }
    public getTeacher(id: string) {
        const obj = this;
        return this.http.get('/api/teachers/view.json/' + id, {
            responseType: 'json'
        }).pipe(
            map(res =>  res)
        );
    }
    public delete(id: string) {
        const obj = this;
        return this.http.get('/api/teachers/delete.json/' + id, {
            responseType: 'json'
        }).pipe(
            map(res =>  res)
        );
    }
    public save(data) {
        const obj = this;
        let url = '/api/teachers/add.json';
        let param = {};
        if (data['_id']) {
            url = '/api/teachers/update.json';
            param = {
                responseType: 'json',
                teacher: {
                    _id: data['_id'],
                    isActive: data['isActive'],
                    firstName: data['firstName'],
                    lastName: data['lastName'],
                    email: data['email'],
                    mobile: data['mobile'],
                    idcard: data['idcard'],
                    school: data['school'],
                    address: data['address'],
                    subjects: data['subjects'],
                    idPassword: data['idPassword'],
                    password: data['password'],
                    modifiedOn : new Date(),
                    modifiedBy : this.authService.loggedId
                }
            };
        } else {
            param = {
                responseType: 'json',
                teacher: {
                    isActive: data['isActive'],
                    firstName: data['firstName'],
                    lastName: data['lastName'],
                    email: data['email'],
                    mobile: data['mobile'],
                    idcard: data['idcard'],
                    address: data['address'],
                    subjects: data['subjects'],
                    school: data['school'],
                    idPassword: data['idPassword'],
                    password: data['password'],
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
