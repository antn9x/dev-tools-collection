import dir from 'node-dir';
import path from 'path';
import fs from 'fs';
import ejs from 'ejs';
import compact from 'lodash/compact';
import Logger from '../utils/Logger';

const handelFile = (srcFolder, file, patternList = []) => {

  if (!patternList.length || patternList.some(pat => file.match(new RegExp(pat, 'i')))) {
    return {
      subPath: path.dirname(file).replace(srcFolder, ''),
      base: path.basename(file),
      ext: path.extname(file)
    };
  }
};

export const getFilesInFolder = ({ src, patternList }) => dir.promiseFiles(src)
  .then(files => files.map(file => handelFile(src, file, patternList)))
  .then(compact);

export const checkFileExist = (filePath) => fs.existsSync(filePath);

const getFrameData = (sprite) => ({
  name: sprite.filename,
  x: sprite.frame.x,
  y: sprite.frame.y,
  width: sprite.frame.w,
  height: sprite.frame.h,
});

const getTemplateByType = (type) => {
  if (/xml/i.test(type))
    return path.join(__dirname, '../ejs/sprite_xml.ejs');
  path.join(__dirname, '../ejs/sprite_plist.ejs');
};

export const convertSpriteSheetJSON2XML = ({ type, src, des }) => {
  const xmlTemplate = getTemplateByType(type);
  // Logger.log(type, src, xmlTemplate);
  const json = JSON.parse(fs.readFileSync(src));
  const data = {
    sheet: { name: json.meta.image },
    sprites: json.frames.map(getFrameData)
  };
  // Logger.log(data, des);
  ejs.renderFile(xmlTemplate, data, { rmWhitespace: true }, (err, str) => {
    if (err) {
      Logger.error(err);
    }
    // str => Rendered HTML string
    // Logger.log(str);
    const newExt = (/xml/i.test(type)) ? '.xml' : 'plist';
    const xmlPath = des || src.replace('.json', newExt);
    fs.writeFileSync(xmlPath, str);
  });
};