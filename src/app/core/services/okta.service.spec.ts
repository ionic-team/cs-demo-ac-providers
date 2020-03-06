import { TestBed } from '@angular/core/testing';

import { OktaService } from './okta.service';

describe('OktaService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: OktaService = TestBed.get(OktaService);
        expect(service).toBeTruthy();
    });
});
