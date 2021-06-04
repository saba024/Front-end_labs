let dictionary = {
        'greet': {
            'en': 'To start with splitapp firts sign in',
            'ru': 'Для того чтобы начать работу необходимо авторизоваться'
        },

        'login': {
            'en': 'Sign in',
            'ru': 'Логин'  
        },

        'income': {
            'en': 'Income',
            'ru': 'Расходы'  
        },

        'debts': {
            'en': 'Debts',
            'ru': 'Долги'  
        },

        'expenses': {
            'en': 'Expenses',
            'ru': 'Затраты'  
        },

        'members': {
            'en': 'Members',
            'ru': 'Участники'  
        },

        'activity': {
            'en': 'Activity',
            'ru': "Активность"
        },

        'add_expense': {
            'en': 'Add Expense',
            'ru': "Добавить Затраты"
        },

        'add_member': {
            'en': "Add Member",
            'ru': "Добавить участника"
        },

        'recent_activity': {
            'en': "Recent activity",
            'ru': "Недавняя активность"
        },
};
let langs = ['en', 'ru'];
let current_lang_index = 0;
let current_lang = langs[current_lang_index];

window.change_lang = function() {
    current_lang_index = ++current_lang_index % 2;
    current_lang = langs[current_lang_index];
    translate();
}

function translate() {
    $("[data-translate]").each(function(){
        let key = $(this).data('translate');
        $(this).html(dictionary[key][current_lang] || "N/A");
    });
}

translate();