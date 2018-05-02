import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
@Injectable()
export class BusService {
    constructor(private http: HttpClient, private authService: AuthService, private route: Router) {
    }
    public getBuss(p: number, ps: number, sort: any) {
        return this.http.get('/api/buss.json/' + p + '/' + ps + '/' + sort.sortBy + '/' + sort.isSortAscending, {
            responseType: 'json'
        }).pipe(
            map(res =>  res)
        );
    }
    public getAllIdCardsWithFilter(str: any) {
        const obj = this;
        return this.http.get('/api/buss/autocomplete.json/' + str, {
            responseType: 'json'
        }).pipe(
            map(res =>  res)
        );
    }
    public getAllBussNotInClassrrom(str: any) {
        return this.http.get('/api/buss/autocomplete-not-in-teacher-student.json/' + str, {
            responseType: 'json'
        }).pipe(
            map(res =>  res)
        );
    }
    public getBus(id: string) {
        const obj = this;
        return this.http.get('/api/buss/view.json/' + id, {
            responseType: 'json'
        }).pipe(
            map(res =>  res)
        );
    }
    public delete(id: string) {
        const obj = this;
        return this.http.get('/api/buss/delete.json/' + id, {
            responseType: 'json'
        }).pipe(
            map(res =>  res)
        );
    }
    public save(data: any) {
        // console.log(data);
        const obj = this;
        let url = '/api/buss/add.json';
        let param = {};
        if (data['_id']) {
            url = '/api/buss/update.json';
            param = {
                responseType: 'json',
                bus: {
                    _id: data['_id'],
                    busNo: data['busNo'],
                    driver: data['driver'],
                    school: data['school'],
                    route: data['route'],
                    isActive: data['isActive'],
                    modifiedOn: new Date(),
                    modifiedBy: this.authService.loggedId
                }
            };
        } else {
            param = {
                responseType: 'json',
                bus: {
                    busNo: data['busNo'],
                    driver: data['driver'],
                    school: data['school'],
                    route: data['route'],
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
