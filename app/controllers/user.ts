import { Request, Response } from 'express';
import { hash } from 'bcrypt';

const saltRounds: number = 8;

export async function getAllUsers(req: Request, res: Response) {
    try {
        const users = await req.prisma.user.findMany();
        res.status(200).json(users);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
}

export async function createUser(req: Request, res: Response) {
  console.log(req.body.firstName)
  try {
    const user = await req.prisma.user.create({
      data: {
        id: req.body.id,
        email: req.body.email,
        // password: await hash(req.body.password, 8),
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        identity: Boolean(req.body.identity),
      }
    });
    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
}

export async function getUserById(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const user = await req.prisma.user.findUnique({
      where: { 
        id: id, 
      },
    });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}

export async function updateUser(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const hashedPassword = req.body.password 
      ? await hash(req.body.password, saltRounds) 
      : null;
    const dataToUpdate = {
      ...req.body,
      ...(hashedPassword && { password: hashedPassword }),
    };
    const user = await req.prisma.user.update({
      where: { 
        id: id,
      },
      data: dataToUpdate,
    });
    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
}

export async function deleteUser(req: Request, res: Response) {
  const { id } = req.params;
  try {
    await req.prisma.user.delete({
      where: {
        id: id,
      }
    });
    res.status(204).send();
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}

export async function findPropertiesFromLikes(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const userWithLikes = await req.prisma.user.findUnique({
      where: {
        id: id, // Remplacez userId par l'identifiant de l'utilisateur recherché
      },
      include: {
        likes: {
          include: {
            propertie: true,
          },
        },
      },
    });
    
    res.status(204).send();
  } catch (error: any) {
    res.status(500).send(error.message);
  }

}