"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
// import app from '../index';
const globals_1 = require("@jest/globals");
const dummyData_1 = __importDefault(require("./dummyData"));
const express_1 = __importDefault(require("express"));
// import morgan from 'morgan';
const cors_1 = __importDefault(require("cors"));
const router_1 = __importDefault(require("../router/router"));
const mongoose_1 = __importDefault(require("mongoose"));
(0, globals_1.describe)('API CALLS', () => {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)()).use(express_1.default.json());
    app.use(router_1.default);
    const supertest = (0, supertest_1.default)(app);
    (0, globals_1.it)('Started testing', () => {
        (0, globals_1.expect)(true).toBe(true);
    });
    (0, globals_1.test)('should return 404 for / since it has no end point', async () => {
        const response = await supertest.get('/');
        (0, globals_1.expect)(response.status).toBe(404);
    });
    (0, globals_1.describe)('Plants', () => {
        (0, globals_1.test)('get /Plants should return 200 OK and first plant should be latin: Aeschynanthus lobianus', async () => {
            const response = await supertest.get('/plants');
            console.log('GetResponse', response.body[0].id);
            (0, globals_1.expect)(response.status).toBe(200);
            (0, globals_1.expect)(response.body[0].latin).toBe('Aeschynanthus lobianus');
        });
    });
    (0, globals_1.describe)('USER', () => {
        let userId;
        (0, globals_1.test)('post /user should create a new user', async () => {
            const missingUserData = dummyData_1.default.missingUserData;
            const correctUserData = dummyData_1.default.correctUserData;
            const responseMissingData = await supertest
                .post('/user')
                .send(missingUserData);
            (0, globals_1.expect)(responseMissingData.status).toBe(400);
            const responseCorrectUserData = await supertest
                .post('/user')
                .send(correctUserData);
            (0, globals_1.expect)(responseCorrectUserData.status).toBe(201);
            userId = responseCorrectUserData.body.userId;
        });
        (0, globals_1.test)('User should be able to add a plant', async () => {
            const missingIncorrectPlantData = dummyData_1.default.missingIncorrectPlantData;
            const correctPlantData = dummyData_1.default.correctPlantData;
            const responseMissingIncorrectPlantData = await supertest
                .put('/user/plant')
                .set('userid', userId)
                .send(missingIncorrectPlantData);
            (0, globals_1.expect)(responseMissingIncorrectPlantData.status).toBe(400);
            const responseCorrectPlantData = await supertest
                .put('/user/plant')
                .set('userid', userId)
                .send(correctPlantData);
            (0, globals_1.expect)(responseCorrectPlantData.status).toBe(201);
        });
        (0, globals_1.test)(`User should be deleted`, async () => {
            // const response = await supertest.delete('/user').set('userid', userId);
            // expect(response.status).toBe(201);
            const response2 = await supertest.delete('/user').set('userid', userId);
            (0, globals_1.expect)(response2.status).toBe(404);
        });
    });
    (0, globals_1.afterAll)(async () => {
        await mongoose_1.default.disconnect();
        app.listen().close();
    });
});
