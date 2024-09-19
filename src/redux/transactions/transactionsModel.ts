import { Transaction } from "api/types";


export interface TransactionsList {
  transactions: Transaction[];
}

export interface GetTransactionsPayload {
  //Offset to apply to the query results
  offset: number;
}


export type GetTransactionsResponse = {
  data: Transaction[];
  meta: {
    //Number of items returned in the request.
    count: number;
    //Number of items skipped in the response
    offset: number;
    //Number of items returned in the response
    total: number;
  };
};
