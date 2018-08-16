import React from 'react';
import chai from 'chai';
import spy from 'chai-spies';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { JSDOM } from 'jsdom';

Enzyme.configure({
  adapter: new Adapter()
});

chai.use(spy);

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;
const document = window.document;

global.React = React;
global.expect = chai.expect;
global.spy = chai.spy;
global.mount = mount;
global.shallow = shallow;

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js'
};

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .map(prop => Object.getOwnPropertyDescriptor(src, prop));
  Object.defineProperties(target, props);
}

copyProps(window, global);
