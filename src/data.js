let invoices = [
    {
      key: 1,
      name: "Santa Monica",
      number: 1995,
      amount: "$10,800",
      due: "12/05/1995",
    },
    {
      key: 2,
      name: "Stankonia",
      number: 2000,
      amount: "$8,000",
      due: "10/31/2000",
    },
    {   
      key: 3,
      name: "Ocean Avenue",
      number: 2003,
      amount: "$9,500",
      due: "07/22/2003",
    },
    {
      key: 4,
      name: "Tubthumper",
      number: 1997,
      amount: "$14,000",
      due: "09/01/1997",
    },
    {
      key: 5,
      name: "Wide Open Spaces",
      number: 1998,
      amount: "$4,600",
      due: "01/27/1998",
    },
  ];
  
  export function getInvoices() {
    return invoices;
  }

  export function getInvoiceByNumber(number) {
      return invoices.find((invoice) => invoice.number === number);
  }