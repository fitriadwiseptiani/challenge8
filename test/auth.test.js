const request = require('supertest')
const app = require('../app')

describe('POST: /v1/auth/register', () => {
    it('It should return 201 status code', () => {
        const name = 'Kelompok3'
        const email = 'k3@gmail.com'
        const password = 'kelompok3'

        return request(app)
            .post('/v1/auth/register')
            .send({ name, email, password })
            .then((res) => {
                expect(res.statusCode).toBe(201)
            })
    })
})

describe('POST: /v1/auth/login', () => {
    it('It should return 200 status code', () => {
        const email = 'k3@gmail.com'
        const password = 'kelompok3'

        return request(app)
            .post('/v1/auth/login')
            .set("Content-Type", "application/json")
            .send({ email, password })
            .then((res) => {
                expect(res.statusCode).toBe(200)
            })
    })
})

describe('GET: /v1/auth/whoami', () => {
    let token
    const email = 'jayabaya@binar.co.id'
    const password = '123456'
    beforeEach(() => {
        return request(app)
            .post('/v1/auth/login')
            .set("Content-Type", "application/json")
            .send({ email, password })
            .then((res) => {
                token = res.body.accessToken
            })
    });

    it('It should return 200 status code', () => {
        return request(app)
            .get('/v1/auth/whoami')
            .set('Authorization', `Bearer ${token}`)
            .then((response) => {
                expect(response.statusCode).toBe(200)
            })
    })
})