import { Request } from 'express';
import { Propertie } from '@prisma/client';

export async function createPropertieService({ prisma, body }: Request, userId: string): Promise<Propertie> {

    const {
        type,
        title,
        description,
        energyClass,
        ges,
        price,
        address,
        images,
        totalArea,
        livingArea,
        rooms,
        floor,
        floorsNumber,
        lift,
        furnished,
        balcony,
        terrace,
        garden,
        parking,
    } = body;

    const propertie = {
        user: {
            connect: {
                id: userId,
            }
        },
        title,
        description,
        energyClass,
        ges,
        price: {
            create: {
                price: +price,
            }
        },
        address: {
            create: {
                name: address,
            }
        },
        images: {
            create: images.map((image: string) => ({ url: image })),
        },
    }

    const specificities = {
        houseDetail: {
            create: {
                furnished,
                livingArea,
                totalArea,
                rooms,
                floorsNumber,
                balcony,
                terrace,
                garden,
                parking,
            }
        },
        apartmentDetail: {
            create: {
                livingArea,
                rooms,
                floor,
                floorsNumber,
                lift,
                furnished,
                balcony,
                terrace,
                garden,
                parking,
            }
        },
        landDetail: {
            create: {
                totalArea,
            }
        },
        parkingDetail: {
            create: {
                parking,
            }
        },
        otherDetail: {
            create: {
                furnished: furnished,
                livingArea,
                totalArea,
                rooms,
                lift,
                floorsNumber,
                floor,
                balcony,
                terrace,
                garden,
                parking,
            }
        },
    }

    const data = {
        ...propertie,
        ...(type === 'house' && { houseDetail: specificities.houseDetail }),
        ...(type === 'apartment' && { apartmentDetail: specificities.apartmentDetail }),
        ...(type === 'land' && { landDetail: specificities.landDetail }),
        ...(type === 'parking' && { parkingDetail: specificities.parkingDetail }),
        ...(type === 'other' && { otherDetail: specificities.otherDetail }),
    }

    return await prisma.propertie.create({ data });
}