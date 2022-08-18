import { expect } from 'chai';

function hello(str: string): string {
  return `Hello ${str}`;
}

// TODO: удалить этот файл потом
describe('Test mocha', () => {
  it('Correct test name', () => {
    expect(hello('mocha')).to.equal('Hello mocha');
  });

  // it('Not correct test name', () => {
  //   expect(hello('cha')).to.equal('Hello mocha');
  // });
});
