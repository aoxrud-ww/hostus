import React, { Component } from 'react';
import styles from './Button.module.scss';
import classnames from 'classnames';
import PropTypes from 'prop-types';

class Button extends Component {

  constructor(props) {
    super(props);
    this.click = this.click.bind(this);
  }

  click(e) {
    if(this.props.onClick) {
      this.props.onClick(e, this.props);
    }
  }

  render() {
    const classNames = classnames({
      [styles.button]: true,
      [styles[this.props.theme]]: true
    });
    return (
      <button onClick={this.click} className={classNames} disabled={this.props.disabled} type={this.props.type}>
        {this.props.children}
      </button>
    );
  }
}

export default Button;

Button.defaultProps = {
  theme: 'primary',
  disabled: false,
  type: 'button'
};

Button.propTypes = {
  theme: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.string
};