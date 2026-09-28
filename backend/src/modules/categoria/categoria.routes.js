import { Router } from 'express';

import authMiddleware from '../../middlewares/auth.middleware.js';
import CategoriaController from './categoria.controller.js';

const router = Router();

router.use(authMiddleware);

/**
 * @swagger
 * /categorias:
 *   post:
 *     summary: Cadastra uma nova categoria
 *     tags:
 *       - Categorias
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Categoria'
 *     responses:
 *       201:
 *         description: Categoria cadastrada com sucesso
 *       401:
 *         description: Token não informado, inválido ou expirado
 *       409:
 *         description: Categoria já cadastrada
 */
router.post('/', CategoriaController.create);

/**
 * @swagger
 * /categorias:
 *   get:
 *     summary: Lista todas as categorias
 *     tags:
 *       - Categorias
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de categorias
 *       401:
 *         description: Token não informado, inválido ou expirado
 */
router.get('/', CategoriaController.findAll);

/**
 * @swagger
 * /categorias/{id}:
 *   get:
 *     summary: Busca uma categoria pelo ID
 *     tags:
 *       - Categorias
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
 *         description: Categoria encontrada
 *       401:
 *         description: Token não informado, inválido ou expirado
 *       404:
 *         description: Categoria não encontrada
 */
router.get('/:id', CategoriaController.findById);

/**
 * @swagger
 * /categorias/{id}:
 *   put:
 *     summary: Atualiza uma categoria
 *     tags:
 *       - Categorias
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
 *             $ref: '#/components/schemas/Categoria'
 *     responses:
 *       200:
 *         description: Categoria atualizada
 *       401:
 *         description: Token não informado, inválido ou expirado
 *       404:
 *         description: Categoria não encontrada
 */
router.put('/:id', CategoriaController.update);

/**
 * @swagger
 * /categorias/{id}:
 *   delete:
 *     summary: Desativa uma categoria
 *     tags:
 *       - Categorias
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
 *         description: Categoria desativada
 *       401:
 *         description: Token não informado, inválido ou expirado
 *       404:
 *         description: Categoria não encontrada
 */
router.delete('/:id', CategoriaController.deactivate);

export default router;
