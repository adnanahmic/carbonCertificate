import express from "express";
import createHttpError from "http-errors";
import userRoute from "../../src/routes/userRoutes";
import mongoose from "mongoose";
import { DB, PORT, TEST_PORT, TEST_DB } from "../../src/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import request  from "supertest";
import { errorHandler } from "../../src/middleware/errorHanlder";
import passport from "passport";
import kPassport from "../../src/middleware/passport";
import jwt_decode from "jwt-decode";


const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
kPassport(passport);




app.use("/user", userRoute);

app.use(() => {
  throw createHttpError(404, "Route not found");
});

beforeAll(() => {
  // Configuuring Port
  app.listen(TEST_PORT, () => {
    console.log(`app listening at ${TEST_PORT}`)
  })

  mongoose
  .connect(TEST_DB)
  .then(() => {
    console.log("Connected to db");
  })
  .catch(() => {
    throw createHttpError(501, "Unable to connect database");
  });
})

beforeEach(function () {
  jest.setTimeout(10000)
})

// Data & Payload
const userPayload = {
  name: Math.random().toString(36).substring(2, 10+2),
  email: Math.random().toString(36).substring(2, 10+2)+`@gmail.com`,
  password: 'password'
}
const seconduserPayload = {
  name: Math.random().toString(36).substring(2, 10+2),
  email: Math.random().toString(36).substring(2, 10+2)+`@gmail.com`,
  password: 'password'
}
let data: any;
let user: any;
let usertotransfer: any;
let token: any;
let certificate: any;

//User Test Cases
it('Create User', async () => {
  const response = await request(app).post('/user/signup').send(userPayload)
  user = response.body 
  expect(response.body.success).toBe(true) 
 
})

it('Create second User for transfer certificate', async () => {
  const response = await request(app).post('/user/signup').send(seconduserPayload)
  usertotransfer = response.body
  expect(response.body.success).toBe(true) 
})

 it('verify User', async() => {
   const response = await request(app).post('/user/verify-user-mail').send({token: user.token})
   expect(response.body.success).toBe(true) 
 })

 it('verify second User for transfer certificate', async() => {
  const response = await request(app).post('/user/verify-user-mail').send({token: usertotransfer.token})
  expect(response.body.success).toBe(true) 
})

 it('User Signin', async() => {
  const response = await request(app).post('/user/signin').send({email: userPayload.email, password: userPayload.password})
  token = response.body.token
  user.id = response.body.id
  expect(response.body.success).toBe(true) 
 })

 it('Second User Signin to transfer carbon certificate', async() => {
  const response = await request(app).post('/user/signin').send({email: seconduserPayload.email, password: seconduserPayload.password})
  usertotransfer.id = response.body.id
  expect(response.body.success).toBe(true) 
 })

//Carbon certificate Test Cases
it('Create Carbon Certificate', async () => {
  const response = await request(app).post('/user/create-certificate').set({ Authorization: `Bearer ${token}`,Cookie:`jwt=${token}`}).send({country: "Canada", owner: user.id})
  certificate = response.body.data
  expect(response.body.success).toBe(true)
})


it('Available Carbon Certificate', async () => {
   const response = await request(app).get('/user/available-certificates').set({ Authorization: `Bearer `+token,Cookie:`jwt=${token}`}).send()
  expect(response.body.success).toBe(true);
  })

it('Owned Carbon Certificate', async () => {
  const response = await request(app).get('/user/owned-certificates').set({ Authorization: `Bearer `+token,Cookie:`jwt=${token}`}).send({})
  expect(response.body.success).toBe(true);
  })

it('Seed', async () => {
  const response = await request(app).get('/user/seed').set({ Authorization: `Bearer ${token}`,Cookie:`jwt=${token}`}).send()
  expect(response.status).toBe(200)
  })

it('Transfer Certificate', async () => {
  const response = await request(app).post('/user/transfer-certificate').set({ Authorization: `Bearer ${token}`,Cookie:`jwt=${token}`}).send({transferToUser: usertotransfer.id, certificateId:certificate._id})
  expect(response.body.success).toBe(true)
  })





