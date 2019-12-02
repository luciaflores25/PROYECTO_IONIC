import { Component, OnInit } from '@angular/core';
import { Receta } from '../receta/receta';
import { AlertController, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ServicesRecipe } from '../services/services.service';


@Component({
  selector: 'app-lista-recetas',
  templateUrl: './lista-recetas.page.html',
  styleUrls: ['./lista-recetas.page.scss'],
})
export class ListaRecetasPage implements OnInit {

  listaRecetas: Receta[] = [];
  cat: string;
  constructor(
    private servicesRecipe: ServicesRecipe,
    private navController: NavController,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.cat = this.activatedRoute.snapshot.paramMap.get('idCategoria');
    console.log(this.cat);
  }
  ionViewWillEnter() {
    this.servicesRecipe.getRecetas().then(
      data => this.listaRecetas = data.filter(t => t.idCategoria == this.cat)
    );
  }

  mostrar(idReceta: number) {
      this.navController.navigateForward('/mostrarReceta/' + idReceta);
  }
}
