import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { LoginPage } from '../login/login';
import { ChatPage } from '../chat/chat';

interface Datos {
  user;
  email;
  data;
}


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
              public _user:UserProvider,
              ) {
     
  }

  ionViewDidLoad() {
    
  }

  

  closeLogin() {
    this._user.closeStorage().then(() => {
      this.navCtrl.setRoot(LoginPage);
      this._user.setDisconnect()
      console.log('Conexion Deshabiliatada');
    })
  }

  irChat(email) {
    let index;
    let msj = [];
    if(this._user.messages.length > 0) {
      index = this._user.messages.findIndex((ele) => {
        return ele.email == email;
      })
      msj = this._user.messages[index].msj;
    }
    
    
    
    this.navCtrl.push(ChatPage,{
      email:email,
      messages: msj
    })
  }

}
