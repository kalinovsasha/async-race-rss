import { car, createCar, deleteCar, getCar, getCars, updateCar } from '../api/api';
import { ICar } from '../interfaces/interfaces';
import { baseUrl } from '../api/api';

interface IState {
  cars: ICar[];
  carsCount: number;
  currentPage: number;
  selectedCarId: number;
}

type subscribeRenderCars = (data: ICar[]) => void;
type subscribeCarsCount = (data: string) => void;
type subscribeCarUpdate = (data: { color: string; text: string }) => void;

export enum EActions {
  createCar = 'CREATE_CAR',
  removeCar = 'REMOVE_CAR',
  selectCar = 'SELECT_CAR',
  UpdatetCar = 'UPDATE_CAR',
  generateCars = 'GENERATE_CARS',
  startEngine = 'SART_ENGINE',
  stopEngine = 'STOP_ENGINE',
  startRace = 'START_RACE',
  resetRace = 'RESET_RACE',
}

export enum EEVents {
  renderCars = 'renderCars',
  carsCount = 'carsCount',
  selectCar = 'selectCar',
}

export interface IDispatchData {
  type: EActions;
  data?: number | car;
}

export type funcDispatch = (data: IDispatchData) => void;

export class GarageController {
  renderSubs: Array<(data: ICar[]) => void>;
  carCountSubs: Array<(data: string) => void>;
  selectCarSubs: Array<(data: { color: string; text: string }) => void>;
  selectedCar: number | undefined;
  constructor() {
    this.renderSubs = [];
    this.carCountSubs = [];
    this.selectCarSubs = [];
    this.getCars();
  }

  subscribe(event: EEVents, callback: subscribeRenderCars | subscribeCarsCount | subscribeCarUpdate) {
    switch (event) {
      case EEVents.renderCars:
        this.renderSubs.push(callback as subscribeRenderCars);
        break;
      case EEVents.carsCount:
        this.carCountSubs.push(callback as subscribeCarsCount);
        break;
      case EEVents.selectCar:
        this.selectCarSubs.push(callback as subscribeCarUpdate);
        break;
      default:
        break;
    }
  }

  private async getCars() {
    const res = await getCars(10, 1, baseUrl);
    if (res !== null) {
      this.renderSubs.forEach((i) => i(res[0]));
      this.carCountSubs.forEach((i) => i(res[1]));
    }
  }

  private async addCar(data: car) {
    await createCar(data).then(() => this.getCars());
  }

  private async removeCar(id: number) {
    console.log(id + ` ` + this);
    await deleteCar(id).then(() => this.getCars());
  }

  private async updateCar(car: ICar) {
    await updateCar(car);
    this.getCars();
  }

  private async selectCar(id: number) {
    const car = await getCar(id, baseUrl);
    if (car) this.selectCarSubs.forEach((i) => i({ color: car.color, text: car.name }));
  }

  dispatch(action: IDispatchData) {
    switch (action.type) {
      case EActions.createCar:
        this.addCar(action.data! as car);
        break;
      case EActions.removeCar:
        this.removeCar(action.data as number);
        break;
      case EActions.selectCar:
        this.selectedCar = action.data as number;
        this.selectCar(this.selectedCar);
        break;
      case EActions.UpdatetCar:
        if (this.selectedCar) {
          const data = action.data as car;
          this.updateCar({
            id: this.selectedCar,
            name: data.name,
            color: data.color,
          });
        }
        break;

      default:
        break;
    }
    return null;
  }
}
