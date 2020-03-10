import { TestBed } from '@angular/core/testing';

import { OktaService } from './okta.service';

describe('OktaService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: OktaService = TestBed.inject(OktaService);
        expect(service).toBeTruthy();
    });
});
