import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { BasketPageComponent } from './basket-page/basket-page.component';
import { MainLayoutComponent } from './shared/main-layout/main-layout.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {QuillModule} from "ngx-quill";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterseptor} from "./shared/auth.interseptor";
import { ProductComponent } from './product/product.component';
import { SearchPipe } from './shared/search.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    MainPageComponent,
    ProductPageComponent,
    BasketPageComponent,
    ProductComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    multi: true,
    useClass: AuthInterseptor
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
