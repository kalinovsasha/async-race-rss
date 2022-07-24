import { BaseComponent } from '../../abstract/BaseComponent';
import { inputCarColor } from './../Input/InputNameColor';

export class GarageControls extends BaseComponent {
  constructor(root: HTMLElement) {
    super(root, 'div', ['garage__controls']);
    const inputCreate = new inputCarColor(this.element, [`create-car`], `Create`);
    const inputUpdate = new inputCarColor(this.element, [`update-car`], `Update`);
  }
}
