import { Component, OnInit } from '@angular/core';
import { Receta } from '../receta/receta';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ServicesRecipe } from '../services/services.service';

@Component({
  selector: 'app-insertar-receta',
  templateUrl: './insertar-receta.page.html',
  styleUrls: ['./insertar-receta.page.scss'],
})
export class InsertarRecetaPage implements OnInit {

    receta: Receta;
    edit = false;
    constructor(
      private servicesRecipe: ServicesRecipe,
      private navController: NavController,
      private activatedRoute: ActivatedRoute) {

      this.receta = {
        idReceta: this.servicesRecipe.contadorRecetas,
        idCategoria: '',
        nombreReceta: '',
        imagen: '',
        tiempo: '',
        ingredientes: '',
        preparacion: ''
      };
    }
    ngOnInit() {
      const idReceta = this.activatedRoute.snapshot.paramMap.get('idReceta');
      if (idReceta) {
        this.edit = true;
        this.receta = this.servicesRecipe.getRecetaById(+idReceta);
      }
    }
    saveReceta(t: Receta) { 
      if (this.edit) {
        this.servicesRecipe.saveReceta(this.receta).then(() => this.navController.navigateBack,
        (error) => console.error('Ha ocurrido un error al guardar la receta:' + error));
        this.navController.navigateForward('/mostrarReceta/' + this.receta.idReceta);
      } else {
        this.servicesRecipe.newReceta(this.receta).then(() => this.navController.navigateBack,
        (error) => console.error('Ha ocurrido un error al guardar la receta:' + error));
        this.navController.navigateForward('/listaCategoria');
      }
    }
  }
