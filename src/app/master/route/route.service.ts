import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
@Injectable()
export class RouteService {
    constructor(private http: HttpClient, private authService: AuthService, private route: Router) {
    }
    public getRoutes(p: number, ps: number, sort: any) {
        return this.http.get('/api/routes.json/' + p + '/' + ps + '/' + sort.sortBy + '/' + sort.isSortAscending, {
            responseType: 'json'
        }).pipe(
            map(res =>  res)
        );
    }
    public getAllRoutesWithFilter(str: any) {
        const obj = this;
        return this.http.get('/api/routes/autocomplete.json/' + str, {
            responseType: 'json'
        }).pipe(
            map(res =>  res)
        );
    }
    public getAllRoutesNotInClassrrom(str: any) {
        return this.http.get('/api/routes/autocomplete-not-in-teacher-student.json/' + str, {
            responseType: 'json'
        }).pipe(
            map(res =>  res)
        );
    }
    public getRoute(id: string) {
        const obj = this;
        return this.http.get('/api/routes/view.json/' + id, {
            responseType: 'json'
        }).pipe(
            map(res =>  res)
        );
    }
    public delete(id: string) {
        const obj = this;
        return this.http.get('/api/routes/delete.json/' + id, {
            responseType: 'json'
        }).pipe(
            map(res =>  res)
        );
    }
    public save(data: any) {
        // console.log(data);
        const obj = this;
        let url = '/api/routes/add.json';
        let param = {};
        if (data['_id']) {
            url = '/api/routes/update.json';
            param = {
                responseType: 'json',
                route: {
                    _id: data['_id'],
                    name: data['name'],
                    pickups: data['pickups'],
                    isActive: data['isActive'],
                    modifiedOn: new Date(),
                    modifiedBy: this.authService.loggedId
                }
            };
        } else {
            param = {
                responseType: 'json',
                route: {
                    name: data['name'],
                    pickups: data['pickups'],
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
