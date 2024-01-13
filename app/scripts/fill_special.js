const csv = require('csv-parser')
const fs = require('fs')
const db = require('../models/index');

module.exports = () => {
    const results = [];
    const promises = [];
    return new Promise((resolve) => {
        fs.createReadStream('./app/scripts/data_templates/spec.csv')
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                results.forEach((item) => {
                    const promise = db.models.DictionarySpecialCard.create({
                        type: item.type,
                        time_of_action:  item.time_of_action,
                        property: {
                            name: item.name,
                            description: item.description,
                            dop_info: item.dop_info,
                        }
                    })
                    promises.push(promise);
                })
                resolve(promises);
            });
    });
}