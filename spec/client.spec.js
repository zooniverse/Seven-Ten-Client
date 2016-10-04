import Client from '../lib/client';

describe('Client', () => {
  const host = 'http://example.com';
  const headers = { test: true };

  describe('.current', () => {
    beforeEach( () => {
      Client._current = undefined;
    });

    afterEach( () => {
      Client._current = undefined;
    });

    context('when already initialized', () => {
      it('should return the current instance', () => {
        Client._current = 'already initialized';
        expect(Client.current()).to.equal('already initialized');
      });
    });

    context('when not yet initialized', () => {
      it('should create a new instance', () => {
        expect(Client.current()).to.be.an.instanceof(Client);
      });

      it('should create a new instance', () => {
        expect(Client.current()).to.equal(Client.current());
      });
    });
  });

  describe('#constructor', () => {
    it('should set the host', () => {
      const client = new Client({host});
      expect(client.apiUrl).to.equal(host);
    });

    it('should set the headers', () => {
      const client = new Client({host, headers});
      expect(client.headers).to.equal(headers);
    });

    it('should define types', () => {
      const client = new Client({host, headers});
      const types = Object.keys(client.models);
      expect(types).to.eql(
        ['project', 'split', 'variant', 'split_user_variant', 'metric']
      );
    });
  });
});
