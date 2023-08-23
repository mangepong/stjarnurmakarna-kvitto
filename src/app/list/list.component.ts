import { Component, OnInit } from '@angular/core';
import { KvittoModel } from '../shared/KvittoModel';
import { ApplicationService } from '../ApplicationService';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  public model: Array<KvittoModel> = [];
  public listed: Array<KvittoModel> = [];
  public selectedCategory: string = "all";
  public searchQuery = "";
  public options = [
    { name: "Sökfilter", value: "all" },
    { name: "Reperations Nummer", value: "refNummer" },
    { name: "Kundnamn", value: "kundnamn" },
    { name: "Telefon", value: "telefon" },
    { name: "Fabrikat", value: "fabrikat" },
    { name: "Notering", value: "notering" },
  ];
  constructor(
    private applicationService: ApplicationService
  ) { }

  ngOnInit() {
    this.applicationService.getAll().subscribe((data: any) => {
      this.model = data.data;
      this.listed = this.model;
    });
  }

  onSelected() {
    console.log(this.selectedCategory);
  }

  clear() {
    setTimeout(() => {
      if (this.searchQuery == "") {
        this.listed = this.model;
      }
    }, 100)
  }

  onSearch() {
    console.log("sök")
    this.listed = [];

    if (this.searchQuery == "") {
      this.listed = this.model;
      return;
    }
    for (let kvitto of this.model) {
      if (this.selectedCategory == "all") {
        if (kvitto.refNummer.toString().toLocaleLowerCase().includes(this.searchQuery) || kvitto.refNummer.toString().toLocaleLowerCase() == this.searchQuery) {
          this.listed.push(kvitto);
        } else if (kvitto[this.options[2].value as keyof KvittoModel].toString().toLocaleLowerCase().includes(this.searchQuery) || kvitto[this.options[1].value as keyof KvittoModel].toString().toLocaleLowerCase() == this.searchQuery) {
          this.listed.push(kvitto);
        } else if (kvitto[this.options[3].value as keyof KvittoModel].toString().toLocaleLowerCase().includes(this.searchQuery) || kvitto[this.options[2].value as keyof KvittoModel].toString().toLocaleLowerCase() == this.searchQuery) {
          this.listed.push(kvitto);
        } else if (kvitto[this.options[4].value as keyof KvittoModel].toString().toLocaleLowerCase().includes(this.searchQuery) || kvitto[this.options[3].value as keyof KvittoModel].toString().toLocaleLowerCase() == this.searchQuery) {
          this.listed.push(kvitto);
        } else if (kvitto[this.options[5].value as keyof KvittoModel].toString().toLocaleLowerCase().includes(this.searchQuery) || kvitto[this.options[4].value as keyof KvittoModel].toString().toLocaleLowerCase() == this.searchQuery) {
          this.listed.push(kvitto);
        }
      } else {
        if (kvitto[this.selectedCategory as keyof KvittoModel].toString().toLocaleLowerCase().includes(this.searchQuery.toLowerCase()) || kvitto[this.selectedCategory as keyof KvittoModel].toString().toLocaleLowerCase() == this.searchQuery.toLocaleLowerCase()) {
          this.listed.push(kvitto);
        }
      }
    }
  }
}
