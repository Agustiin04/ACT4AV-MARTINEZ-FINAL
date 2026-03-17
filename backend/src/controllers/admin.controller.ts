
import { Request, Response } from 'express';
import { prisma } from '../utils/prisma';

export const makeAdmin = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: 'Email requerido' });
    }

    const user = await prisma.user.update({
      where: { email },
      data: { role: 'ADMIN' },
      select: {
        id: true,
        email: true,
        name: true,
        role: true
      }
    });
    
    res.json({ 
      success: true, 
      message: `Usuario ${email} ahora es admin`,
      user 
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};