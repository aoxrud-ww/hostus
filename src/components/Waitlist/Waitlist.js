import React, { Component } from 'react';
import WaitlistItem from '../WaitlistItem/WaitlistItem.js';
import styles from './Waitlist.module.scss';
import { connect } from "react-redux";
import SearchInput from '../SearchInput/SearchInput.js';
import SearchError from '../SearchError/SearchError.js';
import WaitlistHeader from '../WaitlistHeader/WaitlistHeader.js';
import * as routes  from '../../routes.js';
import {deleteWailistCustomer, notifyWaitlistCustomer, editWaitlistCustomer} from '../../actions';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


class Waitlist extends Component {
  constructor(props) {
    super(props);

    this.onSearch = this.onSearch.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.state = {
      list: this.props.list,
      transitionConfig: {
        transitionName: {
          enter: styles.animateEnter,
          enterActive: styles.animateEnterActive,
          leave: styles.animateLeave,
          leaveActive: styles.animateLeaveActive,
        },
        transitionEnterTimeout: 500,
        transitionLeaveTimeout: 300
      }
    };
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
      <div className='card'>
        <div className='card-header'>
          <SearchInput onChange={this.onSearch} value={this.state.query} placeholder="Search Waitlist..." />
        </div>
        {filteredList.length > 0 && <WaitlistHeader />}
        <ReactCSSTransitionGroup component="ul" className={styles.list} {...this.state.transitionConfig}>
        {filteredList.map(item =>
          (<WaitlistItem
            key={item.id}
            item={item}
            onDelete={this.props.onDelete}
            onNotify={this.props.onNotify}
            onComplete={this.props.onComplete}
            onEdit={this.onEdit} />)
        )}
        </ReactCSSTransitionGroup>
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
  onEdit: editWaitlistCustomer,
  onComplete: deleteWailistCustomer
};

export default connect(mapStateToProps, mapDispatchToProps)(Waitlist);
