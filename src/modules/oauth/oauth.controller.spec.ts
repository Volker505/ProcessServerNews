import { Test } from '@nestjs/testing';
import { TestingModule } from '@nestjs/testing/testing-module';
import { OauthController } from './oauth.controller';
import { expect } from 'chai';

describe('OauthController', () => {
  let module: TestingModule;
  beforeEach(() => {
    return Test.createTestingModule({
      controllers: [
        OauthController
      ]
    }).compile()
      .then(compiledModule => module = compiledModule);
  });

  let controller: OauthController;
  beforeEach(() => {
    controller = module.get(OauthController);
  });

  it('should exist', () => {
    expect(controller).to.exist;
  });
});
