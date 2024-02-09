import { Request, Response } from 'express';
import { createPropertieService, getPropertieByUserIdService } from '../services/property';
import { check, validationResult } from 'express-validator';
import { clerkClient } from '@clerk/clerk-sdk-node';
import checkUser from '../utils/checkUser';

export async function getAllProperties(req: Request, res: Response) {
    const { prisma } = req;
    try {
        const properties = await prisma.propertie.findMany();
        res.status(200).json(properties);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
}

export async function getPropertieById(req: Request, res: Response) {

    const { prisma } = req;
    const { id } = req.query;
    const result = validationResult(req);
    
    if (!result.isEmpty()) {
        res.status(422).send('Bad request');
        //res.status(422).json({'Bad request': result.array()});
        return;
    }

};

export async function getPropertieByUserId(req: Request, res: Response) {
    const { prisma, auth } = req;

    try {
        if (!auth.userId || !(await checkUser(req))) {
            res.status(401).send('Unauthorized');
            return;
        }

        const properties = await getPropertieByUserIdService(req, auth.userId);
        res.status(200).json(properties);
    } catch (error: any) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

export async function createPropertie(req: Request, res: Response) {
    const { auth } = req;
    const result = validationResult(req);

    if (!result.isEmpty()) {
        res.status(422).send('Bad request');
        //res.status(422).json({'Bad request': result.array()});
        return;
    }

    try {
        if (!auth.userId || !(await checkUser(req))) {
            res.status(401).send('Unauthorized');
            return;
        }

        const propertie = await createPropertieService(req, auth.userId)
        res.status(201).json(propertie.id);
    } catch (error: any) {
        console.error(error);
        res.status(500).send('An error occured');
    }
}

export async function udpatePropertie({
    prisma, body, params
}: Request, {
    status,
}: Response) {
    const { id } = params;
    try {
        const propertie = await prisma.propertie.update({
            where: {
                id: id,
            },
            data: body,
        });
        status(201).json(propertie);
    } catch (error: any) {
        status(500).send(error.message);
    }
}

export async function deletePropertie(req: Request, res: Response) {
    const { prisma, auth, params } = req;
    const { id } = params;
    const result = validationResult(req);
    console.log(id);

    if (!result.isEmpty()) {
        res.status(422).send('Bad request');
        return;
    }

    try {
        if (!auth.userId || !(await checkUser(req))) {
            res.status(401).send('Unauthorized');
            return;
        }

        await prisma.propertie.delete({
            where: {
                id: id,
            },
        });
        res.status(204).json();
    } catch (error: any) {
        console.error(error);
        res.status(500).send(error.message);
    }
}