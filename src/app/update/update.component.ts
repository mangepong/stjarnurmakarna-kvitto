import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationService } from '../ApplicationService';
import { modelToApi } from '../utils/TransformService';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  public model = {} as any;
  public refNr: number = 0;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private applicationService: ApplicationService
) { }

  ngOnInit(){
    this.route.params.subscribe( params =>
        this.refNr = params['refNr']
    )
    let tempArbeten = [
      { value: 1, name: 'Glas', checked: false },
      { value: 2, name: 'Batteri', checked: false },
      { value: 3, name: 'Länk ändring', checked: false },
      { value: 4, name: 'Kostnadsförslag', checked: false },
      { value: 5, name: 'Övrigt', checked: false },
    ];


    this.applicationService.getKvitto(this.refNr.toString()).subscribe((data: any) => {
      this.model = data.payload.val();
      for (let i = 0; i < tempArbeten.length; i++) {
        if(this.model.arbeten) {
          for (let j = 0; j < this.model.arbeten.length; j++) {
            if (this.model.arbeten[j].name == tempArbeten[i].name && this.model.arbeten[j].checked) {
              tempArbeten[i].checked = true;
            }
          }
        }
      }
      this.model.key = this.refNr;
      this.model.arbeten = tempArbeten;
    });
  }

  updateKvitto() {
    this.applicationService.update(this.model);
  }

  abort() {
    this.router.navigate(['list']);
  }
}
