import '../src/styles/styles.scss';
import { Header } from './components/Header/header';
import { GaragePage } from './components/GaragePage/GaragePage';
import { car } from './api/api';
import { EEVents, Service } from './Service/Service';
import { WinnersPage } from './components/WinnersPage/WinnersPage';
import { EEventsWiners, ServiceWinners } from './Service/ServiceWinners';
import { Router } from './Service/Router';

const baseUrl = 'http://127.0.0.1:3000';
const countCarsOnPage = 7;
const rootEl = document.getElementById('root')!;

const car: car = {
  name: 'SERVER NE DOSTUPEN',
  color: 'red',
  id: 2,
};

const router = new Router();
const service = new Service(7, baseUrl);
const winnerService = new ServiceWinners(baseUrl);
const header = new Header(rootEl);
const garagePage = new GaragePage(rootEl, service, [car]);
const winnersPage = new WinnersPage(rootEl, winnerService);

service.subscribe(EEVents.carsCount, garagePage.setcarsCounter.bind(garagePage));
service.subscribe(EEVents.pagination, garagePage.setPage.bind(garagePage));
winnerService.subscribe(EEventsWiners.winnersCount, winnersPage.setPageAndCount.bind(winnersPage));
router.subscribe(garagePage.renderPage.bind(garagePage));
router.subscribe(winnersPage.renderPage.bind(winnersPage));
