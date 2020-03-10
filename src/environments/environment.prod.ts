import { Environment } from './environment.model';

export const environment: Environment = {
    production: true,
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
        scope: 'openid offline_access email profile',
        audience: '',
        logoutUrl: '',
        iosWebView: 'private',
        logLevel: 'DEBUG'
    },
    congnito: {
        authConfig: 'cognito',
        clientID: '4geagm2idmq87fii15dq9toild',
        discoveryUrl:
            'https://dtjacdemo.b2clogin.com/dtjacdemo.onmicrosoft.com/v2.0/.well-known/openid-configuration?p=B2C_1_acdemo2',
        redirectUri: '',
        scope: 'openid offline_access email profile',
        audience: '',
        logoutUrl: '',
        iosWebView: 'private',
        logLevel: 'DEBUG'
    },
    okta: {
        authConfig: 'general',
        clientID: '0oa39kaxufzwy2jtz4x6',
        discoveryUrl:
            'https://ionic-acdemo.okta.com/.well-known/openid-configuration',
        redirectUri: '',
        scope: 'openid email profile',
        audience: '',
        logoutUrl: '',
        iosWebView: 'private',
        logLevel: 'DEBUG',
        webAuthFlow: 'PKCE'
    }
};
