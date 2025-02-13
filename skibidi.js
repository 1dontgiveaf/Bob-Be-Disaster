const fs = require('fs');

function transformObject(originalObject) {
    const transformedObject = { ...originalObject, apps: null };

    const appMap = {};

    for (const app of originalObject.apps) {
        const {
            name,
            bundleIdentifier,
            version,
            versionDate,
            size,
            downloadURL,
            developerName,
            localizedDescription,
            iconURL,
        } = app;

        if (!appMap[name]) {
            appMap[name] = {
                name,
                bundleIdentifier,
                developerName,
                iconURL,
                versions: [],
            };
        }

        appMap[name].versions.push({
            version,
            date: versionDate,
            size,
            downloadURL,
            localizedDescription,
        });
    }

    for (const name in appMap) {
        appMap[name].versions.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    transformedObject.apps = Object.values(appMap);

    return transformedObject;
}

function main() {
    const data = JSON.parse(fs.readFileSync('skibidi.json', 'utf-8'));

    data.apps = [];

    fs.writeFileSync('skibidi.json', JSON.stringify(transformObject(data), null, 2));
}

main();
