const MSG_VALUE_TOO_LONG = "Значение слишком длинное";
const MSG_VALUE_EMPTY = "Значение не может быть пустым";
const MSG_VALUE_INVALID = "Неверное значение";
// связка индексов месяцев с количеством дней в месяце, где: 0 - январь, 1 - февраль, ..., 11 - декабрь
const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const KEY_USERS_LIST = "usersList";
let Name, BirthDate, Locality;

window.onload = init;

function init() {
    Name = {
        all: document.getElementsByClassName("rf-name-item"),
        first: document.getElementById("rf-input-first-name"),
        last: document.getElementById("rf-input-last-name"),
    }

    BirthDate = {
        all: document.getElementsByClassName("rf-birth-item"),
        day: document.getElementById("rf-birth-day"),
        month: document.getElementById("rf-birth-month"),
        year: document.getElementById("rf-birth-year"),

        toString: function () {
            return `${this.year.value}.${parseInt(this.month.value) + 1}.${this.day.value}`;
        }
    }

    Locality = {
        city: document.getElementById("rf-city")
    }

    registerEventListeners();
}

function registerEventListeners() {
    Array.from(BirthDate.all).forEach(function (element) {
        element.addEventListener("input", validateBirthDate);
    });

    Array.from(Name.all).forEach(function (element) {
        element.addEventListener("input", function () {
            return validateNotEmpty(element);
        });
    });

    let registrationForm = document.getElementById("rf");
    registrationForm.onsubmit = sendForm;
}

//"Отправка" формы
function sendForm() {
    try {
        if ((validateBirthDate() && validateName())) {
            updateUsersList();
            window.location.reload();
        }

        return false;
    }
    catch (e) {
        console.error(e);
    }
}

//Обновляет информацию о созданных пользователях в локальном хранилище, добавляя только что созданного
function updateUsersList() {
    let storedUsersList = JSON.parse(localStorage.getItem(KEY_USERS_LIST) ?? "[]");
    let usersList = [];
    for (let i in storedUsersList) {
        usersList.push(storedUsersList[i]);
    }

    //Предполагается, что идентификаторы ∈ {0, ..., usersList.length - 1}
    let id = usersList.length > 0 ? usersList.length : 0;

    let user = JSON.stringify(
        { id: id, firstName: Name.first.value, lastName: Name.last.value, birth: BirthDate.toString(), city: Locality.city.value }
    );

    usersList.push(user);
    localStorage.setItem(KEY_USERS_LIST, JSON.stringify(usersList));
}

//Валидируем дату рождения, true - валидна, false - невалидна
function validateBirthDate() {
    setBirthValidState();
    //Проверяем каждый элемент даты рождения на заполненность. Помечаем невалидными только пустые элементы
    let noEmpty = true;
    for (let i = 0; i < BirthDate.all.length; i++) {
        let birthElem = BirthDate.all[i]

        //noEmpty &&= validateNotEmpty(BirthDate.all[i]); Оператор ленивый - вычислять второй операнд не будет, если noEmpty уже false
        let e = validateNotEmpty(birthElem);
        noEmpty &&= e;
    }

    //Если есть незаполненные элементы, то дальнейшие проверки лишены смысла по ТЗ
    if (!noEmpty) {
        return false;
    }

    //Проверяем, что введённые данные являются валидными цифрами
    try {
        var day = parseInt(BirthDate.day.value);
        var month = parseInt(BirthDate.month.value);
        var year = parseInt(BirthDate.year.value);
    }
    catch (e) {
        console.error(e);
        setBirthValidState(MSG_VALUE_INVALID);
        return false;
    }

    //Проверяем консистентность данных, ведь нам не нужно 31 февраля, верно ? :)
    if (!isBirthDateConsistent(year, month, day)) {
        setBirthValidState(MSG_VALUE_INVALID);
        return false;
    }

    let birthDate = new Date(year, month, day);
    let currentDate = new Date();

    //Проводим наивную проверку, что birthDate не в будущем относительно даты окружения
    //На самом деле здесь должна быть проверка на соответствие ДР пользователя политике компании по минимальному возрасту пользователей
    if (birthDate > currentDate) {
        setBirthValidState(MSG_VALUE_INVALID);
        return false;
    }

    //Ура! Дата рождения прошла проверки на валидность!
    setBirthValidState();
    return true;
}

//Валидация элементов имени, true валидны, false - невалидны
function validateName() {
    let noEmpty = true;
    for (let i = 0; i < Name.all.length; i++) {
        let nameElem = Name.all[i];

        //noEmpty &&= validateNotEmpty(nameElem); Оператор ленивый - вычислять второй операнд не будет, если noEmpty уже false
        let e = validateNotEmpty(nameElem);
        noEmpty &&= e;
    }

    return noEmpty;
}

//Проверка значения элемента на заполненность, true - заполнен, false - незаполнен
function validateNotEmpty(elem) {
    if (elem.value.length === 0) {
        elem.setCustomValidity(MSG_VALUE_EMPTY);
        return false;
    }
    else {
        elem.setCustomValidity("");
        return true;
    }
}

//Проверка даты рождения на консистентность
function isBirthDateConsistent(year, month, day) {
    let daysInMonth = DAYS_IN_MONTH[month];
    if (day > daysInMonth) {
        if (day === 29) { //Февраль
            return isLeapYear(year)
        }

        return false;
    }

    return true;
}

//Проверка на високосность года. Правила високосности года можете загуглить :)
function isLeapYear(year) {
    if (year % 4 === 0) {
        if (year % 100 === 0) {
            return year % 400 === 0 ? true : false;
        }

        return true;
    }

    return false;
}

//Выставляет всей дате рождения определённое состояние валидности
function setBirthValidState(msg = "") {
    for (let i = 0; i < BirthDate.all.length; i++) {
        let birthElem = BirthDate.all[i];
        birthElem.setCustomValidity(msg);
    }
}
