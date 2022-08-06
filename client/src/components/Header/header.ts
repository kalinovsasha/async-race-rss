import { BaseComponent } from '../../abstract/BaseComponent';
import './header.scss';
import svg from '../../assets/img/audio.svg';

export class Header extends BaseComponent {
  private btnGarage: BaseComponent;
  private btnWinners: BaseComponent;
  constructor(root: HTMLElement) {
    super(root, 'header', ['header']);
    this.btnGarage = new BaseComponent(this.element, 'button', ['btn-garage']);
    this.btnWinners = new BaseComponent(this.element, 'button', ['btn-winners']);
    this.btnGarage.element.textContent = 'Garage';
    this.btnWinners.element.textContent = 'Winners';

    this.btnGarage.element.onclick = () => (document.location.hash = '/garage');
    this.btnWinners.element.onclick = () => (document.location.hash = '/winners');
  }
}
