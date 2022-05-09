import * as R from 'ramda';
import {getRandomIndex} from './common-functions.js';

// Crossover

const crossoverProbability = 1;

const percentParentsDeletion = 4 / 10;

const shouldCrossOver_ = (proba) => R.pipe(Math.random, R.lt(1 - proba));

const computeCrossover_ = (reference, target, index) =>
  R.update(index, R.nth(index, reference), target);

const crossOverThis_ = (ref) => (target) =>
  computeCrossover_(ref, target, getRandomIndex(target));

const crossOver_ = (proba) => (reference, target) =>
  R.when(shouldCrossOver_(proba), crossOverThis_(reference))(target);

// Map two elements of the array to create an offspring.
const magicMapperCooking_ = (acc, value) => [
  value,
  crossOver_(crossoverProbability)(acc, value)
];

const createOffsprings_ = (population) =>
  R.pipe(
    R.converge(R.mapAccum(magicMapperCooking_), [R.last, R.identity]),
    R.last
  )(population);

const crossOverPopulation = (population) =>
  R.concat(
    R.slice(
      0,
      Math.ceil(population.length * percentParentsDeletion),
      createOffsprings_(population)
    )
  )(
    R.slice(
      0,
      Math.floor(
        population.length - population.length * percentParentsDeletion
      ),
      population
    )
  );

export {crossOverPopulation};
