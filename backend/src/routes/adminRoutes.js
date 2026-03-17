const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { authenticate, authorize } = require('../middlewares/auth.middleware');

router.post('/make-admin', 
  authenticate,
  authorize('admin'),
  async (req, res) => {
    try {
      const { email } = req.body;
      
      if (!email) {
        return res.status(400).json({ error: 'Email requerido' });
      }

      const user = await prisma.user.update({
        where: { email },
        data: { role: 'admin' }
      });
      
      res.json({ 
        success: true, 
        message: `Usuario ${email} ahora es admin`,
        user 
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

module.exports = router;