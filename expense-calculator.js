class ExpenseCalculator extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.expenses = [];
        this.total = 0;
        this.shadowRoot.innerHTML = `
            <style>
                /* Вставьте стили из файла expense-calculator.css здесь */
            </style>
            <div>
                <h2>Калькулятор расходов</h2>
                <form id="expense-form">
                    <input type="text" id="expense-name" placeholder="Название расхода" required>
                    <input type="number" id="expense-amount" placeholder="Сумма" required>
                    <button type="submit">Добавить</button>
                </form>
                <div id="expense-list"></div>
                <p>Общая сумма расходов: <span id="total-expenses">0</span></p>
            </div>
        `;

        this.shadowRoot.getElementById('expense-form').addEventListener('submit', this.addExpense.bind(this));
    }

    addExpense(event) {
        event.preventDefault();
        const nameInput = this.shadowRoot.getElementById('expense-name');
        const amountInput = this.shadowRoot.getElementById('expense-amount');
        const name = nameInput.value;
        const amount = +amountInput.value;
        if (name.trim() === '' || amount <= 0) {
            alert('Пожалуйста, введите корректное название и сумму расхода.');
            return;
        }
        this.expenses.push({ name, amount });
        this.total += amount;
        this.displayExpenses();
        this.updateTotal();
        nameInput.value = '';
        amountInput.value = '';
    }

    displayExpenses() {
        const expenseList = this.shadowRoot.getElementById('expense-list');
        expenseList.innerHTML = '';
        this.expenses.forEach((expense, index) => {
            const div = document.createElement('div');
            div.innerHTML = `
                <p>${expense.name} - ${expense.amount}</p>
                <button data-index="${index}">Удалить</button>
            `;
            expenseList.appendChild(div);
            div.querySelector('button').addEventListener('click', this.deleteExpense.bind(this));
        });
    }

    updateTotal() {
        const totalExpenses = this.shadowRoot.getElementById('total-expenses');
        totalExpenses.textContent = this.total;
    }

    deleteExpense(event) {
        const index = event.target.dataset.index;
        const deletedAmount = this.expenses[index].amount;
        this.expenses.splice(index, 1);
        this.total -= deletedAmount;
        this.displayExpenses();
        this.updateTotal();
    }
}

customElements.define('expense-calculator', ExpenseCalculator);
