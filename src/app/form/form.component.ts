import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  startDate = new Date().toLocaleString('sv-SE', { timeZone: 'Europe/Stockholm' }).slice(0, 16);
  ngOnInit() {
  }
  onClickSubmit(result: any) {
     console.log("You have entered : " + result.username); 
  }

}
