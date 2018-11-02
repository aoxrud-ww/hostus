import React, { PureComponent } from 'react';
import styles from './Buttonbar.module.scss';
import Button from '../Button/Button.js';
import PropTypes from 'prop-types';

class Buttonbar extends PureComponent {
  constructor(props) {
    super(props);
    this.click = this.click.bind(this);
    this.state = {
      selected: Number(this.props.value),
      initialValue: this.props.value
    };
  }

  static getDerivedStateFromProps(props, state) {
    const valuePropChanged = props.value !== state.initialValue;
    const valuePropDifferentThanState = props.value !== state.value;
    if(valuePropChanged && valuePropDifferentThanState) {
      state.value = props.value;
      state.initialValue = props.value;
    }
    return state;
  }

  click(button, index) {
    return e => {

      if(this.props.updateSelected) {
        this.setState({
          selected: index
        });
      }
      button.props.onClick(e, button.props);
    }
  }

  render() {
    return (
      <div className={styles.buttonbar}>
        {this.props.children.map((button, index) => {
          const theme = this.state.selected === index ? 'buttonbar-selected' : 'buttonbar';
          return (
            <Button key={index} theme={theme} onClick={this.click(button, index)}>
            {button.props.children}
            </Button>
          );
        })}
      </div>
    );
  }
}

Buttonbar.defaultProps = {
  updateSelected: true,
  value: ''
}

Buttonbar.propTypes = {
  updateSelected: PropTypes.bool,
  value: PropTypes.string
};


export default Buttonbar;
