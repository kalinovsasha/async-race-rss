import '../src/styles/styles.scss';
import { Header } from './components/Header/header';
import { GarageControls } from './components/GarageControls/GarageControls';
import { Garage } from './components/Garage/Garage';
import Car from './components/Car/Car';
import { getCars, getCar, createCar, deleteCar, updateCar } from './api/api';
import { ICar } from './interfaces/interfaces';

const baseUrl = 'http://127.0.0.1:3000';

const rootEl = document.getElementById('root')!;
const header = new Header(rootEl);
const garageControls = new GarageControls(rootEl);
const garage = new Garage(rootEl);
garage.setcarsCounter(25);
garage.setPage(2);

const car = new Car(garage.element, 'Tesla', 1, 'yellow');
const car1 = new Car(garage.element, 'Tesla', 2, 'red');
const car2 = new Car(garage.element, 'Tesla', 3, '#b03fe4');

getCars(7, 1, baseUrl).then((e) => {
  const elt = e !== null ? e[0] : null;
  console.log(elt);
});

updateCar({
  id: 2,
  name: 'pupa',
  color: 'red',
}).then((car) => console.log(car));

document.querySelector('.create-car__btnCreate')!.addEventListener('click', () => {
  getCars(70, 1, baseUrl).then((e) => {
    const elt = e !== null ? e[0] : null;
    console.log(elt);
  });
});
