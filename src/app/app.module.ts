import {FormsModule} from '@angular/forms'
import {HttpClient,HttpClientModule} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import { AppComponent } from './app.component';
import { GatewaysComponent } from './component/gateways/gateways.component';
import { GatewayDetailComponent } from './component/gateway-detail/gateway-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    GatewaysComponent,
    GatewayDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
