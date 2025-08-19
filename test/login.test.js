import request from 'supertest';
import { expect } from 'chai';
import dotenv from 'dotenv';
dotenv.config();

describe('login', () => {
    describe('POST /login', () => {
        it('Deve retornar 200 com um token em uma string quando ', async () => {
            const resposta = await request(process.env.BASE_URL)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send({
                    username:'julio.lima',
                    senha: '123456'
                })
            expect(resposta.status).to.be.equal(200);
            expect(resposta.body.token).to.be.a('string');
        })
    })
})