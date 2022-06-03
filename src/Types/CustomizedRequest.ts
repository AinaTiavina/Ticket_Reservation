import { Request } from "express";

type customReq = {
    req: Request,
    clientId: number
}

export default customReq;