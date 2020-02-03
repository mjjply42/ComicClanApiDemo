const request = require('supertest')
const app = require('../server.js')

describe('Sample Test', () => {
    it('should test that true === true', () => {
        expect(true).toBe(true)
    })
})

describe('Post Endpoints', () => {
    it('should create a new post', async (done) => {
        const res = await request(app)
        .post('/api/posts/')
        .set('Accept', 'application/json')
        .send({
            content: "This is a new one here dawg",
            image_link: "N/A",
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
            image_link: "N/A",
            user_id: 2,
        })
        expect(res.statusCode).toEqual(403)
        done();
    })
    it('should create a new comment', async (done) => {
        const res = await request(app)
        .post('/api/comments/')
        .set('Accept', 'application/json')
        .send({
            comment: "This is a new one here dawg",
            post_id: 2,
            image_link: "N/A",
            user_id: 2,
        })
        expect(res.statusCode).toEqual(200)
        done();
    })
    it('should NOT create a new comment', async (done) => {
        const res = await request(app)
        .post('/api/comments/')
        .set('Accept', 'application/json')
        .send({
            post_id: 2,
            image_link: "N/A",
            user_id: 2,
        })
        expect(res.statusCode).toEqual(403)
        done();
    })
    /*it('should create a new user', async (done) => {
        const res = await request(app)
        .post('/api/signup/')
        .set('Accept', 'application/json')
        .send({
            user_name: "born",
            password: "1234567890"
        })
        expect(res.statusCode).toEqual(200)
        expect(res.body['auth']).toEqual(true)
        done();
    })
    it('should login user', async (done) => {
        const res = await request(app)
        .post('/api/login/')
        .set('Accept', 'application/json')
        .send({
            user_name: "born",
            password: "1234567890"
        })
        expect(res.statusCode).toEqual(200)
        expect(res.body['auth']).toEqual(true)
        done();
    })*/
})