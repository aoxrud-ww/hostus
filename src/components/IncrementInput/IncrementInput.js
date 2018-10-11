import React, { PureComponent } from 'react';
import styles from './IncrementInput.module.scss';
import Button from "../Button/Button.js";
import ReactSVG from 'react-svg';
import iconPlus from '../../assets/add.svg';
import iconMinus from '../../assets/subtract.svg';
import PropTypes from 'prop-types';
import classnames from 'classnames';


class IncrementInput extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
      initialValue: this.props.value
    };
    this.didChange = this.didChange.bind(this);
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.inputRef = React.createRef();
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

  didChange(e) {
    this.setState({value: e.target.value}, () => {
      this.broadcastValue(this.state.value);
    });
  }

  broadcastValue(value) {
    this.inputRef.current.value = value;
    this.props.onChange(value);
  }

  increment() {
    const value = Number(this.inputRef.current.value) + this.props.step;
    this.broadcastValue(value);
  }

  decrement() {
    const value = Number(this.inputRef.current.value) - this.props.step;
    if((this.props.allowZero && value >= 0) || value > 0) {
      this.broadcastValue(value);
    }
  }

  render() {
    const classNames = classnames({
      [styles.container]: true,
      [styles.hasSuffix]: !!this.props.suffix
    });
    return (
      <div className={classNames}>
        <Button theme="icon" onClick={this.decrement}>
          <ReactSVG svgClassName={styles.incrementIcons} src={iconMinus} />
        </Button>
        <div className={styles.inputContainer}>
          <div>
            <input className={styles.input} value={this.state.value} onChange={this.didChange} ref={this.inputRef} />
            {this.props.suffix && <span className={styles.suffix}>{this.props.suffix}</span>}
          </div>
          <label className={styles.label}>{this.props.label}</label>
        </div>
        <Button theme="icon" onClick={this.increment}>
          <ReactSVG svgClassName={styles.incrementIcons} src={iconPlus} />
        </Button>
      </div>
    );
  }
}

IncrementInput.propTypes = {
  value: PropTypes.number,
  step: PropTypes.number,
  allowZero: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string
};

IncrementInput.defaultProps = {
  value: 1,
  step: 1,
  allowZero: false,
  label: '',
  onChange: () => {}
};

export default IncrementInput;

