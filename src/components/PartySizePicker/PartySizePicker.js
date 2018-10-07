import React, { Component } from 'react';
import styles from './PartySizePicker.module.scss';
import Textfield from "../Textfield/Textfield.js";
import Button from "../Button/Button.js";


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
    });
    this.props.onChange(buttonProps.data);
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.input}>
          <Textfield value={this.state.value} label={this.props.label} onChange={this.didChange} placeholder="ie. 1" mask="[9[9]]" />
        </div>
        <div className={styles.shortcuts}>
          <Button theme="tertiary" onClick={this.applyValue} data="1">1</Button>
          <Button theme="tertiary" onClick={this.applyValue} data="2">2</Button>
          <Button theme="tertiary" onClick={this.applyValue} data="3">3</Button>
          <Button theme="tertiary" onClick={this.applyValue} data="4">4</Button>
          <Button theme="tertiary" onClick={this.applyValue} data="5">5</Button>
          <Button theme="tertiary" onClick={this.applyValue} data="6">6</Button>
        </div>
      </div>
    );
  }
}


PartySizePicker.defaultProps = {
  label: 'Party Size',
  onChange: () => {}
};

export default PartySizePicker;

