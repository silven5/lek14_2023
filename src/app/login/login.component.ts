import { Component, OnInit } from '@angular/core';
import { IWorker } from '../services/interface/iworker';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class LoginComponent  implements OnInit {
  worker:IWorker={name:"",password:""}
  constructor(private modalCtrl: ModalController) { }
 close() {
    this.worker = { name: "", password: "" };
    this.modalCtrl.dismiss(this.worker);
  }
  ngOnInit() {}
save(name:any,password:any)
{
    this.worker.name = name;
    this.worker.password = password;
    this.modalCtrl.dismiss(this.worker);
}
  dismiss() {
    close();
  }
}
