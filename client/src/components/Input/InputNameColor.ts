import { BaseComponent } from '../../abstract/BaseComponent';
import { IInputState } from '../../interfaces/interfaces';
import { EActions, GarageController } from './../../Service/garageController';

export class inputCarColor extends BaseComponent {
  inputTxt;
  inputColor;
  btn;
  state: IInputState;
  constructor(root: HTMLElement, controller: GarageController, action: EActions, styles: string[], state: IInputState) {
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
    this.btn.element.onclick = () =>
      controller.dispatch({
        type: action,
        data: { name: this.inputTxt.value, color: this.inputColor.value },
      });
  }
  changeState(data: { color: string; text: string }) {
    this.state.text = data.text;
    this.state.color = data.color;
    this.inputTxt.value = data.text;
    this.inputColor.value = data.color;
  }
}
