const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

class Executor {
    async init(mainDir, client, java, ram, nickname, isSilent) {
        const gameDir = path.join(mainDir, 'Clients', client);
        const javaRuntime = path.join(mainDir, 'Java', java, 'bin', isSilent ? 'javaw.exe' : 'java.exe');
        const mem = ram ? ` -Xms${ram}M -Xmx${ram}M` : '';
        const nativesDir = path.join(gameDir, 'natives');
        const libraries = path.join(gameDir, 'libraries');
        const jsonFile = JSON.parse(fs.readFileSync(path.join(gameDir, `${client}.json`), 'utf8'));
        const libs = this.parseLibraries(libraries, jsonFile);
        const jarFile = path.join(gameDir, `${client}.jar`);
        const assetsDir = path.join(gameDir, 'assets');
        const args = jsonFile.minecraftArguments
            .replace('${auth_player_name}', nickname)
            .replace('${version_name}', client)
            .replace('${game_directory}', `"${gameDir}"`)
            .replace('${game_directory}', gameDir)
            .replace('${assets_root}', `"${assetsDir}"`)
            .replace('${assets_index_name}', jsonFile.family)
            .replace('${auth_uuid}', '444cf323978c3e839288612345bfec67')
            .replace('${auth_access_token}', '[boiiiiiiiiii]')
            .replace('${user_type}', 'legacy')
            .replace('${version_type}', 'modified');

        const mine = exec(
            `"${javaRuntime}"${mem} -Djava.library.path="${nativesDir}" -cp "${libs}${jarFile}" ${jsonFile.mainClass} ${args} --width 925 --height 530`
        );
        if (isSilent) {
            process.exit();
        } else {
            mine.stdout.on('data', (data) => {
                console.log(data.trim());
            });
        }
    }

    parseLibraries(librariesDir, jsonFile) {
        const librariesArray = [];
        let librariesString = '';

        for (let i = 0; i < jsonFile.libraries.length; i++) {
            if (!jsonFile.libraries[i].rules || !jsonFile.libraries[i].natives) {
                const libSplit = jsonFile.libraries[i].name.split(':');
                const firstPart = path.join.apply(null, libSplit[0].split('.'));
                libSplit.shift();
                const secondPart = path.join.apply(null, libSplit);
                const folderPath = path.join(librariesDir, firstPart, secondPart);
                try {
                    const files = fs.readdirSync(path.join(folderPath));
                    for (let i = 0; i < files.length; i++) {
                        const final = path.join(folderPath, files[i]);
                        if (!librariesArray.includes(final)) {
                            librariesArray.push(`${final}`);
                        }
                    }
                } catch {}
            }
        }

        for (let i = 0; i < librariesArray.length; i++) {
            librariesString = librariesString + librariesArray[i] + ';';
        }

        return librariesString;
    }
}

module.exports = new Executor();
