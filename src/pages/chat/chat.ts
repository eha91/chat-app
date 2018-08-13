import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  username = '';
  messages = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.username = this.navParams.get('email');
    this.messages = this.navParams.get('messages');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

}
