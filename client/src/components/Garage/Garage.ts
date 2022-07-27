import { BaseComponent } from '../../abstract/BaseComponent';
import { ICar } from '../../interfaces/interfaces';
import { GarageController, IDispatchData } from '../../Service/garageController';
import { Car } from '../Car/Car';
import './Garage.scss';

export class Garage extends BaseComponent {
  private dispatch: (data: IDispatchData) => void;
  constructor(root: HTMLElement, dispatch: (data: IDispatchData) => void, cars?: ICar[] | null) {
    super(root, 'div', ['garage']);
    this.dispatch = dispatch;
    if (cars) this.rendrCars(cars);
  }

  rendrCars(cars: ICar[]) {
    this.element.innerHTML = ``;
    if (cars) {
      for (let i = 0; i < cars.length; i += 1) {
        new Car(this.element, this.dispatch, cars[i]!.name, cars[i]!.id, cars[i]!.color);
      }
    }
  }
}
