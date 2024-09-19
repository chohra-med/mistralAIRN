/* This contains the Types of Data that we have in Our API */

export interface Transaction {
  /* Unique id of the Transaction */
  id: string;
  /* Combination of transaction moduleName:commandName */
  moduleCommand: string;
  /* Transaction fee */
  fee: string;
  /* Minimum fee for the transaction */
  minFee: string;
  /* Transaction size in bytes */
  size: number;

  nonce: string;
  /* Transaction status*/
  executionStatus: 'pending' | 'successful' | 'failed';
  /* Sender Account size in bytes */
  sender: Account;

  params: TransactionParams;
  meta: TransactionMeta;
  // Block data used in Transaction 
  block: Pick<Block, 'id' | 'height' | 'timestamp' | 'isFinal'>;
  /* Transaction index (zero-based) within the block payload*/
  index: number;

}
export interface Block {
  /* Unique identifier of the block. Derived from the block signature */
  id: string;
  /* The height of the network, 
  at the moment where this transaction was included in the blockchain
   */
  height: number;
  /* Lisk protocol version to which this block adheres to. */
  version: number;

  generator: Account;

  /* Merkle root of the block payload.
   The block payload comprises the transactions contained within the block */
  transactionRoot: string;
  /* Merkle root of the block assets array */
  assetRoot: string;
  /* ID of the parent block.. */
  previousBlockID: string;
  /* The number of transactions processed in the block. */
  numberOfTransactions: number;
  /* The number of assets in the block. */
  numberOfAssets: number;
  /* The number of events in the block. */
  numberOfEvents: number;
  /* UNIX Timestamp*/
  timestamp: number;
  /* Derived from a SHA-256 hash of the block header,
   that is signed by the private key of the delegate who forged the block. */
  signature: string;

  isFinal: boolean;
}
export interface Account {
  /* 
  The Lisk Address is the human-readable representation of a blockchain account. 
  It is 41 character long identifier that begins with 
  */
  address: string;
  /* The public key is derived from the private key of the owner of the account.
    It can be used to validate that the private key belongs to the owner,
    but not provide access to the owner's private key */
  publicKey?: string;
  /* Delegate name*/
  name: string;

}

export interface TransactionMeta {
  amount: string;
  recipientAddress?: string;
  tokenID: string;
  data: string;
}
export interface TransactionParams {
  recipient: Account
}
