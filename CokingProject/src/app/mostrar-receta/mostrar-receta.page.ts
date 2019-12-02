import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { Receta } from '../receta/receta';
import { ActivatedRoute } from '@angular/router';
import { ServicesRecipe } from '../services/services.service';

@Component({
  selector: 'app-mostrar-receta',
  templateUrl: './mostrar-receta.page.html',
  styleUrls: ['./mostrar-receta.page.scss'],
})
export class MostrarRecetaPage implements OnInit {

  recetas: Receta;
  listaRecetas: Receta[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private servicesRecipe: ServicesRecipe,
    private alertController: AlertController,
    private navController: NavController) {
  }
  ngOnInit() {
    const idReceta = this.activatedRoute.snapshot.paramMap.get('idReceta');
    this.recetas = this.servicesRecipe.getRecetaById(+idReceta);
}

  editReceta(idReceta: number) {
    this.navController.navigateForward('/InsertarReceta/' + idReceta);
  }

  async deleteDialog(idReceta: number, idCategoria: string) {
    const alert = await this.alertController.create({
      header: 'Borrar receta',
      message: '¿Estas seguro de que quieres borrar esta Receta?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancelar');
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            this.servicesRecipe.deleteReceta(idReceta).then(
              () => this.servicesRecipe.getRecetas().then(
              data => this.listaRecetas = data).then(
                () => this.navController.navigateForward('/listaRecetas/' + idCategoria))

            );
            console.log('Confirmar');
          }
        }
      ]
    });
    await alert.present();
  }
}
