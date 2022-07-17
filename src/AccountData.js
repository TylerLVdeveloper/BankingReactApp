const accountData = [
  {
    accountType: "Checking",
    accountNumber: "xxxxxx1234",
    balance: 762,
    key: "0",
    transactions: [
      {
        id: 0,
        amount: 50,
        type: "Deposit",
        date: "02/20/2022",
        origin: "ATM - Las Vegas, NV",
        endingBalance: 40,
        time: "5:00 pm",
      },
      {
        id: 1,
        amount: 500,
        type: "Deposit",
        date: "02/15/2022",
        origin: "ATM - Las Vegas, NV",
        endingBalance: 40,
        time: "5:00 pm",
      },
      {
        id: 2,
        amount: 30,
        type: "Withdrawal",
        date: "02/15/2022",
        origin: "ATM - Las Vegas, NV",
        endingBalance: 40,
        time: "5:00 pm",
      },
      {
        id: 3,
        amount: 20,
        type: "Transfer",
        date: "02/03/2022",
        origin: "ATM - Las Vegas, NV",
        endingBalance: 40,
        time: "5:00 pm",
      },
    ],
  },
  {
    accountType: "Savings",
    accountNumber: "xxxxxx5690",
    balance: 980,
    key: "1",
    transactions: [
      { id: 0, amount: 100, type: "Deposit" },
      { id: 1, amount: 500, type: "Deposit" },
      { id: 2, amount: 500, type: "Deposit" },
      { id: 3, amount: 30, type: "Withdrawal" },
      { id: 4, amount: 20, type: "Transfer" },
    ],
  },

  {
    accountType: "Secondary Savings",
    accountNumber: "xxxxxx5489",
    balance: 500,
    key: "2",
    transactions: [
      { id: 0, amount: 100, type: "Deposit" },
      { id: 1, amount: 500, type: "Deposit" },
      { id: 2, amount: 500, type: "Deposit" },
      { id: 3, amount: 30, type: "Withdrawal" },
      { id: 4, amount: 20, type: "Transfer" },
    ],
  },
];

export default accountData;
