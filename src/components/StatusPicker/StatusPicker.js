import React, { Component } from 'react';
import styles from './StatusPicker.module.scss';
import Button from '../Button/Button.js';
import Status from '../Status/Status.js';
import classnames from 'classnames';

class StatusPicker extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value
    };

    this.applyValue = this.applyValue.bind(this);
    this.didChange = this.didChange.bind(this);
    this.availableStatuses = ['red', 'green', 'blue', 'purple', 'orange']
  }

  didChange(value) {
    this.setState({
      value
    });
    this.props.onChange(value);
  }

  applyValue(e, buttonProps) {
    this.setState({
      value: buttonProps.data
    }, () => {
      this.didChange(buttonProps.data);
    });
  }

  render() {
    return (
      <div className={styles.container}>
        {this.availableStatuses.map(status => {
          return (
            <Button key={status} theme="tertiary" onClick={this.applyValue} data={status}>
              <Status value={status} />
            </Button>)
        })}
      </div>
    );
  }
}


StatusPicker.defaultProps = {
  value: 1,
  onChange: () => {}
};

export default StatusPicker;

