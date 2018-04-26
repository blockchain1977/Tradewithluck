import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import getAuctions from '../actions/AuctionList';

class AuctionList extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    auctions: PropTypes.shape({
      auctions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    }).isRequired,
    getAuctions: PropTypes.func.isRequired,
  }

  componentDidMount = () => this.fetchAuctions();

  /**
   * Fetch Data from API, saving to Redux
   */
  fetchAuctions = () => this.props
    .getAuctions();

  render = () => {
    const { Layout, auctions } = this.props;

    return (
      <Layout
        auctions={auctions.auctions}
        reFetch={() => this.fetchRecipes()}
      />
    );
  };
}

const mapStateToProps = state => ({
  auctions: state.auctions || {},
});

const mapDispatchToProps = {
  getAuctions,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuctionList);
