import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { KvittoModel } from './shared/KvittoModel';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

    private publicURL = "https://stjarnurmakarna-be.onrender.com";
    private privateURL = "http://localhost:3000"

    constructor(
        private http: HttpClient,
        private route: ActivatedRoute,
        private router: Router,
    ) { }

    create(model: KvittoModel) {
        return this.http.post(this.privateURL+`/create`, {model}).subscribe(data => {
            this.router.navigate(['../list'], { relativeTo: this.route });
        })
    }

    getRefNumber() {
        return this.http.get(this.privateURL+`/getRefNumber`);
    }

    getAll() {
        return this.http.get(this.privateURL+`/getAll`);
    }

    getKvitto(refNr: number) {
        return this.http.post(this.privateURL+`/getSpecific`, {refNr});
    }

    update(model: KvittoModel) {
        return this.http.post(this.privateURL+`/update`, {model}).subscribe(data => {
            this.router.navigate(['../list'], { relativeTo: this.route });
        })
    }
}