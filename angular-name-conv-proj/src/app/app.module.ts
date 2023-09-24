import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from  '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TextConversionComponent } from './text-conversion/text-conversion.component';
import { ConventionSelectorComponent } from './convention-selector/convention-selector.component';
import { MessagesComponent } from './messages/messages.component';
import { SavedComponent } from './saved/saved.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { CreateAccountComponent } from './create-account/create-account.component';

@NgModule({
  declarations: [
    AppComponent,
    TextConversionComponent,
    ConventionSelectorComponent,
    MessagesComponent,
    SavedComponent,
    LoginComponent,
    CreateAccountComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }