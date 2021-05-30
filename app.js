let modalBtn = document.querySelector('.add_expense');
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
	modalBg.classList.add('bg-active');
	tabs.classList.add('tabs_unactive');
	tabs2.classList.add('tabs_unactive');
	tabs3.classList.add('tabs_unactive');
	tabs4.classList.add('tabs_unactive');
});

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