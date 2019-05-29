import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Device} from "../model/device";

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  readonly URI_API= 'http://localhost:3001/api/gateway/device';  //local

  constructor(private http:HttpClient) { }

  listAll(){
    return this.http.get<Device[]>(this.URI_API);
  }
  getOne(_id: string){
    return this.http.get<Device>(`${this.URI_API}/${_id}`);

  }
  create(device: Device) {
    return this.http.post(this.URI_API, device);
  }
  update(device: Device) {
    return this.http.put(this.URI_API, device);
  }
  delete(_id: string) {
    return this.http.delete(this.URI_API + `/${_id}`);
  }
}
