import { Router } from 'express';

import ServicoController from './servico.controller.js';

const router = Router();

/**
 * @swagger
 * /servicos:
 *   post:
 *     summary: Cadastra um novo serviço
 *     tags:
 *       - Serviços
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Servico'
 *     responses:
 *       201:
 *         description: Serviço cadastrado com sucesso
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
 *     responses:
 *       200:
 *         description: Lista de serviços
 */
router.get('/', ServicoController.findAll);

/**
 * @swagger
 * /servicos/{id}:
 *   get:
 *     summary: Busca um serviço pelo ID
 *     tags:
 *       - Serviços
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Serviço encontrado
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
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Serviço desativado
 *       404:
 *         description: Serviço não encontrado
 */
router.delete('/:id', ServicoController.deactivate);

export default router;
