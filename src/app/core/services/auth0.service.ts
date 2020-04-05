import { Injectable } from '@angular/core';
import { IonicAuth } from '@ionic-enterprise/auth';
import { Platform } from '@ionic/angular';
import { environment } from '@app/env';
import { Storage } from '@ionic/storage';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class Auth0Service extends IonicAuth {
    private authState: BehaviorSubject<boolean> = new BehaviorSubject(false);

    authState$: Observable<boolean> = this.authState.asObservable();

    constructor(platform: Platform, private storage: Storage) {
        super({
            ...environment.auth0,
            platform: platform.is('capacitor') ? 'capacitor' : 'web',
            redirectUri:
                (platform.is('capacitor')
                    ? environment.appHost
                    : environment.webHost) + 'login',
            logoutUrl:
                (platform.is('capacitor')
                    ? environment.appHost
                    : environment.webHost) + 'login'
        });
        this.initState();
    }

    async isAuthenticated(): Promise<boolean> {
        const isAuth = await super.isAuthenticated();
        this.setState(isAuth);
        return isAuth;
    }

    async onLoginSuccess(): Promise<void> {
        this.setState(true);
    }

    async onLogout(): Promise<void> {
        this.setState(false);
    }

    private async initState(): Promise<void> {
        const isLoggedIn = await this.storage.get('auth0');
        this.authState.next(!!isLoggedIn);
    }

    private async setState(currentState: boolean): Promise<void> {
        await this.storage.set('auth0', currentState);
        this.authState.next(currentState);
    }
}
