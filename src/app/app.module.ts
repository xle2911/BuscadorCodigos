import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";

// importo el modulo de bootstrap
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddCodesComponent } from './components/add-codes/add-codes.component';

// import servicios
import { ServicioService } from "./services/servicio.service";
import { ShowCodesComponent } from './components/show-codes/show-codes.component';

@NgModule({
  declarations: [
    AppComponent,
    AddCodesComponent,
    ShowCodesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [
    ServicioService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
