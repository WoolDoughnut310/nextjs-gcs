import type { NextApiRequest, NextApiResponse } from "next";
import { method2 } from "../../lib/upload";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        res.status(400).send(`Invalid method: ${req.method}`);
        return;
    }

    method2(req, res);
}

export const config = {
    api: {
        bodyParser: false,
    },
};
