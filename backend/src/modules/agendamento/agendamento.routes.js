import { Router } from 'express';

import AgendamentoController from './agendamento.controller.js';

const router = Router();

/**
 * @swagger
 * /agendamentos:
 *   post:
 *     summary: Cadastra um novo agendamento
 *     tags:
 *       - Agendamentos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Agendamento'
 *     responses:
 *       201:
 *         description: Agendamento cadastrado com sucesso
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Cliente, veículo ou serviço não encontrado
 */
router.post('/', AgendamentoController.create);

/**
 * @swagger
 * /agendamentos:
 *   get:
 *     summary: Lista todos os agendamentos
 *     tags:
 *       - Agendamentos
 *     responses:
 *       200:
 *         description: Lista de agendamentos
 */
router.get('/', AgendamentoController.findAll);

/**
 * @swagger
 * /agendamentos/{id}:
 *   get:
 *     summary: Busca um agendamento pelo ID
 *     tags:
 *       - Agendamentos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Agendamento encontrado
 *       404:
 *         description: Agendamento não encontrado
 */
router.get('/:id', AgendamentoController.findById);

/**
 * @swagger
 * /agendamentos/{id}:
 *   put:
 *     summary: Atualiza um agendamento
 *     tags:
 *       - Agendamentos
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
 *             $ref: '#/components/schemas/Agendamento'
 *     responses:
 *       200:
 *         description: Agendamento atualizado com sucesso
 *       404:
 *         description: Agendamento não encontrado
 */
router.put('/:id', AgendamentoController.update);

/**
 * @swagger
 * /agendamentos/{id}:
 *   delete:
 *     summary: Cancela um agendamento
 *     tags:
 *       - Agendamentos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Agendamento cancelado com sucesso
 *       404:
 *         description: Agendamento não encontrado
 */

router.delete('/:id', AgendamentoController.cancel);

export default router;
