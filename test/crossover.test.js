import {expect} from 'chai';
import {crossOverPopulation} from '../App/Genetics/crossover.js';

describe('../App/Genetics/crossover.js', () => {
  describe('#crossOverPopulation()', () => {
    it('Crossover function for array of size [2,9]', () => {
      expect(
        crossOverPopulation([
          [1, 2, 3, 4, 5, 6, 7, 8, 9],
          [60, 70, 80, 90, 100, 110, 120, 130, 140]
        ])
      )
        .to.be.an('array')
        .to.be.lengthOf(2);
      expect(
        crossOverPopulation([
          [1, 2, 3, 4, 5, 6, 7, 8, 9],
          [60, 70, 80, 90, 100, 110, 120, 130, 140]
        ])[0]
      )
        .to.be.an('array')
        .to.be.lengthOf(9);
      expect(
        crossOverPopulation([
          [1, 2, 3, 4, 5, 6, 7, 8, 9],
          [60, 70, 80, 90, 100, 110, 120, 130, 140]
        ])[1]
      )
        .to.be.an('array')
        .to.be.lengthOf(9);
    });
    it('Crossover function for array of size [3,9]', () => {
      expect(
        crossOverPopulation([
          [1, 2, 3, 4, 5, 6, 7, 8, 9],
          [60, 70, 80, 90, 100, 110, 120, 130, 140],
          [60, 70, 80, 90, 100, 110, 120, 130, 140]
        ])
      )
        .to.be.an('array')
        .to.be.lengthOf(3);
      expect(
        crossOverPopulation([
          [1, 2, 3, 4, 5, 6, 7, 8, 9],
          [60, 70, 80, 90, 100, 110, 120, 130, 140],
          [60, 70, 80, 90, 100, 110, 120, 130, 140]
        ])[0]
      )
        .to.be.an('array')
        .to.be.lengthOf(9);
      expect(
        crossOverPopulation([
          [1, 2, 3, 4, 5, 6, 7, 8, 9],
          [60, 70, 80, 90, 100, 110, 120, 130, 140],
          [60, 70, 80, 90, 100, 110, 120, 130, 140]
        ])[1]
      )
        .to.be.an('array')
        .to.be.lengthOf(9);
      expect(
        crossOverPopulation([
          [1, 2, 3, 4, 5, 6, 7, 8, 9],
          [60, 70, 80, 90, 100, 110, 120, 130, 140],
          [60, 70, 80, 90, 100, 110, 120, 130, 140]
        ])[2]
      )
        .to.be.an('array')
        .to.be.lengthOf(9);
    });
  });
});