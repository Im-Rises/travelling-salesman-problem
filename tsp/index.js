import * as R from "ramda";
// import * as p5 from "p5";

const MAX_CITIES = 10;
const MAX_POPULATION = 10;

let map = {};
let population = [];
const offspring = [];

const crossoverNumberCity = 3;


/*
 * GENERATION OF POPULATION
 */

const shuffleList = R.sort(() => Math.random() - 0.5);

const createRandomCityPath = () => shuffleList(R.times(R.identity, MAX_POPULATION));


const createRandomIndiv = R.applySpec({
    order : createRandomCityPath,
    score: null
});

const appendIndivToPopulation = population => indiv => R.append(indiv, population)

const appendRandomIndivToPopulation = population => n => R.nth(0, appendIndivToPopulation(population)(createRandomIndiv()))

const createPop = (pop) => R.times(appendRandomIndivToPopulation(pop), MAX_POPULATION);


population = createPop(population);

console.log(population)

/*
 * GENERATION OF THE MAP
 */

const appendCityToMap = map => city => R.assoc(city, createCity(), map);

const getRandomValue = () => Math.floor(Math.random() * 10);

const createCity = R.applySpec({
    x: getRandomValue,
    y: getRandomValue,
    value: getRandomValue
});

const createMap = (map) => R.times(appendCityToMap(map), MAX_CITIES);

// console.log(createMap(map));

/*
 * **************************
 */


const isLessThanMaxDistanceRequired = acc => R.gt(250, acc.dist);

const distance = (city1, city2) => Math.sqrt(Math.pow(city1.x - city2.x, 2) + Math.pow(city1.y - city2.y, 2));

const initCalculationsForScore = (acc, v) => {
    acc.isFirstCity = false;
    acc.previousCityNumber = v;
    return acc;
}

const proceedCalculationsForScore = (acc, v) => {
    acc.dist += distance(R.nth(v, map), acc.city)
    acc.score += R.nth(v, map).value;
    acc.city = R.nth(acc.previousCityNumber, map);
    acc.previousCityNumber = v;
    return acc;
}

const calculateScoreOfIndiv = R.pipe(
    R.reduceWhile(
        isLessThanMaxDistanceRequired,
        (acc, v) => {
            if (R.not(acc.isFirstCity))
                acc = proceedCalculationsForScore(acc, v);
            else acc = initCalculationsForScore(acc, v);

            return acc;
        }, {dist: 0, score: 0, previousCityNumber: 0, city: R.nth(0, map), isFirstCity: true}
    ),
    R.dissoc("previousCityNumber"),
    R.dissoc("city"),
    R.dissoc("isFirstCity")
);

const calculateScoresFromArrays = R.pipe(R.prop('order'), calculateScoreOfIndiv);


const assocTimeInSeconds = (temporaryProp) =>
    R.converge(R.assoc(temporaryProp), [calculateScoresFromArrays, R.identity]);

const sortListByTimesWithTemporaryName_ = (temporaryProp) =>
    R.pipe(
        R.map(assocTimeInSeconds(temporaryProp)),
        R.sortBy(R.prop(temporaryProp)),
    );

const sortListByScores = sortListByTimesWithTemporaryName_('score');

// population = sortListByScores(population);
// console.log(population);

// console.log(population);
/*
* Parent 2 city is mutated into parent 1 to create offspring.
*/

// const parent1 = [1, 1, 1, 1, 2];
// const parent2 = [2, 2, 2, 2, 1];

const parent1 = [1, 2, 3, 4, 5, 6, 7, 8];
const parent2 = [8, 4, 2, 5, 1, 6, 3, 7];

const doMutation = (parent1, parent2, mutationIndex) => mutate(R.nth(mutationIndex, parent2), mutationIndex, parent1);

const getRandomIndex = (maxValue) => Math.floor((Math.random() * 10) % maxValue);

const mutate = (value, index, parent1) => R.move(R.indexOf(value, parent1), index, parent1);

const crossover = (parent1, parent2) => doMutation(parent1, parent2, getRandomIndex(parent2.length));

// console.log(crossover(parent1, parent2));


const createOffsprings = (offspringNumber, parentList) => {
    return R.times(crossover(parentList[i * 2], parentList[i * 2 + 1]), offspringNumber);
}

// console.log(createOffsprings(1, parent1, parent2))

