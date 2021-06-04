let modalBtn = document.querySelector('.add_expense');
let editBtn = document.querySelector('.edit_expense')
let addmemberBtn = document.querySelector('.add_member');
let splitBtn = document.querySelector('.share_equally');
let tabs = document.querySelector('.tab_name');
let tabs2 = document.querySelector('.tab_name2');
let tabs3 = document.querySelector('.tab_name3');
let tabs4 = document.querySelector('.tab_name4');
let modalBg = document.querySelector('.modal-bg');
let modalBg1 = document.querySelector('.modal1-bg');
let splitmodal = document.querySelector('.split_modal')
let modalClose = document.querySelector('.modal-close');
let modal1Close = document.querySelector('.modal1-close');

modalBtn.addEventListener('click', function(){
	let current_group_id = JSON.parse(localStorage.getItem("current_group_id"))
	let groups = []
	groups = JSON.parse(localStorage.getItem("group"))
	console.log("current_group_id", current_group_id)
	let group_id = parseInt(current_group_id)
	let current_group = groups[group_id]
	console.log("current_group", current_group)    
	let members = current_group.members
	if (members.length < 2) 
	{
		alert("Add at least one member to add transaction")
		return;
	}
	modalBg.classList.add('bg-active');
	tabs.classList.add('tabs_unactive');
	tabs2.classList.add('tabs_unactive');
	tabs3.classList.add('tabs_unactive');
	tabs4.classList.add('tabs_unactive');
	fill_modal()
});

function edit_expense(ind){
	let edit_index = parseInt(ind[0])
	console.log("index", edit_index)
	modalBg.classList.add('bg-active');
	tabs.classList.add('tabs_unactive');
	tabs2.classList.add('tabs_unactive');
	tabs3.classList.add('tabs_unactive');
	tabs4.classList.add('tabs_unactive');
	fill_edit_modal(edit_index)
}

function edit_member(ind){
	let edit_member_index = parseInt(ind[0])
	let current_group_id = JSON.parse(localStorage.getItem("current_group_id"))
	let groups = []
	groups = JSON.parse(localStorage.getItem("group"))
	console.log("current_group_id", current_group_id)
	let group_id = parseInt(current_group_id)
	let current_group = groups[group_id]
	console.log("current_group", current_group)    
	let members = current_group.members

	let member_input = document.getElementById("member_input")
	member_input.setAttribute("placeholder", members[edit_member_index].name)
	modalBg1.classList.add('bg1-active');
	tabs.classList.add('tabs_unactive');
	tabs2.classList.add('tabs_unactive');
	tabs3.classList.add('tabs_unactive');
	tabs4.classList.add('tabs_unactive');

}

splitBtn.addEventListener('click', function(){
	splitmodal.classList.add('bg2-active')
});

modalClose.addEventListener('click', function(){
	modalBg.classList.remove('bg-active');
	tabs.classList.remove('tabs_unactive');
	tabs2.classList.remove('tabs_unactive');
	tabs3.classList.remove('tabs_unactive');
	tabs4.classList.remove('tabs_unactive');
});

addmemberBtn.addEventListener('click', function(){
	modalBg1.classList.add('bg1-active');
	tabs.classList.add('tabs_unactive');
	tabs2.classList.add('tabs_unactive');
	tabs3.classList.add('tabs_unactive');
	tabs4.classList.add('tabs_unactive');
});

modal1Close.addEventListener('click', function(){
	modalBg1.classList.remove('bg1-active');
	tabs.classList.remove('tabs_unactive');
	tabs2.classList.remove('tabs_unactive');
	tabs3.classList.remove('tabs_unactive');
	tabs4.classList.remove('tabs_unactive');
});


function openOption(evt, optionName) {
  let i, tabs__block, tabs_item;

  tabs__block = document.getElementsByClassName("tabs__block");
  for (i = 0; i < tabs__block.length; i++) {
    tabs__block[i].style.display = "none";
  }

  tabs_item = document.getElementsByClassName("tabs_item");
  for (i = 0; i < tabs_item.length; i++) {
    tabs_item[i].className = tabs_item[i].className.replace(" active", "");
  }

  document.getElementById(optionName).style.display = "block";
  evt.currentTarget.className += " active";
}

function fill_modal(){

	let a = 0

	let current_group_id = JSON.parse(localStorage.getItem("current_group_id"))
	let groups = []
	groups = JSON.parse(localStorage.getItem("group"))
	console.log("current_group_id", current_group_id)
	let group_id = parseInt(current_group_id)
	let current_group = groups[group_id]
	console.log("current_group", current_group)    
	let expenses = current_group.expenses
	let debts = current_group.debts
	let members = current_group.members

	for (let member of members){
		let count = document.getElementById("member-select").childElementCount;
		if(count < members.length){
			let member_choice = document.createElement("option");
			member_choice.setAttribute("value", member.name);
			let t = document.createTextNode(member.name);
			member_choice.appendChild(t);
			document.getElementById("member-select").appendChild(member_choice);
		}


		let counter = document.getElementById("split_modal").childElementCount;

		if (counter < members.length + 3) {
			div_radio = document.createElement("div")
			div_radio.className = "radio"
			let x = document.createElement("INPUT");
	  	x.setAttribute("type", "checkbox");
	  	x.className = "radio__input"
	  	x.setAttribute("id", "radio_" + a);
	  	x.setAttribute("name", member.name);
	  	let label_input = document.createElement("label")
	  	label_input.className = "radio__label"
	  	label_input.textContent = member.name
	  	label_input.setAttribute("for", "radio_" + a)
	  	input_value = document.createElement("input")
	  	input_value.className = "am_input"
	  	input_value.setAttribute("type", "value");
	  	input_value.setAttribute("name", "amount_input");
	  	input_value.setAttribute("placeholder", "0$");
	  	input_value.setAttribute("id", "input_" + a);
	  	div_radio.appendChild(x)
	  	div_radio.appendChild(label_input)
	  	div_radio.appendChild(input_value)
	  	document.getElementById("split_modal").appendChild(div_radio);
  	}
  	a = a + 1
	}
}

function fill_edit_modal(index){

	let current_group_id = JSON.parse(localStorage.getItem("current_group_id"))
	let groups = []
	groups = JSON.parse(localStorage.getItem("group"))
	console.log("current_group_id", current_group_id)
	let group_id = parseInt(current_group_id)
	let current_group = groups[group_id]
	console.log("current_group", current_group)    
	let expenses = current_group.expenses
	console.log(expenses)
	console.log("index", index)
	let expense_amount = document.getElementById("amount")

	expense_amount.setAttribute("placeholder", expenses[index].amount)

	let concept_field = document.getElementById("concept")

	concept_field.setAttribute("placeholder", expenses[index].concept)

	fill_modal()

	localStorage.setItem("edit_id", JSON.stringify(index));
}
