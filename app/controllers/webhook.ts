import { Request, Response } from 'express';
import { Webhook } from 'svix'

type WebhookEvent = {
    id: string;
    type: string;
    data: any;
}

export async function webhook(req: Request, res: Response) {

// You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

console.log('Webhook secret:', WEBHOOK_SECRET)

if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
}

// Get the headers
const headerPayload = req.headers;
const svix_id = headerPayload["svix-id"];
const svix_timestamp = headerPayload["svix-timestamp"];
const svix_signature = headerPayload["svix-signature"];

// If there are no headers, error out
if (!svix_id || !svix_timestamp || !svix_signature) {
    return res.status(400).send('Error occured -- no svix headers');
}

// Get the body
//const payload = await req.json()
const payload = req.body
const body = JSON.stringify(payload);

// Create a new Svix instance with your secret.
const wh = new Webhook(WEBHOOK_SECRET);

let evt: WebhookEvent

// Verify the payload with the headers
try {
    evt = wh.verify(body, {
    "svix-id": Array.isArray(svix_id) ? svix_id[0] : svix_id,
    "svix-timestamp": Array.isArray(svix_timestamp) ? svix_timestamp[0] : svix_timestamp,
    "svix-signature": Array.isArray(svix_signature) ? svix_signature[0] : svix_signature,
    }) as WebhookEvent
} catch (err) {
    console.error('Error verifying webhook:', err);
    return res.status(400).send('Error occured');
}

// Get the ID and type
const { id } = evt.data;
const eventType = evt.type;

console.log(`Webhook with and ID of ${id} and type of ${eventType}`)
console.log('Webhook body:', body)

return res.status(200).send('Webhook received');
}