import React, { Component, cloneElement } from 'react';
import styles from './TagsPicker.module.scss';
import Button from '../Button/Button.js';
import SearchInput from '../SearchInput/SearchInput.js';

import Status from '../Status/Status.js';
import cx from 'classnames';
import addIcon from '../../assets/add.svg';
import checkmarkIcon from '../../assets/check-mark.svg';

import ReactSVG from 'react-svg';

class Tag extends Component {
  render() {
    const classNames = cx(styles.tag, {
      [styles.selected]: this.props.active
    });

    return (
      <div className={classNames}>
        {this.props.children}
      </div>
    )
  }
}

class TagsPicker extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
      selected: {}
    };

    this.tagsAdded = this.tagsAdded.bind(this);
    this.tags = [
      {
        label: "Bar"
      },
      {
        label: "Outside",
        isActive: true
      },
      {
        label: "Table"
      },
      {
        label: "Booth"
      },
      {
        label: "Inside"
      }
    ];
  }

  toggleTag(tag, e) {
    e.preventDefault();
    const isSelected = this.state.selected[tag.label];

    this.setState({
      selected: {
        ...this.state.selected,
        [tag.label]: !isSelected
      }
    }, () => {
      this.props.onChange(Object.keys(this.state.selected))
    });
  }

  tagsAdded(tagsAdded) {
    console.log('clicked', tagsAdded);
  }

  render() {

    return (
      <div className={styles.container}>
        {this.tags.map(tag => {
          return (
            <a key={tag.label} href='#' onClick={this.toggleTag.bind(this, tag)}>
              <Tag active={this.state.selected[tag.label]}>{tag.label}</Tag>
            </a>)
        })}

        <PopoutSearch onSelect={this.tagsAdded} options={this.tags}>
          <Tag>
            <div className={styles.inlineButton}>
              <ReactSVG src={addIcon} svgClassName={styles.addIcon} /> Add
            </div>
          </Tag>
        </PopoutSearch>

      </div>
    );
  }
}

class AddToList extends Component {
  render() {
    return (
      <div>
        Unable to find {this.props.value}
        <button onClick={this.props.onConfirm.bind(this, this.props.value)}>Create It</button>
      </div>
    )

  }
}



class PopoutSearch extends Component {

  constructor(props) {
    super(props);
    this.addTag = this.addTag.bind(this);
    this.searchList = this.searchList.bind(this);
    this.addAndSelect = this.addAndSelect.bind(this);
    this.state = {
      query: '',
      options: this.props.options,
      visible: true
    };
  }

  searchList(query) {
    this.setState({
      query
    })
    console.log(query);
  }

  filterList(query) {
    let list;
    if(query) {
      const normalizedQuery = query.toLowerCase();
      list = this.findInList(this.state.options, normalizedQuery);
    } else {
      list = this.state.options;
    }
    return list;
  }

  findInList(list, query) {
    return this.state.options.filter(option => option.label.toLowerCase().includes(query));
  }

  sortListBySelected(list) {
    return list.sort((a, b) => {
      if(a.isSelected || b.isSelected) return 1;
      return -1;
    })
  }

  addTag(e) {
    e.preventDefault();
    this.setState({
      visible: !this.state.visible
    });
  }

  addAndSelect(e) {
    this.setState({
      query: '',
      options: [...this.state.options, {label: e, isSelected: true}]
    });
  }

  selectOption(option) {
    this.setState({
      options: this.state.options.map(_option => {
        if(option === _option) {
          _option.isSelected = !_option.isSelected;
        }
        return _option;
      })
    })
  }

  popout() {
    if(!this.state.visible) {
      return;
    }

    const options = this.filterList(this.state.query);

    return (
      <div className={styles.popout}>
        <div className={styles.popoutHeader}>
          <SearchInput value={this.state.query} onChange={this.searchList} autofocus={true} />
        </div>
        <ul className={styles.popoutList}>
          {options.map(option => {
            return (
              <li key={option.label}>
                <a href='#' className={styles.popoutListItem} onClick={this.selectOption.bind(this, option)}>
                  {option.isSelected && <div className={styles.iconContainer}><ReactSVG src={checkmarkIcon} svgClassName={styles.checkmarkIcon} /></div>}
                {option.label}</a>
              </li>
            )
          })}

          {!options.length && <AddToList value={this.state.query} onConfirm={this.addAndSelect} />}
        </ul>
      </div>
    );
  }

  render() {
    return (
      <div className={styles.addTag}>
        <a href='#' onClick={this.addTag}>
          {cloneElement(this.props.children, {active: this.state.visible})}
        </a>
        {this.popout()}
      </div>
    )
  }
}


PopoutSearch.defaultProps = {
  options: []
};

TagsPicker.defaultProps = {
  value: 1,
  onChange: () => {}
};

export default TagsPicker;

