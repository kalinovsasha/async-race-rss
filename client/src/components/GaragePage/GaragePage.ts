import { BaseComponent } from '../../abstract/BaseComponent';
import { GarageControls } from '../GarageControls/GarageControls';
import { Garage } from '../Garage/Garage';
import './GaragePage.scss';
import { ICar } from '../../interfaces/interfaces';
import { EEVents, GarageController } from './../../Service/garageController';

export class GaragePage extends BaseComponent {
  carCountEl;
  pageNumber;
  carsCounter;
  currentPage;
  garaControls;
  controller: GarageController;
  constructor(root: HTMLElement, controller: GarageController, cars?: ICar[] | null) {
    super(root, 'div', ['garageContainer']);
    this.carsCounter = '0';
    this.currentPage = 1;
    this.garaControls = new GarageControls(this.element, controller, { color: '#000000', text: '' });
    this.carCountEl = new BaseComponent(this.element, 'h2', ['garage__carCount']);
    this.carCountEl.element.textContent = `Garage (${this.carsCounter})`;
    this.pageNumber = new BaseComponent(this.element, 'h3', ['garage__page']);
    this.pageNumber.element.textContent = `page #${this.currentPage}`;
    const garage = new Garage(this.element, controller.dispatch.bind(controller), cars);
    this.controller = controller;
    controller.subscribe(EEVents.renderCars, garage.rendrCars.bind(garage));
    controller.subscribe(EEVents.carsCount, this.setcarsCounter.bind(this));
  }

  setcarsCounter(count: string) {
    this.carsCounter = count;
    this.carCountEl.element.textContent = `Garage (${this.carsCounter})`;
  }
  setPage(count: number) {
    this.currentPage = count;
    this.pageNumber.element.textContent = `page #${this.currentPage}`;
  }
}

// Вынести Колличество машин и страниц из гаража на эту страницу и добавить пагинацию.
