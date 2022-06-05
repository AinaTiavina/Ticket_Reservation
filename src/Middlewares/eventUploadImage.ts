import { Request } from "express";

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req: Request, file: any, callback: CallableFunction) => {
        callback(null, path.join(__dirname, '../../public/uploads/'));
    },
    filename: (req: any, file: { originalname: string; mimetype: string | number; }, callback: (arg0: null, arg1: string) => void) => {
        const name = file.originalname.split('.')[0];
        callback(null, name + Date.now() + '.' + file.originalname.split('.')[1]);
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