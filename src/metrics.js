import Client from './client';

class SplitMetric {
  static create(split, info = { }) {
    Client.current().create('metric', {
      key: this.key(),
      value: this.payload(info),
      split_user_variant_id: split.id
    });
  }

  static payload() {
    return { };
  }
}

class ClassificationCreatedMetric extends SplitMetric {
  static key() { return 'classification_created'; }

  static payload(classification) {
    return { classification_id: classification.id };
  }
}

class ClassifierVisitedMetric extends SplitMetric {
  static key() { return 'classifier_visited'; }

  static payload() {
    return { };
  }
}

export { ClassificationCreatedMetric, ClassifierVisitedMetric };
