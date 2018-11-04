import React, { PureComponent } from 'react';
import styles from './PartySizePicker.module.scss';
import Button from "../Button/Button.js";
import IncrementInput from "../IncrementInput/IncrementInput.js";
import Buttonbar from "../Buttonbar/Buttonbar.js";
import PropTypes from 'prop-types';

class PartySizePicker extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value
    };

    this.shortcutClicked = this.shortcutClicked.bind(this);
    this.incrementChange = this.incrementChange.bind(this);
  }

  incrementChange(value) {
    this.didChange(value);
  }

  didChange(value) {
    this.props.onChange(value);
  }

  shortcutClicked(e, buttonProps) {
    this.setState({
      value: buttonProps.data
    }, () => {
      this.didChange(buttonProps.data);
    });
  }


  render() {
    return (
      <div className={styles.container}>
        <div className={styles.inputContainer}>
          <IncrementInput value={this.state.value} onChange={this.incrementChange} label="Party Size" />
        </div>
        {this.state.buttonbarValue}
        <div className={styles.shortcuts}>
          <Buttonbar value={this.state.buttonbarValue} updateSelected={false}>
            <Button onClick={this.shortcutClicked} data={1}>1</Button>
            <Button onClick={this.shortcutClicked} data={2}>2</Button>
            <Button onClick={this.shortcutClicked} data={3}>3</Button>
            <Button onClick={this.shortcutClicked} data={4}>4</Button>
            <Button onClick={this.shortcutClicked} data={5}>5</Button>
            <Button onClick={this.shortcutClicked} data={6}>6</Button>
          </Buttonbar>
        </div>
      </div>
    );
  }
}


PartySizePicker.defaultProps = {
  value: 1,
  onChange: () => {}
};

PartySizePicker.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired
};

export default PartySizePicker;

