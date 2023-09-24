import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component'
import { LoginComponent } from './login/login.component';
import { TextConversionComponent } from './text-conversion/text-conversion.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { SavedComponent } from './saved/saved.component';

const routes: Routes = [
  { path: '', component: TextConversionComponent },
  { path: 'create', component: CreateAccountComponent },
  { path: 'login', component: LoginComponent },
  { path: 'saved', component: SavedComponent},
];


@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forRoot(routes)]
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
