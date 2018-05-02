import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import {CookieService} from 'angular2-cookie/core';
import {map} from 'rxjs/operators';

@Injectable()
export class UserService {

    constructor(private http: HttpClient, private authService: AuthService, private cookieService: CookieService) {
    }
    public getLoggedUserData(/*_id: String, profileComp: ProfileComponent*/) {
        const obj = this;
        const isLogged = this.cookieService.get('loggedUser');
        return this.http.get('/api/users/getDetail.json/' + isLogged, {
            responseType: 'json'
        }).pipe(
            map(res =>  res)
        );
    }
    public getUserProfileData() {
        const isLogged = this.cookieService.get('loggedUser');
        return this.http.get('/api/users/getDetail.json/' + isLogged, {
            responseType: 'json'
        }).pipe(
            map(res =>  res)
        );
    }
    public updateUserData( data: Array<any>, dataInfo: Array<any> ) {
        const obj = this;
        const user = data;
        const userInfo = dataInfo;
        return this.http.post('/api/users/update.json/', {
            responseType: 'json',
            user,
            userInfo,
            modifiedOn: new Date(),
            modifiedBy: this.authService.loggedId
        }).pipe(
            map(res =>  res)
        );
    }
}
