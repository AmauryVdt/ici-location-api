import { Request, Response } from 'express';
import { getErrorMessage } from '../utils/error';
import { CustomRequest } from '../middlewares/authMiddleware';
import { hash, compareSync } from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';
import 'dotenv/config'
import { Webhook } from 'svix'

const saltRounds: number = 8;

type WebhookEvent = {
  id: string;
  type: string;
  data: any;
}

export async function login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
        const user = await req.prisma.user.findUnique({
            where: {
              email: email,
            }
        });
        if (!user) {
            return res.status(401).json('Invalid credentials');
        }
        const isMatch = await compareSync(password, user.password);
        if (!isMatch) {
            return res.status(401).json('Invalid credentials');
        }
        const jwtAccessSecret = process.env.JWT_ACCESS_SECRET;
        if (!jwtAccessSecret) {
          throw new Error("JWT_ACCESS_SECRET is not defined in the environment variables");
        }
        const secret: Secret = jwtAccessSecret;
        const token = jwt.sign({ _id: user.id?.toString(), name: user.email }, secret, {
            expiresIn: '2 days',
          });
        res.status(200).json({ user: user, token: token });
    } catch (error: any) {
        res.status(500).send(getErrorMessage(error));
    }
}

export async function register(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const user = await req.prisma.user.create({
        data: {
          email: email,
          password: await hash(password, 8),
        }
      });
      res.status(201).json(user);
    } catch (error: any) {
      res.status(500).send(getErrorMessage(error));
    }
  }


export async function webhook(req: Request) {

  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET
  
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
    return new Response('Error occured -- no svix headers', {
      status: 400
    })
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
    return new Response('Error occured', {
      status: 400
    })
  }
  
  // Get the ID and type
  const { id } = evt.data;
  const eventType = evt.type;
  
  console.log(`Webhook with and ID of ${id} and type of ${eventType}`)
  console.log('Webhook body:', body)
  
  return new Response('', { status: 200 })
}