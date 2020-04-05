import { TestBed, inject } from '@angular/core/testing';
import { Storage } from '@ionic/storage';

import { createStorageMock } from '@test/mocks';

import { OktaService } from './okta.service';

describe('OktaService', () => {
    let oktaService: OktaService;

    beforeEach(() => TestBed.configureTestingModule({
        providers: [{
            provide: Storage, useValue: createStorageMock()
        }]
    }));

    beforeEach(inject([OktaService], (service: OktaService) => {
        oktaService = service;
    }));

    it('injects', () => {
        expect(oktaService).toBeTruthy();
    });

    describe('login success', () => {
        it('sets authState to true', async () => {
            await oktaService.onLoginSuccess();
            oktaService.authState$.subscribe(result => {
                expect(result).toBeTruthy();
            });
        });
    });

    describe('logout', () => {
        it('sets authState to false', async () => {
            await oktaService.onLogout();
            oktaService.authState$.subscribe(result => {
                expect(result).toBeFalsy();
            });
        });
    });
});
