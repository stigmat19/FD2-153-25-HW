// Константы
const STORAGE_KEY = 'drinksRecipes';

// DOM элементы
let output;

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    output = document.getElementById('output');
    initializeStorage();
});

// === Функции хранилища ===
function getDrinksFromStorage() {
    const drinksJSON = localStorage.getItem(STORAGE_KEY);
    return drinksJSON ? JSON.parse(drinksJSON) : {};
}

function saveDrinksToStorage(drinks) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(drinks));
}

function initializeStorage() {
    if (!localStorage.getItem(STORAGE_KEY)) {
        const sampleDrinks = {
            'Маргарита': {
                alcoholic: true,
                recipe: '1. Наполнить шейкер льдом\n2. Добавить 50 мл текилы, 25 мл апельсинового ликера, 25 мл сока лайма\n3. Встряхнуть шейкер 15 секунд\n4. Процедить в бокал\n5. Украсить долькой лайма и солью'
            },
            'Мохито': {
                alcoholic: true,
                recipe: '1. Мята, сахар, сок лайма\n2. Размять мадлером\n3. Лёд, ром, содовая\n4. Перемешать, украсить'
            },
            'Лимонад': {
                alcoholic: false,
                recipe: '1. Сок лимонов\n2. Сахар\n3. Вода\n4. Мята, лёд'
            },
            'Глинтвейн': {
                alcoholic: true,
                recipe: '1. Вино, апельсин, лимон\n2. Корица, гвоздика\n3. Подогреть, не кипятить\n4. Добавить мёд\n5. Процедить, подать горячим'
            },
            'Пина Колада': {
                alcoholic: true,
                recipe: '1. 50 мл рома\n2. 100 мл ананасового сока\n3. 50 мл кокосового молока\n4. Взбить в шейкере с льдом\n5. Украсить ананасом'
            },
            'Сангрия': {
                alcoholic: true,
                recipe: '1. Красное вино, фрукты\n2. Апельсиновый сок\n3. Немного бренди\n4. Охладить\n5. Подать с льдом'
            },
            'Клубничный смузи': {
                alcoholic: false,
                recipe: '1. Клубника, банан\n2. Йогурт или молоко\n3. Лёд\n4. Взбить в блендере\n5. Украсить ягодами'
            },
            'Айс латте': {
                alcoholic: false,
                recipe: '1. Эспрессо\n2. Молоко\n3. Лёд\n4. Перемешать\n5. Подать в высоком стакане'
            },
            'Имбирный чай': {
                alcoholic: false,
                recipe: '1. Нарезать имбирь\n2. Залить кипятком\n3. Добавить лимон и мёд\n4. Настоять 5 минут\n5. Подать горячим'
            },
            'Безалкогольная сангрия': {
                alcoholic: false,
                recipe: '1. Виноградный сок, фрукты\n2. Апельсиновый сок\n3. Газированная вода\n4. Охладить\n5. Подать с мятой'
            }
        };
        saveDrinksToStorage(sampleDrinks);
        alert('Добавлены примеры напитков в хранилище');
    }
}


// === Основные функции работы с напитками ===
function addDrink(name, alcoholic, recipe) {
    const drinks = getDrinksFromStorage();
    drinks[name] = { alcoholic, recipe };
    saveDrinksToStorage(drinks);
    return true;
}

function getDrink(name) {
    const drinks = getDrinksFromStorage();
    return drinks[name] || null;
}

function deleteDrink(name) {
    const drinks = getDrinksFromStorage();
    if (drinks[name]) {
        delete drinks[name];
        saveDrinksToStorage(drinks);
        return true;
    }
    return false;
}



function getAllDrinks() {
    return getDrinksFromStorage();
}

// === Функции интерфейса ===
function showAddDrinkForm() {
    output.innerHTML = `
        <div class="form-block">
            <h3>Добавление нового напитка</h3>
            <label>Название напитка:</label>
            <input type="text" id="drinkName" placeholder="Введите название">

            <label>Алкогольный напиток:</label>
            <select id="isAlcoholic">
                <option value="true">Да</option>
                <option value="false">Нет</option>
            </select>

            <label>Рецепт приготовления:</label>
            <textarea id="recipe" placeholder="Опишите рецепт..."></textarea>

            <div class="form-actions">
                <button onclick="handleAddDrink()">Сохранить</button>
                <button onclick="output.innerHTML = 'Выберите действие'">Отмена</button>
            </div>
        </div>
    `;
}

function handleAddDrink() {
    const name = document.getElementById('drinkName').value.trim();
    const alcoholic = document.getElementById('isAlcoholic').value === 'true';
    const recipe = document.getElementById('recipe').value.trim();

    if (!name || !recipe) {
        alert('Заполните все поля');
        return;
    }

    if (addDrink(name, alcoholic, recipe)) {
        displayDrinkInfo(name);
        alert(`Напиток "${name}" успешно добавлен`);
    }
}

function showGetDrinkForm() {
    output.innerHTML = `
        <div class="form-block">
            <h3>Поиск напитка</h3>
            <label for="searchName">Название напитка:</label>
            <input type="text" id="searchName" placeholder="Введите название">

            <div class="form-actions" >
                <button onclick="handleGetDrink()">Найти</button>
                <button onclick="output.innerHTML = 'Выберите действие'">Отмена</button>
            </div>
        </div>
    `;

}

function handleGetDrink() {
    const name = document.getElementById('searchName').value.trim();
    if (!name) {
        alert('Введите название напитка');
        return;
    }
    displayDrinkInfo(name);
}


function showDeleteDrinkForm() {
    output.innerHTML = `
        <div class="form-block">
            <h3>Удаление напитка</h3>
            <label>Название напитка:</label>
            <input type="text" id="deleteName" placeholder="Введите название">

            <div class="form-actions">
                <button onclick="handleDeleteDrink()">Удалить</button>
                <button onclick="output.innerHTML = 'Выберите действие'">Отмена</button>
            </div>
        </div>
    `;
}


function handleDeleteDrink() {
    const name = document.getElementById('deleteName').value.trim();
    if (!name) {
        alert('Введите название напитка');
        return;
    }
    if (deleteDrink(name)) {
        output.innerHTML = `Напиток "${name}" успешно удален`;
        alert(`Напиток "${name}" удален`);
    } else {
        output.innerHTML = `Напиток "${name}" не найден`;
        alert(`Напиток "${name}" не найден`);
    }
}

function showAllDrinks() {
    const drinks = getAllDrinks();
    const drinkNames = Object.keys(drinks);

    if (drinkNames.length === 0) {
        output.innerHTML = 'В хранилище пока нет напитков';
        return;
    }

    let html = '<h3>Все напитки:</h3><ul>';
    drinkNames.forEach(name => {
        html += `<li><a href="javascript:displayDrinkInfo('${name}')">${name}</a></li>`;
    });
    html += '</ul>';
    output.innerHTML = html;
}

function displayDrinkInfo(name) {
    const drink = getDrink(name);
    if (!drink) {
        output.innerHTML = `Напиток "${name}" не найден`;
        return;
    }
    const alcoholText = drink.alcoholic ? 'да' : 'нет';
    output.innerHTML = `
        <div class="drink-card">
            <h3>${name}</h3>
            <p><strong>Алкогольный:</strong> ${alcoholText}</p>
            <p><strong>Рецепт приготовления:</strong></p>
            <div class="drink-recipe">${drink.recipe}</div>
            <button class="back-btn" onclick="showAllDrinks()">К списку напитков</button>
        </div>
    `;
}

