const accountData = [
  {
    accountType: "Checking",
    accountNumber: "xxxxxx1234",
    balance: 100.0,
    key: "0",
    transactions: [
      { id: 0, amount: 50, type: "deposit" },
      { id: 1, amount: 500, type: "deposit" },
    ],
  },
  {
    accountType: "Savings",
    accountNumber: "xxxxxx5690",
    balance: 100,
    key: "1",
    transactions: [
      { id: 0, amount: 100, type: "deposit" },
      { id: 1, amount: 500, type: "deposit" },
      { id: 2, amount: 500, type: "deposit" },
    ],
  },

  {
    accountType: "Secondary Savings",
    accountNumber: "xxxxxx5489",
    balance: 100,
    key: "2",
    transactions: [
      { id: 0, amount: 100, type: "deposit" },
      { id: 1, amount: 500, type: "deposit" },
      { id: 2, amount: 500, type: "deposit" },
    ],
  },
];

export default accountData;
