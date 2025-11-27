
let firstName;

        do {
        firstName = prompt("Введите ваше имя")
        } while(firstName == '');

        let lastName;

        do {
            lastName = prompt("Введите вашу фамилию")
        } while(lastName == '');

        let patronim;

        do {
            patronim = prompt("Введите ваше отчество")
        } while(patronim == '');

        const fullName = lastName + " " + firstName + " " + " " + patronim;
        let age;

        do {
            age = Number(prompt("Укажите ваш возраст в годаx"))
        } while(isNaN(age));

        const sex = confirm("Ваш пол - мужской?") ? "мужской" : "женский";
        const pension = age >= 60 ? "да" : "нет";
        const result =  "Ваше ФИО:" + " " + fullName + "\nВаш возраст в годах:" + " " + age + "\nВаш возраст в днях:" + " " + (age * 365) + "\nЧерез 5 лет вам будет:" + " " + (age + 5) + "\nВaш пол:" + " " + sex + "\nВы на пенсии:" + " " + pension;

        

        alert(result);