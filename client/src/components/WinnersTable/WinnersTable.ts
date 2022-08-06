import { BaseComponent } from '../../abstract/BaseComponent';
import { EEventsWiners, EWinnersSort, ServiceWinners } from '../../Service/ServiceWinners';
import { carImage } from '../Car/carImage';
import { Pagination } from '../Pagination/Pagination';
import './WinnersTable.scss';

export class WinnersTable extends BaseComponent {
  private tableHeaderContainer: BaseComponent;
  private tableHeader: BaseComponent;
  private tableHeaderId: BaseComponent;
  private tableHeaderCar: BaseComponent;
  private tableHeaderModel: BaseComponent;
  private tableHeaderWins: BaseComponent;
  private tableHeaderTime: BaseComponent;
  private table: BaseComponent;
  private service: ServiceWinners;
  private tableItems = ``;
  private currentOrder: 'ASC' | 'DESC' = 'DESC';
  constructor(root: HTMLElement, service: ServiceWinners) {
    super(root, 'div', ['winnersTableContainer']);
    this.service = service;
    this.tableHeaderContainer = new BaseComponent(this.element, 'table', ['winnersTableHeaders']);
    this.tableHeader = new BaseComponent(this.tableHeaderContainer.element, 'tr', ['winnersTable__header']);
    this.tableHeaderId = new BaseComponent(this.tableHeader.element, 'td', [
      'winnersTable__header__id',
      'winnersTable__header_item',
    ]);
    this.tableHeaderId.element.textContent = 'Number';
    this.tableHeaderCar = new BaseComponent(this.tableHeader.element, 'td', [
      'winnersTable__header__car',
      'winnersTable__header_item',
    ]);
    this.tableHeaderCar.element.textContent = 'Car';
    this.tableHeaderModel = new BaseComponent(this.tableHeader.element, 'td', [
      'winnersTable__header__model',
      'winnersTable__header_item',
    ]);
    this.tableHeaderModel.element.textContent = 'Model';
    this.tableHeaderWins = new BaseComponent(this.tableHeader.element, 'td', [
      'winnersTable__header__wins',
      'winnersTable__header_item',
    ]);
    this.tableHeaderWins.element.textContent = 'Wins';
    this.tableHeaderTime = new BaseComponent(this.tableHeader.element, 'td', [
      'winnersTable__header__time',
      'winnersTable__header_item',
    ]);
    this.tableHeaderTime.element.textContent = 'Time';
    this.table = new BaseComponent(this.element, 'table', ['winnersTable']);
    this.table.element.innerHTML = this.tableItems;

    const pagination = new Pagination(this.element, this.service);
    service.subscribe(EEventsWiners.winnersCount, pagination.disableButton.bind(pagination));
    this.tableHeaderWins.element.onclick = () => {
      this.currentOrder = this.currentOrder === 'DESC' ? 'ASC' : 'DESC';
      if (this.currentOrder === 'DESC') {
        this.tableHeaderTime.element.classList.remove('arrowUp');
        this.tableHeaderTime.element.classList.remove('arrowDown');
        this.tableHeaderWins.element.classList.add('arrowDown');
        this.tableHeaderWins.element.classList.remove('arrowUp');
      } else {
        this.tableHeaderTime.element.classList.remove('arrowUp');
        this.tableHeaderTime.element.classList.remove('arrowDown');
        this.tableHeaderWins.element.classList.add('arrowUp');
        this.tableHeaderWins.element.classList.remove('arrowDown');
      }
      service.changeSortType(EWinnersSort.wins, this.currentOrder);
    };
    this.tableHeaderTime.element.onclick = () => {
      if (this.currentOrder === 'DESC') {
        this.tableHeaderWins.element.classList.remove('arrowDown');
        this.tableHeaderWins.element.classList.remove('arrowUp');
        this.tableHeaderTime.element.classList.remove('arrowDown');
        this.tableHeaderTime.element.classList.add('arrowUp');
      } else {
        this.tableHeaderWins.element.classList.remove('arrowDown');
        this.tableHeaderWins.element.classList.remove('arrowUp');
        this.tableHeaderTime.element.classList.remove('arrowUp');
        this.tableHeaderTime.element.classList.add('arrowDown');
      }
      this.currentOrder = this.currentOrder === 'DESC' ? 'ASC' : 'DESC';
      service.changeSortType(EWinnersSort.time, this.currentOrder);
    };
  }
  // { id: number; name: string; color: string; time: number; wins: number, curPage: this.curPage }[]
  renderWinners(dataJson: string) {
    const data = JSON.parse(dataJson);
    this.tableItems = '';
    for (let i = 0; i < data.length; i += 1) {
      const car = carImage(data[i]!.color, 'car-image-svg-winner');
      this.tableItems += `
    <tr class="winnersTable__row" >
      <td class="winnersTable__coll winnersTable__id">${i + 1 + 10 * (data[i].curPage - 1)}</td>
      <td class="winnersTable__coll winnerImage">${car}</td>
      <td class="winnersTable__coll winnersTable__model">${data[i]!.name}</td>
      <td class="winnersTable__coll">${data[i]!.wins}</td>
      <td class="winnersTable__coll">${data[i]!.time}</td>
    </tr>
      `;
    }
    this.table.element.innerHTML = this.tableItems;
  }
}
