import { Injectable } from '@angular/core';
import { IonicAuth } from '@ionic-enterprise/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { environment } from '@app/env';

@Injectable({
    providedIn: 'root'
})
export class CognitoService extends IonicAuth {
    private authState: BehaviorSubject<boolean> = new BehaviorSubject(false);

    authState$: Observable<boolean> = this.authState.asObservable();

    constructor(platform: Platform, private storage: Storage) {
        super({
            ...environment.congnito,
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
        const isLoggedIn = await this.storage.get('cognito');
        this.authState.next(!!isLoggedIn);
    }

    private async setState(currentState: boolean): Promise<void> {
        await this.storage.set('cognito', currentState);
        this.authState.next(currentState);
    }
}
