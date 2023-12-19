import { Request } from 'express';

export interface UserProps {
    id: string;
    username: string;
    email: string;
}

export async function createUser({id, email, username } : UserProps, req: Request) {
    try {
        const user = await req.prisma.user.create({
            data: {
                id,
                username,
                email,
            },
        });

        return user;

    } catch (error) {
        throw error;
    }
}

export async function updateUser({id, email, username } : UserProps, req: Request) {
    try {
        const user = await req.prisma.user.update({
            where: {
                id,
            },
            data: {
                username,
                email,
            },
        });

        return user;

    } catch (error) {
        throw error;
    }
}

export async function deleteUser(id: string, req: Request) {
    try {
        const user = await req.prisma.user.delete({
            where: {
                id,
            },
        });

        return user;

    } catch (error) {
        throw error;
    }
}

export async function getUserById(id: string) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id,
            },
        });

        return user;

    } catch (error) {
        throw error;
    }
}