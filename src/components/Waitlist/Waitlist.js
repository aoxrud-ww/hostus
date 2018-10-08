import React, { Component } from 'react';
import WaitlistItem from '../WaitlistItem/WaitlistItem.js';
import styles from './Waitlist.module.scss';
import { connect } from "react-redux";
import SearchInput from '../SearchInput/SearchInput.js';
import SearchError from '../SearchError/SearchError.js';
import Button from '../Button/Button.js';
import PageHeader from '../PageHeader/PageHeader.js';
import WaitlistHeader from '../WaitlistHeader/WaitlistHeader.js';
import WaitlistStats from '../WaitlistStats/WaitlistStats.js';
import { Link } from 'react-router-dom';
import * as routes  from '../../routes.js';
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
    this.props.onEdit(customer);
    this.props.history.push(routes.CUSTOMER_PROFILE);
  }

  onSearch(searchQuery) {
    const query = searchQuery.toLowerCase();
    this.setState({
      query,
      list: this.getFilteredList(query)
    });
  }

  getFilteredList(query) {
    let list;
    if(query) {
      list = this.props.list.filter(guest => {
        return guest.name.toLowerCase().includes(query);
      });
    } else {
      list = this.props.list;
    }
    return list;
  }

  render() {
    const filteredList = this.getFilteredList(this.state.query);

    return (
      <div className={styles.container}>
        <PageHeader title="Waitlist">
          <div className={styles.headerCta}>
            <Link to={routes.ADD_GUEST}><Button theme='page-header'>Add</Button></Link>
            <SearchInput onChange={this.onSearch} />
          </div>
        </PageHeader>
        <WaitlistStats />
        <ul className={styles.list}>
          {filteredList.length > 0 && <WaitlistHeader />}
          {filteredList.map(item =>
            (<WaitlistItem
              key={item.id}
              item={item}
              onDelete={this.props.onDelete}
              onNotify={this.props.onNotify}
              onEdit={this.onEdit} />)
          )}
        </ul>

        {!filteredList.length && <SearchError query={this.state.query} />}
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
