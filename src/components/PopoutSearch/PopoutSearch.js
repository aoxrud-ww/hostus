import React, { cloneElement, PureComponent } from 'react';
import styles from './PopoutSearch.module.scss';
import SearchableCheckList from '../SearchableCheckList/SearchableCheckList.js';
import PropTypes from 'prop-types';

class PopoutSearch extends PureComponent {

  constructor(props) {
    super(props);
    this.togglePopout = this.togglePopout.bind(this);
    this.toggleFocus = this.toggleFocus.bind(this);
    this.state = {
      visible: true
    };
  }

  togglePopout(isActive) {
    this.setState({
      visible: isActive
    });
  }

  toggleFocus(isFocused) {
    if(isFocused) {
      this.stopCloseTimer();
    } else {
      this.startCloseTimer();
    }
  }

  startCloseTimer() {
    this.stopCloseTimer();

    const closeTimer = setTimeout(() => {
      this.setState({
        visible: false
      });
    }, this.props.autocloseDelay);

    this.setState({
      closeTimer
    });
  }

  stopCloseTimer() {
    clearTimeout(this.state.closeTimer);
  }

  popout() {
    if(!this.state.visible) {
      return;
    }

    return (
      <div className={styles.popout}>
        <div className={styles.arrow}></div>
        <div className={styles.content}>
          <SearchableCheckList
            list={this.props.list}
            selected={this.props.selected}
            onChange={this.props.onChange}
            onFocusChange={this.toggleFocus} />
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className={styles.addTag}>
        {cloneElement(this.props.children, {isActive: this.state.visible, onToggle: this.togglePopout})}
        {this.popout()}
      </div>
    )
  }
}


PopoutSearch.defaultProps = {
  list: [],
  selected: {},
  onChange: () => {},
  autocloseDelay: 250
};

PopoutSearch.propTypes = {
  list: PropTypes.array,
  selected: PropTypes.object,
  onChange: PropTypes.func,
  autocloseDelay: PropTypes.number
};

export default PopoutSearch;

