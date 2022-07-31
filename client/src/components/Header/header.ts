import { BaseComponent } from '../../abstract/BaseComponent';
import './header.scss';
import svg from '../../assets/img/audio.svg';

export class Header extends BaseComponent {
  btnGarage: BaseComponent;
  btnWinners: BaseComponent;
  constructor(root: HTMLElement) {
    super(root, 'header', ['header']);
    this.btnGarage = new BaseComponent(this.element, 'button', ['btn-garage']);
    this.btnWinners = new BaseComponent(this.element, 'button', ['btn-winners']);
    this.btnGarage.element.textContent = 'Garage';
    this.btnWinners.element.textContent = 'Winners';
  }
}
