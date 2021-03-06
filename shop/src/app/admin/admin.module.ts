import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import { AdminLayoutComponent } from './shared/admin-layout/admin-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AddPageComponent } from './add-page/add-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { OrdersPageComponent } from './orders-page/orders-page.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthGuard} from "../shared/auth.guard";
import {QuillModule} from "ngx-quill";
import {HttpClientModule} from "@angular/common/http";
import {SearchPipe} from "../shared/search.pipe";

@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    AddPageComponent,
    DashboardComponent,
    EditPageComponent,
    OrdersPageComponent,
    SearchPipe
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: AdminLayoutComponent, children: [
          {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
          {path: 'login', component: LoginPageComponent},
          {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
          {path: 'add', component: AddPageComponent, canActivate: [AuthGuard]},
          {path: 'product/:id/edit', component: EditPageComponent, canActivate: [AuthGuard]},
          {path: 'orders', component: OrdersPageComponent, canActivate: [AuthGuard]}
        ]
      }
    ]),
    ReactiveFormsModule,
    QuillModule.forRoot(),
    HttpClientModule,
    FormsModule
  ]
})
export class AdminModule { }
