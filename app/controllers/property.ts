import { Request, Response } from 'express';
import { createPropertieService, getPropertieByUserIdService } from '../services/property';
import { validationResult } from 'express-validator';

export async function getAllProperties(req: Request, res: Response) {
    const { prisma } = req;
    try {
        const properties = await prisma.propertie.findMany();
        res.status(200).json(properties);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
}

export async function createPropertie(req: Request, res: Response) {
    const { prisma, auth } = req;
    const result = validationResult(req);

    if (!result.isEmpty()) {
        res.status(422).send('Bad request');
        //res.status(422).json({'Bad request': result.array()});
        return;
    }

    if (!auth.userId) {
        res.status(401).send('Unauthorized');
        return;
    }
    else {
        if (!(await prisma.user.findUnique({ where: { id: auth.userId } }))) {
            res.status(401).send('Unauthorized');
            return;
        }
    }

    try {
        const propertie = await createPropertieService(req, auth.userId)
        res.status(201).json(propertie.id);
    } catch (error: any) {
        console.error(error);
        res.status(500).send('An error occured');
    }
}

export async function getPropertieByUserId(req: Request, res: Response) {
    const { prisma, auth } = req;

    if (!auth.userId) {
        res.status(401).send('Unauthorized');
        return;
    }
    else {
        if (!(await prisma.user.findUnique({ where: { id: auth.userId } }))) {
            res.status(401).send('Unauthorized');
            return;
        }
    }
    try {
        const properties = await getPropertieByUserIdService(req, auth.userId);
        res.status(200).json(properties);
    } catch (error: any) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

export async function getPropertieById({
    prisma, params
}: Request, {
    status,
}: Response) {
    const { id } = params;
    try {
        const propertie = await prisma.propertie.findUnique({
            where: {
                id: id,
            },
        });
        status(200).json(propertie);
    } catch (error: any) {
        status(500).send(error.message);
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
    if (!auth.userId) {
        res.status(401).send('Unauthorized');
        return;
    }
    else {
        if (!(await prisma.user.findUnique({ where: { id: auth.userId } }))) {
            res.status(401).send('Unauthorized');
            return;
        }
    }

    try {
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