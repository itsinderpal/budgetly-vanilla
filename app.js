const addAccountsBtn = document.querySelector(".addAccountsBtn");
const addDebtsBtn = document.querySelector(".addDebtsBtn");
const addExpensesBtn = document.querySelector(".addExpensesBtn");
const addIncomesBtn = document.querySelector(".addIncomesBtn");

const accountsSection = document.querySelector(".accounts");
const debtsSection = document.querySelector(".debts");
const expensesSection = document.querySelector(".expenses");
const incomesSection = document.querySelector(".incomes");

const addFormAccounts = document.querySelector(".addFormAccounts");
const addFormDebts = document.querySelector(".addFormDebts");
const addFormExpenses = document.querySelector(".addFormExpenses");
const addFormIncomes = document.querySelector(".addFormIncomes");

// for toggling the add forms (add button)
[addAccountsBtn, addExpensesBtn, addExpensesBtn, addIncomesBtn].forEach((btn) => {
	btn.addEventListener("click", (e) => {
		const btnClassName = e.target.className.split(" ")[1]; //getting second className

		switch (btnClassName) {
			case "addAccountsBtn":
				addFormAccounts.classList.toggle("addFormHide");
		}
	});
});

// main inputs
const addAccountName = document.getElementById("addAccountName");
const addAccountAmt = document.getElementById("addAccountAmt");

const addFormBtn = document.querySelector(".addFormBtn"); // for every single add button on add forms
const cancelFormBtn = document.querySelector(".cancelFormBtn"); // for every single cancel button on add forms

// adding article for every section
addFormBtn.addEventListener("click", (e) => {
	//check which form is clicked on
	const addFormParentNode = e.target.parentNode.parentNode;

	switch (addFormParentNode) {
		case addFormAccounts:
			const isEmptyForm = checkEmptyAddForm(addAccountName, addAccountAmt);
			if (!isEmptyForm) {
				setTimeout(() => {
					addAccountName.style.outline = "none";
					addAccountAmt.style.outline = "none";
				}, 2000);
			}
			if (isEmptyForm) {
				addFormAccounts.before(createArticle("Account", addAccountName, addAccountAmt));
			}
			break;
	}
});

// check if inputs are empty or not
function checkEmptyAddForm(nameInput, amtInput) {
	if (!nameInput.value && !amtInput.value) {
		nameInput.style.outline = "2px solid red";
		amtInput.style.outline = "2px solid red";
		return false;
	}
	if (!nameInput.value) {
		nameInput.style.outline = "2px solid red";
		return false;
	}
	if (!amtInput.value) {
		amtInput.style.outline = "2px solid red";
		return false;
	}
	return true;
}

// specific function for creating article
function createArticle(sectionClassName, _articleName, _articleAmt) {
	const article = document.createElement("article");
	article.className = sectionClassName.toLowerCase(); // account can be replaced with a function parameter

	const firstDiv = document.createElement("div");
	const checkBoxLabel = document.createElement("label");
	checkBoxLabel.setAttribute("for", `select${sectionClassName}Item`);
	const checkBoxInput = document.createElement("input");
	checkBoxInput.setAttribute("type", "checkbox");
	checkBoxInput.setAttribute("name", "selectItem");
	checkBoxInput.setAttribute("id", `select${sectionClassName}Item`);

	checkBoxLabel.appendChild(checkBoxInput);

	const secondDiv = document.createElement("div");
	const editSpan = document.createElement("span"); // need to work on these controls also
	editSpan.textContent = "E";
	const delSpan = document.createElement("span"); // need to work on these controls also
	delSpan.textContent = "D";

	secondDiv.appendChild(editSpan);
	secondDiv.appendChild(delSpan);

	firstDiv.appendChild(checkBoxLabel);
	firstDiv.appendChild(secondDiv);

	const articleName = document.createElement("h3");
	articleName.textContent = _articleName.value;
	const articleAmt = document.createElement("p");
	articleAmt.textContent = `$${_articleAmt.value}`; // need to set "-" ahead of negative value

	article.appendChild(firstDiv);
	article.appendChild(articleName);
	article.appendChild(articleAmt);

	return article;
}

// toggling the add forms (cancel button)
cancelFormBtn.addEventListener("click", (e) => {
	//check which form is clicked on
	const addFormParentNode = e.target.parentNode.parentNode;

	switch (addFormParentNode) {
		case addFormAccounts:
            addAccountName.value = ""
            addAccountAmt.value = "";
            addFormAccounts.classList.toggle("addFormHide");
	}
});

//deleting article

