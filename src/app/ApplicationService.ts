import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { KvittoModel } from './shared/KvittoModel';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

    constructor(
        private http: HttpClient
    ) { }

    create(model: KvittoModel) {
        return this.http.post(`http://localhost:3000/create`, {model});
    }
}