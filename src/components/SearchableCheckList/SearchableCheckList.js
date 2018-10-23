import React, { PureComponent } from 'react';
import styles from './SearchableCheckList.module.scss';
import SearchInput from '../SearchInput/SearchInput.js';
import CheckList from '../CheckList/CheckList.js';
import PropTypes from 'prop-types';



class AddToList extends PureComponent {
  render() {
    return (
      <div className={styles.notFoundContainer}>
        <h1 className={styles.notFoundHeading}>No Results Found</h1>
        <button className={styles.createButton}
          onFocus={this.props.onFocusChange.bind(this, true)}
          onBlur={this.props.onFocusChange.bind(this, false)}
          onClick={this.props.onConfirm.bind(this, this.props.value)}>
            Add {this.props.value}
        </button>
      </div>
    )
  }
}

AddToList.defaultProps = {
  onFocusChange: () => {},
  onChange: () => {},
  value: ''
};

AddToList.propTypes = {
  onFocusChange: PropTypes.func,
  onChange: PropTypes.func,
  value: PropTypes.string
};


class SearchableCheckList extends PureComponent {
  constructor(props) {
    super(props);
    this.searchList = this.searchList.bind(this);
    this.addAndSelect = this.addAndSelect.bind(this);
    this.toggleFocus = this.toggleFocus.bind(this);
    this.clearFocusOn = this.clearFocusOn.bind(this);
    this.state = {
      query: '',
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
    return this.props.list.filter(option => option.label.toLowerCase().includes(query));
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
        ...this.props.list
      ];
      this.props.onChange(selected, tags);
    });
  }

  toggleFocus(isFocused) {
    this.props.onFocusChange(isFocused);
  }

  getAllOptions() {
    return [...this.state.customOptions, ...this.props.list];
  }

  clearFocusOn() {
    this.setState({
      focusOn: null
    });
  }

  render() {
    const list = this.filterList(this.state.query);

    return (
      <div className={styles.container}>
        <div className={styles.searchContainer}>
          <SearchInput value={this.state.query} onChange={this.searchList} autofocus={true} onFocusChange={this.toggleFocus} />
        </div>
        <CheckList list={list} onChange={this.props.onChange} selected={this.props.selected} focusOn={this.state.focusOn} onFocusChange={this.toggleFocus} focusComplete={this.clearFocusOn}/>

        {!list.length && <AddToList value={this.state.query} onConfirm={this.addAndSelect} onFocusChange={this.toggleFocus}  />}
      </div>
    );
  }
}


SearchableCheckList.defaultProps = {
  list: []
};

SearchableCheckList.propTypes = {
  list: PropTypes.array,
};

export default SearchableCheckList;

