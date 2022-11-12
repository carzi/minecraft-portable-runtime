# Minecraft Portable Runtime

### Как установить?
1. Скачайте [последнюю](https://github.com/carzi/minecraft-portable-runtime/releases/tag/release) версию MPR.
2. Создайте папку в удобном вам месте и перенесите скачаные файлы в неё.
3. Затем в этой папке создайте 2 новые: `Clients` и `Java`.
4. Скачайте портативную, нужную вам версию Java и поместетие в соответствующую папку. [[можно скачать отсюда](https://github.com/carzi/minecraft-portable-runtime/releases/tag/java)]
5. Скачайте или создайте клиент и поместетие в соответствующую папку. [[можно скачать отсюда](https://github.com/carzi/minecraft-portable-runtime/releases/tag/clients)]

### Иерархия папок и файлов
    .
    ├── Clients
    │   ├── ...
    │   └── Optifine 1.12.2
    │       ├── assets
    │       ├── libraries
    │       ├── natives
    │       ├── OptiFine 1.12.2.jar
    │       └── OptiFine 1.12.2.json
    ├── Java
    │   ├── ...
    │   └── java8_351_win_32bit
    │       ├── bin
    │       └── ...
    ├── logs
    └── minecraft-portable-runtime.exe
    
Папка logs создаётся автоматический после первого запуска игры.
