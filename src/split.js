import Client from './client';
import { ClassificationCreatedMetric, ClassifierVisitedMetric } from './metrics';

class Split {
  static load(slug) {
    this.clear();
    return Client.current().findAll('split_user_variant', { 'projects.slug': slug })
      .then((splitVariants) => {
        if (splitVariants && splitVariants.data && splitVariants.data.length > 0) {
          splitVariants.data.forEach((splitVariant) => {
            const split = new Split(splitVariant);
            this.splits[split.key] = split;
          });
        }
      })
      .then(() => this.splits);
  }

  static clear() {
    this.splits = { };
  }

  static classificationCreated(classification) {
    Object.keys(this.splits).forEach((splitKey) => {
      this.splits[splitKey].classificationCreated(classification);
    });
  }

  static classifierVisited() {
    Object.keys(this.splits).forEach((splitKey) => {
      this.splits[splitKey].classifierVisited();
    });
  }

  constructor(splitVariant) {
    Object.keys(splitVariant.split).forEach((splitKey) => {
      this[splitKey] = splitVariant.split[splitKey];
    });

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
