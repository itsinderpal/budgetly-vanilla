const addBtns = document.querySelectorAll(".addBtn");

const addFormAccounts = document.querySelector(".addFormAccounts");
const addFormDebts = document.querySelector(".addFormDebts");
const addFormExpenses = document.querySelector(".addFormExpenses");
const addFormIncomes = document.querySelector(".addFormIncomes");

// storage for articles we add:
// sections > articles

const state = {
	account: [],
	debt: [],
	expense: [],
	income: [],
};

// for toggling the add forms (add button)
addBtns.forEach((btn) => {
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
			const isNotEmptyForm = checkEmptyAddForm(addAccountName, addAccountAmt);

			let newArticleObj = {
				id: Math.random().toString(36).slice(2, 9),
				articleName: addAccountName.value,
				articleAmt: addAccountAmt.value,
				checked: false,
			};

			if (isNotEmptyForm) {
				addArticle("add", "account", newArticleObj);
				addFormAccounts.before(createArticle("Account", addAccountName, addAccountAmt));
			} else {
				setTimeout(() => {
					addAccountName.style.outline = "none";
					addAccountAmt.style.outline = "none";
				}, 2000);
			}
			break;
	}
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
	editSpan.className = `edit${sectionClassName}Btn`;
	editSpan.textContent = "E";
	const delSpan = document.createElement("span"); // need to work on these controls also
	delSpan.className = `del${sectionClassName}Btn`;
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
			addAccountName.value = "";
			addAccountAmt.value = "";
			addFormAccounts.classList.toggle("addFormHide");
	}
});

/*
next steps that we need to take:
- make data structures for collecting every article we add
- so that we can associate a id with them, add them to the structure
- can edit them easily and can pinpoint exactly where they are
- can delete them easily also
*/

function articleReducer(action, section, article) {
	switch (action) {
		case "add":
			const _section = state[section];
			_section.push(article);
	}
}
