import { Request, Response } from 'express';
import * as crypto from 'crypto'
import {decryptRequest, encryptResponse, FlowEndpointException} from "../flow/encryption";
import {getNextScreen} from "../flow/flow";
export const verifyFlow = async (req: Request, res: Response) => {
    res.send(`<pre>Nothing to see here.</pre>`)
}


const APP_SECRET = process.env.APP_SECRET!;
const PRIVATE_KEY = process.env.PRIVATE_KEY!;
const PASSPHRASE = process.env.PASSPHRASE!;
function isRequestSignatureValid(req:Request) {
    if(!APP_SECRET) {
        console.warn("App Secret is not set up. Please Add your app secret in /.env file to check for request validation");
        return true;
    }
    const signatureHeader = req.get("x-hub-signature-256");
    if (!signatureHeader) {
        console.error("Error: Request Signature header is missing");
        return false;
    }
    const signatureBuffer = Buffer.from(signatureHeader.replace("sha256=", ""), "utf-8");

    const hmac = crypto.createHmac("sha256", APP_SECRET);
    const digestString = hmac.update(req.body).digest('hex');
    const digestBuffer = Buffer.from(digestString, "utf-8");

    if ( !crypto.timingSafeEqual(digestBuffer, signatureBuffer)) {
        console.error("Error: Request Signature did not match");
        return false;
    }
    return true;
}


export const handleFlow = async (req: Request, res: Response) => {
    if (!PRIVATE_KEY) {
        throw new Error(
            'Private key is empty. Please check your env variable "PRIVATE_KEY".'
        );
    }

    if(!isRequestSignatureValid(req)) {
        // Return status code 432 if request signature does not match.
        // To learn more about return error codes visit: https://developers.facebook.com/docs/whatsapp/flows/reference/error-codes#endpoint_error_codes
        return res.status(432).send();
    }

    let decryptedRequest: { decryptedBody: any; aesKeyBuffer: Buffer | null; initialVectorBuffer: Buffer; } | null = null;
    try {
        decryptedRequest = decryptRequest(req.body, PRIVATE_KEY, PASSPHRASE);
    } catch (err) {
        console.error(err);
        if (err instanceof FlowEndpointException) {
            return res.status(err.statusCode).send();
        }
        return res.status(500).send();
    }

    const { aesKeyBuffer, initialVectorBuffer, decryptedBody } = decryptedRequest;
    console.log("💬 Decrypted Request:", decryptedBody);

    const screenResponse = await getNextScreen(decryptedBody);
    console.log("👉 Response to Encrypt:", screenResponse);

    res.send(encryptResponse(screenResponse, aesKeyBuffer, initialVectorBuffer));
}