import { Component, OnInit } from '@angular/core';
import {
  Auth0Service,
  AzureService,
  CognitoService,
  OktaService,
} from '@app/services';
import { Observable, forkJoin, from, timer, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faAmazon, faMicrosoft } from '@fortawesome/free-brands-svg-icons';
import {
  faSync,
  faStar,
  faCheckCircle,
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
  styleUrls: ['./login.page.scss'],
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
        await this.auth0Service.isAuthenticated();
      },
      refreshing: false,
      state$: this.auth0Service.authState$,
    },
    {
      name: 'Azure B2C',
      color: 'tertiary',
      icon: faMicrosoft,
      handler: () => this.useAzure(),
      refresh: async () => {
        await this.azureService.isAuthenticated();
      },
      refreshing: false,
      state$: this.azureService.authState$,
    },
    {
      name: 'Cognito',
      color: 'warning',
      icon: faAmazon,
      handler: () => this.useCognito(),
      refresh: async () => {
        await this.cognitoService.isAuthenticated();
      },
      refreshing: false,
      state$: this.cognitoService.authState$,
    },
    {
      name: 'Okta',
      color: 'primary',
      icon: faCheckCircle,
      handler: () => this.useOkta(),
      refresh: async () => {
        await this.oktaService.isAuthenticated();
      },
      refreshing: false,
      state$: this.oktaService.authState$,
    },
  ];

  constructor(
    private auth0Service: Auth0Service,
    private azureService: AzureService,
    private cognitoService: CognitoService,
    private oktaService: OktaService,
  ) {}

  ngOnInit() {}

  public async refresh(m: AuthMethod): Promise<void> {
    m.refreshing = true;
    forkJoin([from(m.refresh()), timer(1000).pipe(take(1))]).subscribe(() => {
      m.refreshing = false;
    });
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

  private async useCognito(): Promise<void> {
    let authenticated = false;
    try {
      authenticated = await this.cognitoService.isAuthenticated();
    } catch (e) {
      console.log('e', e);
    }
    if (authenticated) {
      this.cognitoService.logout();
    } else {
      this.cognitoService.login();
    }
  }

  private async useOkta(): Promise<void> {
    const authenticated = await this.oktaService.isAuthenticated();
    if (authenticated) {
      this.oktaService.logout();
    } else {
      this.oktaService.login();
    }
  }
}
