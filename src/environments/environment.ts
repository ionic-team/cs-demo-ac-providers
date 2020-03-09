import { Environment } from './environment.model';

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment: Environment = {
    production: false,
    webHost: 'http://localhost:8100/',
    appHost: 'msauth://',
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
    },
    azure: {
        authConfig: 'azure',
        clientID: 'ed8cb65d-7bb2-4107-bc36-557fb680b994',
        discoveryUrl:
            'https://dtjacdemo.b2clogin.com/dtjacdemo.onmicrosoft.com/v2.0/.well-known/openid-configuration?p=B2C_1_acdemo2',
        redirectUri: '',
        scope:
            'openid offline_access email profile https://dtjacdemo.onmicrosoft.com/ed8cb65d-7bb2-4107-bc36-557fb680b994/demo.read',
        audience: '',
        logoutUrl: '',
        iosWebView: 'private',
        logLevel: 'DEBUG'
    },
    congnito: {
        authConfig: 'cognito',
        // clientID: '56hqlj6lclqhvrahq1v9376dp7',
        // discoveryUrl:
        //     'https://cognito-idp.eu-west-1.amazonaws.com/eu-west-1_rjFv44QIj/.well-known/openid-configuration',
        // clientSecret: '',
        clientID: '4geagm2idmq87fii15dq9toild',
        discoveryUrl:
            'https://cognito-idp.us-east-2.amazonaws.com/us-east-2_YU8VQe29z/.well-known/openid-configuration',
        clientSecret: '124dch1p6824ppuef8o71unk14d4pt3p5hnntofvu21i2m960r1g',
        redirectUri: '',
        scope: 'openid email profile',
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
