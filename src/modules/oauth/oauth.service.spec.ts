import { Test } from '@nestjs/testing';
import { TestingModule } from '@nestjs/testing/testing-module';
import { OauthComponent } from './oauth.service';
import { expect } from 'chai';

describe('OauthComponent', () => {
  let module: TestingModule;
  beforeEach(() => {
    return Test.createTestingModule({
      components: [
        OauthComponent
      ]
    }).compile()
      .then(compiledModule => module = compiledModule);
  });

  let service: OauthComponent;
  beforeEach(() => {
    service = module.get(OauthComponent);
  });

  it('should exist', () => {
    expect(service).to.exist;
  });
});
