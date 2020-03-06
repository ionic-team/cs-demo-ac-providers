import { Component, OnInit } from '@angular/core';
import {
    Auth0Service,
    AzureService,
    CognitoService,
    OktaService
} from '@app/services';
import { Observable, of } from 'rxjs';

interface AuthMethod {
    name: string;
    color: string;
    handler: () => void;
    state$: Observable<boolean>;
}

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
    public methods: AuthMethod[] = [
        {
            name: 'Auth0',
            color: 'danger',
            handler: () => this.useAuth0(),
            state$: this.auth0Service.authState$
        },
        {
            name: 'Azure B2C',
            color: 'tertiary',
            handler: async () => {
                // const authenticated = await this.auth0Service.isAuthenticated();
                // if (authenticated) {
                //     this.auth0Service.login();
                // } else {
                //     this.auth0Service.logout();
                // }
            },
            state$: of(false)
        },
        {
            name: 'Cognito',
            color: 'warning',
            handler: async () => {
                // const authenticated = await this.auth0Service.isAuthenticated();
                // if (authenticated) {
                //     this.auth0Service.login();
                // } else {
                //     this.auth0Service.logout();
                // }
            },
            state$: of(false)
        },
        {
            name: 'Okta',
            color: 'primary',
            handler: async () => {
                // const authenticated = await this.auth0Service.isAuthenticated();
                // if (authenticated) {
                //     this.auth0Service.login();
                // } else {
                //     this.auth0Service.logout();
                // }
            },
            state$: of(false)
        }
    ];

    constructor(
        private auth0Service: Auth0Service,
        private azureService: AzureService,
        private cognitoService: CognitoService,
        private oktaService: OktaService
    ) {}

    ngOnInit() {}

    public async useAuth0(): Promise<void> {
        const authenticated = await this.auth0Service.isAuthenticated();
        console.log('auth', authenticated);
        if (authenticated) {
            this.auth0Service.logout();
        } else {
            this.auth0Service.login();
        }
    }
}
