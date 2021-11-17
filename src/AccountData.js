const accountData = [
  {
    accountType: "Checking",
    balance: 200.0,
    key: 0,
    transactions: [
      { id: 0, amount: 50, type: "deposit" },
      { id: 1, amount: 500, type: "deposit" },
    ],
  },
  {
    accountType: "Savings",
    balance: 4320.52,
    key: 1,
    transactions: [
      { id: 0, amount: 100, type: "deposit" },
      { id: 1, amount: 500, type: "deposit" },
      { id: 2, amount: 500, type: "deposit" },
    ],
  },
];

export default accountData;
