import formidable from "./formidable-serverless";
import { createReadStream } from "fs";
import { IncomingMessage } from "http";
import { NextApiRequest, NextApiResponse } from "next";
import parseForm from "./parseForm";
import * as gcs from "./gcs";
import { PassThrough } from "stream";
import { Response } from "express";

const uploadStream = (file: formidable.File) => {
    const pass = new PassThrough();

    const stream = gcs.createWriteStream(
        file.originalFilename ?? file.newFilename,
        file.mimetype ?? undefined
    );
    pass.pipe(stream);

    return pass;
};

export const method1 = async (req: IncomingMessage, res: NextApiResponse) => {
    const form = formidable();

    const { files } = await parseForm(form, req);

    const file = files.file as any;

    createReadStream(file.path)
        .pipe(gcs.createWriteStream(file.name, file.type))
        .on("finish", () => {
            res.status(200).json("File upload complete");
        })
        .on("error", (err) => {
            console.error(err.message);
            res.status(500).json("File upload error: " + err.message);
        });
};

export const method2 = (
    req: NextApiRequest | IncomingMessage,
    res: NextApiResponse | Response
) => {
    // @ts-ignore
    const form = formidable({ fileWriteStreamHandler: uploadStream });

    form.parse(req, () => {
        res.status(200).json("File upload complete");
    });
};
