const fs = require('fs');
const path = require('path');
const ghostwrite = require('./ghostwrite')

 function ghostlyLoader(content, map, meta) {
  const callback = this.async();

  const fileName = path.basename(this.resourcePath, path.extname(this.resourcePath));
  const dir = path.dirname(this.resourcePath);

  if (fs.existsSync(dir + '/' + fileName + '.ghost.js')) {
    fs.readFile(`${dir}/${fileName}.ghost.js`, (err, data) => {
      if (err) return callback(err);

      const output = ghostwrite(String(data), content, )

      callback(null, output, map, meta)
    })
  } else {

    callback(null, content, map, meta) ;
  }
}

module.exports = ghostlyLoader;
