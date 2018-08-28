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

        const players = content
            .reduce((list, p) => {
                try {
                    p.vsADP = p.vs[' ADP'];
                
                    delete p.vs;
                }
                catch (ex) {
                    p.vsADP = '';
                }

                const player = Object.entries(p)
                    .reduce((item, [key, value]) => {
                        item[key.toLowerCase()] = value;

                        return item;
                    }, {});

                if (player.vsadp) {
                    list.push(player);
                }

                return list;
            }, [])
            .sort((a, b) => {
                const aRank = parseInt(a.rank, 10);
                const bRank = parseInt(b.rank, 10);

                if (aRank === bRank) {
                    return 0;
                }

                if (!aRank || !bRank) {
                    return -1;
                }
                
                return aRank > bRank ? 1 : -1;
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

