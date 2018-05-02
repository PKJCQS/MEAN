import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
@Injectable()
export class ParentService {
    constructor(private http: HttpClient, private authService: AuthService, private route: Router) {
    }
    public getParents(p: number, ps: number, sort: any) {
        return this.http.get('/api/parents.json/' + p + '/' + ps + '/' + sort.sortBy + '/' + sort.isSortAscending, {
            responseType: 'json'
        }).pipe(
            map(res =>  res)
        );
    }
    public getAllParentsWithFilter(str: any) {
        const obj = this;
        return this.http.get('/api/parents/autocomplete.json/' + str, {
            responseType: 'json'
        }).pipe(
            map(res =>  res)
        );
    }
    public getParent(id: string) {
        const obj = this;
        return this.http.get('/api/parents/view.json/' + id, {
            responseType: 'json'
        }).pipe(
            map(res =>  res)
        );
    }
    public delete(id: string) {
        const obj = this;
        return this.http.get('/api/parents/delete.json/' + id, {
            responseType: 'json'
        }).pipe(
            map(res =>  res)
        );
    }
    public save(data: any) {
        // console.log(data);
        const obj = this;
        let url = '/api/parents/add.json';
        let param = {};
        if (data['_id']) {
            url = '/api/parents/update.json';
            param = {
                responseType: 'json',
                parent: {
                    _id: data['_id'],
                    username: data['username'],
                    name: data['name'],
                    password: data['password'],
                    email: data['email'],
                    isActive: data['isActive'],
                    aadhar: data['aadhar'],
                    address: data['address'],
                    pitStop: data['pitStop'],
                    mobile: data['mobile'],
                    school: data['school'],
                    lat: data['lat'],
                    lng: data['lng'],
                    pitLat: data['pitLat'],
                    pitLng: data['pitLng'],
                    modifiedOn: new Date(),
                    modifiedBy: this.authService.loggedId
                }
            };
        } else {
            param = {
                responseType: 'json',
                parent: {
                    username: data['username'],
                    name: data['name'],
                    password: data['password'],
                    email: data['email'],
                    isActive: data['isActive'],
                    aadhar: data['aadhar'],
                    address: data['address'],
                    pitStop: data['pitStop'],
                    mobile: data['mobile'],
                    lat: data['lat'],
                    school: data['school'],
                    lng: data['lng'],
                    pitLat: data['pitLat'],
                    pitLng: data['pitLng'],
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
