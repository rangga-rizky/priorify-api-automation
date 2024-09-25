import request from 'supertest';
import {expect} from 'chai';
import 'dotenv/config';
import boardData from '../test_data/board.json' assert { type: 'json' };

describe('Create Board Success', () => {
	const baseurl = process.env.BASE_URL;
	it('should return 200 and return correct board', (done) => {
		request(baseurl)
			.post('/boards')
			.send(boardData)
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/json')
            .set('Authorization', process.env.ACCESS_TOKEN)
			.end(function (err, res) {
				expect(res.statusCode).to.be.equal(200);
				expect(res.body.data.title).to.be.equal(boardData.title);
				expect(res.body.data.createdAt).to.not.be.null;
				done();
			});
	});
});

describe('Create Board Without access Token', () => {
	const baseurl = process.env.BASE_URL;
	it('should return 401', (done) => {
		request(baseurl)
		    .post('/boards')
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/json')
			.end(function (err, res) {
				expect(res.statusCode).to.be.equal(401);
				done();
			});
	});
});


describe('Create Board Without name in Body', () => {
	const baseurl = process.env.BASE_URL;
	it('should return 401', (done) => {
		request(baseurl)
		    .post('/boards')
			.send({})
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/json')
			.set('Authorization', process.env.ACCESS_TOKEN)
			.end(function (err, res) {
				expect(res.statusCode).to.be.equal(400);
				done();
			});
	});
});