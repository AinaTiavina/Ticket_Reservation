import { Request, Response } from "express";
const jwt = require('jsonwebtoken');
const config = require('../Config/auth.config');

export class JwtGenerator {

    public static generate(req: Request, res: Response) {
        
        return res.status(200).json({
            email: (req.user as any).email,
            roles: (req.user as any).roles,
            token: jwt.sign(config.data(req.user), config.secret, {
                expiresIn: 10800
            })
        })
    }
}