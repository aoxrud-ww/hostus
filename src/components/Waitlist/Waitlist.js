import React, { Component } from 'react';
import WaitlistItem from '../WaitlistItem/WaitlistItem.js';
import styles from './Waitlist.module.scss';
import { connect } from "react-redux";
import SearchInput from '../SearchInput/SearchInput.js';
import SearchError from '../SearchError/SearchError.js';
import Button from '../Button/Button.js';
import PageHeader from '../PageHeader/PageHeader.js';
import WaitlistHeader from '../WaitlistHeader/WaitlistHeader.js';
import { Link } from 'react-router-dom'
import {deleteWailistCustomer, notifyWaitlistCustomer, editWaitlistCustomer} from '../../actions';


class Waitlist extends Component {
  constructor(props) {
    super(props);

    this.onSearch = this.onSearch.bind(this);
    this.onEdit = this.onEdit.bind(this);

    this.state = {
      list: this.props.list
    }
  }

  onEdit(customer) {
    // console.log(e);
    this.props.onEdit(customer)
    this.props.history.push('/add-party');
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
        <PageHeader title="Waitlist">
          <div className={styles.headerCta}>
            <Link to='/add-party'><Button theme='page-header'>Add</Button></Link>
            <SearchInput onChange={this.onSearch} />
          </div>
        </PageHeader>
        <ul className={styles.list}>
          <WaitlistHeader />
          {filteredSearch.map(item =>
            (<WaitlistItem
              key={item.id}
              item={item}
              onDelete={this.props.onDelete}
              onNotify={this.props.onNotify}
              onEdit={this.onEdit} />)
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
  onDelete: deleteWailistCustomer,
  onNotify: notifyWaitlistCustomer,
  onEdit: editWaitlistCustomer
}
export default connect(mapStateToProps, mapDispatchToProps)(Waitlist);
