import { Component, OnInit } from '@angular/core';

import { HttpService } from "../../services/http.service";
import { AlertService } from "../../services/alert.service";
import { Server } from "../../shared/server";
import { TasksResponse } from "../../api/tasks-response";
import { Tools } from "../../shared/tools";

@Component({
  selector: 'kt-my-tasks',
  templateUrl: './my-tasks.component.html'
})
export class MyTasksComponent implements OnInit {

  constructor(
      private httpService: HttpService,
      private alertService: AlertService) { }

  queryResult: any[];
  recordsFound: number;
  headerText: string;

  async ngOnInit() {
    await this.getTasks();
    this.setHeaderText();
  }

  // ------------------------------------------------------------------
  // Set the header text
  // ------------------------------------------------------------------  
  setHeaderText() {

    const currentUserFullName = Tools.getStorageValue('currentUserFullName');

    switch(this.recordsFound) {
      case 0: {
        this.headerText = currentUserFullName + " hat keine Aufgaben";
        break;
      }
      case 1: {
        this.headerText = currentUserFullName + " hat 1 Aufgabe";
        break;
      }
      default: {
        this.headerText = currentUserFullName + " hat " + this.recordsFound + " Aufgaben";
        break;
      }
    }

  }
 
  // ------------------------------------------------------------------
  // Gets the user's tasks
  // ------------------------------------------------------------------
  async getTasks() { 
    var username: string = Tools.getStorageValue('currentUser');

    this.alertService.info("Aufgaben werden ermittelt...");

    try {
      const response: TasksResponse = await this.httpService
        .sendGetRequest(Server.WebApiUrl + "/user/" + username + "/tasks").toPromise();

        this.queryResult = TasksResponse.ToArray(response);
        this.recordsFound = response.Totalrecords;

        if (this.recordsFound==0)
          this.alertService.success("Keine Aufgaben vorhanden :-)");
        else
          this.alertService.clearMessage();
    } 
    catch (error) {
      this.alertService.error(error);
    }

  }
}
