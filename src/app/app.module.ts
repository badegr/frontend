import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RestService } from './rest.service';
import { SigninComponent } from './signin/signin.component';
import { SearchComponent } from './search/search.component';
import { AuthGuard } from './auth.guard';

import { AppRoutingModule, routingComponents } from './app-routing.module';

@NgModule({
  declarations: [
    SigninComponent,
    SearchComponent,
    routingComponents,
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [RestService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
