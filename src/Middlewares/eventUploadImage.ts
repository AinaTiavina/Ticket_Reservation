import { Request } from "express";

const multer = require('multer');
const MIME_TYPES = require('../Config/multer.config');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req: Request, file: any, callback: CallableFunction) => {
        callback(null, path.join(__dirname, '../../public/uploads/'));
    },
    filename: (req: Request, file: any, callback: CallableFunction) => {
        const name = file.originalname.split('.')[0];
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    },
})

export const file = multer({
    storage: storage,
    fileFilter: (req: Request, file: any, callback: CallableFunction) => {

        if(['jpg', 'jpeg', 'png', 'gif'].includes(file.originalname.split('.')[1])){

            callback(null, true);
        }else{

            callback(new Error('jpg, jpeg, png as well as gif are only allowed'));
        }

    }
});