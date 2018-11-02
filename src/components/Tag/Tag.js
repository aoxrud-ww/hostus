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

  clickable() {
    return (
      <button onClick={this.toggleActiveState} className={styles.container}>
        {this.tag()}
      </button>
    )
  }
  tag() {
    const classNames = cx(styles.tag, styles[this.props.theme], {
      [styles.selected]: this.props.isActive
    });

    return (
      <div className={classNames}>
        {this.props.children}
      </div>
    )
  }

  render() {
    if(this.props.clickable) {
      return this.clickable();
    } else {
      return this.tag();
    }
  }
}

Tag.defaultProps = {
  isActive: false,
  clickable: true,
  theme: 'default',
  onToggle: () => {}
};

Tag.propTypes = {
  isActive: PropTypes.bool,
  clickable: PropTypes.bool,
  onToggle: PropTypes.func,
  theme: PropTypes.string
};

export default Tag;

