const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const category = document.getElementById('category');
const date = document.getElementById('date');
const ctx = document.getElementById('expenseChart').getContext('2d');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
let chart;

form.addEventListener('submit', function (e) {
  e.preventDefault();

  if (
    text.value.trim() === '' ||
    amount.value.trim() === '' ||
    category.value === '' ||
    date.value === ''
  ) {
    alert('Please fill in all fields');
    return;
  }

  const transaction = {
    id: Math.floor(Math.random() * 100000000),
    text: text.value,
    amount: +amount.value,
    category: category.value,
    date: date.value
  };

  transactions.push(transaction);
  updateLocalStorage();
  init();

  text.value = '';
  amount.value = '';
  category.value = '';
  date.value = '';
});

function addTransactionDOM(transaction) {
  const sign = transaction.amount < 0 ? '-' : '+';
  const item = document.createElement('li');

  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  item.innerHTML = `
    <div>
      <strong>${transaction.text}</strong> <small>[${transaction.category}]</small><br/>
      <small>${new Date(transaction.date).toLocaleDateString()}</small>
    </div>
    <span>${sign}$${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
  `;

  list.appendChild(item);
}

function updateValues() {
  const amounts = transactions.map(t => t.amount);
  const total = amounts.reduce((acc, val) => acc + val, 0).toFixed(2);
  const income = amounts.filter(val => val > 0).reduce((acc, val) => acc + val, 0).toFixed(2);
  const expense = (
    amounts.filter(val => val < 0).reduce((acc, val) => acc + val, 0) * -1
  ).toFixed(2);

  balance.innerText = `$${total}`;
  money_plus.innerText = `+$${income}`;
  money_minus.innerText = `-$${expense}`;
}

function removeTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  updateLocalStorage();
  init();
}

function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

function updateChart() {
  const categorySums = {};

  transactions.forEach(t => {
    if (t.amount < 0) {
      categorySums[t.category] = (categorySums[t.category] || 0) + Math.abs(t.amount);
    }
  });

  const labels = Object.keys(categorySums);
  const data = Object.values(categorySums);

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels,
      datasets: [{
        label: 'Expenses by Category',
        data,
        backgroundColor: ['#ff6384', '#36a2eb', '#ffcd56', '#4bc0c0', '#9966ff', '#aaa'],
        borderWidth: 1
      }]
    }
  });
}

function init() {
  list.innerHTML = '';
  transactions.forEach(addTransactionDOM);
  updateValues();
  updateChart();
}

init();
