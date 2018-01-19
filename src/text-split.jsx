import React from 'react';
import PropTypes from 'prop-types';

function TextSplit(props) {
  const split = props.splits && props.splits[props.splitKey];
  const splitText = split && split.variant.value[props.textKey];
  return React.createElement(
    props.elementType,
    { },
    splitText || props.default
  );
}

TextSplit.propTypes = {
  splits: PropTypes.object,
  splitKey: PropTypes.string.isRequired,
  textKey: PropTypes.string.isRequired,
  elementType: PropTypes.string
};

TextSplit.defaultProps = {
  elementType: 'span'
};

export default TextSplit;
