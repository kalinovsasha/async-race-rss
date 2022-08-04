import { BaseComponent } from '../../abstract/BaseComponent';
import { EEventsWiners, ServiceWinners } from '../../Service/ServiceWinners';
import './WinnersPage.scss';
import { WinnersTable } from './../WinnersTable/WinnersTable';

export class WinnersPage extends BaseComponent {
  private winnersCount = 0;
  private curPage = 1;
  private winnersCountEl: BaseComponent;
  private winnersCurPage: BaseComponent;
  private winnersTable: WinnersTable;
  private service;
  constructor(root: HTMLElement, service: ServiceWinners) {
    super(root, 'div', ['winnersPage']);
    this.service = service;
    this.winnersCountEl = new BaseComponent(this.element, 'h2', ['winnersPage__winnersCount']);
    this.winnersCurPage = new BaseComponent(this.element, 'h2', ['winnersPage__pagesCount']);
    this.winnersCountEl.element.textContent = `Winners (${this.winnersCount})`;
    this.winnersCurPage.element.textContent = `page #${this.curPage}`;
    this.winnersTable = new WinnersTable(this.element, service);
    service.getWinners();
    this.element.remove();
    service.subscribe(EEventsWiners.renderWiners, this.winnersTable.renderWinners.bind(this.winnersTable));
  }

  setPageAndCount(data: { pageCount: number; curPage: number; winnersCount?: number }): void {
    if (data.winnersCount) this.winnersCount = data.winnersCount;
    this.curPage = data.curPage;
    this.winnersCountEl.element.textContent = `Winners (${this.winnersCount})`;
    this.winnersCurPage.element.textContent = `page #${this.curPage}`;
  }

  renderPage(url: string) {
    if (url === '/winners') {
      this.service.getWinners();
      this.root.append(this.element);
    } else this.element.remove();
  }
}
