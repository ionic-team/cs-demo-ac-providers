import { IonicAuthOptions } from '@ionic-enterprise/auth';

export interface Environment {
    production: boolean;
    webHost: string;
    appHost: string;
    auth0: IonicAuthOptions;
    azure: IonicAuthOptions;
}
