//Create a zustand store to manage the account data

import { create } from "zustand";

type AccountData = {
  lockDate: Date;
};

type AccountStore = {
  accountData: AccountData;
  setAccountData: (data: AccountData) => void;
};

export const useAccountStore = create<AccountStore>((set) => ({
  accountData: {
    lockDate: new Date(),
  },
  setAccountData: (data) => set({ accountData: data }),
}));
