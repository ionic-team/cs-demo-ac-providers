import { Injectable } from '@angular/core';
import { IonicAuth, IonicAuthOptions } from '@ionic-enterprise/auth';
import { Platform } from '@ionic/angular';
import { environment } from '@app/env';
import { BehaviorSubject, Observable } from 'rxjs';

export interface SimpleAuth {
    state$: Observable<boolean>;
    login: () => Promise<void>;
    logout: () => Promise<void>;
    isAuthenticated(): Promise<boolean>;
}

export enum AuthType {
    auth0 = 'auth0',
    azureB2C = 'azureB2C',
    cognito = 'cognito',
    okta = 'okta'
}

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    // Memoize the references to the various Auth Providers
    private authRefs: Partial<{ [key in AuthType]: SimpleAuth }> = {};
    // Auth Providers
    private auth0: IonicAuth;
    private azureB2C: IonicAuth;
    private cognito: IonicAuth;
    private okta: IonicAuth;

    constructor(private platform: Platform) {
        this.init();
    }

    public getAuth(type: AuthType): SimpleAuth {
        if (!this.authRefs[type]) {
            const state = new BehaviorSubject<boolean>(false);
            this[type].onLoginSuccess = () => state.next(true);
            this[type].onLogout = () => state.next(false);
            this.authRefs[type] = {
                login: async () => {
                    this[type].login();
                },
                logout: async () => {
                    this[type].logout();
                },
                isAuthenticated: async () => {
                    const isAuth = await this[type].isAuthenticated();
                    state.next(isAuth);
                    return isAuth;
                },
                state$: state.asObservable()
            };
        }
        return this.authRefs[type];
    }

    private init(): void {
        const platformVars: Partial<IonicAuthOptions> = {
            platform: this.platform.is('capacitor') ? 'capacitor' : 'web',
            redirectUri: `${
                this.platform.is('capacitor')
                    ? environment.appHost
                    : environment.webHost
            }login`,
            logoutUrl: `${
                this.platform.is('capacitor')
                    ? environment.appHost
                    : environment.webHost
            }login`
        };
        // Init Auth0
        this.auth0 = new IonicAuth({
            ...environment.auth0,
            ...platformVars
        });
        // This is never called
        this.auth0.onLoginSuccess = () => console.log('Login Successful!');

        // Init AzureB2C
        this.azureB2C = new IonicAuth({
            ...environment.azure,
            ...platformVars,
            // Azure B2C has a different device redirect/logout Urls
            // than the other providers
            redirectUri: this.platform.is('capacitor')
                ? 'msauth://com.ionic.acprovider/O5m5Gtd2Xt8UNkW3wk7DWyKGfv8%3D'
                : `${environment.webHost}login`,
            logoutUrl: this.platform.is('capacitor')
                ? 'msauth://com.ionic.acprovider/O5m5Gtd2Xt8UNkW3wk7DWyKGfv8%3D'
                : `${environment.webHost}login`
        });

        // Init AWS Cognito
        this.cognito = new IonicAuth({
            ...environment.congnito,
            ...platformVars
        });

        // Init Okta
        this.okta = new IonicAuth({
            ...environment.okta,
            ...platformVars
        });
    }
}
