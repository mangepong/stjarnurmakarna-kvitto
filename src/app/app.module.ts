import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { FormComponent } from './form/form.component';
import { StartComponent } from './start/start.component';
import { ListComponent } from './list/list.component';
import { UpdateComponent } from './update/update.component';

// Dependencies
import { NgxPrintModule } from 'ngx-print';
import { KvittoComponent } from './kvitto/kvitto.component';


@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    StartComponent,
    ListComponent,
    UpdateComponent,
    KvittoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPrintModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
