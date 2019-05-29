import { Component, OnInit } from '@angular/core';
import { Gateway } from '../../model/Gateway';
import { GatewayService } from "../../services/gateway.service";
import { NgForm } from "@angular/forms";
import { Respuesta } from 'src/app/model/respuesta';
import { PreloadService } from 'src/app/services/preload.service';


declare var M: any;

@Component({
  selector: 'app-gateways',
  templateUrl: './gateways.component.html',
  styleUrls: ['./gateways.component.css']
})
export class GatewaysComponent implements OnInit {

  gatewaySelected: Gateway;
  gateways: Gateway[];

  constructor(private gatewayService: GatewayService, public preloadService: PreloadService) {
    this.gatewaySelected = new Gateway();
    this.gateways = [];
  }

  ngOnInit() {
    this.listAll();
  }

  listAll() {
    this.preloadService.fireLoading();
    this.gatewayService.listAll()
      .subscribe(res => {
        this.gateways = res;
        this.preloadService.stopLoading();
      }, error=>{
          this.preloadService.haveErrors();
          this.preloadService.stopLoading();
      }
      );
  }

  saveGateway(form: NgForm) {
    if (form.valid) {
      this.preloadService.fireLoading();
      if (form.value._id) {
        this.gatewayService.update(form.value)
          .subscribe((res: Respuesta) => {
            if (res.success) {
              M.toast({ html: res.message });
              this.listAll();
              this.gatewaySelected = new Gateway();
            } else {
              for (let i in res.error.errors) {
                form.controls[i].setErrors({ "server": true, "message": res.error.errors[i].message });
              }
            }
            this.preloadService.stopLoading();
          }, error => {
              this.preloadService.haveErrors();
              this.preloadService.stopLoading();
          });
      } else {
        this.gatewayService.create(form.value)
          .subscribe((res:Respuesta) => {
            if (res.success) {
              this.listAll();
              this.gatewaySelected = new Gateway();
              M.toast({ html: res.message });
            } else {
              for (let i in res.error.errors) {
                form.controls[i].setErrors({ "server": true, "message": res.error.errors[i].message });
              }
            }
            this.preloadService.stopLoading();
          }, error => {
              this.preloadService.haveErrors();
              this.preloadService.stopLoading();
          });
      }
    }
  }

  delete(_id: string) {
    this.preloadService.fireLoading();
    this.gatewayService.delete(_id)
      .subscribe((res: Respuesta) => {
        if (res.success) {
          this.listAll();
        }
        M.toast({ html: res.message});          
        this.preloadService.stopLoading();
        
      },error=>{
          this.preloadService.haveErrors();
          this.preloadService.stopLoading();
      });
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.gatewaySelected = new Gateway();
    }

  }

  details(gateway: Gateway) {

  }

  select(gateway: Gateway) {
    this.gatewaySelected = gateway;
  }


}
