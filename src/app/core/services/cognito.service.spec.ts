import { TestBed, inject } from '@angular/core/testing';
import { Storage } from '@ionic/storage';

import { createStorageMock } from '@test/mocks';

import { CognitoService } from './cognito.service';

describe('CognitoService', () => {
  let cognitoService: CognitoService;

  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Storage,
          useValue: createStorageMock(),
        },
      ],
    }),
  );

  beforeEach(inject([CognitoService], (service: CognitoService) => {
    cognitoService = service;
  }));

  it('injects', () => {
    expect(cognitoService).toBeTruthy();
  });

  describe('login success', () => {
    it('sets authState to true', async () => {
      await cognitoService.onLoginSuccess();
      cognitoService.authState$.subscribe(result => {
        expect(result).toBeTruthy();
      });
    });
  });

  describe('logout', () => {
    it('sets authState to false', async () => {
      await cognitoService.onLogout();
      cognitoService.authState$.subscribe(result => {
        expect(result).toBeFalsy();
      });
    });
  });
});
