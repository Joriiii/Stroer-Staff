import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StaffComponent } from './staff/staff.component';
import { FilterComponent } from './components/filter/filter.component';
import { StaffDetailComponent } from './staff/staff-detail/staff-detail.component';
import {HttpClientModule} from "@angular/common/http";
import {StaffModule} from "./staff/staff.module";
import { IntroComponent } from './intro/intro.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    StaffComponent,
    FilterComponent,
    StaffDetailComponent,
    IntroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StaffModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
