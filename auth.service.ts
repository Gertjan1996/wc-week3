import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { shareReplay, tap } from 'rxjs/operators'

import * as moment from 'moment'
import * as jwt_decode from 'jwt-decode';

const API_URL = 'http://localhost:5000/api/'

@Injectable()
export class AuthService {     
    constructor(private http: HttpClient) {
    }
    
    login(name:string, password:string ) {
        return this.http.post<User>(API_URL + 'login', { name, password })

            .pipe (
                tap ( 
                    res => this.setSession(res),
                    err => this.handleError(err),
                ),
                shareReplay()
            )
    }

    public isLoggedIn() {
        return moment().isBefore(this.getExpiration());
    }

    private setSession(authResult) {
        console.log("Setting session")

        localStorage.setItem('expiresIn', JSON.stringify(moment().add(authResult.expiresIn, "seconds")))
        localStorage.setItem('idToken', authResult.token)
    }

    public logout() {
        console.log("Logging out")

        localStorage.removeItem('expiresIn')
        localStorage.removeItem('idToken')
    }

    public getExpiration() {
        console.log("Get experiation as json...")

        return moment(JSON.parse(localStorage.getItem("expiresIn")))
    } 

    private handleError(error) {
        console.error("ERROR...")
        console.log(error)
    }
}

interface User {
    name:String,
    password:String,
}