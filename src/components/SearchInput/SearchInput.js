import React, { PureComponent } from 'react';
import styles from './SearchInput.module.scss';
import searchLoupe from '../../assets/search.svg';
import classnames from 'classnames';
import ReactSVG from 'react-svg';
import PropTypes from 'prop-types';

class SearchInput extends PureComponent {

  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      isFocused: false
    };
  }

  componentDidMount() {
    if(this.props.autofocus) {
      this.inputRef.current.focus();
    }
  }

  onFocus() {
    this.setState({
      isFocused: true
    });
    this.props.onFocusChange(true);
  }

  onBlur() {
    this.setState({
      isFocused: false
    });
    this.props.onFocusChange(false);
  }

  onChange(e) {
    const value = e.target.value;
    this.props.onChange(value);
  }

  render() {
    const inputClasses = classnames({
      [styles.container]: true,
      [styles.focus]: this.state.isFocused
    });

    return (
      <div className={inputClasses}>
        <div className={styles.iconContainer}>
          <ReactSVG src={searchLoupe} svgClassName={styles.icon} />
        </div>
        <input ref={this.inputRef} value={this.props.value} type='search' placeholder={this.props.placeholder} onChange={this.onChange} className={styles.input} onFocus={this.onFocus} onBlur={this.onBlur} />
      </div>
    );
  }
}

SearchInput.defaultProps = {
  placeholder: "Search...",
  autofocus: false,
  value: '',
  onChange: () => {},
  onFocusChange: () => {}
};

SearchInput.propTypes = {
  placeholder: PropTypes.string,
  autofocus: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onFocusChange: PropTypes.func
};

export default SearchInput;
