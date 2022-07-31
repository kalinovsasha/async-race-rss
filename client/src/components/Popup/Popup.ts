import { BaseComponent } from '../../abstract/BaseComponent';
import './Popup.scss';

export class Popup extends BaseComponent {
  title;
  constructor(root: HTMLElement) {
    super(root, 'div', ['popup']);
    this.title = new BaseComponent(this.element, 'h2', ['popup__winner', 'popup__winner_hidden']);
  }

  showWinner(data: { time: number; name: string }) {
    this.title.element.textContent = `Winner ${data.name} with time: ${data.time.toFixed(2)}`;
    this.title.element.classList.remove('popup__winner_hidden');
    setTimeout(() => this.title.element.classList.add('popup__winner_hidden'), 5000);
  }
}
