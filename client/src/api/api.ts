import { ICar } from '../interfaces/interfaces';

export type getCarsResponse = [ICar[], string] | null;

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
