function add_expense(){

	let members = []
	let expenses = []
	let debts = []

	members = JSON.parse(localStorage.getItem("members"))
	expenses = JSON.parse(localStorage.getItem("expenses"))
	debts = JSON.parse(localStorage.getItem("debts"))
	let current_user = JSON.parse(localStorage.getItem("current_user"))

	let edit_index = JSON.parse(localStorage.getItem("edit_id"))

	let budget_income_field = document.getElementById("budget_income")
	let budget_expenses_field = document.getElementById("budget_expenses")

	let budget_income = parseInt(JSON.parse(localStorage.getItem("budget_income")))
	let budget_expenses = parseInt(JSON.parse(localStorage.getItem("budget_expenses")))


	let id = expenses[expenses.length - 1].id + 1
	let id_debt = debts[debts.length - 1].id + 1

	let sel=document.getElementById('member-select').selectedIndex;
	let options=document.getElementById('member-select').options;

	let name = options[sel].text

	let amount_field = document.getElementById("amount")
	let amount = parseInt(amount_field.value)

	if(amount == null && edit_index != ""){
		amount = expenses[edit_index].amount
	}

	let concept_field = document.getElementById("concept")
	let concept = concept_field.value

	if(concept == null && edit_index != ""){
		concept = expenses[edit_index].amount
	}

	let sel_category=document.getElementById('category-select').selectedIndex;
	let options_category=document.getElementById('category-select').options;

	let category = options_category[sel_category].text

	let split_users = []
	let debt_amount = []
	let sum = 0
	let rad = document.getElementsByClassName("radio__input")
	for (let i = 0;i < rad.length; i++) {
    	if (rad[i].checked) {
      		//alert('Выбран ' + i+' radiobutton');
      		split_users.push(members[i].name)
      		members[i].budget = members[i].budget - parseInt(document.getElementById("input_" + i).value)
      		debt_amount.push(parseInt(document.getElementById("input_" + i).value))
      		sum = sum + parseInt(document.getElementById("input_" + i).value) 
    	}
  	}

  	console.log("split_users", split_users)
  	console.log("debt_amount", debt_amount)

  	let getFileUrl = JSON.parse(localStorage.getItem("uploadedUrl"));
  	let receipt = getFileUrl
    if(getFileUrl === ""){
    	receipt = "./receipt"
    	console.log("file is empty")
    }else {
        receipt = getFileUrl
        localStorage.setItem("uploadedUrl", JSON.stringify(""));
    }
  	

  	if (sum != amount)
  	{
  		console.log(sum)
  		alert("the inputs are more or less then amount")
  	}

  	else{
  		let expense = new Expense(id, name, amount, concept, category, split_users, receipt)
  		expenses.push(expense)
  		let counter = false
  		for (let i = 0; i < split_users.length; i++){
  			for (let d of debts){
  				let j = 0
  				if (d.name == split_users[i] && d.nameto == name) {
  					debts[d.id].amount = debts[d.id].amount + debt_amount[i]
  					counter = true
  				}
  				j = j + 1
  			}

  			if (!counter) 
  			{
  				let debt = new Debt(id_debt, split_users[i], name, debt_amount[i])
  				debts.push(debt)
  			}
  			
  			if (split_users[i] == current_user)
  			{
  				budget_expenses += parseInt(document.getElementById("input_" + i).value)
  			}

  			counter = false	
  		}

	  	if (name == current_user) 
	  	{
	  		budget_income += amount
	  	}

	  	for (let j = 0; j < members.length; j++){
	  		if (members[j].name == name) {
	  			members[j].budget += amount
	  			members[j].spent += amount
	  		}
	  	}		
  	}

  	localStorage.setItem("expenses", JSON.stringify(expenses));
	localStorage.setItem("debts", JSON.stringify(debts));
	localStorage.setItem("members", JSON.stringify(members));
	localStorage.setItem("budget_income", JSON.stringify(budget_income));
  	localStorage.setItem("budget_expenses", JSON.stringify(budget_expenses));
  	localStorage.setItem("edit_id", JSON.stringify(""));
  	window.location.href = "./main.html"
}

let save_image_button = document.getElementById("add_file")

save_image_button.addEventListener('click', function(){
	let selectedFile = document.getElementById('myFile').files[0]
    //if (!selectedFile.type.startsWith('image/')){ return }
    const reader = new FileReader();
    reader.onloadend = () => {
        const base64String = reader.result
        console.log("we save base64", base64String)
        localStorage.setItem("uploadedUrl", JSON.stringify(base64String));
    };
    reader.readAsDataURL(selectedFile);
});

