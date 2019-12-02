import { Component, OnInit } from '@angular/core';
import { ServicesRecipe } from '../services/services.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  constructor(private servicesRecipe: ServicesRecipe) { }

  ngOnInit() {
    this.servicesRecipe.getRecetas();
  }
}
