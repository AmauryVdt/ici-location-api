import { Request } from 'express';
import { clerkClient } from '@clerk/clerk-sdk-node';

const checkUser = async (req: Request): Promise<Boolean> =>  {
    const { prisma, auth } = req;

    if (!auth.userId) {
        // Unauthorized
        return false;
    }
    else {
        if (!(await prisma.user.findUnique({ where: { id: auth.userId } }))) {
            const clerkUser = await clerkClient.users.getUser(auth.userId);
            const username = clerkUser.username ? clerkUser.username : clerkUser.emailAddresses[0].emailAddress.split('@', 1)[0];
            await prisma.user.create({
                data: {
                    id: clerkUser.id,
                    email: clerkUser.emailAddresses[0].emailAddress,
                    username,
                },
            });
        }
        // Ok
        return true;
    }
}

export default checkUser;