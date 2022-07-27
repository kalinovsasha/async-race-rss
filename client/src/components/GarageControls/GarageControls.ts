import { BaseComponent } from '../../abstract/BaseComponent';
import { GarageController, EActions, EEVents } from '../../Service/garageController';
import { inputCarColor } from './../Input/InputNameColor';
import './GarageControls.scss';

export class GarageControls extends BaseComponent {
  constructor(root: HTMLElement, controller: GarageController, updateData: { color: string; text: string }) {
    super(root, 'div', ['garage__controls']);
    const inputCreate = new inputCarColor(
      this.element,
      controller,
      EActions.createCar,
      [`create-car`, 'inputContainer'],
      {
        btnTxt: 'Create',
        color: '#000000',
        text: '',
      }
    );
    const inputUpdate = new inputCarColor(
      this.element,
      controller,
      EActions.UpdatetCar,
      [`update-car`, 'inputContainer'],
      {
        btnTxt: 'Update',
        color: updateData.color,
        text: updateData.text,
      }
    );
    controller.subscribe(EEVents.selectCar, inputUpdate.changeState.bind(inputUpdate));
    const raceControls = new BaseComponent(this.element, 'div', ['race-control']);
    const race = new BaseComponent(raceControls.element, 'button', ['btn']);
    race.element.textContent = 'Race';
    const reset = new BaseComponent(raceControls.element, 'button', ['btn']);
    reset.element.textContent = 'Reset';
    const generate = new BaseComponent(raceControls.element, 'button', ['btnLong']);
    generate.element.textContent = 'Generate cars';
  }
}
