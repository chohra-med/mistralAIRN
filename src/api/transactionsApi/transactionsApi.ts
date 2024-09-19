import { GetTransactionsPayload } from "~/redux/transactions/transactionsModel";
import { transactionApiAxios } from "../Api";
import { ROUTE_TRANSACTIONS_ACTIONS } from "./routes";
import { NB_TRANSACTIONS_PER_PAGE } from "../constant";

class TransactionsApi {

  getTransactions({
    offset = 0,
  }: GetTransactionsPayload) {
    return transactionApiAxios.get(
      ROUTE_TRANSACTIONS_ACTIONS,
      {
        params: {
          offset,
          limit: NB_TRANSACTIONS_PER_PAGE
        },
      },
    );
  }





}
export default new TransactionsApi();

