import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
@Injectable()
export class SchoolService {
    constructor(private http: HttpClient, private authService: AuthService, private route: Router) {
    }
    public getSchools(p: number, ps: number, sort: any) {
        const obj = this;
        return this.http.get('/api/schools.json/' + p + '/' + ps + '/' + sort.sortBy + '/' + sort.isSortAscending, {
            responseType: 'json'
        }).pipe(
            map(res =>  res)
        );
    }
    public getAllSchoolsWithFilter(str: any) {
        const obj = this;
        return this.http.get('/api/schools/autocomplete.json/' + str, {
            responseType: 'json'
        }).pipe(
            map(res =>  res)
        );
    }
    public getAllSchoolsWithFilter1(str: any): Observable<any[]> {
        return this.http.get<any>('/api/schools/autocomplete.json/' + str, {
            responseType: 'json'
        });
    }
    public getSchool(id: string) {
        const obj = this;
        return this.http.get('/api/schools/view.json/' + id, {
            responseType: 'json'
        }).pipe(
            map(res =>  res)
        );
    }
    public delete(id: string) {
        const obj = this;
        return this.http.get('/api/schools/delete.json/' + id, {
            responseType: 'json'
        }).pipe(
            map(res =>  res)
        );
    }
    public save(data) {
        console.log(data);
        const obj = this;
        let url = '/api/schools/add.json';
        let param = {};
        if (data['_id']) {
            url = '/api/schools/update.json';
            param = {
                responseType: 'json',
                school: {
                    _id: data['_id'],
                    name: data['name'],
                    isActive: data['isActive'],
                    username: data['username'],
                    password: data['password'],
                    address: data['address'],
                    latitude: data['latitude'],
                    longitude: data['longitude'],
                    startDate: new Date(typeof data['startDate'] === 'object' ? data['startDate']._d : data['startDate']),
                    endDate: new Date(typeof data['endDate'] === 'object' ? data['endDate']._d : data['endDate']),
                    modifiedOn: new Date(),
                    modifiedBy: this.authService.loggedId
                }
            };
        } else {
            param = {
                responseType: 'json',
                school: {
                    name: data['name'],
                    username: data['username'],
                    password: data['password'],
                    address: data['address'],
                    isActive: data['isActive'],
                    latitude: data['latitude'],
                    longitude: data['longitude'],
                    startDate: new Date(typeof data['startDate'] === 'object' ? data['startDate']._d : data['startDate']),
                    endDate: new Date(typeof data['endDate'] === 'object' ? data['endDate']._d : data['endDate']),
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
