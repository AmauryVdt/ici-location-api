import { Request } from 'express';
import { Propertie } from '@prisma/client';

type PropertyByUserId = {
    id: string;
    title: string;
    description: string;
    price: {
        price: number;
    } | null;
    images: {
        url: string;
    }[];
}

export async function getAllPropertiesService({ prisma }: Request): Promise<Propertie[]> {
    return await prisma.propertie.findMany();
}

export async function getPropertieByIdService({ prisma, params }: Request): Promise<Propertie | null> {
    const { id } = params;
    return await prisma.propertie.findUnique({
        where: {
            id,
        },
        include: {
            price: true,
            address: true,
            images: true,
            houseDetail: true,
            apartmentDetail: true,
            landDetail: true,
            parkingDetail: true,
            otherDetail: true,
        },
    });
}

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
                price: price,
            }
        },
        address: {
            create: {
                name: address,
            }
        },
        images: {
            create: images.map((image: string) => ({ url: image, })),
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

export async function deletePropertieService({ prisma, params }: Request): Promise<void> {
    const { id } = params;
    await prisma.propertie.delete({
        where: {
            id,
        },
    });
}

export async function getPropertieByUserIdService({ prisma }: Request, userId: string): Promise<PropertyByUserId[]> {
    return await prisma.propertie.findMany({
            where: {
                userId,
            },
            select: {
                id: true,
                title: true,
                description: true,
                price: {
                    select: {
                        price: true,
                    },
                },
                images: {
                    select: {
                        url: true,
                    },
                },
            },
        });
}