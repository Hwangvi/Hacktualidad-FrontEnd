import { Component, OnInit } from '@angular/core';
import { HeroComponent } from './hero/hero.component';
import { PosibilidadesComponent } from './posibilidades/posibilidades.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [HeroComponent, PosibilidadesComponent],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
