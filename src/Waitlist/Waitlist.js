import React, { Component } from 'react';
import WaitlistItem from '../WaitlistItem/WaitlistItem.js';
import styles from './Waitlist.module.scss';
import { connect } from "react-redux";
import SearchInput from '../SearchInput/SearchInput.js';
import SearchError from '../SearchError/SearchError.js';
import Button from '../Button/Button.js';
import WaitlistHeader from '../WaitlistHeader/WaitlistHeader.js';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'


class Waitlist extends Component {
  constructor(props) {
    super(props);

    this.onSearch = this.onSearch.bind(this);
    this.state = {
      list: this.props.list
    }
  }

  onSearch(searchQuery) {
    const query = searchQuery.toLowerCase();
    this.setState({
      query
    });
  }

  getFilteredList() {
    let list;
    if(this.state.query) {
      list = this.props.list.filter(guest => {
        return guest.name.toLowerCase().includes(this.state.query);
      });
    } else {
      list = this.props.list;
    }
    return list;
  }

  render() {
    const filteredSearch = this.getFilteredList();

    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Waitlist</h1>
          <div className={styles.headerCta}>
            <Link to='/add-party'><Button>Add</Button></Link>
            <SearchInput onChange={this.onSearch} />
          </div>
        </header>
        <ul className={styles.list}>
          <WaitlistHeader />
          {filteredSearch.map(item =>
            (<WaitlistItem key={item.id} item={item} onDelete={this.props.onDelete} onNotify={this.props.onNotify} />)
          )}
        </ul>

        {!filteredSearch.length && <SearchError query={this.state.query} />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { list: state.list };
};


const mapDispatchToProps = {
  onDelete(item) {
    return {
      type: 'delete',
      item
    }
  },
  onNotify(item) {
    return {
      type: 'notify',
      item
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Waitlist);
