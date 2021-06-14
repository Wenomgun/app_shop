import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import { AdminLayoutComponent } from './shared/admin-layout/admin-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AddPageComponent } from './add-page/add-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { OrdersPageComponent } from './orders-page/orders-page.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    AddPageComponent,
    DashboardComponent,
    EditPageComponent,
    OrdersPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: AdminLayoutComponent, children: [
          {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
          {path: 'login', component: LoginPageComponent},
          {path: 'dashboard', component: DashboardComponent},
          {path: 'add', component: AddPageComponent},
          {path: 'products/:id/edit', component: EditPageComponent},
          {path: 'orders', component: OrdersPageComponent}
        ]
      }
    ]),
    ReactiveFormsModule
  ]
})
export class AdminModule { }
