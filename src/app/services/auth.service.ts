import { Injectable, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { Response, Http, Headers, RequestOptions, RequestMethod } from "@angular/http";

import { Server } from "../shared/server";
import { Observable } from "rxjs/Observable";
import { Tools } from "../shared/tools";

@Injectable()
export class AuthService {
constructor(private router: Router,
            private http: Http,
            ) {};

authenticationChanged = new EventEmitter();

private password: string = "";
private userFullName: string

/**
 * Gets whether the user has logged on to the application
 * 
 * @readonly
 * @type {boolean}
 * @memberof AuthService
 */
get userIsAuthenticated(): boolean {
    let user: string = Tools.getStorageValue('currentUser');
    return user!=null;
} 


/**
 * Log on the user in the application
 * 
 * @param {string} username 
 * @param {string} password 
 * @returns 
 * @memberof AuthService
 */
login(username: string, password: string){

const loginUrl = Server.WebApiUrl + "/user/" + username;
const headers = this.getAuthHeaderWithCredentials(username, password);
const options = this.getGetRequestOptions(loginUrl, headers);

return this.http.get(loginUrl, options)
    .map ((response: Response) => {
        let user = response.json().MembersList[0].KeyName;
        Tools.setStorageValue('currentUser', user);

        this.userFullName = response.json().MembersList[0].LongName;
        Tools.setStorageValue('currentUserFullName', this.userFullName);

        this.password = password;
        this.authenticationChanged.emit();
    })
    .catch(
        (error: Response) => {
            console.log(error);
            
            var errorDescription = error.headers.get("X-ErrorDescription");
            if (errorDescription != null)
                error.statusText += " (" + errorDescription + ")";

            return Observable.throw(error);
        }
    )
}

/**
 * Log off the user in the application
 * 
 * @memberof AuthService
 */
logout() {
    Tools.removeStorageValue('currentUser');
    Tools.removeStorageValue('currentUserFullName');

    this.authenticationChanged.emit();
}

/**
 * Gets the authorization header using the specified credentials.
 * 
 * @private
 * @param {string} username 
 * @param {string} password 
 * @returns 
 * @memberof AuthService
 */
private getAuthHeaderWithCredentials(username: string, password: string){
    
    var headers = new Headers();              // Base64 Codierung von Benutzername & Passwort
    headers.append("Authorization", "Basic " + window.btoa(username + ":" + password)); 

    return headers;
}

/**
 * Gets the authorization header
 * 
 * @returns 
 * @memberof AuthService
 */
getAuthHeader(){
    this.userFullName = this.getUserFullName;

    var username: string = Tools.getStorageValue('currentUser');
    var password: string = this.password;

    return this.getAuthHeaderWithCredentials(username, password);
}

/**
 * Gets the users full name
 * 
 * @readonly
 * @memberof AuthService
 */
get getUserFullName(){
    var userFullName = Tools.getStorageValue('currentUserFullName');
    if (userFullName == null)
        return "Nicht angemeldet";
    else
        return userFullName;
}

/**
 * Gets the users name
 * 
 * @readonly
 * @memberof AuthService
 */
get getUserName(){
    return Tools.getStorageValue('currentUser');
}


/**
 * Gets the RequestOptions
 * 
 * @param {any} webApiUrl 
 * @param {any} headers 
 * @returns 
 * @memberof AuthService
 */
getGetRequestOptions(webApiUrl, headers) {
    const options = new RequestOptions( 
    {
        method: RequestMethod.Get, 
        headers: headers,
        url: webApiUrl
    });

    return options;
}

}
