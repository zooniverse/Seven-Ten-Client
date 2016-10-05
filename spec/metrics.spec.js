import { ClassificationCreatedMetric, ClassifierVisitedMetric } from '../lib/metrics';
import Client from '../lib/client';

describe('Metrics', () => {
  const split = {
    id: '123',
    key: 'test'
  };

  let clientCreate = spy();

  beforeEach(() => {
    clientCreate = spy();
    Client.current();
    Client.current_instance.create = clientCreate;
  });

  afterEach(() => {
    Client.current_instance = undefined;
  });

  describe('ClassificationCreatedMetric', () => {
    const classification = {
      id: '456'
    };

    describe('.create', () => {
      it('should create the metric', () => {
        ClassificationCreatedMetric.create(split, classification);
        expect(clientCreate).to.have.been.called.once().with({
          key: 'test',
          value: {
            classification_id: '456'
          },
          split_user_variant_id: '123'
        });
      });
    });
  });

  describe('ClassifierVisitedMetric', () => {
    describe('.create', () => {
      it('should create the metric', () => {
        ClassifierVisitedMetric.create(split);
        expect(clientCreate).to.have.been.called.once().with({
          key: 'test',
          value: {},
          split_user_variant_id: '123'
        });
      });
    });
  });
});
