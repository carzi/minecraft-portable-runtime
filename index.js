const inquirer = require('inquirer');
const checker = require('./functions/checker');
const executor = require('./functions/executor');

checker
    .firstStap(__dirname)
    .then((ClientsAndJavas) => {
        checker.secondStep(__dirname, ClientsAndJavas.Clients).then(() => {
            inquirer
                .prompt([
                    {
                        type: 'list',
                        name: 'client',
                        message: 'Выберите клиент: ',
                        choices: ClientsAndJavas.Clients,
                    },
                    {
                        type: 'list',
                        name: 'java',
                        message: 'Выберите версию Java: ',
                        choices: ClientsAndJavas.Java,
                    },
                    {
                        type: 'list',
                        name: 'ram',
                        message: 'Выберите кол-во памяти выделенной для игры: ',
                        choices: [
                            {
                                name: 'Авто',
                                value: false,
                            },
                            {
                                name: '1024 МБ',
                                value: 1024,
                            },
                            {
                                name: '2048 МБ',
                                value: 2048,
                            },
                            {
                                name: '3072 МБ',
                                value: 3072,
                            },
                            {
                                name: '4096 МБ',
                                value: 4096,
                            },
                            {
                                name: '5120 МБ',
                                value: 5120,
                            },
                            {
                                name: '6144 МБ',
                                value: 6144,
                            },
                        ],
                    },
                    {
                        name: 'nickname',
                        message: 'Введите ник: ',
                    },
                    {
                        name: 'isSilent',
                        message: 'Скрыть консоль после запуска? ',
                        type: 'list',
                        choices: [
                            {
                                name: 'Да',
                                value: true,
                            },
                            {
                                name: 'Нет',
                                value: false,
                            },
                        ],
                    },
                ])
                .then((form) => {
                    executor.init(__dirname, form.client, form.java, form.ram, form.nickname, form.isSilent);
                });
        });
    })
    .catch((error) => {
        console.log('\n' + JSON.stringify(error) + '\n');
        process.exit();
    });
