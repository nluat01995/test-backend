const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); // Your Express app

chai.use(chaiHttp);
const expect = chai.expect;
describe('Login', () => {
    it('should login a user and return a valid JWT token', (done) => {
        chai.request(app)
            .post('/sign-in')
            .send({
                email: "nlu6teees12454@gmail.com",
                password: "abc125eer3",
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });
});
describe('Register', () => {
    it('should register a new user and return a 200 Created status', (done) => {
        chai.request(app)
            .post('/sign-up')
            .send({
                email: "nlus72es12454@gmail.com",
                password: "abc125eer3",
                firstName: "Luật",
                lastName: "Nguyễn Văn"

            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });

    it('the email is exist send code 1001', (done) => {
        chai.request(app)
            .post('/sign-up')
            .send({
                email: "nlus72es12454@gmail.com",
                password: "abc125eer3",
                firstName: "Luật",
                lastName: "Nguyễn Văn"
            })
            .end((err, res) => {
                expect(res).to.have.status(1001);
                done();
            });
    });

});
describe('Sign Out', () => {
    it('should invalidate the user token upon sign-out', (done) => {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsImZpcnN0TmFtZSI6Ikx1P3QiLCJsYXN0TmFtZSI6Ik5ndXk_biBWP24iLCJlbWFpbCI6Im5sdTZ0ZWVlczEyNDU0QGdtYWlsLmNvbSIsImlhdCI6MTY5Nzc5MzAyNiwiZXhwIjoxNjk3Nzk2NjI2fQ.fm6PnW8qjJqX87O0-vTu4HyCaGSORjsW5UAyHqZ8OvE'; // Replace with a valid token
        chai.request(app)
            .post('/sign-out')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });
});


describe('refreshToken', () => {
    it('refresh token ', (done) => {
        chai.request(app)
            .post('/refresh-token')
            .send({
                refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsImZpcnN0TmFtZSI6Ikx1P3QiLCJsYXN0TmFtZSI6Ik5ndXk_biBWP24iLCJlbWFpbCI6Im5sdTZ0ZWVlczEyNDU0QGdtYWlsLmNvbSIsImlhdCI6MTY5Nzc4OTkzOSwiZXhwIjoxNzAwMzgxOTM5fQ.A6ko_NxA2mFZmZpT_O7kooCKXDXTMLqOeFTB2NTJT6Q"
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });

});

