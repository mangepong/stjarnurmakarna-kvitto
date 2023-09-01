import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { KvittoModel } from './shared/KvittoModel';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

    private publicURL = "https://stjarnurmakarna-be.onrender.com";
    private privateURL = "http://192.168.50.106:3000";
    private test = "http://84.217.12.146:3000";


    constructor(
        private http: HttpClient,
        private route: ActivatedRoute,
        private router: Router,
    ) { }

    create(model: KvittoModel) {
        return this.http.post(this.test+`/create`, {model}).subscribe(data => {
            this.router.navigate(['../list'], { relativeTo: this.route });
        })
    }

    getRefNumber() {
        return this.http.get(this.test+`/getRefNumber`);
    }

    getAll() {
        return this.http.get(this.test+`/getAll`);
    }

    getKvitto(refNr: string) {
        return this.http.post(this.test+`/getSpecific`, {refNr});
    }

    update(model: KvittoModel) {
        return this.http.post(this.test+`/update`, {model}).subscribe(data => {
            this.router.navigate(['../list'], { relativeTo: this.route });
        })
    }

    // Search functions

    getSpecificCustomer(kundnamn: string) {
        return this.http.post(this.test+`/getSpecificCustomer`, {kundnamn});
    }
    getSpecificPhone(telefon: string) {
        return this.http.post(this.test+`/getSpecificPhone`, {telefon});
    }
    getSpecificFabrikat(fabrikat: string) {
        return this.http.post(this.test+`/getSpecificFabrikat`, {fabrikat});
    }
    getSpecificNote(notering: string) {
        return this.http.post(this.test+`/getSpecificNote`, {notering});
    }
}