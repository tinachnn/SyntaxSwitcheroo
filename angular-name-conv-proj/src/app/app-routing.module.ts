import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TextComponent } from './text/text.component';
import { CreateComponent } from './create/create.component';
import { LoginComponent } from './login/login.component';
import { SavedComponent } from './saved/saved.component';

const routes: Routes = [
  { path: '', component: TextComponent },
  { path: 'create', component: CreateComponent },
  { path: 'login', component: LoginComponent },
  { path: 'saved', component: SavedComponent}
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
