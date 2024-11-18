const fs = require('fs')

const readDataFile = (path) => {
    fs.readFileSync(path, function (err, data) {
        if (err) {
            return console.error(err);
        }
        data = JSON.parse(data)

        return data
    });
}

const writeToDataFile = (path, data) => {
    fs.writeFileSync(path, JSON.stringify(data, null, 2) ,function(err){
        if (err) {
            return console.error(err)
        }
    })
}

module.exports = {readDataFile, writeToDataFile}