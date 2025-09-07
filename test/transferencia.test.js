import request from 'supertest';
import { expect } from 'chai';
import dotenv from 'dotenv';
import { obterToken } from '../helpers/autenticacao.js';
import postTransferencias from '../fixtures/postTransferencias.json' assert { type: 'json' };

dotenv.config();

describe('Transferências', () => {
    describe('POST /trasferencias', () => {
        let token;

        beforeEach(async () => {
            token = await obterToken('julio.lima', '123456')
        });
        it('Deve retornar sucesso com 201 quando o valor de transferência for igual ou acima de R$10,00', async () => {
            const bodyTransferencias = { ...postTransferencias};
            
            const resposta = await request(process.env.BASE_URL)
                    .post('/transferencias')
                    .set('Content-Type', 'application/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(bodyTransferencias)
                expect(resposta.status).to.be.equal(201);
                console.log(resposta.body);
        })
        it('Deve retornar falha com 422 quando o valor de transferência for abaixo de R$10,00', async () => {            
            const bodyTransferencias = { ...postTransferencias};
            bodyTransferencias.valor = 7;

            const resposta = await request(process.env.BASE_URL)
                    .post('/transferencias')
                    .set('Content-Type', 'application/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(bodyTransferencias)
                expect(resposta.status).to.be.equal(422);
                console.log(resposta.body);
        })
    })
})