import { expect } from 'chai';

import '../get-month'
import { getMonth } from '../get-month'


// TODO: полностью протестировать 
// пока этот файл служит для проверки, что работает вывод статистики с покрытием тестами
describe('getMonth', () => {
  it('getMonth(0) should return first month', () => {
    expect(getMonth(0)).to.equal('янв.');
  });


  it('getMonth(11) should return last month', () => {
    expect(getMonth(11)).to.equal('дек.');
  });

  it('getMonth(12) should return empty str', () => {
    expect(getMonth(12)).to.equal('');
  });


});
