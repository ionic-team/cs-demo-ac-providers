# Ionic Customer Success - Auth Connect Providers

This demo application serves to showcase the various supported providers and how to configure Auth Connect to work with each provider. Other providers that are not listed here may work if they implement OAuth 2.0 and the OpenID spec using the general configuration (see Okta configuration for an example).

## Credentials

All providers in this application can be accessed with the same credentials:

Username/Email: `test@ionic.io`  
Password: `Ion54321`

## Building

- Clone this repository
- Follow the [Ionic Native Enterprise Edition Setup instructions](https://ionicframework.com/docs/enterprise/setup#install-tooling) if you have not already done so
- Follow the [Ionic Native Enterprise Edition Register instructions](https://ionicframework.com/docs/enterprise/setup#register-your-product-key) from this application's root directory, using they key you have chosen to use for demo applications. If you do not have a key, contact your Ionic sales representative.
- `npm i`
- `npm run build`
- `npm start` - if you want to run in the browser

To run the application on a device, after running the build command, open the `android`/`ios` projects included in this application to run with native tooling. See the [Capacitor Docs](https://capacitor.ionicframework.com/docs/basics/running-your-app) for additional information on running as a native application.