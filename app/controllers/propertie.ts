import { Request, Response, Express } from 'express';

export async function getAllProperties({
    prisma,
}: Request, {
    status,
}: Response) {
    try {
        const properties = await prisma.propertie.findMany();
        status(200).json(properties);
    } catch (error: any) {
        status(500).send(error.message);
    }
}

export async function createPropertie({
    prisma, body
}: Request, {
    status,
}: Response) {
    try {
        const propertie = await prisma.propertie.create({
            data: body,
        });
        status(201).json(propertie);
    } catch (error: any) {
        status(500).send(error.message);
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