import React from 'react';
import styles from './Duration.module.scss';
import classnames from 'classnames';
import PropTypes from 'prop-types';

function Duration(props) {
  const classNames = classnames(styles.container, styles[props.size], {
    [styles.overdue]: props.isOverdue
  });
  return (
    <div className={classNames}>
      <span className={styles.value}>
        {props.value}
      </span>
      <span className={styles.unit}>
        {props.unit}
      </span>
    </div>
  );
}

Duration.defaultProps = {
  value: '',
  unit: 'min',
  isOverdue: false,
  size: 'default'
};

Duration.propTypes = {
  value: PropTypes.number,
  unit: PropTypes.string,
  isOverdue: PropTypes.bool,
  size: PropTypes.string
};

export default Duration;
