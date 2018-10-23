import React, { Component, cloneElement, PureComponent } from 'react';
import styles from './PopoutSearch.module.scss';
import SearchInput from '../SearchInput/SearchInput.js';
import checkmarkIcon from '../../assets/check-mark.svg';
import ReactSVG from 'react-svg';
import PropTypes from 'prop-types';

class AddToList extends Component {
  render() {
    return (
      <div className={styles.notFoundContainer}>
        <h1 className={styles.notFoundHeading}>No Results Found</h1>
        <button className={styles.createButton} onFocus={this.props.onFocus} onBlur={this.props.onBlur} onClick={this.props.onConfirm.bind(this, this.props.value)}>Add {this.props.value}</button>
      </div>
    )
  }
}

AddToList.defaultProps = {
  onFocus: () => {},
  onBlur: () => {},
  onChange: () => {},
  value: ''
};

AddToList.propTypes = {
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  value: PropTypes.string
};


class PopoutSearch extends PureComponent {

  constructor(props) {
    super(props);
    this.togglePopout = this.togglePopout.bind(this);
    this.searchList = this.searchList.bind(this);
    this.addAndSelect = this.addAndSelect.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.toggleFocus = this.toggleFocus.bind(this);
    this.clearFocusOn = this.clearFocusOn.bind(this);
    this.state = {
      query: '',
      visible: true,
      customOptions: []
    };
  }

  searchList(query) {
    this.setState({
      query
    });
  }

  filterList(query) {
    let list;
    const options = this.getAllOptions();
    if(query) {
      const normalizedQuery = query.toLowerCase();
      list = this.findInList(options, normalizedQuery);
    } else {
      list = options;
    }
    return list;
  }

  findInList(list, query) {
    return this.props.options.filter(option => option.label.toLowerCase().includes(query));
  }

  sortListBySelected(list) {
    return list.sort((a, b) => {
      if(a.isActive || b.isActive) return 1;
      return -1;
    })
  }

  togglePopout(isActive) {
    this.setState({
      visible: isActive
    });
  }

  addAndSelect(text) {
    const option = {label: text, isActive: true};
    this.setState(state => ({
      query: '',
      focusOn: option,
    }), () => {
      const selected = {
        ...this.props.selected,
        [option.label]: option.isActive
      };
      const tags = [
        option,
        ...this.props.options
      ];
      this.stopCloseTimer();
      this.props.onChange(selected, tags);
    });
  }

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

  onFocus() {
    this.toggleFocus(true);
  }

  onBlur() {
    this.toggleFocus(false);
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
        // visible: false
      });
    }, this.props.autocloseDelay);

    this.setState({
      closeTimer
    });
  }


  getAllOptions() {
    return [...this.state.customOptions, ...this.props.options];
  }

  getSelectedOptions() {
    const options = this.getAllOptions();
    return options
      .map(option => {
        option.isActive = !!this.props.selected[option.label];
        return option;
      });
  }

  stopCloseTimer() {
    clearTimeout(this.state.closeTimer);
  }

  clearFocusOn() {
    this.setState({
      focusOn: null
    });
  }

  popout() {
    if(!this.state.visible) {
      return;
    }

    const options = this.filterList(this.state.query);

    return (
      <div className={styles.popout}>

        <div className={styles.popoutHeader}>
          <SearchInput value={this.state.query} onChange={this.searchList} autofocus={true} onFocusChange={this.toggleFocus} />
        </div>

        <SimpleList list={options} onChange={this.props.onChange} selected={this.props.selected} focusOn={this.state.focusOn} onFocusChange={this.toggleFocus} focusComplete={this.clearFocusOn}/>

        {!options.length && <AddToList value={this.state.query} onConfirm={this.addAndSelect} onFocus={this.onFocus} onBlur={this.onBlur} />}
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
  options: [],
  autocloseDelay: 250
};

PopoutSearch.propTypes = {
  options: PropTypes.array,
  autocloseDelay: PropTypes.number
};

export default PopoutSearch;





class SimpleList extends PureComponent {

  constructor(props) {
    super(props);
  }

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
      <ul className={styles.popoutList}>
        {this.props.list.map(item => {
          return (
            <li key={item.label}>
              <button className={styles.popoutListItem}
                onClick={this.selectOption.bind(this, item)}
                onFocus={this.focusChange.bind(this, item, true)}
                onBlur={this.focusChange.bind(this, item, false)}
                ref={(button) => this.shouldAutofocus(item, button)}>
                <div className={styles.iconContainer}>
                  <ReactSVG src={checkmarkIcon} svgClassName={this.props.selected[item.label] ? styles.checkmarkIconSelected : styles.checkmarkIcon} />
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


SimpleList.defaultProps = {
  list: [],
  focusOn: null,
  onChange: () => {},
  onFocusChange: () => {},
  selected: {}
}


SimpleList.propTypes = {
  list: PropTypes.array,
  focusOn: PropTypes.object,
  onChange: PropTypes.func,
  onFocusChange: PropTypes.func
};
