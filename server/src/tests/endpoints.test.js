const request = require('supertest')
const app = require('../server.js')
const mysql = require('mysql')

const pool = mysql.createPool({
    host: "localhost",
    port: "3306",
    user: 'root',
    multipleStatements: true,
});

describe('Simple Endpoint Test', () => {
    it('BASIC MAIN ROUTE/CONNECTION TEST', async (done) => {
        const res = await request(app)
        .get('/')
        .set('Accept', 'application/json')
        expect(res.statusCode).toEqual(200)
        done();
    })
    it('BASIC MAIN ROUTE/CONNECTION TEST', async (done) => {
        const res = await request(app)
        .get('/api/')
        .set('Accept', 'application/json')
        expect(res.statusCode).toEqual(200)
        done();
    })
    it('BASIC MAIN ROUTE/CONNECTION TEST', async (done) => {
        const res = await request(app)
        .get('/api')
        .set('Accept', 'application/json')
        expect(res.statusCode).toEqual(200)
        done();
    })
    it('BASIC MAIN ROUTE/CONNECTION TEST', async (done) => {
        const res = await request(app)
        .get('/api/turtles')
        .set('Accept', 'application/json')
        expect(res.statusCode).toEqual(404)
        done();
    })
    it('BASIC MAIN ROUTE/CONNECTION TEST', async (done) => {
        const res = await request(app)
        .get('/api/turtles/')
        .set('Accept', 'application/json')
        expect(res.statusCode).toEqual(404)
        done();
    })
})

describe('Post Endpoints', () => {
    it('should create a new post', async (done) => {
        const res = await request(app)
        .post('/api/posts/')
        .set('Accept', 'application/json')
        .send({
            content: "URURURURUR",
            user_id: 2,
        })
        expect(res.statusCode).toEqual(200)
        done();
    })
    it('should create a new comment', async (done) => {
        const res = await request(app)
        .post('/api/comments/')
        .set('Accept', 'application/json')
        .send({
            comment: "OKURRRRR",
            post_id: 2,
            user_id: 2,
        })
        expect(res.statusCode).toEqual(200)
        done();
    })
    it('should NOT create a new post', async (done) => {
        const res = await request(app)
        .post('/api/posts/')
        .set('Accept', 'application/json')
        .send({
            user_id: 2,
        })
        expect(res.statusCode).toEqual(403)
        done();
    })
    it('should NOT create a new post', async (done) => {
        const res = await request(app)
        .post('/api/posts/')
        .set('Accept', 'application/json')
        .send({
        })
        expect(res.statusCode).toEqual(403)
        done();
    })
    it('should NOT create a new comment', async (done) => {
        const res = await request(app)
        .post('/api/comments/')
        .set('Accept', 'application/json')
        .send({
            post_id: 2,
            user_id: 2,
        })
        expect(res.statusCode).toEqual(403)
        done();
    })

    it('should NOT create a new comment', async (done) => {
        const res = await request(app)
        .post('/api/comments/')
        .set('Accept', 'application/json')
        .send({
        })
        expect(res.statusCode).toEqual(403)
        done();
    })
})
describe("Get endpoints", () => {
    it('should return comments', async (done) => {
        const res = await request(app)
        .get('/api/comments/')
        .set('Accept', 'application/json')
        .send({
            page: 0
        })
        expect(res.statusCode).toEqual(200)
        done();
    })
    it('should return posts', async (done) => {
        const res = await request(app)
        .get('/api/comments/')
        .set('Accept', 'application/json')
        .send({
            page: 0
        })
        expect(res.statusCode).toEqual(200)
        done();
    })
    it('should NOT return comments', async (done) => {
        const res = await request(app)
        .get('/api/comments/')
        .set('Accept', 'application/json')
        .send({
        })
        expect(res.statusCode).toEqual(403)
        done();
    })
    it('should NOT return posts', async (done) => {
        const res = await request(app)
        .get('/api/comments/')
        .set('Accept', 'application/json')
        .send({
        })
        expect(res.statusCode).toEqual(403)
        done();
    })
})

describe("Clean and Remove Database", () => {
    it('should clean and remove database', async (done) => {
        pool.query('drop database mydb', (err, results) => {
            expect(err).toEqual(null)
            done();
        })
    })
})