async function LogIn(){
	let username_field = document.getElementById("username")
	let username = username_field.value
	if (username.trim() === "") 
	{
		return;
	}

	let password_field = document.getElementById("password")
	let password = password_field.value
	if (password.trim() === "") 
	{
		return;
	}

	let users = JSON.parse(localStorage.getItem("users"));

	for (user of users){
        if(user.name == username){
            if(user.password==password){
                localStorage.setItem("current_user", JSON.stringify(username));
                localStorage.setItem("current_group_id", JSON.stringify(user.id));
            }
            return
        }
    }
}