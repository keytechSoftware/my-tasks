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

/**
 * Sends a POST request to the server
 * 
 * @param {string} webApiUrl 
 * @param {*} body 
 * @param {Headers} [headers] 
 * @returns 
 * @memberof HttpService
 */
sendPostRequest(webApiUrl: string, body: any, headers?: Headers) {

    let header = this.authService.getAuthHeader();

    if (!headers == null) {
      if (!headers.has("Content-Type"))
        header.append("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    }

    const options = this.getRequestOptions(header, ResponseContentType.Json);

    return this.http
      .post(webApiUrl, body, options)
      .map((response: Response) => response.json())
    }


  /**
   * Sends a PUT request to the server
   * 
   * @param {string} webApiUrl 
   * @param {*} body 
   * @returns 
   * @memberof HttpService
   */
  sendPutRequest(webApiUrl: string, body: any) {

    const headers = this.authService.getAuthHeader();
    const options = this.getRequestOptions(headers, ResponseContentType.Json);

    return this.http
      .put(webApiUrl, body, options)
      .map((response: Response) => response.json())
    }
    
/**
 * Sends a GET request to the server
 * 
 * @param {string} webApiUrl 
 * @returns 
 * @memberof HttpService
 */
  sendGetRequest(webApiUrl: string) {

    const headers = this.authService.getAuthHeader();
    const options = this.getRequestOptions(headers, ResponseContentType.Json);

    return this.http
      .get(webApiUrl, options)
      .map((response: Response) => response.json())
    }

  /**
   * Gets the RequestOptions
   * 
   * @private
   * @param {any} headers 
   * @param {ResponseContentType} responseType 
   * @returns 
   * @memberof HttpService
   */
  private getRequestOptions(headers: any, responseType: ResponseContentType) {
       const options = new RequestOptions( 
      {
        headers: headers,
        responseType: responseType
      });

      return options;
  }


  /**
   * Sends a GET request for a graphic to the server
   * 
   * @param {string} webApiUrl 
   * @returns 
   * @memberof HttpService
   */
  sendGetImageRequest(webApiUrl: string) {

    const headers = this.authService.getAuthHeader();
    const options = this.getRequestOptions(headers, ResponseContentType.ArrayBuffer);

    return this.http
      .get(webApiUrl, options)
    }

}
