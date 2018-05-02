import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
@Injectable()
export class SubjectService {
    constructor(private http: HttpClient, private authService: AuthService, private route: Router) {
    }
    public getSubjects(p: number, ps: number, sort: any) {
        const obj = this;
        return this.http.get('/api/subjects.json/' + p + '/' + ps + '/' + sort.sortBy + '/' + sort.isSortAscending, {
            responseType: 'json'
        }).pipe(
            map(res =>  res)
        );
    }
    public getAllSubjectsWithFilter(str: any) {
        const obj = this;
        return this.http.get('/api/subjects/autocomplete.json/' + str, {
            responseType: 'json'
        }).pipe(
            map(res =>  res)
        );
    }
    public getAllSubjectsWithFilter1(str: any): Observable<any[]> {
        return this.http.get<any>('/api/subjects/autocomplete.json/' + str, {
            responseType: 'json'
        });
    }
    public getSubject(id: string) {
        const obj = this;
        return this.http.get('/api/subjects/view.json/' + id, {
            responseType: 'json'
        }).pipe(
            map(res =>  res)
        );
    }
    public delete(id: string) {
        const obj = this;
        return this.http.get('/api/subjects/delete.json/' + id, {
            responseType: 'json'
        }).pipe(
            map(res =>  res)
        );
    }
    public save(data) {
        console.log(data);
        const obj = this;
        let url = '/api/subjects/add.json';
        let param = {};
        if (data['_id']) {
            url = '/api/subjects/update.json';
            param = {
                responseType: 'json',
                subject: {
                    _id: data['_id'],
                    name: data['name'],
                    isActive: data['isActive'],
                    modifiedOn: new Date(),
                    modifiedBy: this.authService.loggedId
                }
            };
        } else {
            param = {
                responseType: 'json',
                subject: {
                    name: data['name'],
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
