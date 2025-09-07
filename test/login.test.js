import request from 'supertest';
import { expect } from 'chai';
import dotenv from 'dotenv';
dotenv.config();
import postLogin from '../fixtures/postLogin.json' assert { type: 'json' };

describe('login', () => {
    describe('POST /login', () => {
        it('Deve retornar 200 com um token em uma string quando ', async () => {
            const meuLogin = { ...postLogin};

            const resposta = await request(process.env.BASE_URL)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send(meuLogin)
            expect(resposta.status).to.be.equal(200);
            expect(resposta.body.token).to.be.a('string');
        })
    })
})