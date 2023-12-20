// tests/test.js

const request = require('supertest');
const app = require('../app');
const uuid = require('uuid');
const { expect } = require('jest');

describe('API Tests', () => {
    it('should get all records with a GET api/users request (an empty array is expected)', async () => {
        const response = await request(app).get('/api/users');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
    });

    it('should create a new user with a POST api/users request', async () => {
        const newUser = {
            username: 'TestUser',
            age: 25,
            hobbies: ['Testing', 'Coding'],
        };

        const response = await request(app)
        .post('/api/users')
        .send(newUser);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.username).toBe(newUser.username);
        expect(response.body.age).toBe(newUser.age);
        expect(response.body.hobbies).toEqual(newUser.hobbies);
    });

    it('should update an existing user with a PUT api/users/{userId} request', async () => {
        const existingUser = {
            id: uuid.v4(),
            username: 'ExistingUser',
            age: 30,
            hobbies: ['Reading', 'Traveling'],
        };

        users.push(existingUser);

        const updatedUserData = {
            username: 'UpdatedUser',
            age: 35,
            hobbies: ['NewHobby'],
        };

        const response = await request(app)
        .put(`/api/users/${existingUser.id}`)
        .send(updatedUserData);

        expect(response.status).toBe(200);
        expect(response.body.id).toBe(existingUser.id);
        expect(response.body.username).toBe(updatedUserData.username);
        expect(response.body.age).toBe(updatedUserData.age);
        expect(response.body.hobbies).toEqual(updatedUserData.hobbies);
    });
});
