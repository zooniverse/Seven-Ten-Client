import JsonApi from 'devour-client';

class Client extends JsonApi {
  static current() {
    if (!Client.current_instance) {
      Client.current_instance = new Client(Client.config);
    }

    return Client.current_instance;
  }

  constructor({ host, headers }) {
    super({ apiUrl: host });
    this.headers = headers || { };
    this.setup();
  }

  setup() {
    this.define('project', {
      slug: '',
      splits: {
        jsonApi: 'hasMany',
        type: 'split'
      }
    });

    this.define('split', {
      name: '',
      key: '',
      state: '',
      metric_types: [],
      project: {
        jsonApi: 'hasOne',
        type: 'project'
      },
      variants: {
        jsonApi: 'hasMany',
        type: 'variant'
      }
    });

    this.define('variant', {
      name: '',
      value: { },
      split: {
        jsonApi: 'hasOne',
        type: 'split'
      }
    });

    this.define('split_user_variant', {
      split: {
        jsonApi: 'hasOne',
        type: 'split'
      },
      variant: {
        jsonApi: 'hasOne',
        type: 'variant'
      }
    });

    this.define('metric', {
      key: '',
      value: { },
      split_user_variant_id: ''
    });
  }
}

Client.config = { };

export default Client;
