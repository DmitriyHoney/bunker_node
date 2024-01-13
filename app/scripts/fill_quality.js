const csv = require('csv-parser')
const fs = require('fs')
const db = require('../models/index');

module.exports = () => {
    const results = [];
    const promises = [];
    return new Promise((resolve) => {
        fs.createReadStream('./app/scripts/data_templates/quality.csv')
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                results.forEach((item) => {
                    const promise = db.models.DictionaryCard.create({
                        type: item.type,
                        is_default: item?.is_default ? true : false,
                        property: {
                            name: item.name,
                        }
                    })
                    promises.push(promise);
                })
                resolve(promises);
            });
    });
}