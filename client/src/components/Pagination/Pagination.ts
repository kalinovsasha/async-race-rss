import { BaseComponent } from '../../abstract/BaseComponent';
import './Pagination.scss';
import { Service } from '../../Service/Service';
import { ServiceWinners } from '../../Service/ServiceWinners';

export class Pagination extends BaseComponent {
  private prevBtn;
  private nextBtn;
  constructor(root: HTMLElement, service: Service | ServiceWinners) {
    super(root, 'div', ['paginationContainer']);
    this.prevBtn = new BaseComponent(this.element, 'button', ['pagination__btn']);
    this.nextBtn = new BaseComponent(this.element, 'button', ['pagination__btn']);
    this.prevBtn.element.textContent = 'Prev';
    this.nextBtn.element.textContent = 'Next';
    this.prevBtn.element.onclick = () => service.prevPage();
    this.nextBtn.element.onclick = () => service.nextPage();
  }

  disableButton(data: { curPage: number; pageCount: number }) {
    if (data.curPage === data.pageCount && data.curPage === 1) {
      this.nextBtn.element.classList.add('pagination__btn_disabled');
      this.prevBtn.element.classList.add('pagination__btn_disabled');
    } else if (data.curPage === data.pageCount) {
      this.nextBtn.element.classList.add('pagination__btn_disabled');
      this.prevBtn.element.classList.remove('pagination__btn_disabled');
    } else if (data.curPage === 1) {
      this.nextBtn.element.classList.remove('pagination__btn_disabled');
      this.prevBtn.element.classList.add('pagination__btn_disabled');
    } else {
      this.nextBtn.element.classList.remove('pagination__btn_disabled');
      this.prevBtn.element.classList.remove('pagination__btn_disabled');
    }
  }
}
