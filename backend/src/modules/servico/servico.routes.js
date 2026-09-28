import { Router } from 'express';

import authMiddleware from '../../middlewares/auth.middleware.js';
import ServicoController from './servico.controller.js';

const router = Router();

router.use(authMiddleware);

/**
 * @swagger
 * /servicos:
 *   post:
 *     summary: Cadastra um novo serviço
 *     tags:
 *       - Serviços
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Servico'
 *     responses:
 *       201:
 *         description: Serviço cadastrado com sucesso
 *       401:
 *         description: Token não informado, inválido ou expirado
 *       404:
 *         description: Categoria não encontrada
 *       409:
 *         description: Serviço já cadastrado
 */
router.post('/', ServicoController.create);

/**
 * @swagger
 * /servicos:
 *   get:
 *     summary: Lista todos os serviços
 *     tags:
 *       - Serviços
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de serviços
 *       401:
 *         description: Token não informado, inválido ou expirado
 */
router.get('/', ServicoController.findAll);

/**
 * @swagger
 * /servicos/{id}:
 *   get:
 *     summary: Busca um serviço pelo ID
 *     tags:
 *       - Serviços
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
 *         description: Serviço encontrado
 *       401:
 *         description: Token não informado, inválido ou expirado
 *       404:
 *         description: Serviço não encontrado
 */
router.get('/:id', ServicoController.findById);

/**
 * @swagger
 * /servicos/{id}:
 *   put:
 *     summary: Atualiza um serviço
 *     tags:
 *       - Serviços
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
 *             $ref: '#/components/schemas/Servico'
 *     responses:
 *       200:
 *         description: Serviço atualizado
 *       401:
 *         description: Token não informado, inválido ou expirado
 *       404:
 *         description: Serviço ou categoria não encontrada
 *       409:
 *         description: Serviço já cadastrado
 */
router.put('/:id', ServicoController.update);

/**
 * @swagger
 * /servicos/{id}:
 *   delete:
 *     summary: Desativa um serviço
 *     tags:
 *       - Serviços
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
 *         description: Serviço desativado
 *       401:
 *         description: Token não informado, inválido ou expirado
 *       404:
 *         description: Serviço não encontrado
 */
router.delete('/:id', ServicoController.deactivate);

export default router;
