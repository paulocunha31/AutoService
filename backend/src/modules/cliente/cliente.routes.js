import { Router } from 'express';

import authMiddleware from '../../middlewares/auth.middleware.js';
import ClienteController from './cliente.controller.js';

const router = Router();

router.use(authMiddleware);

/**
 * @swagger
 * /clientes:
 *   post:
 *     summary: Cadastra um novo cliente
 *     tags:
 *       - Clientes
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cliente'
 *     responses:
 *       201:
 *         description: Cliente cadastrado com sucesso
 *       401:
 *         description: Token não informado, inválido ou expirado
 *       409:
 *         description: CPF/CNPJ já cadastrado
 */
router.post('/', ClienteController.create);

/**
 * @swagger
 * /clientes:
 *   get:
 *     summary: Lista todos os clientes
 *     tags:
 *       - Clientes
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de clientes
 *       401:
 *         description: Token não informado, inválido ou expirado
 */
router.get('/', ClienteController.findAll);

/**
 * @swagger
 * /clientes/{id}:
 *   get:
 *     summary: Busca um cliente pelo ID
 *     tags:
 *       - Clientes
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cliente encontrado
 *       401:
 *         description: Token não informado, inválido ou expirado
 *       404:
 *         description: Cliente não encontrado
 */
router.get('/:id', ClienteController.findById);

/**
 * @swagger
 * /clientes/{id}:
 *   put:
 *     summary: Atualiza um cliente
 *     tags:
 *       - Clientes
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cliente'
 *     responses:
 *       200:
 *         description: Cliente atualizado
 *       401:
 *         description: Token não informado, inválido ou expirado
 */
router.put('/:id', ClienteController.update);

/**
 * @swagger
 * /clientes/{id}:
 *   delete:
 *     summary: Desativa um cliente
 *     tags:
 *       - Clientes
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cliente desativado
 *       401:
 *         description: Token não informado, inválido ou expirado
 *       404:
 *         description: Cliente não encontrado
 */
router.delete('/:id', ClienteController.deactivate);

export default router;
