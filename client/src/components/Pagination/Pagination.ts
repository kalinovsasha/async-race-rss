import { BaseComponent } from '../../abstract/BaseComponent';
import { EActions, EEVents } from '../../Service/garageController';
import './Pagination.scss';
import { GarageController } from './../../Service/garageController';

export class Pagination extends BaseComponent {
  prevBtn;
  nextBtn;
  constructor(root: HTMLElement, controller: GarageController) {
    super(root, 'div', ['paginationContainer']);
    this.prevBtn = new BaseComponent(this.element, 'button', ['pagination__btn']);
    this.nextBtn = new BaseComponent(this.element, 'button', ['pagination__btn']);
    this.prevBtn.element.textContent = 'Prev';
    this.nextBtn.element.textContent = 'Next';
    this.prevBtn.element.onclick = () => controller.dispatch({ type: EActions.prevPage });
    this.nextBtn.element.onclick = () => controller.dispatch({ type: EActions.nextPage });
    controller.subscribe(EEVents.changePage, this.disableButton.bind(this));
  }

  disableButton(curPage: number, pageCount: number) {
    if (curPage === pageCount && curPage === 1) {
      this.nextBtn.element.classList.add('pagination__btn_disabled');
      this.prevBtn.element.classList.add('pagination__btn_disabled');
    } else if (curPage === pageCount) {
      this.nextBtn.element.classList.add('pagination__btn_disabled');
      this.prevBtn.element.classList.remove('pagination__btn_disabled');
    } else if (curPage === 1) {
      this.nextBtn.element.classList.remove('pagination__btn_disabled');
      this.prevBtn.element.classList.add('pagination__btn_disabled');
    } else {
      this.nextBtn.element.classList.remove('pagination__btn_disabled');
      this.prevBtn.element.classList.remove('pagination__btn_disabled');
    }
  }
}
