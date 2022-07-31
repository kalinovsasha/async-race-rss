import { BaseComponent } from '../../abstract/BaseComponent';
import { car } from '../../api/api';

export interface IInputState {
  btnTxt: string;
  color: string;
  text: string;
}

export class inputCarColor extends BaseComponent {
  inputTxt;
  inputColor;
  btn;
  state: IInputState;
  constructor(root: HTMLElement, callback: (data: car | car) => Promise<void>, styles: string[], state: IInputState) {
    super(root, 'div', styles);
    this.state = state;
    this.inputTxt = document.createElement('input');
    this.inputTxt.setAttribute('type', 'txt');
    this.inputTxt.classList.add(`${styles[0]}__inputTxt`);
    this.inputTxt.value = state.text;
    this.element.append(this.inputTxt);
    this.inputColor = document.createElement('input');
    this.inputColor.setAttribute('type', 'color');
    this.inputColor.classList.add(`${styles[0]}__inputColor`);
    this.inputColor.value = state.color;
    this.element.append(this.inputColor);
    this.btn = new BaseComponent(this.element, 'button', [`${styles[0]}__btnCreate`, 'btn']);
    this.btn.element.textContent = this.state.btnTxt;
    this.btn.element.onclick = () => {
      callback({
        name: this.inputTxt.value,
        color: this.inputColor.value,
      });
    };
  }
  changeState(data: car) {
    this.state.text = data.name;
    this.state.color = data.color;
    this.inputTxt.value = data.name;
    this.inputColor.value = data.color;
  }
}
