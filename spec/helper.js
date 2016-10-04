import React from 'react';
import chai from 'chai';
import spy from 'chai-spies';
import {mount, shallow} from 'enzyme';
const jsdom = require('jsdom').jsdom;

chai.use(spy);

global.React = React;
global.expect = chai.expect;
global.spy = chai.spy;
global.mount = mount;
global.shallow = shallow;

global.document = jsdom('');
global.window = document.defaultView;

Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined' && property !== 'XMLHttpRequest') {
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};
