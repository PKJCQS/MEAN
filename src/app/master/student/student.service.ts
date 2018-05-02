import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
@Injectable()
export class StudentService {
    constructor(private http: HttpClient, private authService: AuthService, private route: Router) {
    }
    public getStudents(p: number, ps: number, sort: any) {
        return this.http.get('/api/students.json/' + p + '/' + ps + '/' + sort.sortBy + '/' + sort.isSortAscending, {
            responseType: 'json'
        }).pipe(
            map(res =>  res)
        );
    }
    public getAllStudentsWithFilter(str: any) {
        const obj = this;
        return this.http.get('/api/students/autocomplete.json/' + str, {
            responseType: 'json'
        }).pipe(
            map(res =>  res)
        );
    }
    public getStudent(id: string) {
        const obj = this;
        return this.http.get('/api/students/view.json/' + id, {
            responseType: 'json'
        }).pipe(
            map(res =>  res)
        );
    }
    public delete(id: string) {
        const obj = this;
        return this.http.get('/api/students/delete.json/' + id, {
            responseType: 'json'
        }).pipe(
            map(res =>  res)
        );
    }
    public save(data: any) {
        // console.log(data);
        const obj = this;
        let url = '/api/students/add.json';
        let param = {};
        if (data['_id']) {
            url = '/api/students/update.json';
            param = {
                responseType: 'json',
                student: {
                    _id: data['_id'],
                    isActive: data['isActive'],
                    firstName: data['firstName'],
                    middleName: data['middleName'],
                    lastName: data['lastName'],
                    gender: data['gender'],
                    classRoom: data['classRoom'],
                    aadhar: data['aadhar'],
                    classroom: data['classroom'],
                    parent: data['parent'],
                    pickup: data['pickup'],
                    rollNo: data['rollNo'],
                    idcard: data['idcard'],
                    school: data['school'],
                    address: data['address'],
                    password: data['password'],
                    modifiedOn: new Date(),
                    modifiedBy: this.authService.loggedId
                }
            };
        } else {
            param = {
                responseType: 'json',
                student: {
                    isActive: data['isActive'],
                    firstName: data['firstName'],
                    middleName: data['middleName'],
                    lastName: data['lastName'],
                    gender: data['gender'],
                    classRoom: data['classRoom'],
                    aadhar: data['aadhar'],
                    classroom: data['classroom'],
                    parent: data['parent'],
                    pickup: data['pickup'],
                    rollNo: data['rollNo'],
                    idcard: data['idcard'],
                    school: data['school'],
                    address: data['address'],
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
