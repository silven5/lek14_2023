import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, switchMap } from 'rxjs/operators';
import { BehaviorSubject, from, Observable, of, Subject } from 'rxjs';
import { Preferences } from '@capacitor/preferences';
import { IUser } from './interface/iuser';
import { Route } from '@angular/router';
export const Storage = Preferences;
export const TOKEN_KEY = 'user-token';
export const ROLE = ['ADMIN', 'USER'];
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // !простий вхід
  constructor() {
    this.loadUser();
  }
  isLoggedIn: boolean = false;

  login() {
    this.isLoggedIn = true;
  }

  logout() {
    this.isLoggedIn = false;
  }

  private currenteUser: BehaviorSubject<any> = new BehaviorSubject(null);
  // Читання користувачів з локального сховища
  loadUser() {
    Storage.get({ key: TOKEN_KEY }).then((res) => {
      if (res.value) {
        this.currenteUser.next(JSON.parse(res.value));
      } else {
        this.currenteUser.next(false);
      }
    });
  }
  // Вхід
  signIn(role: string) {
    let userObj: IUser | undefined;
    if (role === ROLE[1]) {
      userObj = {
        role: ROLE[1],
        permissions: ['read'],
        users: [
          {
            name: 'Alex',
            password: '1',
          },
        ],
      };
    } else {
      if (role === ROLE[0]) {
        userObj = {
          role: ROLE[0],
          permissions: ['read', 'write', 'delete'],
          users: [
            {
              name: 'Olena',
              password: '1',
            },
          ],
        };
      }
    }
    // Повертаємо Observable
    return of(userObj).pipe(
      tap((user) => {
        Storage.set({ key: TOKEN_KEY, value: JSON.stringify(user) });
        this.currenteUser.next(user);
        // this.login();
      })
    );
  }
  // Повертаємо поточного користувача як Observable
  getUser() {
    return this.currenteUser.asObservable();
  }
  // Вихід
  async signOut() {
    await Storage.remove({ key: TOKEN_KEY });
    this.currenteUser.next(false);
    this.logout();
  }
}
