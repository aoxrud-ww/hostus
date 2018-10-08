import React, { PureComponent } from 'react';
import styles from './Textfield.module.scss';
import classnames from 'classnames';
import Inputmask from "inputmask";

class Textfield extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
      value: this.props.value,
      hasContent: !!this.props.value
    }
    this.didChange = this.didChange.bind(this);
    this.didFocus = this.changeFocus.bind(this, true);
    this.didBlur = this.changeFocus.bind(this, false);
    this.inputRef = React.createRef();
  }

  componentDidMount() {
    this.evaluateState(this.props.value);

    if(this.props.mask) {
      this.inputMask = new Inputmask(this.props.mask);
      this.inputMask.mask(this.inputRef);
    }
  }

  componentDidUpdate(prevProps) {
    if(prevProps.value !== this.props.value) {
      this.setState({value: this.props.value});
      this.evaluateState(this.props.value)
    }
  }

  didChange(e) {
    const value = e.target.value;

    this.setState({value});
    this.evaluateState(value);

    if(this.props.onChange) {
      this.props.onChange(value);
    }
  }

  changeFocus(isFocused) {
    this.setState({
      isFocused
    });

    if(this.props.onFocus) {
      this.props.onFocus(isFocused);
    }
  }

  evaluateState(value) {
    this.setState({
      value: value,
      hasContent: !!value,
    });
  }

  render() {
    const classNames = classnames({
      [styles.container]: true,
      [styles.nonEmpty]: this.state.hasContent,
      [styles.empty]: !this.state.hasContent,
      [styles.focused]: this.state.isFocused
    });

    return (
      <div className={classNames}>
        <label className={styles.label}>{this.props.label}</label>
        <input
          className={styles.input}
          ref={this.inputRef}
          placeholder={this.props.placeholder}
          type={this.props.type}
          value={this.state.value}
          onChange={this.didChange}
          onFocus={this.didFocus}
          onBlur={this.didBlur} />
      </div>
    );
  }
}


Textfield.defaultProps = {
  placeholder: '',
  type: 'text'
};

export default Textfield;

