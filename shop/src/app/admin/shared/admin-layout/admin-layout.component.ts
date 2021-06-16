import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../shared/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.less']
})
export class AdminLayoutComponent implements OnInit {

  constructor(
    public auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  /**
   * Logout and navigate login page
   * @param e
   * @public
   */
  logout(e: Event): Promise<boolean> {
    e.preventDefault();
    this.auth.logout();
    return this.router.navigate(['/admin', 'login']);
  }

}
