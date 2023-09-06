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
    private test = "http://localhost:3000";


    constructor(
        private http: HttpClient,
        private route: ActivatedRoute,
        private router: Router,
    ) { }

    create(model: KvittoModel) {
        return this.http.post(this.publicURL+`/create`, {model}).subscribe(data => {
            this.router.navigate(['../list'], { relativeTo: this.route });
        })
    }

    getRefNumber() {
        return this.http.get(this.publicURL+`/getRefNumber`);
    }

    getAll() {
        return this.http.get(this.publicURL+`/getAll`);
    }

    getKvitto(refNr: string) {
        return this.http.post(this.publicURL+`/getSpecific`, {refNr});
    }

    update(model: KvittoModel) {
        return this.http.post(this.publicURL+`/update`, {model}).subscribe(data => {
            this.router.navigate(['../list'], { relativeTo: this.route });
        })
    }

    // Search functions

    getSpecificCustomer(kundnamn: string) {
        return this.http.post(this.publicURL+`/getSpecificCustomer`, {kundnamn});
    }
    getSpecificPhone(telefon: string) {
        return this.http.post(this.publicURL+`/getSpecificPhone`, {telefon});
    }
    getSpecificFabrikat(fabrikat: string) {
        return this.http.post(this.publicURL+`/getSpecificFabrikat`, {fabrikat});
    }
    getSpecificNote(notering: string) {
        return this.http.post(this.publicURL+`/getSpecificNote`, {notering});
    }
}