import request from 'supertest';
import { expect } from 'chai';
import dotenv from 'dotenv';
import { obterToken } from '../helpers/autenticacao.js';
import postTransferencias from '../fixtures/postTransferencias.json' assert { type: 'json' };

dotenv.config();

describe('Transferências', () => {
    let token;

    beforeEach(async () => {
        token = await obterToken('julio.lima', '123456')
    });

    describe('POST /trasferencias', () => {
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

    describe('GET /transferencias/{id}', () => {
        it('Deve retornar sucesso com 200 e dados iguais ao registro contido no BD quando ID for válido', async () => {
            const resposta = await request(process.env.BASE_URL)
                .get('/transferencias/5')
                .set('Authorization', 'Bearer ' + token)
            console.log(resposta.status);
            console.log(resposta.body);
            expect(resposta.status).to.be.equal(200);
            expect(resposta.body.conta_origem_id).to.equal(1);
            expect(resposta.body.valor).to.equal(11.00); //Encontramos uma issue. Diff de tipagem de dado
        })
    })

    describe('GET /transferencias', () => {
        it('Deve retornar 10 elementos na paginação', async () => {
            const resposta = await request(process.env.BASE_URL)
                .get('/transferencias')
                .set('Authorization', 'Bearer ' + token)
            console.log(resposta.status);
            console.log(resposta.body);
            expect(resposta.status).to.be.equal(200);
            expect(resposta.body.limit).to.equal(10);
            expect(resposta.body.transferencias).to.have.lengthOf(10);
        })
    })
})