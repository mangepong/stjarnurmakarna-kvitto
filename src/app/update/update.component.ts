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
  private refNr: number = 0;


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


    this.applicationService.getKvitto(this.refNr).subscribe((data: any) => {
      this.model = data.data[0];
      for (let i = 0; i < tempArbeten.length; i++) {
        if (this.model.arbeten.includes(tempArbeten[i].name)) {
          tempArbeten[i].checked = true;
        }
      }
      this.model.arbeten = tempArbeten;
    });
  }

  updateKvitto() {
    console.log(JSON.stringify(modelToApi(this.model)))
    this.applicationService.update(modelToApi(this.model));
  }

  abort() {
    this.router.navigate(['list']);
  }
}
