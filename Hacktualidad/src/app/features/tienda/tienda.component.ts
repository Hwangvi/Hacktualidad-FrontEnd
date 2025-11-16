import { Component, OnInit } from '@angular/core';
import { ProductListComponent } from './product-list/product-list.component';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css'],
  imports: [ProductListComponent]
})
export class TiendaComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
