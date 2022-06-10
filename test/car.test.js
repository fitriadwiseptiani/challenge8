const request = require('supertest')
const app = require('../app')
const bcrypt = require('bcryptjs');
const { Car, User } = require('../app/models')

const carId = Math.floor(Math.random() * 96)

describe('GET: /v1/cars', () => {
  it('It should return 200 Status Code', async () => {
    const response = await request(app).get('/v1/cars')
    expect(response.statusCode).toEqual(200)
  })
})

describe('POST: /v1/cars', () => {
  let token
  let admin
  const email = 'admin@gmail.com'
  const password = 'admin'
  beforeEach(async () => {
    admin = await User.create({
      name: 'Admin',
      email: email,
      encryptedPassword: bcrypt.hashSync(password, 10),
      roleId: 2
    })
    // console.log(admin)
    return request(app)
      .post('/v1/auth/login')
      .set("Content-Type", "application/json")
      .send({ email, password })
      .then((res) => {
        token = res.body.accessToken
      })
  });
  it('It should return 201 Status Code', () => {
    const name = 'Example'
    const price = 200000
    const image = 'img.com/example'
    const size = 'example'

    return request(app)
      .post('/v1/cars')
      .set('Authorization', `Bearer ${token}`)
      .send({ name, price, image, size })
      .then((res) => {
        expect(res.statusCode).toBe(201)
      })
  })
})

describe('GET: /v1/cars/:id', () => {
  it('It should return 200 Status Code', async () => {
    const response = await request(app).get(`/v1/cars/${carId}`)
    expect(response.statusCode).toEqual(200)
  })
})

// describe('POST: /v1/cars/:id/rent', () => {
//   let custToken
//   const email = 'jayabaya@binar.co.id'
//   const password = '123456'
//   beforeEach(() => {
//     return request(app)
//       .post('/v1/auth/login')
//       .set("Content-Type", "application/json")
//       .send({ email, password })
//       .then((res) => {
//         custToken = res.body.accessToken
//       })
//   });
//   it('It should return 201 Status Code', () => {
//     const idCar = carId
//     const idUser = 5
//     const rentStartedAt = '2022-06-06T17:11:34.568Z'
//     const rentEndedAt = '2022-06-06T17:11:34.568Z'

//     return request(app)
//       .post(`/v1/cars/${idCar}/rent`)
//       .set('Authorization', `Bearer ${custToken}`)
//       .send({ idCar, idUser, rentStartedAt, rentEndedAt })
//       .then((res) => {
//         expect(res.statusCode).toBe(200)
//       })
//   })
// })

describe('PUT: /v1/cars/:id', () => {
  let car
  let token
  const email = 'admin@gmail.com'
  const password = 'admin'
  beforeEach(async () => {
    car = await Car.create({
      name: 'Example 1',
      price: 100000,
      image: 'img.com/example1',
      size: 'example1',
      isCurrentlyRented: false
    })
    return request(app)
      .post('/v1/auth/login')
      .set("Content-Type", "application/json")
      .send({ email, password })
      .then((res) => {
        token = res.body.accessToken
      })
  })
  it('It should return 200 Status Code', () => {
    const name = 'Example Updated'
    const price = 250000
    const image = 'img.com/exampleupdated'
    const size = 'updated'

    return request(app)
      .put(`/v1/cars/${car.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name, price, image, size })
      .then((res) => {
        expect(res.statusCode).toBe(200)
      })
  })
})

describe('DELETE: /v1/cars/:id', () => {
  let car
  let token
  const email = 'admin@gmail.com'
  const password = 'admin'
  beforeEach(async () => {
    car = await Car.create({
      name: 'Example 1',
      price: 100000,
      image: 'img.com/example1',
      size: 'example1'
    })
    return request(app)
      .post('/v1/auth/login')
      .set("Content-Type", "application/json")
      .send({ email, password })
      .then((res) => {
        token = res.body.accessToken
      })
  })

  it('It should return 204 Status Code', () => {
    return request(app)
      .delete('/v1/cars/' + car.id)
      .set('Authorization', `Bearer ${token}`)
      .then((res) => {
        expect(res.statusCode).toBe(204)
      })
  })
})
