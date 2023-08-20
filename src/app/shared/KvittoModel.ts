export interface KvittoInterface {
  refNummer: number;
  kundnamn: string;
  telefon: string;
  adress: string;
  kategori: string;
  fabrikat: string;
  inDatum: string;
  levDatum: string;
  arbeten: [
    { value: 1; name: 'Glas'; checked: false },
    { value: 2; name: 'Batteri'; checked: false },
    { value: 3; name: 'Länk ändring'; checked: false },
    { value: 4; name: 'Kostnadsförslag'; checked: false },
    { value: 5; name: 'Övrigt'; checked: false }
  ];
  statusMeddelande: string;
  notering: string;
  status: boolean;
  pris: string;
}

export class KvittoModel {
  constructor(model: KvittoInterface) {
    this.refNummer = model.refNummer;
    this.kundnamn = model.kundnamn;
    this.telefon = model.telefon;
    this.adress = model.adress;
    this.kategori = model.kategori;
    this.fabrikat = model.fabrikat;
    this.inDatum = model.inDatum;
    this.levDatum = model.levDatum;
    this.arbeten = model.arbeten;
    this.statusMeddelande = model.statusMeddelande;
    this.notering = model.notering;
    this.status = model.status;
    this.pris = model.pris;
  }
  refNummer: number;
  kundnamn: string;
  telefon: string;
  adress: string;
  kategori: string;
  fabrikat: string;
  inDatum: string;
  levDatum: string;
  arbeten: [
    { value: 1; name: 'Glas'; checked: false },
    { value: 2; name: 'Batteri'; checked: false },
    { value: 3; name: 'Länk ändring'; checked: false },
    { value: 4; name: 'Kostnadsförslag'; checked: false },
    { value: 5; name: 'Övrigt'; checked: false }
  ];
  statusMeddelande: string;
  notering: string;
  status: boolean;
  pris: string;
}
