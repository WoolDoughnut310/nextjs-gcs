import { Storage } from "@google-cloud/storage";

const storage = new Storage({
    keyFilename: "KEY_FILENAME.json",
});

const bucket = storage.bucket(process.env.GCS_BUCKET as string);

export const createWriteStream = (filename: string, contentType?: string) => {
    const ref = bucket.file(filename);

    const stream = ref.createWriteStream({
        gzip: true,
        contentType: contentType,
    });

    return stream;
};
