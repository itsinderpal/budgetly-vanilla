const addBtns = document.querySelectorAll(".btn-primary");

const addFormAccounts = document.querySelector(".addFormAccounts");
const addFormDebts = document.querySelector(".addFormDebts");
const addFormExpenses = document.querySelector(".addFormExpenses");
const addFormIncomes = document.querySelector(".addFormIncomes");

const editFormAccounts = document.querySelector(".editFormAccounts");
const editFormDebts = document.querySelector(".editFormDebts");
const editFormExpenses = document.querySelector(".editFormExpenses");
const editFormIncomes = document.querySelector(".editFormIncomes");

let state = {
	account: [],
	debt: [],
	expense: [],
	income: [],
};

if (localStorage.getItem("budgetly-state")) {
	state = JSON.parse(localStorage.getItem("budgetly-state"));
} else {
	localStorage.setItem("budgetly-state", JSON.stringify(state));
}

const switchConditionals = {
	account: "account",
	debt: "debt",
	expense: "expense",
	income: "income",
};

// for toggling the add forms (add button)
addBtns.forEach((btn) => {
	btn.addEventListener("click", (e) => {
		const btnClassName = e.target.className.split(" ")[1]; //getting second className

		switch (btnClassName) {
			case "addAccountsBtn":
				clearInputValues();
				addFormAccounts.classList.toggle("addFormHide");
				break;
			case "addDebtsBtn":
				clearInputValues();
				addFormDebts.classList.toggle("addFormHide");
				break;
			case "addExpensesBtn":
				clearInputValues();
				addFormExpenses.classList.toggle("addFormHide");
				break;
			case "addIncomesBtn":
				clearInputValues();
				addFormIncomes.classList.toggle("addFormHide");
				break;
		}
	});
});

// main add form inputs
const addAccountName = document.getElementById("addAccountName");
const addAccountAmt = document.getElementById("addAccountAmt");
const addDebtName = document.getElementById("addDebtName");
const addDebtAmt = document.getElementById("addDebtAmt");
const addExpenseName = document.getElementById("addExpenseName");
const addExpenseAmt = document.getElementById("addExpenseAmt");
const addIncomeName = document.getElementById("addIncomeName");
const addIncomeAmt = document.getElementById("addIncomeAmt");

function clearInputValues() {
	addAccountName.value = "";
	addAccountAmt.value = "";
	addDebtName.value = "";
	addDebtAmt.value = "";
	addExpenseName.value = "";
	addExpenseAmt.value = "";
	addIncomeName.value = "";
	addIncomeAmt.value = "";
}

function randomId() {
	return Math.random().toString(36).slice(2, 9);
}

// add form buttons
const addFormBtns = document.querySelectorAll(".addFormBtn"); // for every single add button on add forms
const addCancelFormBtns = document.querySelectorAll(".addCancelFormBtn"); // for every single cancel button on add forms

