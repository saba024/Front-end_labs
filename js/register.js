async function registerUser(){
	let is_valid = []

	let username_field = document.getElementById("username")
	let username = username_field.value
	if (username.trim() === "") 
	{
		return;
	}

	console.log(username);

	is_valid.push("name_is_valid")
	localStorage.setItem("is_valid", JSON.stringify(is_valid));

	let login_field = document.getElementById("login")
	let login = login_field.value
	if (login.trim() === "") 
	{
		return;
	}


	is_valid.push("login_is_valid")
	localStorage.setItem("is_valid", JSON.stringify(is_valid));

	let password_field = document.getElementById("password")
	let password = password_field.value
	if (password.trim() === "") 
	{
		return;
	}
		
	is_valid.push("password_is_valid")
	localStorage.setItem("is_valid", JSON.stringify(is_valid));

	let group_name_field = document.getElementById("group_name")
	let group_name = group_name_field.value
	if (group_name.trim() === "") 
	{
		return;
	}
		
	is_valid.push("group_name_is_valid")
	localStorage.setItem("is_valid", JSON.stringify(is_valid));
	let users = JSON.parse(localStorage.getItem("users"));
	let groups = JSON.parse(localStorage.getItem("group"));
	if (users === null) 
	{
		users = []
	}
	if (groups === null) 
	{
		groups = []
	}
	let members = []
	let expenses = []
	let debts =[]

	is_valid.push("valid_check")
    localStorage.setItem("is_valid", JSON.stringify(is_valid));
    let id = 0
    if (users.length > 0){
    	id = users[users.length - 1].id + 1
	}
    let id_group = 0
    if (groups.length > 0) 
    {
    	id_group = groups[groups.length - 1].id + 1
    }

    localStorage.setItem("current_group_id", JSON.stringify(id_group));

    let user = new User(id, username, password, login, 0);
    let member = new Member(0, username, 0, 0);
    members.push(member)
    let group = new Group(id_group, group_name, expenses, debts, members);
    groups.push(group)
    is_valid.push("is_valid_create")
	localStorage.setItem("is_valid", JSON.stringify(is_valid));

	users.push(user)
	is_valid.push("is_valid_add")

	let budget_income = 0
    let budget_expenses = 0
    localStorage.setItem("budget_income", JSON.stringify(budget_income));
    localStorage.setItem("budget_expenses", JSON.stringify(budget_expenses));

	localStorage.setItem("is_valid", JSON.stringify(is_valid));
	localStorage.setItem("users", JSON.stringify(users));
	//localStorage.setItem("current_group_id", JSON.stringify(id_group));
	localStorage.setItem("group", JSON.stringify(groups));
	localStorage.setItem("current_user", JSON.stringify(username));
}

let user = JSON.parse(localStorage.getItem("current_user"))
console.log("Hello", user)
let current_group_id = JSON.parse(localStorage.getItem("current_group_id"))
console.log("group_id", current_group_id)
let is_valid = JSON.parse(localStorage.getItem("is_valid"))
console.log("IS_VALID", status)



