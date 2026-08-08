import { Router } from 'express';

import ProdutoController from './produto.controller.js';

const router = Router();

/**
 * @swagger
 * /produtos:
 *   post:
 *     summary: Cadastra um novo produto
 *     tags:
 *       - Produtos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Produto'
 *     responses:
 *       201:
 *         description: Produto cadastrado com sucesso
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
 *     responses:
 *       200:
 *         description: Lista de produtos
 */
router.get('/', ProdutoController.findAll);

/**
 * @swagger
 * /produtos/{id}:
 *   get:
 *     summary: Busca um produto pelo ID
 *     tags:
 *       - Produtos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Produto encontrado
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
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Produto desativado
 *       404:
 *         description: Produto não encontrado
 */
router.delete('/:id', ProdutoController.deactivate);

export default router;
