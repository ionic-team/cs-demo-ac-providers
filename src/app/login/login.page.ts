import { Component, OnInit } from '@angular/core';
import {
    Auth0Service,
    AzureService,
    CognitoService,
    OktaService
} from '@app/services';
import { Observable, of } from 'rxjs';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faAmazon, faMicrosoft } from '@fortawesome/free-brands-svg-icons';
import { faStar, faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

interface AuthMethod {
    name: string;
    color: string;
    icon: IconDefinition;
    handler: () => void;
    refreshStatus: (event: MouseEvent) => void;
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
            refreshStatus: event => {
                event.stopPropagation();
                this.auth0Service.isAuthenticated();
            },
            state$: this.auth0Service.authState$
        },
        {
            name: 'Azure B2C',
            color: 'tertiary',
            icon: faMicrosoft,
            handler: () => this.useAzure(),
            refreshStatus: event => {
                event.stopPropagation();
                this.azureService.isAuthenticated();
            },
            state$: this.azureService.authState$
        },
        {
            name: 'Cognito',
            color: 'warning',
            icon: faAmazon,
            handler: () => {},
            refreshStatus: event => {
                event.stopPropagation();
            },
            state$: of(false)
        },
        {
            name: 'Okta',
            color: 'primary',
            icon: faCheckCircle,
            handler: () => {},
            refreshStatus: event => {
                event.stopPropagation();
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

    private async useAuth0(): Promise<void> {
        const authenticated = await this.auth0Service.isAuthenticated();
        if (authenticated) {
            this.auth0Service.logout();
        } else {
            this.auth0Service.login();
        }
    }

    private async useAzure(): Promise<void> {
        const authenticated = await this.azureService.isAuthenticated();
        if (authenticated) {
            this.azureService.logout();
        } else {
            this.azureService.login();
        }
    }
}
