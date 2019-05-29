import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GatewaysComponent} from "./component/gateways/gateways.component";
import {GatewayDetailComponent} from "./component/gateway-detail/gateway-detail.component";



const routes: Routes = [

  {path:'', redirectTo:'/gateway',pathMatch:'full'},
  { path: 'gateway', component: GatewaysComponent },
  { path: 'gateway/detail/:_id', component: GatewayDetailComponent}



];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
