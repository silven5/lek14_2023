import { Component } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { AuthService, ROLE } from '../services/auth.service';
import { IWorker } from '../services/interface/iworker';
import { LoginComponent } from '../login/login.component';
import { IUser } from '../services/interface/iuser';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent],
})
export class Tab1Page {
  worker: IWorker = { name: "", password: "" };
  user: IUser | undefined = { role: "", permissions: [], users: [] };
  rcount:number=0;

  constructor(private auth: AuthService, 
    private modalCtrl: ModalController,
    private alertController: AlertController
    ) { }
  login() {
    this.auth.login()
  }
  logout() {
    this.auth.logout()
  }
  signIn(role: any) {
    this.auth.signIn(role).subscribe(user => {
      console.log(user);
      this.user = user;

    }

    )
  }
  async openModal() {
    const modal = await this.modalCtrl.create({
      component: LoginComponent,
      componentProps: { worker: this.worker },
    });
    modal.present();
    modal.onDidDismiss()
      .then((data) => {
        const worker1 = data['data'];
        console.log('data came back from modal');
          this.save(worker1);
          let ex=false;
        this.user?.users.forEach(
          el => {
         if (el.name === this.worker.name && el.password === this.worker.password) {
          this.auth.login();
          this.presentAlert("Log in " +ROLE[this.rcount]);
          ex=true;
        }
      }
        );
        if (!ex)
        {
           this.presentAlert("Error name or password");
           this.logout();
        }
      });
  }
  save(worker: IWorker) {
    this.worker = worker;

  }

  openAdmin() {
    this.openModal();
    this.rcount=0;
    this.signIn(ROLE[this.rcount]);
    

  }
   openUser() {
    this.openModal();
    this.rcount=1;
    this.signIn(ROLE[this.rcount]);
    

  }
  // Виведення вікна
    async presentAlert(message:string) {
    const alert = await this.alertController.create({
      header: 'Log In',

      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
