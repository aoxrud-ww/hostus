import React, { PureComponent } from 'react';
import styles from './Tag.module.scss';
import cx from 'classnames';
import PropTypes from 'prop-types';

class Tag extends PureComponent {
  constructor(props) {
    super(props);
    this.toggleActiveState = this.toggleActiveState.bind(this);
  }

  toggleActiveState(e) {
    e.preventDefault();
    this.props.onToggle(!this.props.isActive);
  }

  render() {
    const classNames = cx(styles.tag, {
      [styles.selected]: this.props.isActive
    });

    return (
      <button onClick={this.toggleActiveState} className={styles.container}>
        <div className={classNames}>
          {this.props.children}
        </div>
      </button>
    )
  }
}

Tag.defaultProps = {
  isActive: false,
  onToggle: () => {}
};

Tag.propTypes = {
  isActive: PropTypes.bool,
  onToggle: PropTypes.func
};

export default Tag;

