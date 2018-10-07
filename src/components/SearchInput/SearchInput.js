import React, { Component } from 'react';
import styles from './SearchInput.module.scss';
import searchLoupe from '../../assets/search.svg';
import classnames from 'classnames';
import ReactSVG from 'react-svg';

class SearchInput extends Component {

  constructor(props) {
    super(props);

    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      isFocused: false
    };
  }

  onFocus() {
    this.setState({
      isFocused: true
    });
  }

  onBlur() {
    this.setState({
      isFocused: false
    });
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
        <input type='search' placeholder={this.props.placeholder} onChange={this.onChange} className={styles.input} onFocus={this.onFocus} onBlur={this.onBlur} />
      </div>
    );
  }
}

SearchInput.defaultProps = {
  placeholder: "Search..."
}
export default SearchInput;
