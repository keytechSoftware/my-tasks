import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod, ResponseContentType } from '@angular/http';
import 'rxjs/Rx';

import { Server } from "../shared/server";
import { AuthService } from './auth.service';
import { AlertService } from "./alert.service";

@Injectable()
export class HttpService {

  constructor(private http: Http, 
              private authService: AuthService,
              private alertService: AlertService) {}

  // ------------------------------------------------------------------
  // Sends a POST request to the server
  // ------------------------------------------------------------------
  sendPostRequest(webApiUrl, body: any, headers?: Headers) {

    // Parameter für den Aufruf festlegen
    let header = this.authService.getAuthHeader();

    if (!headers == null) {
      if (!headers.has("Content-Type"))
        header.append("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    }

    const options = this.getRequestOptions(header, ResponseContentType.Json);

    // Aufruf an den Server senden
    return this.http
      .post(webApiUrl, body, options)
      .map((response: Response) => response.json())
    }

  // ------------------------------------------------------------------
  // Sends a PUT request to the server
  // ------------------------------------------------------------------
  sendPutRequest(webApiUrl, body: any) {

    // Parameter für den Aufruf festlegen
    const headers = this.authService.getAuthHeader();
    const options = this.getRequestOptions(headers, ResponseContentType.Json);

    // Aufruf an den Server senden
    return this.http
      .put(webApiUrl, body, options)
      .map((response: Response) => response.json())
    }
    
  // ------------------------------------------------------------------
  // Sends a GET request to the server
  // ------------------------------------------------------------------
  sendGetRequest(webApiUrl) {

    const headers = this.authService.getAuthHeader();
    const options = this.getRequestOptions(headers, ResponseContentType.Json);

    return this.http
      .get(webApiUrl, options)
      .map((response: Response) => response.json())
    }

  // ------------------------------------------------------------------
  // Gets the RequestOptions 
  // ------------------------------------------------------------------
  private getRequestOptions(headers, responseType: ResponseContentType) {
       const options = new RequestOptions( 
      {
        headers: headers,
        responseType: responseType
      });

      return options;
  }

  // ------------------------------------------------------------------
  // Sends a GET request for a graphic to the server
  // ------------------------------------------------------------------
  sendGetImageRequest(webApiUrl) {

    const headers = this.authService.getAuthHeader();
    const options = this.getRequestOptions(headers, ResponseContentType.ArrayBuffer);

    // Aufruf an den Server senden
    return this.http
      .get(webApiUrl, options)
      
    }

}
