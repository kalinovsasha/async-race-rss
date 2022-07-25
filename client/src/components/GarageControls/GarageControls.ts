import { BaseComponent } from '../../abstract/BaseComponent';
import { inputCarColor } from './../Input/InputNameColor';
import './GarageControls.scss';

export class GarageControls extends BaseComponent {
  constructor(root: HTMLElement) {
    super(root, 'div', ['garage__controls']);
    const inputCreate = new inputCarColor(this.element, [`create-car`, 'inputContainer'], `Create`);
    const inputUpdate = new inputCarColor(this.element, [`update-car`, 'inputContainer'], `Update`);
    const raceControls = new BaseComponent(this.element, 'div', ['race-control']);
    const race = new BaseComponent(raceControls.element, 'button', ['btn']);
    race.element.textContent = 'Race';
    const reset = new BaseComponent(raceControls.element, 'button', ['btn']);
    reset.element.textContent = 'Reset';
    const generate = new BaseComponent(raceControls.element, 'button', ['btnLong']);
    generate.element.textContent = 'Generate cars';
  }
}
