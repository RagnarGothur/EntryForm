const CITIES = {
    msk: "Москва",
    spb: "Санкт-Петербург",
    nno: "Нижний Новгород",
    kaz: "Казань",
    ekb: "Екатеринбург",
    inn: "Иннополис",
    rga: "Рига",
    hel: "Хельсинки",
    kus: "Кушкек"
};

window.onload = function () {
    let dataToGrid = getData();

    jQuery(function () {
        jQuery("#users-list").jqGrid({
            datatype: "local",
            data: dataToGrid,
            colNames: ["ID", "Имя", "Фамилия", "Дата рождения", "Город"],
            colModel: [
                { name: "id", align: "center", sortable: true, sorttype: "int" },
                { name: "firstName", align: "center", sortable: true },
                { name: "lastName", align: "center", sortable: true },
                { name: "birth", align: "center", sortable: true, sorttype: "date" },
                { name: "city", align: "center", sortable: true },
            ],
            pager: "#pager",
            rowNum: 10,
            rowList: [10, 20, 30],
            sortname: "id",
            sortorder: "asc",
            viewrecords: true,
            gridview: true,
            autoencode: true,
            caption: "Список пользователей"
        });
    });
}

function getData() {
    let storedArr = JSON.parse(localStorage.getItem("usersList"));
    let data = [];
    for (let i in storedArr) {
        let storedObj = JSON.parse(storedArr[i]);
        data.push({ id: storedObj.id, firstName: storedObj.firstName, lastName: storedObj.lastName, birth: storedObj.birth, city: CITIES[storedObj.city] });
    }

    return data;
}