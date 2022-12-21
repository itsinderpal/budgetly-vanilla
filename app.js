const addBtns = document.querySelectorAll(".btn-primary");

const addFormAccounts = document.querySelector(".addFormAccounts");
const addFormDebts = document.querySelector(".addFormDebts");
const addFormExpenses = document.querySelector(".addFormExpenses");
const addFormIncomes = document.querySelector(".addFormIncomes");

const editFormAccounts = document.querySelector(".editFormAccounts");
const editFormDebts = document.querySelector(".editFormDebts");
const editFormExpenses = document.querySelector(".editFormExpenses");
const editFormIncomes = document.querySelector(".editFormIncomes");

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
				// clearInputValues();
				addFormAccounts.classList.toggle("addFormHide");
		}
	});
});

// main add form inputs
const addAccountName = document.getElementById("addAccountName");
const addAccountAmt = document.getElementById("addAccountAmt");

function clearInputValues() {
	addAccountName.value = "";
	addAccountAmt.value = "";
}

// add form buttons
const addFormBtn = document.querySelector(".addFormBtn"); // for every single add button on add forms
const addCancelFormBtn = document.querySelector(".addCancelFormBtn"); // for every single cancel button on add forms

// adding article for every section
addFormBtn.addEventListener("click", (e) => {
	//check which form is clicked on
	const addFormParentNode = e.target.parentNode.parentNode;

	switch (addFormParentNode) {
		case addFormAccounts:
			const isNotEmptyForm = checkEmptyAddForm(addAccountName, addAccountAmt);

			if (isNotEmptyForm) {
				const articleId = Math.random().toString(36).slice(2, 9);
				const articleEl = createArticle(articleId, "Account", addAccountName, addAccountAmt);

				let newArticleObj = {
					id: articleId,
					articleName: addAccountName.value,
					articleAmt: addAccountAmt.value,
					checked: false,
				};
				articleReducer("add", "account", newArticleObj);
				addFormAccounts.before(articleEl);
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
function createArticle(id, sectionClassName, _articleName, _articleAmt) {
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
	articleName.textContent = _articleName.value;
	const articleAmt = document.createElement("p");
	articleAmt.textContent = `$${_articleAmt.value}`; // need to set "-" ahead of negative value

	article.appendChild(firstDiv);
	article.appendChild(articleName);
	article.appendChild(articleAmt);

	return article;
}

// toggling the add forms (cancel button)
addCancelFormBtn.addEventListener("click", (e) => {
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

// selected main for bubbling and event propagation
const main = document.querySelector("main");

let currentEditingArticleId;

// editing & deleting articles
main.addEventListener("click", (e) => {
	if (e.target.closest(".delArticleBtn")) {
		const articleId = e.target.getAttribute("id");
		const parentArticle = e.target.parentNode.parentNode.parentNode;
		const articleSection = parentArticle.className;
		articleReducer("delete", articleSection, { id: articleId });
		parentArticle.remove();
	}
	if (e.target.closest(".editArticleBtn")) {
		const parentArticle = e.target.parentNode.parentNode.parentNode;
		const articleSection = parentArticle.className;
		const articleId = e.target.getAttribute("id");
		currentEditingArticleId = articleId;
		const article = state[articleSection].find((_article) => `edit${_article.id}` === articleId);
		toggleEditForm(articleSection, article.articleName, article.articleAmt);
	}
});

// main edit form inputs
const editAccountName = document.getElementById("editAccountName");
const editAccountAmt = document.getElementById("editAccountAmt");

// need to make a new edit form in html and then make it toggle and then click edit btn and then change the state
function toggleEditForm(section, name, amt) {
	switch (section) {
		case "account":
			editFormAccounts.classList.toggle("editFormHide");
			editAccountName.value = name;
			editAccountAmt.value = amt;
	}
}

// edit form buttons
const editFormBtn = document.querySelector(".editFormBtn"); // for every single add button on edit forms
const editCancelFormBtn = document.querySelector(".editCancelFormBtn"); // for every single cancel button on edit forms

// editing article for every section
editFormBtn.addEventListener("click", (e) => {
	//check which form is clicked on
	const editFormParentNode = e.target.parentNode.parentNode;

	switch (editFormParentNode) {
		case editFormAccounts:
			const isNotEmptyForm = checkEmptyAddForm(editAccountName, editAccountAmt);

			if (isNotEmptyForm) {
				articleReducer("edit", "account", {
					id: currentEditingArticleId,
					editAccountName,
					editAccountAmt,
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
	}
});

// toggling the add forms (cancel button)
editCancelFormBtn.addEventListener("click", (e) => {
	//check which form is clicked on
	const editFormParentNode = e.target.parentNode.parentNode;

	switch (editFormParentNode) {
		case editFormAccounts:
			editAccountName.value = "";
			editAccountAmt.value = "";
			editFormAccounts.classList.toggle("editFormHide");
	}
});

// updating UI
function updateUI(id, name, amt) {
	const editedArticle = document.getElementById(id).parentNode.parentNode.parentNode;
	const editedArticleH3 = editedArticle.querySelector("h3");
	const editedArticleP = editedArticle.querySelector("p");
    editedArticleH3.textContent = name;
    editedArticleP.textContent = `$${amt}`;
}

function articleReducer(action, section, article) {
	let _section;
	switch (action) {
		case "add":
			_section = state[section];
			_section.push(article);
			break;
		case "delete":
			state[section] = state[section].filter((_article) => `del${_article.id}` !== article.id);
			break;
		case "edit":
			state[section] = state[section].map((_article) => {
				if (`del${_article.id}` !== article.id) {
					return {
						..._article,
						articleName: editAccountName.value,
						articleAmt: editAccountAmt.value,
					};
				}
				return _article;
			});
	}
}

// calculating net amount
