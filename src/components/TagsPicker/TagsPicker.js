import React, { Component, cloneElement, PureComponent } from 'react';
import styles from './TagsPicker.module.scss';
import SearchInput from '../SearchInput/SearchInput.js';
import cx from 'classnames';
import addIcon from '../../assets/add.svg';
import checkmarkIcon from '../../assets/check-mark.svg';
import ReactSVG from 'react-svg';
import { connect } from "react-redux";

class Tag extends PureComponent {
  constructor(props) {
    super(props);
    this.toggleActiveState = this.toggleActiveState.bind(this);
  }

  toggleActiveState(e) {
    e.preventDefault();
    this.props.onToggle(!this.props.isActive);
  }

  render() {
    const classNames = cx(styles.tag, {
      [styles.selected]: this.props.isActive
    });

    return (
      <a href='#' onClick={this.toggleActiveState}>
        <div className={classNames}>
          {this.props.children}
        </div>
      </a>
    )
  }
}

Tag.defaultProps = {
  isActive: false,
  onToggle: () => {}
};



class TagsList extends PureComponent {
  constructor(props) {
    super(props);
  }

  toggleTag(tag, isActive) {
    console.log('this.props.selected', this.props.selected);
    this.props.onChange({
      ...this.props.selected,
      [tag.label]: isActive
    });
    console.log('tags list is about to broadcast', {
      ...this.props.selected,
      [tag.label]: isActive
    });
  }

  render() {
    return (
      <div className={styles.container}>
        {this.props.tags.map(tag => (
          <Tag key={tag.label} isActive={this.props.selected[tag.label]} onToggle={this.toggleTag.bind(this, tag)}>
            {tag.label}
          </Tag>
        ))}
      </div>
    );
  }
}

TagsList.defaultProps = {
  onChange: () => {}
}




class TagsPicker extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tags: this.props.tags,
      selected: {}
    };

    this.updatedTags = this.updatedTags.bind(this);
    this.updateSelected = this.updateSelected.bind(this);
  }

  updatedTags(selected, tags) {
    this.updateSelected(selected);

    if(tags) {
      this.setState({ tags });
    }
  }

  updateSelected(selected) {
    this.setState({ selected });
  }

  render() {
    return (
      <div className={styles.container}>

        <TagsList tags={this.state.tags} selected={this.state.selected} onChange={this.updateSelected}/>

        <PopoutSearch options={this.state.tags} selected={this.state.selected} onChange={this.updatedTags}>
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



class PopoutSearch extends PureComponent {

  constructor(props) {
    super(props);
    this.togglePopout = this.togglePopout.bind(this);
    this.searchList = this.searchList.bind(this);
    this.addAndSelect = this.addAndSelect.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.toggleFocus = this.toggleFocus.bind(this);
    this.state = {
      query: '',
      visible: true,
      touched: false,
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

  togglePopout(e) {
    e.preventDefault();
    this.setState({
      visible: !this.state.visible
    });
  }

  addAndSelect(text) {
    const option = {label: text, isActive: true};
    this.setState(state => ({
      query: '',
      focusOn: option
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
        visible: false
      });
    }, this.props.autocloseDelay);

    this.setState({
      closeTimer
    });
  }

  broadcastSelectedOptions() {
    if(this.state.touched) {
      const selected = this.getSelectedOptions();
      this.props.onChange(selected);
    }
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
        <ul className={styles.popoutList}>
          {options.map(option => {
            return (
              <li key={option.label}>
                <a href='#' className={styles.popoutListItem} onClick={this.selectOption.bind(this, option)} onFocus={this.onFocus} onBlur={this.onBlur}>
                  {this.props.selected[option.label] && <div className={styles.iconContainer}><ReactSVG src={checkmarkIcon} svgClassName={styles.checkmarkIcon} /></div>}
                  {option.label}
                </a>
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
        <a href='#' onClick={this.togglePopout}>
          {cloneElement(this.props.children, {active: this.state.visible})}
        </a>
        {this.popout()}
      </div>
    )
  }
}


PopoutSearch.defaultProps = {
  options: [],
  autocloseDelay: 500
};

TagsPicker.defaultProps = {
  value: [],
  onChange: () => {}
};


const mapStateToProps = state => ({
  tags: state.frequentlyUsedTags
});

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(TagsPicker);

