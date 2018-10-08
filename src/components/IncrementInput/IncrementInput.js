import React, { Component } from 'react';
import styles from './IncrementInput.module.scss';
import Button from "../Button/Button.js";
import ReactSVG from 'react-svg';
import iconPlus from '../../assets/add.svg';
import iconMinus from '../../assets/subtract.svg';

class IncrementInput extends Component {

  constructor(props) {
    super(props);
    this.didChange = this.didChange.bind(this);
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  didChange(e) {
    this.props.onChange(e.target.value);
  }

  increment() {
    if(this.props.value) {
      const value = Number(this.props.value) + 1;
      this.props.onChange(value);
    }
  }


  decrement() {
    const value = Number(this.props.value) - 1;

    if(value > 0) {
      this.props.onChange(value);
    }
  }

  render() {
    return (
      <div className={styles.container}>
        <Button theme="icon" onClick={this.decrement}>
          <ReactSVG svgClassName={styles.incrementIcons} src={iconMinus} />
        </Button>
        <div className={styles.inputContainer}>
          <input className={styles.input} value={this.props.value} onChange={this.didChange} />
        </div>
        <Button theme="icon" onClick={this.increment}>
          <ReactSVG svgClassName={styles.incrementIcons} src={iconPlus} />
        </Button>
      </div>
    );
  }
}


IncrementInput.defaultProps = {
  value: 1,
  onChange: () => {}
};

export default IncrementInput;

