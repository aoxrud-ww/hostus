import React, { PureComponent } from 'react';
import styles from './PageHeader.module.scss';

class PageHeader extends PureComponent {
  render() {
    return (
        <header className={styles.header}>
          <h1 className={styles.title}>{this.props.title}</h1>
          {this.props.children}
        </header>
    );
  }
}

export default PageHeader;
