
import { ShowService } from './../services/show.service';
import { AuthService, TOKEN_KEY, Storage } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { IUser } from '../services/interface/iuser';
import { IWorker } from '../services/interface/iworker';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent, CommonModule]
})
export class Tab2Page {
  res: string[] = [];
  
  constructor(private show: ShowService) {
  }
  view() {
   
    this.show.getObject();
    this.res = this.show.rezult;
   
  }
 ionViewDidEnter(){
     this.res =[];
}
}
