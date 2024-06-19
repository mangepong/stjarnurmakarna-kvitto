import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { KvittoModel } from './shared/KvittoModel';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
    constructor(
        private db: AngularFireDatabase,
        private http: HttpClient,
        private route: ActivatedRoute,
        private router: Router,
    ) {}

    // OLD!!!!

    // create(model: KvittoModel) {
    //     return this.http.post(this.publicURL+`/create`, {model}).subscribe(data => {
    //         this.router.navigate(['../list'], { relativeTo: this.route });
    //     })
    // }

    // getRefNumber() {
    //     return this.http.get(this.publicURL+`/getRefNumber`);
    // }

    // getAll() {
    //     return this.http.get(this.publicURL+`/getAll`);
    // }

    // getKvitto(refNr: string) {
    //     return this.http.post(this.publicURL+`/getSpecific`, {refNr});
    // }

    // update(model: KvittoModel) {
    //     return this.http.post(this.publicURL+`/update`, {model}).subscribe(data => {
    //         this.router.navigate(['../list'], { relativeTo: this.route });
    //     })
    // }

    // // Search functions

    // getSpecificCustomer(kundnamn: string) {
    //     return this.http.post(this.publicURL+`/getSpecificCustomer`, {kundnamn});
    // }
    // getSpecificPhone(telefon: string) {
    //     return this.http.post(this.publicURL+`/getSpecificPhone`, {telefon});
    // }
    // getSpecificFabrikat(fabrikat: string) {
    //     return this.http.post(this.publicURL+`/getSpecificFabrikat`, {fabrikat});
    // }
    // getSpecificNote(notering: string) {
    //     return this.http.post(this.publicURL+`/getSpecificNote`, {notering});
    // }

    // ##########################################################################################

    // Firebase

    async create(model: KvittoModel) {
        await this.db.list('kvitto').push(model);
        this.router.navigate(['../list'], { relativeTo: this.route });
    }

    getRefNumber() {
        return this.db.list('kvitto').snapshotChanges();
    }

    getAll(amount: number = 0) {
        console.log(amount)
        return this.db.list('kvitto', ref => ref.orderByChild('refNummer').startAt(amount).limitToFirst(100)).snapshotChanges();
    }

    getKvitto(refNr: string) {
        return this.db.object('kvitto/' + refNr).snapshotChanges();
    }

    update(model: KvittoModel) {
        console.log(model.key)
        var updates = {} as any;
        updates['kvitto' + '/' + model.key] = model;
    
        this.db.database
        .ref()
        .update(updates)
        .then(() => {
            this.router.navigate(['../list'], { relativeTo: this.route });
        })
        .catch((err) => {
            console.log(err);
        });
    }

    // Search functions

    getSpecificRef(refNr: string): any {

        let temp;
        let res: any[] = [];

        this.db.list('kvitto').snapshotChanges().subscribe((data: any) => {
            temp = data.map((e: { payload: { val: () => KvittoModel; }; }) => {
              return {
                ...e.payload.val()
              } as KvittoModel;
            });

            temp.forEach((kvitto: any) => {
                if (kvitto.refNummer == parseInt(refNr)) {
                    res.push(kvitto);
                }
            });
          });
        return res;
    }
    getSpecificCustomer(kundnamn: string) {
        let temp;
        let res: any[] = [];

        this.db.list('kvitto').snapshotChanges().subscribe((data: any) => {
            temp = data.map((e: { payload: { val: () => KvittoModel; }; }) => {
              return {
                ...e.payload.val()
              } as KvittoModel;
            });

            temp.forEach((kvitto: any) => {
                if (kvitto.kundnamn && kvitto.kundnamn.toLocaleLowerCase().includes(kundnamn.toLocaleLowerCase())) {
                    res.push(kvitto);
                }
            });
          });
        return res;
        // return this.db.list('kvitto', ref => ref.orderByChild('kundnamn').equalTo(kundnamn)).snapshotChanges();
    }
    getSpecificPhone(telefon: string) {
        let temp;
        let res: any[] = [];

        this.db.list('kvitto').snapshotChanges().subscribe((data: any) => {
            temp = data.map((e: { payload: { val: () => KvittoModel; }; }) => {
              return {
                ...e.payload.val()
              } as KvittoModel;
            });

            temp.forEach((kvitto: any) => {
                if (kvitto.telefon && kvitto.telefon.toLocaleLowerCase().includes(telefon.toLocaleLowerCase())) {
                    res.push(kvitto);
                }
            });
          });
        return res;
        // return this.db.list('kvitto', ref => ref.orderByChild('telefon').equalTo(telefon)).snapshotChanges();
    }
    getSpecificFabrikat(fabrikat: string) {
        let temp;
        let res: any[] = [];

        this.db.list('kvitto').snapshotChanges().subscribe((data: any) => {
            temp = data.map((e: { payload: { val: () => KvittoModel; }; }) => {
              return {
                ...e.payload.val()
              } as KvittoModel;
            });

            temp.forEach((kvitto: any) => {
                if (kvitto.fabrikat && kvitto.fabrikat.toLocaleLowerCase().includes(fabrikat.toLocaleLowerCase())) {
                    res.push(kvitto);
                }
            });
          });
        return res;
        // return this.db.list('kvitto', ref => ref.orderByChild('fabrikat').equalTo(fabrikat)).snapshotChanges();
    }
    getSpecificNote(notering: string) {
        let temp;
        let res: any[] = [];

        this.db.list('kvitto').snapshotChanges().subscribe((data: any) => {
            temp = data.map((e: { payload: { val: () => KvittoModel; }; }) => {
              return {
                ...e.payload.val()
              } as KvittoModel;
            });

            temp.forEach((kvitto: any) => {
                if (kvitto.notering && kvitto.notering.toLocaleLowerCase().includes(notering.toLocaleLowerCase())) {
                    res.push(kvitto);
                }
            });
          });
        return res;
        // return this.db.list('kvitto', ref => ref.orderByChild('notering').equalTo(notering)).snapshotChanges();
    }

    getItemsBySearchQuery(searchQuery: string) {
        let temp;
        let res: any[] = [];

        this.db.list('kvitto').snapshotChanges().subscribe((data: any) => {
            temp = data.map((e: { payload: { val: () => KvittoModel; }; }) => {
              return {
                ...e.payload.val()
              } as KvittoModel;
            });

            temp.forEach((kvitto: any) => {
                if (kvitto.notering && kvitto.notering.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())) {
                    res.push(kvitto);
                } else if (kvitto.fabrikat && kvitto.fabrikat.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())) {
                    res.push(kvitto);
                } else if (kvitto.telefon && kvitto.telefon.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())) {
                    res.push(kvitto);
                } else if (kvitto.kundnamn && kvitto.kundnamn.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())) {
                    res.push(kvitto);
                } else if (kvitto.refNummer == parseInt(searchQuery)) {
                    res.push(kvitto);
                }
            });
          });
        return res;
        // return this.db.list('kvitto', ref => ref.startAt(searchQuery).endAt(searchQuery + '\uf8ff')).snapshotChanges();
    }
}