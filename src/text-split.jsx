import React from 'react';

const TextSplit = React.createClass({
  render() {
    let split = this.props.splits && this.props.splits[this.props.splitKey];
    let splitText = split && split.variant.value[this.props.textKey];
    return React.createElement(
      this.props.elementType,
      { },
      splitText || this.props.default
    );
  }
});

TextSplit.propTypes = {
  splits: React.PropTypes.object,
  splitKey: React.PropTypes.string.isRequired,
  textKey: React.PropTypes.string.isRequired,
  elementType: React.PropTypes.string
};

TextSplit.defaultProps = {
  elementType: 'span'
};

export default TextSplit;
