import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Gateway} from "../model/gateway";
import { Respuesta } from '../model/respuesta';

@Injectable({
  providedIn: 'root'
})
export class GatewayService {

  readonly URI_API= 'http://localhost:3001/api/gateway';  //local

  constructor(private http:HttpClient) { }

  listAll(){
    return this.http.get<Gateway[]>(this.URI_API);
  }
  getOne(_id: string){
    return this.http.get<Gateway>(`${this.URI_API}/${_id}`);

  }
  create(gateway: Gateway) {
    return this.http.post(this.URI_API, gateway);
  }
  update(gateway: Gateway) {
    return this.http.put(this.URI_API, gateway);
  }
  delete(_id: string) {
    return this.http.delete(this.URI_API + `/${_id}`);
  }
}
