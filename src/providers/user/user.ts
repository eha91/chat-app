import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';
import { Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';

interface Datos {
  status;
  users;
  email;
  data;
}

@Injectable()
export class UserProvider {

  clave;
  messages = [];
  users = [];

  constructor(private socket: Socket,
              private platform:Platform,
              private storage: Storage,
              ) {
    console.log('Hello UserProvider Provider');
    this.getUsers().subscribe((resp:Datos) => {
      this.users.push(resp);
      this.messages.push({
        email:resp.email,
        msj: []
      });
    })

    this.getMsj().subscribe((resp:Datos) => {
      let index = this.messages.findIndex((ele) => {
        return ele.email == resp.email;
      })
      this.messages[index].msj.push(resp.data);
    })
  }

  setConexion() {
    this.socket.connect();
  }

  setDisconnect() {
    this.socket.disconnect();
  }

  setAllUsers(clave) {
    this.socket.emit('all-users',{clave});
    this.socket.fromEvent('all-users-resp').subscribe((resp:Datos) => {
      this.users = resp.users;
    })
  }

  getUsers() {
    return this.socket.fromEvent('new-user');
  }

  getMsj() {
    return this.socket.fromEvent('msj-user');
  }
  

  setLogin(clave) {
    this.socket.emit("login-app", {clave});
    let promesa = new Promise((resolve,reject) => {
      return this.socket.fromEvent("login-app-resp").subscribe((resp:Datos) => {
        if(resp.status) {
          this.clave = clave;
          this.saveStorage();
          resolve();
        }
        else {
          this.socket.disconnect();
          reject();
        }
      });
    })

    return promesa;
  }

  saveStorage() {
    if(this.platform.is('cordova')) {
      //celular
      this.storage.set('clave', this.clave);
    }
    else {
      localStorage.setItem('clave',this.clave);
    }
  }

  loadStorage() {
    return new Promise((resolve,reject) => {
      if(this.platform.is('cordova')) {
        //celular
        this.storage.get('clave').then(val => {
          if(val) {
            this.clave = val;
            resolve(true)
          }
          else {
            resolve(false);
          }
        })
      }
      else {
        if(localStorage.getItem('clave')) {
          this.clave = localStorage.getItem('clave');
          resolve(true);
        }
        else {
          resolve(false);
        }
      }
    })
  }

  closeStorage() {
    return new Promise((resolve,reject) => {
      this.messages = [];
      this.users = [];
      if(this.platform.is('cordova')) {
        this.storage.remove('clave').then((val) => {
          resolve();
        })
      }
      else {
        this.clave = null;
        localStorage.removeItem('clave');
        resolve();
      }
    })
  }

  /*
  getUsers() {
    return new Promise((resolve,reject) => {
      this.socket.fromEvent("users-online").
    })
  }*/

}
