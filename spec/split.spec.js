import Split from '../src/split'
import Client from '../src/client';
import { ClassificationCreatedMetric, ClassifierVisitedMetric } from '../src/metrics';
import serverResponse from './split_user_variants';

describe('Split', () => {
  const splitUserVariant = serverResponse[0];
  const split = new Split(splitUserVariant);

  let splitFinder = () => {
    return Promise.resolve(serverResponse);
  };

  let clientFind = spy(splitFinder);

  beforeEach(() => {
    Split.splits = { };
    clientFind = spy(splitFinder);
    Client.current();
    Client.current_instance.findAll = clientFind;
  });

  afterEach(() => {
    Split.splits = { };
    Client.current_instance = undefined;
  });

  describe('.load', () => {
    it('should request the splits', () => {
      Split.load('project/slug');
      expect(clientFind).to.have.been.called.once().with({
        filter: {'projects.slug': 'project/slug'}
      });
    });

    it('should create the splits', (done) => {
      Split.load('project/slug').then((splits) => {
        try {
          expect(Split.splits['landing.text']).to.be.an.instanceof(Split);
          expect(Split.splits['mini-course.visible']).to.be.an.instanceof(Split);
          expect(Split.splits['workflow.advance']).to.be.an.instanceof(Split);
          done();
        } catch(e) {
          done(e);
        }
      });
    });

    it('should return the created splits', (done) => {
      Split.load('project/slug').then((splits) => {
        try {
          expect(splits['landing.text']).to.be.an.instanceof(Split);
          expect(splits['mini-course.visible']).to.be.an.instanceof(Split);
          expect(splits['workflow.advance']).to.be.an.instanceof(Split);
          done();
        } catch(e) {
          done(e);
        }
      });
    });
  });

  describe('.clear', () => {
    it('should empty the splits', () => {
      Split.splits = { testing: true };
      Split.clear();
      expect(Split.splits).to.be.empty;
    });
  });

  describe('metric creation', () => {
    let splitSpy = spy();

    beforeEach(() => {
      splitSpy = {
        classificationCreated: spy(),
        classifierVisited: spy()
      };

      Split.splits = {
        test: splitSpy
      };
    });

    describe('.classificationCreated', () => {
      it('should dispatch the event', () => {
        Split.classificationCreated();
        expect(splitSpy.classificationCreated).to.have.been.called.once();
      });
    });

    describe('.classifierVisited', () => {
      it('should dispatch the event', () => {
        Split.classifierVisited();
        expect(splitSpy.classifierVisited).to.have.been.called.once();
      });
    });
  });

  describe('#constructor', () => {
    it('should assign the split user variant id', () => {
      expect(split.id).to.equal(splitUserVariant.id);
    });

    it('should copy the split properties', () => {
      expect(split.type).to.equal('splits');
      expect(split.name).to.equal(splitUserVariant.split.name);
      expect(split.key).to.equal(splitUserVariant.split.key);
      expect(split.state).to.equal('active');
    });

    it('should setup the metric types', () => {
      expect(Object.keys(split.metricTypes)).to.eql(splitUserVariant.split.metric_types);
    });

    it('should assign the variant', () => {
      expect(split.variant).to.eql(splitUserVariant.variant);
    });
  });

  describe('#classificationCreated', () => {
    const createBefore = ClassificationCreatedMetric.create;
    const classification = {
      id: '123'
    };

    beforeEach(() => {
      ClassificationCreatedMetric.create = spy();
    });

    afterEach(() => {
      ClassificationCreatedMetric.create = createBefore;
    });

    context('when the metric is recorded', () => {
      it('should create the metric', () => {
        split.metricTypes.classification_created = true;
        split.classificationCreated(classification);
        expect(ClassificationCreatedMetric.create).to.have.been.called.once().with(classification);
      });
    });

    context('when the metric is not recorded', () => {
      it('should not create the metric', () => {
        delete split.metricTypes.classification_created;
        split.classificationCreated(classification);
        expect(ClassificationCreatedMetric.create).not.to.have.been.called();
      });
    });
  });

  describe('#classifierVisited', () => {
    const createBefore = ClassifierVisitedMetric.create;

    beforeEach(() => {
      ClassifierVisitedMetric.create = spy();
    });

    afterEach(() => {
      ClassifierVisitedMetric.create = createBefore;
    });

    context('when the metric is recorded', () => {
      it('should create the metric', () => {
        split.metricTypes.classifier_visited = true;
        split.classifierVisited();
        expect(ClassifierVisitedMetric.create).to.have.been.called.once();
      });
    });

    context('when the metric is not recorded', () => {
      it('should not create the metric', () => {
        delete split.metricTypes.classifier_visited;
        split.classifierVisited();
        expect(ClassifierVisitedMetric.create).not.to.have.been.called();
      });
    });
  })
});
