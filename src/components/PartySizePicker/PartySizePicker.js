import React, { Component } from 'react';
import styles from './PartySizePicker.module.scss';
import Button from "../Button/Button.js";
import IncrementInput from "../IncrementInput/IncrementInput.js";

class PartySizePicker extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value
    };

    this.applyValue = this.applyValue.bind(this);
    this.didChange = this.didChange.bind(this);
  }

  didChange(value) {

    this.props.onChange(value);
  }

  applyValue(e, buttonProps) {
    this.setState({
      value: buttonProps.data
    }, () => {
      this.didChange(buttonProps.data);
    });
  }

  renderShortcuts() {
    return (
      <div className={styles.shortcuts}>
        <Button theme="tertiary" onClick={this.applyValue} data={1}>1</Button>
        <Button theme="tertiary" onClick={this.applyValue} data={2}>2</Button>
        <Button theme="tertiary" onClick={this.applyValue} data={3}>3</Button>
        <Button theme="tertiary" onClick={this.applyValue} data={4}>4</Button>
        <Button theme="tertiary" onClick={this.applyValue} data={5}>5</Button>
        <Button theme="tertiary" onClick={this.applyValue} data={6}>6</Button>
      </div>
    )
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.inputContainer}>
          <IncrementInput value={this.state.value} onChange={this.didChange} />
        </div>
        {this.renderShortcuts()}
      </div>
    );
  }
}


PartySizePicker.defaultProps = {
  value: 1,
  onChange: () => {}
};

export default PartySizePicker;

