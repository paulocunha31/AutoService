import { Router } from 'express';

import VeiculoController from './veiculo.controller.js';

const router = Router();

/**
 * @swagger
 * /veiculos:
 *   post:
 *     summary: Cadastra um novo veículo
 *     tags:
 *       - Veículos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Veiculo'
 *     responses:
 *       201:
 *         description: Veículo cadastrado com sucesso
 *       404:
 *         description: Cliente não encontrado
 *       409:
 *         description: Placa já cadastrada
 */
router.post('/', VeiculoController.create);

/**
 * @swagger
 * /veiculos:
 *   get:
 *     summary: Lista todos os veículos ativos
 *     tags:
 *       - Veículos
 *     responses:
 *       200:
 *         description: Lista de veículos
 */
router.get('/', VeiculoController.findAll);

/**
 * @swagger
 * /veiculos/{id}:
 *   get:
 *     summary: Busca um veículo pelo ID
 *     tags:
 *       - Veículos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Veículo encontrado
 *       404:
 *         description: Veículo não encontrado
 */
router.get('/:id', VeiculoController.findById);

/**
 * @swagger
 * /veiculos/{id}:
 *   put:
 *     summary: Atualiza um veículo
 *     tags:
 *       - Veículos
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
 *             $ref: '#/components/schemas/Veiculo'
 *     responses:
 *       200:
 *         description: Veículo atualizado
 *       404:
 *         description: Veículo não encontrado
 */
router.put('/:id', VeiculoController.update);

/**
 * @swagger
 * /veiculos/{id}:
 *   delete:
 *     summary: Desativa um veículo
 *     tags:
 *       - Veículos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Veículo desativado
 *       404:
 *         description: Veículo não encontrado
 */
router.delete('/:id', VeiculoController.deactivate);

export default router;
