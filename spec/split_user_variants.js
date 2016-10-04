export default [{
  "id": "1",
  "type": "split_user_variants",
  "split": {
    "id": "1",
    "type": "splits",
    "name": "Landing text",
    "key": "landing.text",
    "state": "active",
    "metric_types": ["classifier_visited", "classification_created"],
    "links": {
      "self": "/splits/1",
      "variants": "/variants?filter%5Bsplit_id%5D=1"
    }
  },
  "variant": {
    "id": "1",
    "type": "variants",
    "name": "Original",
    "value": {
      "description": "Original description"
    },
    "links": {
      "self": "/variants/1",
      "split": "/splits/1"
    }
  },
  "links": {
    "self": "/split_user_variants/1",
    "split": "/splits/1",
    "variant": "/variants/1"
  }
}, {
  "id": "2",
  "type": "split_user_variants",
  "split": {
    "id": "3",
    "type": "splits",
    "name": "Mini-course visibility test",
    "key": "mini-course.visible",
    "state": "active",
    "metric_types": ["classification_created"],
    "links": {
      "self": "/splits/3",
      "variants": "/variants?filter%5Bsplit_id%5D=3"
    }
  },
  "variant": {
    "id": "6",
    "type": "variants",
    "name": "Hidden",
    "value": {
      "button": false,
      "auto": false
    },
    "links": {
      "self": "/variants/6",
      "split": "/splits/3"
    }
  },
  "links": {
    "self": "/split_user_variants/2",
    "split": "/splits/3",
    "variant": "/variants/6"
  }
}, {
  "id": "3",
  "type": "split_user_variants",
  "split": {
    "id": "2",
    "type": "splits",
    "name": "Workflow advancement",
    "key": "workflow.advance",
    "state": "active",
    "metric_types": ["classification_created"],
    "links": {
      "self": "/splits/2",
      "variants": "/variants?filter%5Bsplit_id%5D=2"
    }
  },
  "variant": {
    "id": "4",
    "type": "variants",
    "name": "Alternate",
    "value": {
      "accept": "Alternate advance",
      "decline": "Alternate decline"
    },
    "links": {
      "self": "/variants/4",
      "split": "/splits/2"
    }
  },
  "links": {
    "self": "/split_user_variants/3",
    "split": "/splits/2",
    "variant": "/variants/4"
  }
}];
