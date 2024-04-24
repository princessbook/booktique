export type BookResponse = {
  adult: boolean;
  author: string;
  categoryId: number;
  categoryName: string;
  cover: string;
  customerReviewRank: number;
  description: string;
  fixedPrice: boolean;
  isbn: string;
  isbn13: string;
  itemId: number;
  link: string;
  mallType: string;
  mileage: number;
  priceSales: number;
  priceStandard: number;
  pubDate: string;
  publisher: string;
  salesPoint: number;
  stockStatus: string;
  subInfo: object;
  title: string;
};

export type BookInfo = {
  isbn13: string;
  title: string;
  cover: string;
  categoryName: string;
  itemPage: number;
  author: string;
};

export interface BookInfoResponse {
  adult: boolean;
  author: string;
  categoryId: number;
  categoryName: string;
  cover: string;
  customerReviewRank: number;
  description: string;
  fixedPrice: boolean;
  isbn: string;
  isbn13: string;
  itemId: number;
  link: string;
  mallType: string;
  mileage: number;
  priceSales: number;
  priceStandard: number;
  pubDate: string;
  publisher: string;
  salesPoint: number;
  seriesInfo?: {
    seriesId: number;
    seriesLink: string;
    seriesName: string;
  };
  stockStatus: string;
  statusText: string;
  subInfo: {
    itemPage: number;
    originalTitle: string;
    subTitle: string;
    usedList: {
      aladinUsed: any; // 적절한 타입으로 변경 필요
      userUsed: any; // 적절한 타입으로 변경 필요
      spaceUsed: any; // 적절한 타입으로 변경 필요
    };
  };
}
