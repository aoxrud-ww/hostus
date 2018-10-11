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

    this.setValue = this.setValue.bind(this);
    this.availableStatuses = [

      {
        color: 'green',
        label: "Bar"
      },
      {
        color: 'blue',
        label: "Outside"
      },
      {
        color: 'purple',
        label: "Table"
      },
      {
        color: 'orange',
        label: "Booth"
      },
      {
        color: 'red',
        label: "Inside"
      }
    ];
  }

  setValue(color) {
    return () => {
      this.setState({
        value: color
      }, () => {
        this.props.onChange(this.state.value);
      });
    }
  }

  render() {

    return (
      <div className={styles.container}>
        {this.availableStatuses.map(({color, label}) => {

          const classNames = classnames({
            [styles.status]: true,
            [styles.selected]: color === this.state.value
          });

          return (
            <div key={color} className={classNames} onClick={this.setValue(color)}>
              <Status value={color} />
              <span className={styles.statusLabel}>{label}</span>
            </div>)
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

