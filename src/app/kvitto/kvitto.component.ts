import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationService } from '../ApplicationService';

@Component({
  selector: 'app-kvitto',
  templateUrl: './kvitto.component.html',
  styleUrls: ['./kvitto.component.css']
})
export class KvittoComponent implements OnInit {
  public kvitto = {} as any;
  private refNr: number = 0;
  public arbetenKvitto: string = "";
  public temp: Array<string> = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private applicationService: ApplicationService
) { }

  ngOnInit(){
    this.route.params.subscribe( params =>
        this.refNr = params['refNr']
    )

    this.applicationService.getKvitto(this.refNr.toString()).subscribe((data: any) => {
      this.kvitto = data.payload.val();
      this.kvitto.arbeten.forEach((item: any) => {
        if (item.checked) {
          this.arbetenKvitto += item.name.toString() + ", ";
        }
      });
      this.arbetenKvitto = this.arbetenKvitto.slice(0, -2);
      console.log(this.kvitto)
    });
  }
}