// adding article for every section
addFormBtns.forEach((addFormBtn) => {
	addFormBtn.addEventListener("click", (e) => {
		//check which form is clicked on
		const addFormParentNode = e.target.parentNode.parentNode;

		let isNotEmptyForm;
		switch (addFormParentNode) {
			case addFormAccounts:
				isNotEmptyForm = checkEmptyAddForm(addAccountName, addAccountAmt);

				if (isNotEmptyForm) {
					const articleId = randomId();
					const articleEl = createArticle(
						articleId,
						"account",
						addAccountName.value,
						addAccountAmt.value,
						true
					);
					let newArticleObj = {
						id: articleId,
						articleName: addAccountName.value,
						articleAmt: addAccountAmt.value,
						checked: true,
					};
					articleReducer("add", "account", newArticleObj);
					addFormAccounts.before(articleEl);
					clearInputValues();
					addFormAccounts.classList.toggle("addFormHide");
				} else {
					setTimeout(() => {
						addAccountName.style.outline = "none";
						addAccountAmt.style.outline = "none";
					}, 2000);
				}
				break;
			case addFormDebts:
				isNotEmptyForm = checkEmptyAddForm(addDebtName, addDebtAmt);

				if (isNotEmptyForm) {
					const articleId = randomId();
					true;
					const articleEl = createArticle(
						articleId,
						"debt",
						addDebtName.value,
						addDebtAmt.value,
						true
					);

					let newArticleObj = {
						id: articleId,
						articleName: addDebtName.value,
						articleAmt: addDebtAmt.value,
						checked: true,
					};
					articleReducer("add", "debt", newArticleObj);
					addFormDebts.before(articleEl);
					clearInputValues();
					addFormDebts.classList.toggle("addFormHide");
				} else {
					setTimeout(() => {
						addDebtName.style.outline = "none";
						addDebtAmt.style.outline = "none";
					}, 2000);
				}
				break;
			case addFormExpenses:
				isNotEmptyForm = checkEmptyAddForm(addExpenseName, addExpenseAmt);

				if (isNotEmptyForm) {
					const articleId = randomId();
					const articleEl = createArticle(
						articleId,
						"expense",
						addExpenseName.value,
						addExpenseAmt.value,
						true
					);

					let newArticleObj = {
						id: articleId,
						articleName: addExpenseName.value,
						articleAmt: addExpenseAmt.value,
						checked: true,
					};
					articleReducer("add", "expense", newArticleObj);
					addFormExpenses.before(articleEl);
					clearInputValues();
					addFormExpenses.classList.toggle("addFormHide");
				} else {
					setTimeout(() => {
						addExpenseName.style.outline = "none";
						addExpenseAmt.style.outline = "none";
					}, 2000);
				}
				break;
			case addFormIncomes:
				isNotEmptyForm = checkEmptyAddForm(addIncomeName, addIncomeAmt);

				if (isNotEmptyForm) {
					const articleId = randomId();
					const articleEl = createArticle(
						articleId,
						"income",
						addIncomeName.value,
						addIncomeAmt.value,
						true
					);

					let newArticleObj = {
						id: articleId,
						articleName: addIncomeName.value,
						articleAmt: addIncomeAmt.value,
						checked: true,
					};
					articleReducer("add", "income", newArticleObj);
					addFormIncomes.before(articleEl);
					clearInputValues();
					addFormIncomes.classList.toggle("addFormHide");
				} else {
					setTimeout(() => {
						addIncomeName.style.outline = "none";
						addIncomeAmt.style.outline = "none";
					}, 2000);
				}
				break;
		}
	});
});

// check if inputs are empty or not
function checkEmptyAddForm(nameInput, amtInput) {
	const outline = "1px solid red";
	if (!nameInput.value && !amtInput.value) {
		nameInput.style.outline = outline;
		amtInput.style.outline = outline;
		return false;
	}
	if (!nameInput.value) {
		nameInput.style.outline = outline;
		return false;
	}
	if (!amtInput.value) {
		amtInput.style.outline = outline;
		return false;
	}
	return true;
}

// specific function for creating article
function createArticle(id, sectionClassName, _articleName, _articleAmt, checked) {
	const article = document.createElement("article");
	article.className = sectionClassName;
	article.setAttribute("id", id);

	const firstDiv = document.createElement("div");
	const checkBoxLabel = document.createElement("label");
	checkBoxLabel.setAttribute("for", `check${id}`);
	const checkBoxInput = document.createElement("input");
	checkBoxInput.setAttribute("type", "checkbox");
	checkBoxInput.setAttribute("name", "selectItem");
	checkBoxInput.setAttribute("id", `check${id}`);
	checked
		? checkBoxInput.setAttribute("checked", checked)
		: checkBoxInput.removeAttribute("checked");

	checkBoxLabel.appendChild(checkBoxInput);

	const secondDiv = document.createElement("div");
	const editSpan = document.createElement("span"); // need to work on these controls also
	editSpan.className = `editArticleBtn`;
	editSpan.id = `edit${id}`;
	editSpan.textContent = "E";
	const delSpan = document.createElement("span"); // need to work on these controls also
	delSpan.className = `delArticleBtn`;
	delSpan.id = `del${id}`;
	delSpan.textContent = "D";

	secondDiv.appendChild(editSpan);
	secondDiv.appendChild(delSpan);

	firstDiv.appendChild(checkBoxLabel);
	firstDiv.appendChild(secondDiv);

	const articleName = document.createElement("h3");
	articleName.textContent = _articleName;
	const articleAmt = document.createElement("p");
	articleAmt.textContent = `${
		sectionClassName === ("debt" || "expense") ? "-$" + _articleAmt : "$" + _articleAmt
	}`;

	article.appendChild(firstDiv);
	article.appendChild(articleName);
	article.appendChild(articleAmt);

	return article;
}

