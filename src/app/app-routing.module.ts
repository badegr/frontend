import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';

import { SigninComponent } from './signin/signin.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  { path: '', component: SigninComponent },
  { path: 'search', component: SearchComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const routingComponents = [SigninComponent, SearchComponent];
