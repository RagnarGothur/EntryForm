/*TODO: more comments, refactoring*/
//PS. Некоторые простые случаи валидации зашил в html, e.g. для ДНЯ рождения: value min="1" max="31"

const MAX_FIRST_NAME = 10;
const MAX_LAST_NAME = 15;
const MSG_VALUE_TOO_LONG = "Значение слишком длинное";
const MSG_VALUE_EMPTY = "Значение не может быть пустым";
const MSG_VALUE_INVALID = "Неверное значение";
const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const firstName = document.getElementById("rf-input-first-name");
//проверяем уход фокуса с инпута имени и сообщаем об ошибке, если оставлен пустым
firstName.addEventListener("focusout", function (event) {
    let val = (String)(firstName.value);
    if (val.length === 0) {
        firstName.setCustomValidity(MSG_VALUE_EMPTY);
    }
})
//валидируем введённое имя
firstName.addEventListener("input", function (event) {
    let val = (String)(firstName.value);
    if (val.length > MAX_FIRST_NAME) {
        firstName.setCustomValidity(MSG_VALUE_TOO_LONG);
    }
    else {
        firstName.setCustomValidity("");
    }
})

const lastName = document.getElementById("rf-input-last-name");
//проверяем уход фокуса с инпута фамилии и сообщаем об ошибке, если оставлен пустым
lastName.addEventListener("focusout", function (event) {
    let val = (String)(lastName.value);
    if (val.length === 0) {
        lastName.setCustomValidity(MSG_VALUE_EMPTY);
    }
})
//валидируем введённую фамилию
lastName.addEventListener("input", function (event) {
    let val = (String)(lastName.value);
    if (val.length > MAX_LAST_NAME) {
        lastName.setCustomValidity(MSG_VALUE_TOO_LONG);
        return;
    }
    else {
        lastName.setCustomValidity("");
    }
})

const birthDay = document.getElementById("rf-birth-day");
birthDay.addEventListener("focusout", (event) => validateBirthDay())
//валидируем введённый ДЕНЬ рождения и проверяем консистентность получившейся даты рождения
birthDay.addEventListener("input", function (event) {
    if (validateBirthDay()) {
        validateBirthDate();
    }
})


function validateBirthDay() {
    let val = (String)(birthDay.value);
    if (val.length === 0) {
        birthDay.setCustomValidity(MSG_VALUE_EMPTY);
        return false;
    }

    return true;
}

//Достаём Месяц рождения. P.S. у селекта месяцев стоит onchange="validateBirthDate();"
const birthMonth = document.getElementById("rf-birth-month");

const birthYear = document.getElementById("rf-birth-year");
birthYear.addEventListener("focusout", (event) => validateBirthYear())
//валидируем введённый ГОД рождения и проверяем консистентность получившейся даты рождения
birthYear.addEventListener("input", function (event) {
    if (validateBirthYear()) {
        validateBirthDate();
    }
})

function validateBirthYear() {
    let val = (String)(birthYear.value);
    if (val.length === 0) {
        birthYear.setCustomValidity(MSG_VALUE_EMPTY);
        return false;
    }

    return true;
}

//Валидируем введённые данные как дату рождения
function validateBirthDate() {
    try {
        var day = parseInt((String)(birthDay.value));
        var month = parseInt(birthMonth.value);
        var year = parseInt((String)(birthYear.value));
    }
    catch (e) {
        console.log(e);
        invalidBirth(MSG_VALUE_INVALID);
        return false;
    }

    if (!isBirthDateConsistant(year, month, day)) {
        invalidBirth(MSG_VALUE_INVALID);
        return false;
    }

    let birthDate = new Date(year, month, day);
    let currentDate = new Date();

    //Проводим наивную проверку, что birthDate не в будущем относительно даты сервера
    if (birthDate > currentDate) {
        invalidBirth(MSG_VALUE_INVALID);
        return false;
    }

    validBirth();
    return true;
}

//Проверяем дату рождения на консистентность
function isBirthDateConsistant(year, month, day) {
    let daysInMonth = DAYS_IN_MONTH[month];
    if (day > daysInMonth) {
        //февраль
        if (day === 29) {
            return isLeapYear(year)
        }

        return false;
    }

    return true;
}

//Проверка на високосность года
function isLeapYear(year) { 
    if (year % 4 === 0) {
        if (year % 100 === 0) {
            return year % 400 === 0 ? true : false;
        }

        return true;
    }
    
    return false;
}

//Ставим всю дату рождения в невалидное состояние
function invalidBirth(msg) {
    birthYear.setCustomValidity(msg);
    birthMonth.setCustomValidity(msg);
    birthDay.setCustomValidity(msg);
}

//Ставим всю дату рождения в валидное состояние
function validBirth() {
    birthYear.setCustomValidity("");
    birthMonth.setCustomValidity("");
    birthDay.setCustomValidity("");
}
