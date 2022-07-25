import { ICar } from '../interfaces/interfaces';

export type getCarsResponse = [ICar[], string] | null;
export type car = {
  name: string;
  color: string;
};
export type carStatus = {
  velocity: number;
  distance: number;
};
export const baseUrl = 'http://127.0.0.1:3000';

export async function getCars(limit: number, page: number, baseUrl: string): Promise<getCarsResponse> {
  let res: Response;
  let data: ICar[];
  let pageCount: string;
  try {
    res = await fetch(`${baseUrl}/garage?_limit=${limit}&_page=${page}`);
    if (res.status === 200) {
      data = (await res.json()) as ICar[];
      pageCount = res.headers.get('X-Total-Count') || '0';
      return [data, pageCount];
    }
    return null;
  } catch (error) {
    return null;
  }
}

export async function getCar(id: number, baseUrl: string): Promise<ICar | null> {
  let res: Response;
  let data: ICar;
  try {
    res = await fetch(`${baseUrl}/garage/${id}`);
    if (res.status === 200) {
      data = (await res.json()) as ICar;
      return data;
    }
    return null;
  } catch (error) {
    return null;
  }
}

export const createCar = async (data: car): Promise<ICar | null> => {
  let car: ICar;
  let res: Response;
  try {
    res = await fetch(`${baseUrl}/garage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    car = (await res.json()) as ICar;
    return res.status === 201 ? car : null;
  } catch (e) {
    return null;
  }
};

export const updateCar = async (car: ICar): Promise<ICar | null> => {
  let carResp: ICar;
  let res: Response;
  try {
    res = await fetch(`${baseUrl}/garage/${car.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    });
    carResp = (await res.json()) as ICar;
    return res.status === 200 ? carResp : null;
  } catch (err) {
    throw new Error(`${err}`);
  }
};

export const deleteCar = async (carId: number): Promise<void> => {
  try {
    await fetch(`${baseUrl}/garage/${carId}`, {
      method: 'DELETE',
    });
  } catch (err) {
    throw new Error(`Oh no! ${err}`);
  }
};

export const startEngine = async (carId: number): Promise<{ status: number; result: carStatus }> => {
  try {
    const data = await fetch(`${baseUrl}/engine?id=${carId}&status=started`);
    const res: carStatus = await data.json();
    return {
      status: data.status,
      result: res,
    };
  } catch (err) {
    throw new Error(`${err}`);
  }
};

export const switchToDrive = async (carId: number): Promise<number> => {
  try {
    const data = await fetch(`${baseUrl}/engine?id=${carId}&status=drive`);
    return data.status;
  } catch (err) {
    throw new Error(`${err}`);
  }
};

export const stopEngine = async (carId: number): Promise<{ status: number; result: carStatus }> => {
  try {
    const data = await fetch(`${baseUrl}/engine?id=${carId}&status=stopped`);
    const res: carStatus = await data.json();

    return {
      status: data.status,
      result: res,
    };
  } catch (err) {
    throw new Error(`${err}`);
  }
};
