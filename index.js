const fs = require('fs');
const path = require('path');
const ghostwrite = require('./ghostwrite')
/**
 *
 * @param {string|Buffer} content Content of the resource file
 * @param {object} [map] SourceMap data consumable by https://github.com/mozilla/source-map
 * @param {any} [meta] Meta data, could be anything
 */
 function webpackLoader(content, map, meta) {
  // code of your webpack loader
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
  
  // console.log(this.resourcePath)
}

module.exports = webpackLoader