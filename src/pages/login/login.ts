import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { HomePage } from '../home/home';
 

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private alertCtrl: AlertController,
              public loadingCtrl:LoadingController,
              public _user:UserProvider) {
  }

  ionViewDidLoad() {
    this.slides.paginationType = 'progress';
    this.slides.lockSwipes(true);
    this.slides.freeMode = false;
  }

  mostrarInput() {
    this.alertCtrl.create({
      title: 'Ingrese su ID',
      inputs: [{
        name: 'username',
        placeholder: 'Identificador'
      }],
      buttons: [{
        text:'Cancelar',
        role: 'cancel'
      },{
        text: 'Ingresar',
        handler: data => {
          console.log(data);
          this.verificarUsuario(data.username);
        }
      }]
    }).present();
  }

  verificarUsuario(clave:string) {
    let loading = this.loadingCtrl.create({
      content: 'Verificando ...'
    });
    loading.present();

    this._user.setLogin(clave).then(() => {
      this.slides.lockSwipes(false);
      this.slides.freeMode = true;
      this.slides.slideNext();
      this.slides.lockSwipes(true);
      this.slides.freeMode = false;
      loading.dismiss();
    }).catch(() => {
      loading.dismiss();
      this.alertCtrl.create({
        title:'Usuario Incorrecto',
        subTitle: 'Verifique el Id o pruebe de nuevo',
        buttons: ['Aceptar']

      }).present();
    })
  }

  ingresar() {
    this.navCtrl.setRoot(HomePage);
  }

}
