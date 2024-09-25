import request from "supertest";
import {expect} from "chai";
import 'dotenv/config'

describe('Get Note Success', () => {
	const baseurl = process.env.BASE_URL;
	it('should return 200 and correct board', (done) => {
		request(baseurl)
			.get('/notes/1')
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/json')
            .set('Authorization', process.env.ACCESS_TOKEN)
			.end(function (err, res) {
				expect(res.statusCode).to.be.equal(200);
				expect(res.body.data.id).to.be.equal(1);
				expect(res.body.data.title).to.be.equal("tes");
				expect(res.body.data.createdAt).to.not.be.null;
				done();
			});
	});
});

describe('Get Note Without access Token', () => {
	const baseurl = process.env.BASE_URL;
	it('should return 401', (done) => {
		request(baseurl)
			.get('/notes/1')
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/json')
			.end(function (err, res) {
				expect(res.statusCode).to.be.equal(401);
				done();
			});
	});
});