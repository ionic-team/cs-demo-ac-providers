import { TestBed, inject } from '@angular/core/testing';
import { Storage } from '@ionic/storage';

import { createStorageMock } from '@test/mocks';

import { AzureService } from './azure.service';

describe('AzureService', () => {
    let azureService: AzureService;

    beforeEach(() => TestBed.configureTestingModule({
        providers: [{
            provide: Storage, useValue: createStorageMock()
        }]
    }));

    beforeEach(inject([AzureService], (service: AzureService) => {
        azureService = service;
    }));

    it('injects', () => {
        expect(azureService).toBeTruthy();
    });

    describe('login success', () => {
        it('sets authState to true', async () => {
            await azureService.onLoginSuccess();
            azureService.authState$.subscribe(result => {
                expect(result).toBeTruthy();
            });
        });
    });

    describe('logout', () => {
        it('sets authState to false', async () => {
            await azureService.onLogout();
            azureService.authState$.subscribe(result => {
                expect(result).toBeFalsy();
            });
        });
    });
});