// toggling the add forms (cancel button)
addCancelFormBtns.forEach((addCancelFormBtn) => {
	addCancelFormBtn.addEventListener("click", (e) => {
		//check which form is clicked on
		const addFormParentNode = e.target.parentNode.parentNode;

		switch (addFormParentNode) {
			case addFormAccounts:
				addAccountName.value = "";
				addAccountAmt.value = "";
				addFormAccounts.classList.toggle("addFormHide");
				break;
			case addFormDebts:
				addDebtName.value = "";
				addDebtAmt.value = "";
				addFormDebts.classList.toggle("addFormHide");
				break;
			case addFormExpenses:
				addExpenseName.value = "";
				addExpenseAmt.value = "";
				addFormExpenses.classList.toggle("addFormHide");
				break;
			case addFormIncomes:
				addIncomeName.value = "";
				addIncomeAmt.value = "";
				addFormIncomes.classList.toggle("addFormHide");
				break;
		}
	});
});

// selected main for bubbling and event propagation
const main = document.querySelector("main");

let currentEditingArticleId;

// editing & deleting & checking dymanic generated articles
main.addEventListener("click", (e) => {
	if (e.target.closest(".delArticleBtn")) {
		const articleId = e.target.getAttribute("id").slice(3); // removing "del" prefix from id
		const parentArticle = e.target.parentNode.parentNode.parentNode;
		const articleSection = parentArticle.className;
		articleReducer("delete", articleSection, { id: articleId });
		parentArticle.remove();
	}
	if (e.target.closest(".editArticleBtn")) {
		const parentArticle = e.target.parentNode.parentNode.parentNode;
		const articleSection = parentArticle.className;
		const articleId = e.target.getAttribute("id").slice(4); // removing "edit" prefix from id
		currentEditingArticleId = articleId;
		const article = state[articleSection].find((_article) => _article.id === articleId);
		toggleEditForm(articleSection, article.articleName, article.articleAmt);
	}
	if (e.target.closest("input[type=checkbox]")) {
		const parentArticle = e.target.parentNode.parentNode.parentNode;
		const articleSection = parentArticle.className;
		const articleId = e.target.getAttribute("id").slice(5); // removing "edit" prefix from id;
		articleReducer("check", articleSection, { id: articleId });
	}
});

// main edit form inputs
const editAccountName = document.getElementById("editAccountName");
const editAccountAmt = document.getElementById("editAccountAmt");
const editDebtName = document.getElementById("editDebtName");
const editDebtAmt = document.getElementById("editDebtAmt");
const editExpenseName = document.getElementById("editExpenseName");
const editExpenseAmt = document.getElementById("editExpenseAmt");
const editIncomeName = document.getElementById("editIncomeName");
const editIncomeAmt = document.getElementById("editIncomeAmt");

// need to make a new edit form in html and then make it toggle and then click edit btn and then change the state
function toggleEditForm(section, name, amt) {
	switch (section) {
		case "account":
			editFormAccounts.classList.toggle("editFormHide");
			editAccountName.value = name;
			editAccountAmt.value = amt;
			break;
		case "debt":
			editFormDebts.classList.toggle("editFormHide");
			editDebtName.value = name;
			editDebtAmt.value = amt;
			break;
		case "expense":
			editFormExpenses.classList.toggle("editFormHide");
			editExpenseName.value = name;
			editExpenseAmt.value = amt;
			break;
		case "income":
			editFormIncomes.classList.toggle("editFormHide");
			editIncomeName.value = name;
			editIncomeAmt.value = amt;
			break;
	}
}

