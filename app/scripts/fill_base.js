const biology = require('./fill_biology');
const bunker = require('./fill_bunker');
const disasters = require('./fill_disasters');
const health = require('./fill_health');
const hobby = require('./fill_hobby');
const luggage = require('./fill_luggage');
const phobia = require('./fill_phobia');
const profession = require('./fill_profession');
const quality = require('./fill_quality');
const additional = require('./fill_additional');
const special = require('./fill_special');

(async () => {
    // Fill base cards dictionary
    await Promise.all(await biology());
    await Promise.all(await bunker());
    await Promise.all(await disasters());
    await Promise.all(await health());
    await Promise.all(await hobby());
    await Promise.all(await luggage());
    await Promise.all(await phobia());
    await Promise.all(await profession());
    await Promise.all(await quality());
    await Promise.all(await additional());

    // Fill spec cards dictionary
    await Promise.all(await special());
})()