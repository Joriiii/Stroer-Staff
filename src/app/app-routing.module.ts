import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StaffComponent} from "./staff/staff.component";
import {IntroComponent} from "./intro/intro.component";
import {StaffDetailComponent} from "./staff/staff-detail/staff-detail.component";

const routes: Routes = [
  { path: '', component: IntroComponent },
  { path: 'staff', component: StaffComponent},
  { path: 'staff-detail', component: StaffDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
