import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
@Injectable()
export class PickupService {
    constructor(private http: HttpClient, private authService: AuthService, private route: Router) {
    }
    public getPickups(p: number, ps: number, sort: any) {
        return this.http.get('/api/pickups.json/' + p + '/' + ps + '/' + sort.sortBy + '/' + sort.isSortAscending, {
            responseType: 'json'
        }).pipe(
            map(res =>  res)
        );
    }
    public getAllPickupsWithFilter(str: any) {
        const obj = this;
        return this.http.get('/api/pickups/autocomplete.json/' + str, {
            responseType: 'json'
        }).pipe(
            map(res =>  res)
        );
    }
    public getPickup(id: string) {
        const obj = this;
        return this.http.get('/api/pickups/view.json/' + id, {
            responseType: 'json'
        }).pipe(
            map(res =>  res)
        );
    }
    public delete(id: string) {
        const obj = this;
        return this.http.get('/api/pickups/delete.json/' + id, {
            responseType: 'json'
        }).pipe(
            map(res =>  res)
        );
    }
    public save(data: any) {
        // console.log(data);
        const obj = this;
        let url = '/api/pickups/add.json';
        let param = {};
        if (data['_id']) {
            url = '/api/pickups/update.json';
            param = {
                responseType: 'json',
                pickup: {
                    _id: data['_id'],
                    isActive: data['isActive'],
                    address: data['address'],
                    lat: data['lat'],
                    lng: data['lng'],
                    modifiedOn: new Date(),
                    modifiedBy: this.authService.loggedId
                }
            };
        } else {
            param = {
                responseType: 'json',
                pickup: {
                    isActive: data['isActive'],
                    address: data['address'],
                    lat: data['lat'],
                    lng: data['lng'],
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
