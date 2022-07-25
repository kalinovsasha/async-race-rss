import { BaseComponent } from '../../abstract/BaseComponent';
import './Garage.scss';

export class Garage extends BaseComponent {
  private carCountEl;
  private carsCounter: number;
  private page;
  private currentPage;
  constructor(root: HTMLElement, cars?: []) {
    super(root, 'div', ['garage']);
    this.carsCounter = 0;
    this.currentPage = 1;
    this.carCountEl = new BaseComponent(this.element, 'h2', ['garage__carCount']);
    this.carCountEl.element.textContent = `Garage (${this.carsCounter})`;
    this.page = new BaseComponent(this.element, 'h3', ['garage__page']);
    this.page.element.textContent = `page #${this.currentPage}`;
    if (cars?.length !== 0) {
      // Заглушка
      this.element.append();
    }
  }
  setcarsCounter(count: number) {
    this.carsCounter = count;
    this.carCountEl.element.textContent = `Garage (${this.carsCounter})`;
  }
  setPage(count: number) {
    this.currentPage = count;
    this.page.element.textContent = `page #${this.currentPage}`;
  }
}
