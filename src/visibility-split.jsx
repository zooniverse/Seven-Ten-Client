import React from 'react';
import PropTypes from 'prop-types';

function VisibilitySplit(props) {
  const split = props.splits && props.splits[props.splitKey];
  const hasElementKey = split && props.elementKey in split.variant.value;
  const isShown = split && split.variant.value[props.elementKey];

  if (!split || isShown || !hasElementKey) {
    return props.children;
  } else {
    return <span />;
  }
};

VisibilitySplit.propTypes = {
  children: PropTypes.node,
  splits: PropTypes.object,
  splitKey: PropTypes.string.isRequired,
  elementKey: PropTypes.string.isRequired
};

export default VisibilitySplit;
