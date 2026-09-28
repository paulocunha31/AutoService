import { Router } from 'express';

import authMiddleware from '../../middlewares/auth.middleware.js';
import ProdutoController from './produto.controller.js';

const router = Router();

router.use(authMiddleware);

/**
 * @swagger
 * /produtos:
 *   post:
 *     summary: Cadastra um novo produto
 *     tags:
 *       - Produtos
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Produto'
 *     responses:
 *       201:
 *         description: Produto cadastrado com sucesso
 *       401:
 *         description: Token não informado, inválido ou expirado
 *       404:
 *         description: Categoria não encontrada
 *       409:
 *         description: Produto já cadastrado
 */
router.post('/', ProdutoController.create);

/**
 * @swagger
 * /produtos:
 *   get:
 *     summary: Lista todos os produtos
 *     tags:
 *       - Produtos
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de produtos
 *       401:
 *         description: Token não informado, inválido ou expirado
 */
router.get('/', ProdutoController.findAll);

/**
 * @swagger
 * /produtos/{id}:
 *   get:
 *     summary: Busca um produto pelo ID
 *     tags:
 *       - Produtos
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
 *         description: Produto encontrado
 *       401:
 *         description: Token não informado, inválido ou expirado
 *       404:
 *         description: Produto não encontrado
 */
router.get('/:id', ProdutoController.findById);

/**
 * @swagger
 * /produtos/{id}:
 *   put:
 *     summary: Atualiza um produto
 *     tags:
 *       - Produtos
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
 *             $ref: '#/components/schemas/Produto'
 *     responses:
 *       200:
 *         description: Produto atualizado
 *       401:
 *         description: Token não informado, inválido ou expirado
 *       404:
 *         description: Produto não encontrado
 *       409:
 *         description: Produto já cadastrado
 */
router.put('/:id', ProdutoController.update);

/**
 * @swagger
 * /produtos/{id}:
 *   delete:
 *     summary: Desativa um produto
 *     tags:
 *       - Produtos
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
 *         description: Produto desativado
 *       401:
 *         description: Token não informado, inválido ou expirado
 *       404:
 *         description: Produto não encontrado
 */
router.delete('/:id', ProdutoController.deactivate);

export default router;
