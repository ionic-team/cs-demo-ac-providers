import { TestBed, inject } from '@angular/core/testing';
import { Storage } from '@ionic/storage';

import { createStorageMock } from '@test/mocks';

import { Auth0Service } from './auth0.service';

describe('Auth0Service', () => {
    let auth0Service: Auth0Service;

    beforeEach(() => TestBed.configureTestingModule({
        providers: [{
            provide: Storage, useValue: createStorageMock()
        }]
    }));

    beforeEach(inject([Auth0Service], (service: Auth0Service) => {
        auth0Service = service;
    }));

    it('injects', () => {
        expect(auth0Service).toBeTruthy();
    });

    describe('login success', () => {
        it('sets authState to true', async () => {
            await auth0Service.onLoginSuccess();
            auth0Service.authState$.subscribe(result => {
                expect(result).toBeTruthy();
            });
        });
    });

    describe('logout', () => {
        it('sets authState to false', async () => {
            await auth0Service.onLogout();
            auth0Service.authState$.subscribe(result => {
                expect(result).toBeFalsy();
            });
        });
    });
});
