import { getAllWinners, getCar, winner } from '../api/api';

type subscribersRenderWinners = (data: string) => void; // data: { id: number; name: string; color: string; time: number; wins: number }
type subscribersWinnersCount = (data: { pageCount: number; curPage: number }) => void;
type dispatchData = { winnersCount?: number; pageCount: number; curPage: number } | string;

export enum EEventsWiners {
  renderWiners = 'renderWiners',
  winnersCount = 'winnersCount',
}
export enum EWinnersSort {
  id = 'id',
  time = 'time',
  wins = 'wins',
}

export class ServiceWinners {
  private baseUrl: string;
  private currentWinners: winner[] = [];
  private subscribersRenderWinners: subscribersRenderWinners[] = [];
  private subscribersWinnersCount: subscribersWinnersCount[] = [];
  private winnersOnPage = 10;
  private pageCount = 1;
  private currentPage = 1;
  private curentSort = EWinnersSort.id;
  private currentOrder: 'ASC' | 'DESC' = 'DESC';
  constructor(baseUrl: string, winnersOnPage?: number) {
    if (winnersOnPage) this.winnersOnPage = winnersOnPage;
    this.baseUrl = baseUrl;
    this.getWinners();
  }

  subscribe(event: EEventsWiners, callback: subscribersRenderWinners | subscribersWinnersCount) {
    switch (event) {
      case EEventsWiners.renderWiners:
        this.subscribersRenderWinners.push(callback as subscribersRenderWinners);
        break;
      case EEventsWiners.winnersCount:
        this.subscribersWinnersCount.push(callback as subscribersWinnersCount);
        break;
    }
  }

  dispatchEvent(event: EEventsWiners, data: dispatchData) {
    switch (event) {
      case EEventsWiners.renderWiners:
        this.subscribersRenderWinners.forEach((callback) => callback(data as string));
        break;
      case EEventsWiners.winnersCount:
        this.subscribersWinnersCount.forEach((callback) => callback(data as { pageCount: number; curPage: number }));
        break;
    }
  }

  async getWinners() {
    const winners = await getAllWinners(this.currentPage, this.curentSort, this.currentOrder);
    const result = [];
    if (winners) {
      this.currentWinners = winners?.result;
      this.pageCount = Math.floor(winners.totalCount / this.winnersOnPage);
      for (let i = 0; i < winners?.result.length; i++) {
        const car = await getCar(winners.result[i]!.id as number, this.baseUrl);
        result.push({
          id: winners.result[i]?.id,
          wins: winners.result[i]?.wins,
          time: winners.result[i]?.time,
          color: car?.color,
          name: car?.name,
          curPage: this.currentPage,
        });
      }
    }
    this.pageCount = Math.ceil(Number(winners?.totalCount) / this.winnersOnPage);
    await this.getWinnersCount();
    this.dispatchEvent(EEventsWiners.renderWiners, JSON.stringify(result));
  }

  async getWinnersCount() {
    const winners = await getAllWinners(1);
    if (winners?.totalCount) {
      this.dispatchEvent(EEventsWiners.winnersCount, {
        pageCount: this.pageCount,
        winnersCount: Number(winners.totalCount),
        curPage: this.currentPage,
      });
    } else
      this.dispatchEvent(EEventsWiners.winnersCount, {
        pageCount: this.pageCount,
        curPage: this.currentPage,
        winnersCount: 0,
      });
  }

  async nextPage() {
    if (this.currentPage < this.pageCount) {
      this.currentPage += 1;
      await this.getWinners();
      this.dispatchEvent(EEventsWiners.winnersCount, { curPage: this.currentPage, pageCount: this.pageCount });
    }
  }

  async prevPage() {
    if (this.currentPage > 1) {
      this.currentPage -= 1;
      await this.getWinners();
      this.dispatchEvent(EEventsWiners.winnersCount, { curPage: this.currentPage, pageCount: this.pageCount });
    }
  }

  async changeSortType(type: EWinnersSort, order: 'ASC' | 'DESC' = 'ASC') {
    this.curentSort = type;
    this.currentOrder = order;
    await this.getWinners();
  }
}
