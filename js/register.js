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

	let users = JSON.parse(localStorage.getItem("users"));
	let members = JSON.parse(localStorage.getItem("members"));

	is_valid.push("valid_check")
    localStorage.setItem("is_valid", JSON.stringify(is_valid));

    let id = users[users.length - 1].id + 1
    let id_member = members[members.length - 1].id + 1

    let user = new User(id, username, password, login, 0);
    let member = new Member(id, username, 0, 0);
    is_valid.push("is_valid_create")
	localStorage.setItem("is_valid", JSON.stringify(is_valid));

	users.push(user)
	members.push(member)
	is_valid.push("is_valid_add")

	localStorage.setItem("is_valid", JSON.stringify(is_valid));
	localStorage.setItem("users", JSON.stringify(users));
	localStorage.setItem("members", JSON.stringify(members));
	localStorage.setItem("current_user", JSON.stringify(username));
}

let user = JSON.parse(localStorage.getItem("current_user"))
console.log("Hello", user)
let is_valid = JSON.parse(localStorage.getItem("is_valid"))
console.log("IS_VALID", status)



