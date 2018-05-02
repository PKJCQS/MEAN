import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
@Injectable()
export class DriverService {
    constructor(private http: HttpClient, private authService: AuthService, private route: Router) {
    }
    public getDrivers(p: number, ps: number, sort: any) {
        return this.http.get('/api/drivers.json/' + p + '/' + ps + '/' + sort.sortBy + '/' + sort.isSortAscending, {
            responseType: 'json'
        }).pipe(
            map(res =>  res)
        );
    }
    public getAllDriversWithFilter(str: any) {
        const obj = this;
        return this.http.get('/api/drivers/autocomplete.json/' + str, {
            responseType: 'json'
        }).pipe(
            map(res =>  res)
        );
    }
    public getAllDriversNotInClassrrom(str: any) {
        return this.http.get('/api/drivers/autocomplete-not-in-teacher-student.json/' + str, {
            responseType: 'json'
        }).pipe(
            map(res =>  res)
        );
    }
    public getDriver(id: string) {
        const obj = this;
        return this.http.get('/api/drivers/view.json/' + id, {
            responseType: 'json'
        }).pipe(
            map(res =>  res)
        );
    }
    public delete(id: string) {
        const obj = this;
        return this.http.get('/api/drivers/delete.json/' + id, {
            responseType: 'json'
        }).pipe(
            map(res =>  res)
        );
    }
    public save(data: any) {
        // console.log(data);
        const obj = this;
        let url = '/api/drivers/add.json';
        let param = {};
        if (data['_id']) {
            url = '/api/drivers/update.json';
            param = {
                responseType: 'json',
                driver: {
                    _id: data['_id'],
                    isActive: data['isActive'],
                    name: data['name'],
                    username: data['username'],
                    password: data['password'],
                    email: data['email'],
                    licenseNo: data['licenseNo'],
                    mobileNo: data['mobileNo'],
                    address: data['address'],
                    school: data['school'],
                    idcard: data['idcard'],
                    modifiedOn: new Date(),
                    modifiedBy: this.authService.loggedId
                }
            };
        } else {
            param = {
                responseType: 'json',
                driver: {
                    isActive: data['isActive'],
                    name: data['name'],
                    username: data['username'],
                    password: data['password'],
                    email: data['email'],
                    licenseNo: data['licenseNo'],
                    mobileNo: data['mobileNo'],
                    address: data['address'],
                    school: data['school'],
                    idcard: data['idcard'],
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
