import { Storage } from "@google-cloud/storage";

const storage = new Storage({
    keyFilename: "musicspace-358910-09c8f29d259f.json",
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
