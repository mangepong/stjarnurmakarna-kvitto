import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire/compat/';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../enviroment/enviroment';

import { AppRoutingModule, LoginActivate } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { FormComponent } from './form/form.component';
import { StartComponent } from './start/start.component';
import { ListComponent } from './list/list.component';
import { UpdateComponent } from './update/update.component';

import { AuthenticationService } from 'src/app/shared/AuthenticationService';

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
    NgxPrintModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
  ],
  providers: [LoginActivate, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
