import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { KvittoModel } from './shared/KvittoModel';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

    constructor(
        private http: HttpClient,
        private route: ActivatedRoute,
        private router: Router,
    ) { }

    create(model: KvittoModel) {
        return this.http.post(`http://localhost:3000/create`, {model}).subscribe(data => {
            this.router.navigate(['../list'], { relativeTo: this.route });
        })
    }

    getRefNumber() {
        return this.http.get(`http://localhost:3000/getRefNumber`);
    }

    getAll() {
        return this.http.get(`http://localhost:3000/getAll`);
    }

    getKvitto(refNr: number) {
        return this.http.post(`http://localhost:3000/getSpecific`, {refNr});
    }

    update(model: KvittoModel) {
        return this.http.post(`http://localhost:3000/update`, {model}).subscribe(data => {
            this.router.navigate(['../list'], { relativeTo: this.route });
        })
    }
}