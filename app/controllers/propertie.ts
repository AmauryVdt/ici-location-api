import { Request, Response } from 'express';
import { createPropertieService } from '../services/propertie';
import { validationResult } from 'express-validator';

export async function getAllProperties(req: Request, res: Response) {
    const { prisma } = req;
    const { status, } = res;
    try {
        const properties = await prisma.propertie.findMany();
        status(200).json(properties);
    } catch (error: any) {
        status(500).send(error.message);
    }
}

export async function createPropertie(req: Request, res: Response) {
    const { prisma, auth } = req;
    const { status, } = res;
    const result = validationResult(req);

    if (!result.isEmpty()) {
        // res.status(422).send('Bad request');
        res.status(422).json({'Bad request': result.array()});
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

export async function deletePropertie({
    prisma, params
}: Request, {
    status,
}: Response) {
    const { id } = params;
    try {
        await prisma.propertie.delete({
            where: {
                id: id,
            },
        });
        status(204).json();
    } catch (error: any) {
        status(500).send(error.message);
    }
}

// export async function findManyProperties(req: Request, res: Response) {

//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     let whereCondition = {};
//     Object.keys(req.query).forEach(key => {
//         if (req.query[key]) {
//             whereCondition[key] = req.query[key];
//         }
//     });

//     try {
//       const properties = await req.prisma.propertie.findMany({
//         where: {
//             id: id,
//             title: title,
//             description: description,    
//             energyClass: energyClass,
//             ges: ges,
//             createdAt: createdAt,       
//             images: images,
//             addressId: addressId, 
//             priceId: priceId,
//             address: address,
//             price: price,
//             houseDetail: houseDetail,
//             appartmentDetail: appartmentDetail,
//             landDetail: landDetail,
//             parkingDetail: parkingDetail,
//             otherDetail: otherDetail,
//             likes: likes,
//         },
//       });
//       res.status(200).json(properties);
//     } catch (error: any) {
//       res.status(500).send(error.message);
//     }
// }