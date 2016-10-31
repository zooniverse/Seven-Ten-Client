import React from 'react';

const VisibilitySplit = React.createClass({
  render() {
    let split = this.props.splits && this.props.splits[this.props.splitKey];
    let hasElementKey = split && this.props.elementKey in split.variant.value;
    let isShown = split && split.variant.value[this.props.elementKey];

    if (!split || isShown || !hasElementKey) {
      return this.props.children;
    } else {
      return <span></span>;
    }
  }
});

VisibilitySplit.propTypes = {
  splits: React.PropTypes.object,
  splitKey: React.PropTypes.string.isRequired,
  elementKey: React.PropTypes.string.isRequired
};

export default VisibilitySplit;
