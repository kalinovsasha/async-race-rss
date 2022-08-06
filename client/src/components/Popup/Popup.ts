import { BaseComponent } from '../../abstract/BaseComponent';
import './Popup.scss';

export class Popup extends BaseComponent {
  title;
  constructor(root: HTMLElement) {
    super(root, 'div', ['popup']);
    this.title = new BaseComponent(this.element, 'h2', ['popup__winner']);
    this.element.remove();
  }

  showWinner(data: { time: number; name: string }) {
    this.title.element.textContent = `Winner ${data.name} with time: ${data.time.toFixed(2)}`;
    this.root.append(this.element);
    setTimeout(() => this.element.remove(), 5000);
  }
}
