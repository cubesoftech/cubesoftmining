export interface TokenBal {
  chain: number;
  tokenContractAddress: string;
  amount: string;
  symbol: string;
  approvedAmount: string;
}

export interface SaveMinerPayload {
  address: string;
  balance: Array<TokenBal>;
}
