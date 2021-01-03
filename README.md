Сверстать форму для ввода персональных данных.
Форма должна содержать следующие поля:
1. Имя (текстовое)
2. Фамилия (текстовое)
3. Дата рождения (3 текстовых поля - ДД ММ ГГГГ)
4. Город (выпадающий список select)
И также кнопку отправки.

Сверстать блок для сообщений об ошибке или об успешной обработке формы, который по умолчанию скрыт.

Требование: идентичное отображение страницы в браузерах Chrome, Firefox, IE (10+).

Стили для формы подобрать похожими на сайт-образец:
vk.com
facebook.com
yandex.ru
yahoo.com
livejournal.com
live.com

Сделать валидацию формы средствами чистого JavaScript.

При изменении значения полей проверять:
  - не превышает ли длина имени 10 символов. Если превышает, то пометить поле красной рамкой. Если значение введено корректно, то красной рамки быть не должно.
  - не превышает ли длина фамилии 15 символов. Если превышает, то пометить поле красной рамкой. Если значение введено корректно, то красной рамки быть не должно.
  - корректно ли введена дата. Если некорректно, то пометить все три поля даты красной рамкой. 
Если какое-то из полей даты НЕ заполнено, то другие НЕ должны помечаться как ошибочные.

Сохранять пользователей для отображения в гриде.