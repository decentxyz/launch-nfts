export type ActiveChainIds = 1 | 7777777 | 10 | 42161 | 137 | 8453;

export interface ChainStats {
  "stats" : {
    "1day": {
      mintCount: number;
      saleCount: number;
      totalCount: number;
      mintVolume: number;
      saleVolume: number;
      totalVolume: number;
    };
    "7day": {
      mintCount: number;
      saleCount: number;
      totalCount: number;
      mintVolume: number;
      saleVolume: number;
      totalVolume: number;
    };
  };
}

export enum ResEndpoint {
  "" = 1,
  "api-optimism" = 10,
  "api-polygon" = 137,
  "api-arbitrum" = 42161,
  "api-base" = 8453,
  "api-zora" = 7777777
};

export interface MintInfoProps {
  mintMethod: string;
  params: any;
  startDate?: number;
  endDate?: number;
  maxTokens?: number;
  price: string;
}