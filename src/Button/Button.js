import React, { Component } from 'react';
import styles from './Button.module.scss';

class Button extends Component {

  constructor(props) {
    super(props);
    this.click = this.click.bind(this);
  }

  click() {
    this.props.onClick();
  }

  render() {
    return (
      <button onClick={this.click}  className={styles.button}>
        {this.props.children}
      </button>
    );
  }
}

export default Button;
