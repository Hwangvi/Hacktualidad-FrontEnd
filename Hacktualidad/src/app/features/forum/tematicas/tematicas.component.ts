import { Component, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-tematicas',
  templateUrl: './tematicas.component.html',
  styleUrls: ['./tematicas.component.css'],
  imports: [RouterLink]
})
export class TematicasComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
