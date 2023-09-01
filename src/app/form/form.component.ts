import { Component, OnInit } from '@angular/core';
import { KvittoModel } from '../shared/KvittoModel';
import { ApplicationService } from '../ApplicationService';
import { modelToApi } from '../utils/TransformService';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  public model: KvittoModel = {
    arbeten: [
      { value: 1, name: 'Glas', checked: false },
      { value: 2, name: 'Batteri', checked: false },
      { value: 3, name: 'Länk ändring', checked: false },
      { value: 4, name: 'Kostnadsförslag', checked: false },
      { value: 5, name: 'Övrigt', checked: false },
    ],
  } as KvittoModel;

  constructor(private applicationService: ApplicationService) {}

  ngOnInit() {
    this.model.inDatum = new Date()
      .toLocaleString('sv-SE', { timeZone: 'Europe/Stockholm' })
      .slice(0, 16);
    this.model.levDatum = new Date()
      .toLocaleString('sv-SE', { timeZone: 'Europe/Stockholm' })
      .slice(0, 16);

    this.applicationService.getRefNumber().subscribe((data: any) => {
      this.model.refNummer = data.refNummer;
    });
  }
  onClickSubmit() {
    this.applicationService.create(modelToApi(this.model));
  }
}
