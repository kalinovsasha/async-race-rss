import '../src/styles/styles.scss';
import { Header } from './components/Header/header';
import { GaragePage } from './components/GaragePage/GaragePage';
import { ICar } from './interfaces/interfaces';
import { GarageController } from './Service/garageController';
import { car } from './api/api';

const baseUrl = 'http://127.0.0.1:3000';
const rootEl = document.getElementById('root')!;

const car: ICar = {
  name: 'SERVER NE DOSTUPEN',
  color: 'red',
  id: 2,
};

const garageController = new GarageController();
const header = new Header(rootEl);
const garagePage = new GaragePage(rootEl, garageController, [car]);
