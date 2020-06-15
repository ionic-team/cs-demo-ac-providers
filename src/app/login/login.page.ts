import { Component, OnInit } from '@angular/core';
import { AuthenticationService, AuthType } from '@app/services';
import { Observable, forkJoin, from, timer, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faAmazon, faMicrosoft } from '@fortawesome/free-brands-svg-icons';
import {
    faSync,
    faStar,
    faCheckCircle
} from '@fortawesome/free-solid-svg-icons';

interface AuthMethod {
    name: string;
    color: string;
    icon: IconDefinition;
    handler: () => void;
    refresh: () => Promise<void>;
    refreshing: boolean;
    state$: Observable<boolean>;
}

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
    public refreshIcon = faSync;
    public methods: AuthMethod[] = [
        {
            name: 'Auth0',
            color: 'danger',
            icon: faStar,
            handler: () => this.useAuth0(),
            refresh: async () => {
                await this.authService
                    .getAuth(AuthType.auth0)
                    .isAuthenticated();
            },
            refreshing: false,
            state$: this.authService.getAuth(AuthType.auth0).state$
        },
        {
            name: 'Azure B2C',
            color: 'tertiary',
            icon: faMicrosoft,
            handler: () => this.useAzure(),
            refresh: async () => {
                await this.authService
                    .getAuth(AuthType.azureB2C)
                    .isAuthenticated();
            },
            refreshing: false,
            state$: this.authService.getAuth(AuthType.azureB2C).state$
        },
        {
            name: 'Cognito',
            color: 'warning',
            icon: faAmazon,
            handler: () => this.useCognito(),
            refresh: async () => {
                await this.authService
                    .getAuth(AuthType.cognito)
                    .isAuthenticated();
            },
            refreshing: false,
            state$: this.authService.getAuth(AuthType.cognito).state$
        },
        {
            name: 'Okta',
            color: 'primary',
            icon: faCheckCircle,
            handler: () => this.useOkta(),
            refresh: async () => {
                await this.authService.getAuth(AuthType.okta).isAuthenticated();
            },
            refreshing: false,
            state$: this.authService.getAuth(AuthType.okta).state$
        }
    ];

    constructor(private authService: AuthenticationService) {}

    ngOnInit() {}

    public async refresh(m: AuthMethod): Promise<void> {
        m.refreshing = true;
        forkJoin([from(m.refresh()), timer(1000).pipe(take(1))]).subscribe(
            () => {
                m.refreshing = false;
            }
        );
    }

    public isLight(color: string): boolean {
        switch (color) {
            case 'primary':
            case 'tertiary':
            case 'danger':
            case 'dark':
                return false;
            default:
                return true;
        }
    }

    private async useAuth0(): Promise<void> {
        const auth0 = this.authService.getAuth(AuthType.auth0);
        const authenticated = await auth0.isAuthenticated();
        if (authenticated) {
            auth0.logout();
        } else {
            auth0.login();
        }
    }

    private async useAzure(): Promise<void> {
        const azureB2C = this.authService.getAuth(AuthType.azureB2C);
        const authenticated = await azureB2C.isAuthenticated();
        if (authenticated) {
            azureB2C.logout();
        } else {
            azureB2C.login();
        }
    }

    private async useCognito(): Promise<void> {
        const cognito = this.authService.getAuth(AuthType.cognito);
        const authenticated = await cognito.isAuthenticated();
        if (authenticated) {
            cognito.logout();
        } else {
            cognito.login();
        }
    }

    private async useOkta(): Promise<void> {
        const okta = this.authService.getAuth(AuthType.okta);
        const authenticated = await okta.isAuthenticated();
        if (authenticated) {
            okta.logout();
        } else {
            okta.login();
        }
    }
}
