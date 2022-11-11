const fs = require('fs');
const path = require('path');

class Checker {
    async firstStap(dir) {
        const Clients = await this.isClients(dir);
        const Java = await this.isJava(dir);

        if (Clients.error || Java.error) {
            throw {
                Clients,
                Java,
            };
        } else {
            return {
                Clients,
                Java,
            };
        }
    }

    async secondStep(mainDir, versions) {
        for (const version in versions) {
            if (!fs.existsSync(path.join(mainDir, 'Clients', versions[version], `${versions[version]}.json`)))
                throw `В клиенте ${path.join(mainDir, 'Clients', versions[version])} не найден json файл.`;
        }
    }

    async isClients(mainDir) {
        try {
            const clients = fs.readdirSync(path.join(mainDir, 'Clients'));
            if (!clients[0]) {
                return {
                    error: 'Добавте хотя бы одну версию в Clients.',
                };
            } else {
                return clients;
            }
        } catch (error) {
            return {
                error: 'Не удалось найти папку Clients. Создайте её в папке рядом с этой программой.',
            };
        }
    }

    async isJava(mainDir) {
        try {
            const javas = fs.readdirSync(path.join(mainDir, 'Java'));
            if (!javas[0]) {
                return {
                    error: 'Добавте хотя бы одну версию в Java.',
                };
            } else {
                return javas;
            }
        } catch (error) {
            return {
                error: 'Не удалось найти папку Java. Создайте её в папке рядом с этой программой.',
            };
        }
    }
}

module.exports = new Checker();
