# Seven-Ten Client

Client for Seven-Ten

[![Build Status](https://travis-ci.org/zooniverse/Seven-Ten-Client.svg?branch=master)](https://travis-ci.org/zooniverse/Seven-Ten-Client)

### Getting started

``` bash
# clone the repository and install the dependencies
git clone https://github.com/zooniverse/Seven-Ten-Client.git
cd Seven-Ten-Client
npm install .
```

- Run the tests with `npm test`
- Lint the code with `npm run lint`
- Release a version with `npm run version`, also
  - Transpiles the source
  - Tags a release

### Client usage

##### Client

Communicates with the [API](https://github.com/zooniverse/Seven-Ten).

``` js
Client.config = {
  host: 'https://seven-ten-staging.zooniverse.org', // The API host
  headers: zooAPI.headers // Headers (e.g. Authentication) to send with requests
};

Client.current(); // Provides a singleton client instance
```

##### Split

Manages the current splits

``` js
Split.load('owner/project-name').then((splits) => {
  // ...
}); // Load all active splits by project slug

// To create metric-tracking events for splits;
Split.classificationCreated(classification);
// or
Split.classifierVisited();
```

### Component usage

##### TextSplit

Provides a component that displays a text split.

`splitKey` corresponds to [`split.key`](https://github.com/zooniverse/Seven-Ten/blob/master/docs/splits.md#attributes)

`textKey` corresponds to the property storing text in [`variant.value`](https://github.com/zooniverse/Seven-Ten/blob/master/docs/variants.md#attributes)

``` jsx
<TextSplit
  splitKey="landing.text"
  textKey="description"
  splits={this.props.splits}
  default="The default description"
/>
```

##### VisibilitySplit

Provides a component that toggles element visibility

`splitKey` corresponds to [`split.key`](https://github.com/zooniverse/Seven-Ten/blob/master/docs/splits.md#attributes)

`elementKey` corresponds to the property storing the on/off boolean in [`variant.value`](https://github.com/zooniverse/Seven-Ten/blob/master/docs/variants.md#attributes)

``` jsx
<VisibilitySplit
  splitKey="mini-course.visible"
  elementKey="button"
  splits={this.props.splits}
>
  <p>This will be shown if it's visible, otherwise it won't</p>
</VisibilitySplit>
```
