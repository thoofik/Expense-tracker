function getTransactions() {
    return JSON.parse(localStorage.getItem('transactions')) || [];
  }
  
  function saveTransaction(transaction) {
    const existing = getTransactions();
    existing.push(transaction);
    localStorage.setItem('transactions', JSON.stringify(existing));
  }
  