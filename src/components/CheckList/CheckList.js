import React, { PureComponent } from 'react';
import styles from './CheckList.module.scss';
import checkmarkIcon from '../../assets/check-mark.svg';
import ReactSVG from 'react-svg';
import PropTypes from 'prop-types';
import cx from 'classnames';

class CheckList extends PureComponent {

  selectOption(option, e) {
    if(e) {
      e.preventDefault();
    }

    const selected = {
      ...this.props.selected,
      [option.label]: !this.props.selected[option.label]
    };

    this.props.onChange(selected);
  }

  focusChange(option, isFocused) {
    this.props.onFocusChange(isFocused, option);
  }

  shouldAutofocus(option, buttonRef) {
    if(this.props.focusOn === option && buttonRef) {
      buttonRef.focus();
      this.props.focusComplete();
    }
  }

  render() {
    return (
      <ul className={styles.list}>
        {this.props.list.map(item => {

          const btnClassNames = cx({
            [styles.item]: true,
            [styles.selected]: !!this.props.selected[item.label]
          });

          const checkmarkClass = this.props.selected[item.label] ? styles.checkmarkIconSelected : styles.checkmarkIcon;

          return (
            <li key={item.label}>
              <button className={btnClassNames}
                onClick={this.selectOption.bind(this, item)}
                onFocus={this.focusChange.bind(this, item, true)}
                onBlur={this.focusChange.bind(this, item, false)}
                ref={(button) => this.shouldAutofocus(item, button)}>
                <div className={styles.iconContainer}>
                  <ReactSVG src={checkmarkIcon} svgClassName={checkmarkClass} />
                </div>
                <span className={styles.label}>{item.label}</span>
              </button>
            </li>
          )
        })}
      </ul>
    )
  }
}

CheckList.defaultProps = {
  list: [],
  focusOn: null,
  onChange: () => {},
  onFocusChange: () => {},
  selected: {}
};

CheckList.propTypes = {
  list: PropTypes.array,
  focusOn: PropTypes.object,
  onChange: PropTypes.func,
  onFocusChange: PropTypes.func,
  selected: PropTypes.object
};

export default CheckList;