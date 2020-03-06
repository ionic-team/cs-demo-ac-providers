import { Environment } from './environment.model';

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment: Environment = {
    production: false,
    webHost: 'http://localhost:8100/',
    appHost: 'com.ionic.acprovider://',
    auth0: {
        authConfig: 'auth0',
        clientID: '1XaS52xS0XDdE0NUYKEEnF047AC53USl',
        discoveryUrl:
            'https://dev-j3wl8n0b.auth0.com/.well-known/openid-configuration',
        redirectUri: '',
        scope: 'openid offline_access email picture profile',
        audience: '',
        logoutUrl: '',
        iosWebView: 'private',
        logLevel: 'DEBUG'
    }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
