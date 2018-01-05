import { Component, OnInit } from '@angular/core';

import { HttpService } from "../services/http.service";
import { Server } from "../shared/server";
import { AlertService } from "../services/alert.service";

@Component({
  selector: 'kt-server-info',
  templateUrl: './server-info.component.html'
})
export class ServerInfoComponent implements OnInit {

  constructor(private httpService: HttpService,
              private alertService: AlertService) { }

  serverUrl: string = Server.WebApiUrl;

  ngOnInit() {
    this.connect();
  }

  async connect() {

    try {
      const response: Response = await this.httpService.sendGetRequest(Server.WebApiUrl + "/serverinfo").toPromise();
      this.alertService.clearMessage();

    } catch (error) {
      this.alertService.error(error);
    }
    
  }

}