function delete_expense(ind){
	let expenses = []
	let debts = []
	let members = []
	console.log("index",ind)
	index = parseInt(ind)

	members = JSON.parse(localStorage.getItem("members"))
	expenses = JSON.parse(localStorage.getItem("expenses"))
	debts = JSON.parse(localStorage.getItem("debts"))
	let current_user = JSON.parse(localStorage.getItem("current_user"))
	let budget_income = JSON.parse(localStorage.getItem("budget_income"))
	let budget_expenses = JSON.parse(localStorage.getItem("budget_expenses"))
	for (let i = 0; i < debts.length; i++){
		if(expenses[index].users.includes(debts[i].name) && debts[i].nameto == expenses[index].name)
		{
			debts[i].amount -= parseInt(expenses[index].amount)
		}
	}

	for (let i = 0; i < members.length; i++)
	{
		if (members[i].name == expenses[index].who_paid){
			members[i].spent = members[i].spent - parseInt(expenses[index].amount)
			members[i].budget = members[i].budget - parseInt(expenses[index].amount)
		}
	}

	
	if (expenses[index].who_paid == current_user)
	{
		budget_income = budget_income - parseInt(expenses[index].amount)	
	}

	if(expenses[index].users.includes(current_user))
	{
		budget_expenses -= expenses[index].amount
	}

	expenses.splice(expenses.indexOf(expenses[index]), 1)
	localStorage.setItem("expenses", JSON.stringify(expenses));
	localStorage.setItem("debts", JSON.stringify(debts));
	localStorage.setItem("budget_income", JSON.stringify(budget_income));
	localStorage.setItem("budget_expenses", JSON.stringify(budget_expenses));
	localStorage.setItem("members", JSON.stringify(members));
	window.location.href = "./main.html"
}

function add_member(){
	let members = []
	members = JSON.parse(localStorage.getItem("members"))
	let member_field = document.getElementById("member_input")
	let member = member_field.value
	let id_member = members[members.length - 1].id + 1
	let new_member = new Member(id_member, member, 0, 0)
	members.push(new_member)
	localStorage.setItem("members", JSON.stringify(members));
	window.location.href = "./main.html"
}

function setle_debt(ind){
	let debt_index = parseInt(ind[0])
	console.log("index", debt_index)
	let debts = []
	let members = []
	members = JSON.parse(localStorage.getItem("members"))
	debts = JSON.parse(localStorage.getItem("debts"))
	let current_user = JSON.parse(localStorage.getItem("current_user"))
	let budget_income = JSON.parse(localStorage.getItem("budget_income"))
	let budget_expenses = JSON.parse(localStorage.getItem("budget_expenses"))

	for(let i = 0; i < members.length; i++){
		if (members[i].name === debts[debt_index].name) {
			members[i].budget += debts[debt_index].amount
		}

		if (members[i].name === debts[debt_index].nameto) {
			members[i].budget -= debts[debt_index].amount
		}
	}

	if (debts[debt_index].name == current_user){
		budget_expenses -= debts[debt_index].amount
	}

	if (debts[debt_index].nameto == current_user) 
	{
		budget_income -= debts[debt_index].amount
	}

	debts.splice(debts.indexOf(debts[debt_index]), 1)
	console.log("new_members", members)
	console.log("budget_income", budget_income)
	console.log("budget_expenses", budget_expenses)
	localStorage.setItem("debts", JSON.stringify(debts));
	localStorage.setItem("budget_income", JSON.stringify(budget_income));
	localStorage.setItem("budget_expenses", JSON.stringify(budget_expenses));
	localStorage.setItem("members", JSON.stringify(members));
	window.location.href = "./main.html"
}

function delete_member(index){
	let member_index = parseInt(index[0])
	let members = []
	let expenses = []

	members = JSON.parse(localStorage.getItem("members"))
	expenses = JSON.parse(localStorage.getItem("expenses"))
	let delete_mem = false

	for(expense of expenses)
	{
		if (expense.users.includes(members[member_index].name) || expense.who_paid.includes(members[member_index].name)) 
		{
			delete_mem = true
			alert("Member can not be deleted because it is used in expenses")
			break;
		}
	}

	if (!delete_mem){
		members.splice(members.indexOf(members[member_index]), 1)
	}

	localStorage.setItem("members", JSON.stringify(members));

}


let add_expense_button = document.getElementById("save_expense")
let add_member_button = document.getElementById("save_member")

add_expense_button.addEventListener('click', add_expense);
add_member_button.addEventListener('click', add_member);
