const fs = require('fs');
const path = require('path');
const csv = require('csvtojson');

convertCsvToJson();

async function convertCsvToJson () {
    const dataDir = path.join(__dirname, '..', 'data');
    const filenames = await readDir(dataDir);
    const csvfiles = filenames.filter(f => f.includes('.csv'));

    csvfiles.forEach(async (filename) => {
        const csvPath = path.join(dataDir, filename);
        const out = path.join(dataDir, parseFileName(filename));

        const content = await csv().fromFile(csvPath);

        const players = content.map(p => {
            try {
                p.vsADP = p.vs[' ADP'];
            
                delete p.vs;
            }
            catch {
                p.vsADP = '';
            }

            return p;
        });

        await write(out, JSON.stringify(players, null, 4));
    });
}

function parseFileName (filename) {
    return filename.replace('csv', 'json');
}

async function write (path, contents) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, contents, (err) => {
            if (err) {
                reject(err);
            }
            else {
                resolve();
            }
        });
    });
}

async function readDir (directory) {
    return new Promise((resolve, reject) => {
        fs.readdir(directory, (err, files) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(files);
            }
        });
    });
}

