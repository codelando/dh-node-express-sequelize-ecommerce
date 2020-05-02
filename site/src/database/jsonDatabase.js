const fs = require('fs');
const path = require('path');

const model = function (name) {
    return {
        tablePath: path.resolve(__dirname, '../data/', `${name}.json`),
        readFile() {
            let tableContents = fs.readFileSync(this.tablePath, 'utf-8');
            return JSON.parse(tableContents);
        },
        all() {
            return this.readFile();
        },
        find(id) {
            let rows = this.readFile();
            return rows.find(product => product.id == id);
        }
    }
}

module.exports = model;