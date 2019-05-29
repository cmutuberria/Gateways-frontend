import { Component, OnInit } from '@angular/core';
import { GatewayService } from "../../services/gateway.service";
import { Gateway } from "../../model/gateway";
import { ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';
import { Device } from "../../model/device";
import { NgForm } from "@angular/forms";
import { DeviceService } from "../../services/device.service";
import { PreloadService } from 'src/app/services/preload.service';
import { Respuesta } from 'src/app/model/respuesta';

declare var M: any;

@Component({
  selector: 'app-gateway-detail',
  templateUrl: './gateway-detail.component.html',
  styleUrls: ['./gateway-detail.component.css']
})
export class GatewayDetailComponent implements OnInit {

  gateway: Gateway;
  deviceSelected: Device;

  constructor(private gatewayService: GatewayService,
    private deviceService: DeviceService,
    private route: ActivatedRoute,
    private location: Location,
    public preloadService: PreloadService) {
    this.gateway = new Gateway()
    this.deviceSelected = new Device();
  }

  ngOnInit() {
    this.getGateway()
  }

  getGateway(): void {

    var id = this.route.snapshot.paramMap.get('_id');
    this.preloadService.fireLoading();
    this.gatewayService.getOne(id)
      .subscribe(res => {
        this.gateway = res;
        this.preloadService.stopLoading();
      }, error => {
        this.preloadService.haveErrors();
        this.preloadService.stopLoading();

      });
  }

  goBack(): void {
    this.location.back();
  }

  select(device: Device) {
    this.deviceSelected = device;
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.deviceSelected = new Device();
    }

  }

  saveDevice(form: NgForm) {
    if (form.valid) {
      this.preloadService.fireLoading();
      if (form.value._id) {
        this.deviceService.update(form.value)
          .subscribe((res: Respuesta) => {
            if (res.success) {              
              this.getGateway();
              this.deviceSelected = new Device();
            }
            M.toast({ html: res.message });
            this.preloadService.stopLoading();
          }, error => {
            this.preloadService.haveErrors();
            this.preloadService.stopLoading();
          });
      } else {
        form.value.date = Date.now();
        this.deviceService.create(form.value)
          .subscribe((res: Respuesta) => {
            if (res.success) {              
              this.getGateway();
              this.deviceSelected = new Device();
            }
            M.toast({ html: res.message });
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
    this.deviceService.delete(_id)
      .subscribe((res: Respuesta) => {
        this.getGateway();
        M.toast({ html: 'Device Deleted successfully' });
        this.preloadService.stopLoading();
      }, error => {
        this.preloadService.haveErrors();
        this.preloadService.stopLoading();
      });
  }

}
