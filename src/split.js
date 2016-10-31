import Client from './client';
import { ClassificationCreatedMetric, ClassifierVisitedMetric } from './metrics';

class Split {
  static load(slug) {
    this.clear();
    return Client.current().findAll('split_user_variant', { filter: { 'projects.slug': slug }}).then(splitVariants =>
      splitVariants.map((splitVariant) => {
        const split = new Split(splitVariant);
        this.splits[split.key] = split;
      })
    ).then(() =>
      this.splits
    );
  }

  static clear() {
    this.splits = { };
  }

  static classificationCreated(classification) {
    for (const key of Object.keys(this.splits)) {
      this.splits[key].classificationCreated(classification);
    }
  }

  static classifierVisited() {
    for (const key of Object.keys(this.splits)) {
      this.splits[key].classifierVisited();
    }
  }

  constructor(splitVariant) {
    for (const key of Object.keys(splitVariant.split)) {
      this[key] = splitVariant.split[key];
    }
    this.id = splitVariant.id;
    this.variant = splitVariant.variant;
    this.metricTypes = { };
    this.metric_types.map((metricType) => {
      this.metricTypes[metricType] = true;
    });
  }

  classificationCreated(classification) {
    if (this.metricTypes.classification_created) {
      ClassificationCreatedMetric.create(this, classification);
    }
  }

  classifierVisited() {
    if (this.metricTypes.classifier_visited) {
      ClassifierVisitedMetric.create(this);
    }
  }
}

Split.splits = { };

export default Split;