import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs/Subscription";

import { HttpService } from "../../services/http.service";
import { Server } from "../../shared/server";
import { TasksResponse, Element } from "../../api/tasks-response";
import { Tools } from "../../shared/tools";
import { AlertService } from "../../services/alert.service";
import { AuthService } from "../../services/auth.service";
import { ElementPermissions } from "../../api/element-permissions";

@Component({
  selector: 'kt-task-details',
  templateUrl: './task-details.component.html'
})
export class TaskDetailsComponent implements OnInit, OnDestroy {

  constructor(private httpService: HttpService,
              private activatedRoute: ActivatedRoute,
              private alertService: AlertService,
              private authService: AuthService) { }

  private subscription: Subscription;
  private elementKey: string;
  isElementKeyAvailable: boolean;
  task: Element;

  Subject: string;
  CompletedPercent: number;
  RemainingDays: number;
  CompleteEffort: string;
  progressValues: number[] = [0,5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100];
  allowBookTime: boolean = false;

  ngOnInit() {
   this.subscription = this.activatedRoute.queryParams.subscribe(
      (params: any) => {
        this.elementKey = params['elementKey'];

        if (this.elementKey != null) {
          this.isElementKeyAvailable=true;
          this.checkAllowBookTime(this.elementKey);
          this.getTaskDetails(this.elementKey);
        } 
          else {
            this.isElementKeyAvailable=false;
          }
      }
    );
  }


  /**
   * Cancel subscription in order to avoid a possible memory leak
   * 
   * @memberof TaskDetailsComponent
   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  /**
   * Checks whether the user is allowed to book times to the task
   * 
   * @param {string} elementKey 
   * @memberof TaskDetailsComponent
   */
  async checkAllowBookTime(elementKey: string) {

    let currentUser = Tools.getStorageValue("currentUser");

    try {
      const response: ElementPermissions = await this.httpService
        .sendGetRequest(Server.WebApiUrl + "/user/" + currentUser + "/permissions/element/" + elementKey).toPromise();

      this.allowBookTime = response.Permissions.AllowBookTime;

    } catch (error) {
      this.alertService.error(error);
    }

  }


  /**
   * Changes the progress of the task
   * 
   * @param {number} percent 
   * @memberof TaskDetailsComponent
   */
  async setProgress(percent: number) {

    var body = {"Key": this.elementKey, 
                 "KeyValueList":[
                  {"Key": "as_sfd__complete", 
                   "Value": percent}
                 ]
               };
    try {
      await this.httpService.sendPutRequest(Server.WebApiUrl + "/elements/" + this.elementKey, body).toPromise();

      this.alertService.success("Fortschritt auf " + percent + "% geändert.");

      // Refresh UI
      this.getTaskDetails(this.elementKey);

    } catch (error) {
      this.alertService.error(error);
    }
  }


  /**
   * Book time to the task
   * 
   * @param {number} minutes 
   * @memberof TaskDetailsComponent
   */
  async bookTime(minutes: number) {
    var epochMilliseconds = new Date().getTime()
    var epochDateString = "/Date(" + epochMilliseconds  + ")/"

    var body = {"ElementBookTimeAction":
        {
          "WorkInMinutes": minutes,
          "AddTime": true,
          "UserName": this.authService.getUserName,
          "WorkDate": epochDateString
        }
      }

    try {
      await this.httpService.sendPostRequest(Server.WebApiUrl + "/elements/" + this.elementKey, body).toPromise();

      this.alertService.success(minutes + " Minuten wurden gebucht");

      // Refresh UI
      this.getTaskDetails(this.elementKey);

    } catch (error) {
      this.alertService.error(error);
    }

  }


  /**
   * Determines the data of a keytech task
   * 
   * @param {string} elementKey 
   * @memberof TaskDetailsComponent
   */
  async getTaskDetails(elementKey: string) { 

    try {
      const response: TasksResponse = await this.httpService
        .sendGetRequest(Server.WebApiUrl + "/elements/" + elementKey ).toPromise();

      this.task = response.ElementList[0];
      this.CompletedPercent = this.task.CompletedPercent;
      this.Subject = this.task.Subject;

      // Calculation of the remaining time in days
      const plannedEnd: Date = Tools.getDateFromEpoch(response.ElementList[0].PlannedEnd);
      const now: Date = new Date();
      const remaining: Date = new Date (plannedEnd.getTime() - now.getTime())

      this.RemainingDays = Math.ceil(remaining.getTime()/86400000);
      

      // Calculation of the booked time
      const usedTime = this.task.UsedTime;
      const hours = Math.floor(Math.abs(usedTime));
      const minutes = Math.floor((Math.abs(usedTime) * 60) % 60);

      this.CompleteEffort = hours + "h " + minutes + "min";

    } catch (error) {
      console.log ("Error: getTaskDetails {" + elementKey + "}" + error)
    }
 
  }
}
