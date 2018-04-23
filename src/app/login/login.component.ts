import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { AuthService } from "../services/auth.service";
import { AlertService } from "../services/alert.service";


@Component({
  selector: 'we-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  returnUrl: string;
  loading = false;
  model: any = {};

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService,
              private alertService: AlertService){};

  ngOnInit() {
    this.authService.logout();

    // Demo User
    this.model.username = "keytech";

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

/**
 * Executes the login
 * 
 * @memberof LoginComponent
 */
  async login() {
    this.loading = true;

    if (this.model.password == null)
      this.model.password = "";

    try {
      const response = await this.authService.login(this.model.username, this.model.password).toPromise();
      this.router.navigate([this.returnUrl]);
    }
    catch (error) {
      // Login failed --> Display error
      this.alertService.error("Error " + error.status + ": " + error.statusText);
      this.loading = false;
    }
  
  }
}
