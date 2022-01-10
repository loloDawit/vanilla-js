const server = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = require('chai');

const should = chai.should();

chai.use(chaiHttp);

describe('Store', () => {
  describe('/GET stores', () => {
    it('it should Get all the stores with 200 success code.', (done) => {
      chai
        .request(server)
        .get('/api/v1/stores')
        .end((err, res) => {
          res.should.have.status(200);
        });
      done();
    });
    it('it should Get all the stores as an array of objects. ', (done) => {
      chai
        .request(server)
        .get('/api/v1/stores')
        .end((err, res) => {
          res.body.should.be.a('array');
        });
      done();
    });
    it('it should have an object key with storeNo.', (done) => {
      chai
        .request(server)
        .get('/api/v1/stores')
        .end((err, res) => {
          var result = res.body;
          result.forEach((element) => {
            expect(element).to.have.property('storeNo');
          });
        });
      done();
    });
    it('it should have an object key with storeName.', (done) => {
      chai
        .request(server)
        .get('/api/v1/stores')
        .end((err, res) => {
          var result = res.body;
          result.forEach((element) => {
            expect(element).to.have.property('storeName');
          });
        });
      done();
    });
    it('it should have an object key with contact.', (done) => {
      chai
        .request(server)
        .get('/api/v1/stores')
        .end((err, res) => {
          var result = res.body;
          result.forEach((element) => {
            expect(element).to.have.property('contact');
          });
        });
      done();
    });
    it('it should have an object key with location.', (done) => {
      chai
        .request(server)
        .get('/api/v1/stores')
        .end((err, res) => {
          var result = res.body;
          result.forEach((element) => {
            expect(element).to.have.property('location');
          });
        });
      done();
    });
    it('it should have an object key with businessType.', (done) => {
      chai
        .request(server)
        .get('/api/v1/stores')
        .end((err, res) => {
          var result = res.body;
          result.forEach((element) => {
            expect(element).to.have.property('businessType');
          });
        });
      done();
    });
    it('it should have an object key with store_open_date.', (done) => {
      chai
        .request(server)
        .get('/api/v1/stores')
        .end((err, res) => {
          var result = res.body;
          result.forEach((element) => {
            expect(element).to.have.property('store_open_date');
          });
        });
      done();
    });
  });
  describe('/GET/:id', () => {
    it('it should return a single store with status code 200.', (done) => {
      chai
        .request(server)
        .get('/api/v1/stores/1')
        .end((err, res) => {
          res.should.have.status(200);
        });
      done();
    });
    const id = 2;
    it(`it should check store ${id} and return storeNo as ${id}`, (done) => {
      chai
        .request(server)
        .get(`/api/v1/stores/${id}`)
        .end((err, res) => {
          expect({ storeNo: res.body.storeNo }).to.include({ storeNo: `${id}` });
        });
      done();
    });
  });
  describe('/POST', () => {
    const store = {
      storeNo: '45',
      storeName: 'PortlandDowntown',
      contact: {
        tie_line: '8-841-0111',
        phone: '(206) 628-2111',
        fax_tie_line: '8-841-1795',
        fax: '(206) 628-1795',
      },
      location: { address: '500 PINE ST', city: 'Seattle', state: 'WA', zipcode: '98101-1744' },
      businessType: {
        businessUnit: 'FLS',
        region: 'NORTHWEST FLS',
        rackDistrict: 'N/A',
        presClass: 'Everett',
        flagship_store: 'Yes',
      },
      store_open_date: '1963-08-06',
    };
    it('it shoud create a new store with status code 201.', (done) => {
      chai
        .request(server)
        .post('/api/v1/stores')
        .send(store)
        .end((err, res) => {
          res.should.have.status(201);
        });
      done();
    });
  });
  describe('/DELETE/:id', () => {
    let id = 45;
    it('it should delete a store with an id with status code 200.', (done) => {
      chai
        .request(server)
        .delete(`/api/v1/stores/${id}`)
        .end((err, res) => {
          res.should.have.status(200);
        });
      done();
    });
  });
});
