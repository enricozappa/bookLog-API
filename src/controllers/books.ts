import { Request, Response } from "express";

export const getBooks = (req: Request, res: Response) => {
    res.status(200).send('Hello world!');
};
