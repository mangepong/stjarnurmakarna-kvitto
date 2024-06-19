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
  public isLoading: boolean = true;
  public isEmpty: boolean = true;
  public currentPage: number = 0;
  public isFirstPage: boolean = true;
  constructor(
    private applicationService: ApplicationService
  ) { }

  ngOnInit() {
    this.applicationService.getAll(0).subscribe((data: any) => {
      this.model = data.map((e: any) => {
        return {
          ...e.payload.val(),
          key: e.key,
        } as KvittoModel;
      });
      this.listed = this.model.reverse();
      this.checkIfEmpty();
      this.isLoading = false;
    });
    this.isFirstPage = this.currentPage === 0;
  }

  nextPage() {
    this.isLoading= true;
    this.model = [];
    this.listed = [];
    this.currentPage += 1;
    this.applicationService.getAll(this.currentPage * 100).subscribe((data: any) => {
      this.model = data.map((e: any) => {
        return {
          ...e.payload.val(),
          key: e.key,
        } as KvittoModel;
      });
      this.listed = this.model.reverse();
      this.checkIfEmpty();
      this.isLoading = false;
    });
    this.isFirstPage = this.currentPage === 0;
  }

  previousPage() {
    this.isLoading= true;
    this.model = [];
    this.listed = [];
    this.currentPage -= 1;
    this.applicationService.getAll(this.currentPage * 100).subscribe((data: any) => {
      this.model = data.map((e: any) => {
        return {
          ...e.payload.val(),
          key: e.key,
        } as KvittoModel;
      });
      this.listed = this.model.reverse();
      this.checkIfEmpty();
      this.isLoading = false;
    });
    this.isFirstPage = this.currentPage === 0;
  }

  checkIfEmpty() {
    console.log(this.listed.length)
    if (this.listed.length === 0) {
      this.isEmpty = true;
    } else {
      this.isEmpty = false;
    }
  }

  onSelected() {
  }

  clear() {
    setTimeout(() => {
      if (this.searchQuery == "") {
        this.listed = this.model;
      }
    }, 100)
  }

  onSearch() {
    this.isLoading = true;
    this.listed = [];

    if (this.searchQuery == "") {
      this.listed = this.model;
      this.isLoading = false;
      return;
    }

    switch(this.selectedCategory) {
      case "all":
        this.listed = this.applicationService.getItemsBySearchQuery(this.searchQuery);
        break;
      case "refNummer":
        this.listed = this.applicationService.getSpecificRef(this.searchQuery);
        break;
      case "kundnamn":
        this.listed = this.applicationService.getSpecificCustomer(this.searchQuery);
        break;
      case "telefon":
        this.listed = this.applicationService.getSpecificPhone(this.searchQuery);
        break;
      case "fabrikat":
        this.listed = this.applicationService.getSpecificFabrikat(this.searchQuery);
        break;
      case "notering":
        this.listed = this.applicationService.getSpecificNote(this.searchQuery);
        break;
    }
    this.isLoading = false;
  }
}


  // onSearch() {
  //   this.isLoading = true;
  //   this.listed = [];

  //   if (this.searchQuery == "") {
  //     this.listed = this.model;
  //     return;
  //   }

  //   switch(this.selectedCategory) {
  //     case "refNummer":
  //       this.applicationService.getKvitto(this.searchQuery).subscribe((data: any) => {
  //         data.data.forEach((kvitto: KvittoModel) => {
  //           this.listed.push(kvitto);
  //         });
  //       });
  //       break;
  //     case "kundnamn":
  //       this.applicationService.getSpecificCustomer(this.searchQuery).subscribe((data: any) => {
  //         data.data.forEach((kvitto: KvittoModel) => {
  //           this.listed.push(kvitto);
  //         });
  //       });
  //       break;
  //     case "telefon":
  //       this.applicationService.getSpecificPhone(this.searchQuery).subscribe((data: any) => {
  //         data.data.forEach((kvitto: KvittoModel) => {
  //           this.listed.push(kvitto);
  //         });
  //       });
  //       break;
  //     case "fabrikat":
  //       this.applicationService.getSpecificFabrikat(this.searchQuery).subscribe((data: any) => {
  //         data.data.forEach((kvitto: KvittoModel) => {
  //           this.listed.push(kvitto);
  //         });
  //       });
  //       break;
  //     case "notering":
  //       this.applicationService.getSpecificNote(this.searchQuery).subscribe((data: any) => {
  //         data.data.forEach((kvitto: KvittoModel) => {
  //           this.listed.push(kvitto);
  //         });
  //       });
  //       break;
  //   }
  //   this.isLoading = false;
  // }

//   onSearch() {
//     console.log(this.selectedCategory)
//     this.isLoading = true;
//     this.listed = [];

//     if (this.searchQuery == "") {
//       this.listed = this.model;
//       return;
//     }
//     for (let kvitto of this.model) {
//       if (this.selectedCategory == "all") {
//         if (kvitto.refNummer.toString().toLocaleLowerCase().includes(this.searchQuery) || kvitto.refNummer.toString().toLocaleLowerCase() == this.searchQuery) {
//           this.listed.push(kvitto);
//         } else if (kvitto[this.options[1].value as keyof KvittoModel]!.toString().toLocaleLowerCase().includes(this.searchQuery) || kvitto[this.options[1].value as keyof KvittoModel]!.toString().toLocaleLowerCase() == this.searchQuery) {
//           this.listed.push(kvitto);
//         } else if (kvitto[this.options[2].value as keyof KvittoModel]!.toString().toLocaleLowerCase().includes(this.searchQuery) || kvitto[this.options[2].value as keyof KvittoModel]!.toString().toLocaleLowerCase() == this.searchQuery) {
//           this.listed.push(kvitto);
//         } else if (kvitto[this.options[3].value as keyof KvittoModel]!.toString().toLocaleLowerCase().includes(this.searchQuery) || kvitto[this.options[3].value as keyof KvittoModel]!.toString().toLocaleLowerCase() == this.searchQuery) {
//           this.listed.push(kvitto);
//         } else if (kvitto[this.options[4].value as keyof KvittoModel]!.toString().toLocaleLowerCase().includes(this.searchQuery) || kvitto[this.options[4].value as keyof KvittoModel]!.toString().toLocaleLowerCase() == this.searchQuery) {
//           this.listed.push(kvitto);
//         }
//       } else {
//         if (kvitto[this.selectedCategory as keyof KvittoModel]!.toString().toLocaleLowerCase().includes(this.searchQuery.toLowerCase()) || kvitto[this.selectedCategory as keyof KvittoModel]!.toString().toLocaleLowerCase() == this.searchQuery.toLocaleLowerCase()) {
//           this.listed.push(kvitto);
//         }
//       }
//     }
//     this.isLoading = false;
//   }
// }
