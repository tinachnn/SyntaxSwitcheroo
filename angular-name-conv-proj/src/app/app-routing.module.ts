import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component'
import { LoginComponent } from './login/login.component';
import { TextConversionComponent } from './text-conversion/text-conversion.component';
import { CreateAccountComponent } from './create-account/create-account.component';

const routes: Routes = [
  { path: 'convert', component: TextConversionComponent },
  { path: 'create', component: CreateAccountComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/convert', pathMatch: 'full' }
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
