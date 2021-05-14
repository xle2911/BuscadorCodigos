import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShowCodesComponent } from "./components/show-codes/show-codes.component";

const routes: Routes = [
  { path: 'result', component: ShowCodesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
