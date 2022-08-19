const multer = require('multer');
const path = require("path");

module.exports = {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, "..", "..", "files"), //passa de ../../config para /files
        filename: (req, file, cb) => { //cb is callback, o filename vai ser utilizado noutra situacao
            const ext = path.extname(file.originalname); //extensao do ficheiro
            const name = path.basename(file.originalname, ext); //cria o nome do ficheiro como filename.ext
            cb(null, `${name.replace(/\s/g,"")}-${Date.now()}${ext}`) //regex para retirar os espacos do nome
        }
    })
}