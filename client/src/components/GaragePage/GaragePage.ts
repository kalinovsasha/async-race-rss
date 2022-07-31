import { BaseComponent } from '../../abstract/BaseComponent';
import { GarageControls } from '../GarageControls/GarageControls';
import { Garage } from '../Garage/Garage';
import './GaragePage.scss';
import { Pagination } from '../Pagination/Pagination';
import { EEVents, Service } from '../../Service/Service';
import { car } from '../../api/api';
import { Popup } from './../Popup/Popup';

export class GaragePage extends BaseComponent {
  private carCountEl;
  private pageNumber;
  private carsCounter;
  private currentPage;
  private garaControls;
  private service: Service;
  constructor(root: HTMLElement, service: Service, cars?: car[] | null) {
    super(root, 'div', ['garageContainer']);
    this.service = service;
    this.carsCounter = '0';
    this.currentPage = 1;
    this.garaControls = new GarageControls(this.element, service, { color: '#000000', text: '' });
    this.carCountEl = new BaseComponent(this.element, 'h2', ['garage__carCount']);
    this.carCountEl.element.textContent = `Garage (${this.carsCounter})`;
    this.pageNumber = new BaseComponent(this.element, 'h3', ['garage__page']);
    this.pageNumber.element.textContent = `page #${this.currentPage}`;
    const garage = new Garage(this.element, service, cars);
    const pagination = new Pagination(this.element, service);
    const popupWinner = new Popup(this.element);

    service.subscribe(EEVents.renderCars, garage.rendrCars.bind(garage));
    service.subscribe(EEVents.winRace, popupWinner.showWinner.bind(popupWinner));
    service.subscribe(EEVents.winRace, this.garaControls.resetStyles.bind(this.garaControls));
  }

  setcarsCounter(carsCount: string): void {
    this.carsCounter = carsCount;
    this.carCountEl.element.textContent = `Garage (${this.carsCounter})`;
  }
  setPage(data: { curPage: number; pageCount: number }) {
    this.currentPage = data.curPage;
    this.pageNumber.element.textContent = `page #${this.currentPage}`;
  }
}