// edit form buttons
const editFormBtns = document.querySelectorAll(".editFormBtn"); // for every single add button on edit forms
const editCancelFormBtns = document.querySelectorAll(".editCancelFormBtn"); // for every single cancel button on edit forms

// editing article for every section
editFormBtns.forEach((editFormBtn) => {
	editFormBtn.addEventListener("click", (e) => {
		//check which form is clicked on
		const editFormParentNode = e.target.parentNode.parentNode;
		let isNotEmptyForm;
		switch (editFormParentNode) {
			case editFormAccounts:
				isNotEmptyForm = checkEmptyAddForm(editAccountName, editAccountAmt);

				if (isNotEmptyForm) {
					articleReducer("edit", "account", {
						id: currentEditingArticleId,
						editName: editAccountName.value,
						editAmt: editAccountAmt.value,
					});
					updateUI(currentEditingArticleId, editAccountName.value, editAccountAmt.value);
					editFormAccounts.classList.toggle("editFormHide");
				} else {
					setTimeout(() => {
						editAccountName.style.outline = "none";
						editAccountAmt.style.outline = "none";
					}, 2000);
				}
				break;
			case editFormDebts:
				isNotEmptyForm = checkEmptyAddForm(editDebtName, editDebtAmt);

				if (isNotEmptyForm) {
					articleReducer("edit", "debt", {
						id: currentEditingArticleId,
						editName: editDebtName.value,
						editAmt: editDebtAmt.value,
					});
					updateUI(currentEditingArticleId, editDebtName.value, editDebtAmt.value);
					editFormDebts.classList.toggle("editFormHide");
				} else {
					setTimeout(() => {
						editDebtName.style.outline = "none";
						editDebtAmt.style.outline = "none";
					}, 2000);
				}
				break;
			case editFormExpenses:
				isNotEmptyForm = checkEmptyAddForm(editExpenseName, editExpenseAmt);

				if (isNotEmptyForm) {
					articleReducer("edit", "expense", {
						id: currentEditingArticleId,
						editName: editExpenseName.value,
						editAmt: editExpenseAmt.value,
					});
					updateUI(currentEditingArticleId, editExpenseName.value, editExpenseAmt.value);
					editFormExpenses.classList.toggle("editFormHide");
				} else {
					setTimeout(() => {
						editExpenseName.style.outline = "none";
						editExpenseAmt.style.outline = "none";
					}, 2000);
				}
				break;
			case editFormIncomes:
				isNotEmptyForm = checkEmptyAddForm(editIncomeName, editIncomeAmt);

				if (isNotEmptyForm) {
					articleReducer("edit", "income", {
						id: currentEditingArticleId,
						editName: editIncomeName.value,
						editAmt: editIncomeAmt.value,
					});
					updateUI(currentEditingArticleId, editIncomeName.value, editIncomeAmt.value);
					editFormIncomes.classList.toggle("editFormHide");
				} else {
					setTimeout(() => {
						editIncomeName.style.outline = "none";
						editIncomeAmt.style.outline = "none";
					}, 2000);
				}
				break;
		}
		currentEditingArticleId = "";
	});
});

// toggling the add forms (cancel button)
editCancelFormBtns.forEach((editCancelFormBtn) => {
	editCancelFormBtn.addEventListener("click", (e) => {
		//check which form is clicked on
		const editFormParentNode = e.target.parentNode.parentNode;

		switch (editFormParentNode) {
			case editFormAccounts:
				editAccountName.value = "";
				editAccountAmt.value = "";
				editFormAccounts.classList.toggle("editFormHide");
				break;
			case editFormDebts:
				editDebtName.value = "";
				editDebtAmt.value = "";
				editFormDebts.classList.toggle("editFormHide");
				break;
			case editFormExpenses:
				editExpenseName.value = "";
				editExpenseAmt.value = "";
				editFormExpenses.classList.toggle("editFormHide");
				break;
			case editFormIncomes:
				editIncomeName.value = "";
				editIncomeAmt.value = "";
				editFormIncomes.classList.toggle("editFormHide");
				break;
		}
	});
});

