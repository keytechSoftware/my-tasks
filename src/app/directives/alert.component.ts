import { Component, OnInit } from '@angular/core';

import { AlertService } from '../services/alert.service';

@Component({
    selector: 'alert',
    templateUrl: 'alert.component.html',
    styles: [`.alert {
                margin-top: 0px;
                margin-bottom: 10px;
                margin-left: 10px;
                height: 30px;
                line-height:30px;
                padding:0px 15px;
            }`]
})

export class AlertComponent {
    message: any;

    constructor(private alertService: AlertService) { }

    ngOnInit() {
        this.alertService.getMessage()
            .subscribe(message => { this.message = message; });
    }
}