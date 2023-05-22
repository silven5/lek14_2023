import { Injectable } from '@angular/core';
import { AuthService, TOKEN_KEY,Storage } from './../services/auth.service';

import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { IUser } from '../services/interface/iuser';
import { IWorker } from '../services/interface/iworker';
@Injectable({
  providedIn: 'root'
})
export class ShowService {

users:IUser|undefined;
rezult:string[]=[];
  constructor(private auth:AuthService) { 
    this.getObject();
  }
  // JSON "get" example
async getObject() {
  this.rezult=[];
  const ret = await Storage.get({ key: TOKEN_KEY });
  if (ret.value)
  {
    this.users = JSON.parse(ret.value);
    console.log("Show service");
     console.log(this.users);
 
    this.rezult.push("ROLE ");
    //! ? = if (this.ysers!=null)
    this.rezult.push( ""+this.users?.role);
    this.rezult.push("Permisions");
    this.users?.permissions.forEach(pr=>{
      this.rezult.push(pr)
    }
      )
      this.rezult.push("USERS");
      this.users?.users.forEach(
        us=>{
          this.rezult.push("Name " +us.name+" Password "+us.password);
        }
      )
   
    console.log(this.rezult)
  }
  
}

}