// updating UI
function updateUI(id, name, amt) {
	const editedArticle = document.getElementById(id);
	const editedArticleH3 = editedArticle.querySelector("h3");
	const editedArticleP = editedArticle.querySelector("p");
	editedArticleH3.textContent = name;
	editedArticleP.textContent = `$${amt}`;
}

const sections = document.querySelectorAll(".section");

// get the data, make articles, append accordingly to dom
function updateAllUI() {
	const totalArticles = Object.values(state).reduce((length, key) => length + key.length, 0);
	// need to loop over sections and then articles to create articles, etc
	if (totalArticles == 0) {
		return;
	}
	const articles = Object.entries(state).reduce((articles, prop) => {
		if (prop[1].length > 0) {
			let newArr = prop[1].map((article) => {
				return { ...article, sectionClassName: prop[0] };
			});
			articles.push(...newArr);
			return articles;
		}
		return articles;
		// loop over the objs in prop[1] and fill sectionclassname in there, right?
		// make right data structure, array with objects
		// create articles -> get all info, then loop over, in right order...
	}, []);
	if (articles) {
		articles.map((article) => {
			const { id, articleName, articleAmt, sectionClassName, checked } = article;
			switch (sectionClassName) {
				case switchConditionals.account:
					addFormAccounts.before(
						createArticle(id, sectionClassName, articleName, articleAmt, checked)
					);
					break;
				case switchConditionals.debt:
					addFormDebts.before(
						createArticle(id, sectionClassName, articleName, articleAmt, checked)
					);
					break;
				case switchConditionals.expense:
					addFormExpenses.before(
						createArticle(id, sectionClassName, articleName, articleAmt, checked)
					);
					break;
				case switchConditionals.income:
					addFormIncomes.before(
						createArticle(id, sectionClassName, articleName, articleAmt, checked)
					);
					break;
			}
		});
	}
}

// updating net amount

const netAmount = document.querySelector(".netAmount > p");

function updateNetAmount() {
	// check for all checked articles in every single section
	// add and subtract them based on the section they are from
	// accounts - debts - expenses + incomes
	// get articles from all four of these also

	let _netAmount = Object.entries(state).reduce((totalAmt, section) => {
		let sectionName = section[0];
		let articles = section[1];
		switch (sectionName) {
			case "account":
				totalAmt += articles.reduce((sectionAmt, article) => {
					if (article.checked) {
						sectionAmt += Number(article.articleAmt);
					}
					return sectionAmt;
				}, 0);
				break;
			case "debt":
				totalAmt += articles.reduce((sectionAmt, article) => {
					if (article.checked) {
						sectionAmt -= Number(article.articleAmt);
					}
					return sectionAmt;
				}, 0);
				break;
			case "expense":
				totalAmt += articles.reduce((sectionAmt, article) => {
					if (article.checked) {
						sectionAmt -= Number(article.articleAmt);
					}
					return sectionAmt;
				}, 0);
				break;
			case "income":
				totalAmt += articles.reduce((sectionAmt, article) => {
					if (article.checked) {
						sectionAmt += Number(article.articleAmt);
					}
					return sectionAmt;
				}, 0);
				break;
		}
		return totalAmt;
	}, 0);
	netAmount.textContent = `$${_netAmount.toFixed(2)}`;
}

function updateLocalStorage(state) {
	localStorage.setItem("budgetly-state", JSON.stringify(state));
}

function articleReducer(action, section, article) {
	switch (action) {
		case "add":
			state[section].push(article);
			break;
		case "delete":
			state[section] = state[section].filter((_article) => _article.id !== article.id);
			break;
		case "edit":
			state[section] = state[section].map((_article) => {
				if (_article.id === article.id) {
					return {
						..._article,
						articleName: article.editName,
						articleAmt: article.editAmt,
					};
				}
				return _article;
			});
			break;
		case "check":
			state[section] = state[section].map((_article) => {
				if (_article.id === article.id) {
					return {
						..._article,
						checked: !_article.checked,
					};
				}
				return _article;
			});
			break;
	}
	updateLocalStorage(state);
	updateNetAmount();
}

// calculating UI & net amount on load with stored state
updateAllUI();
updateNetAmount();
