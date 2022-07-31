import { car } from '../api/api';

const getRandomCarName = () => {
  const types = [
    'X',
    'X5',
    'X6',
    'AMG',
    'Turbo',
    'Model X',
    'Model S',
    'Race',
    'Sport',
    'Passat',
    'Golf',
    'Granta',
    'Sandero',
    'Logan',
    'Civic',
    'Acord',
    'Catafalq',
    'Cooper',
    'XC90',
    'V60',
  ];
  const models = [
    'BMW',
    'Fiat',
    'Mersedes',
    'Audi',
    'Volkswagen',
    'Lada',
    'Renault',
    'Citroen',
    'Honda',
    'Toyota',
    'KIA',
    'Ford',
    'Pontiac',
    'Mini',
    'Volvo',
  ];
  const brand = models[Math.floor(Math.random() * models.length)];
  const type = types[Math.floor(Math.random() * types.length)];
  return `${brand} ${type}`;
};

const getRandomCarColor = () => {
  let carColor = '#';
  const hexNumbers = '0123456789ABCDEF';
  for (let i = 0; i < 6; i += 1) {
    carColor += hexNumbers[Math.floor(Math.random() * 16)];
  }
  return carColor;
};

export const generateRandomCars = (carCount = 100): Array<car> =>
  new Array(carCount).fill(1).map(() => ({ name: getRandomCarName(), color: getRandomCarColor() }));
