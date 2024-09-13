import request from "supertest";
import {expect} from "chai";
import 'dotenv/config'

describe('Get Board Success', () => {
	const baseurl = process.env.BASE_URL;
	it('should return 200 and correct board', (done) => {
		request(baseurl)
			.get('/boards')
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/json')
            .set('Authorization', process.env.ACCESS_TOKEN)
			.end(function (err, res) {
				expect(res.statusCode).to.be.equal(200);
				done();
			});
	});
});

describe('Get Board Without access Token', () => {
	const baseurl = process.env.BASE_URL;
	it('should return 401', (done) => {
		request(baseurl)
			.get('/boards')
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/json')
			.end(function (err, res) {
				expect(res.statusCode).to.be.equal(401);
				done();
			});
	});
});