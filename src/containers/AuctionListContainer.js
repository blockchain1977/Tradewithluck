import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getAuctions, toggleFAB, bidAuctions } from '../actions/AuctionList';

class AuctionList extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    auctions: PropTypes.shape({
      auctions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
      fabstatus: PropTypes.bool.isRequired
    }).isRequired,
    getAuctions: PropTypes.func.isRequired,
    toggleFAB: PropTypes.func.isRequired,
    bidAuctions: PropTypes.func.isRequired
  };

  componentDidMount = () => {
    this.props.getAuctions();
  };

  render = () => {
    const { Layout, auctions } = this.props;

    return (
      <Layout
        fabstatus={auctions.fabstatus}
        auctions={auctions.auctions}
        reFetch={() => this.props.getAuctions()}
        toggleFAB={this.props.toggleFAB}
        adoptPet={this.props.bidAuctions}
      />
    );
  };
}

const mapStateToProps = state => ({
  auctions: state.auctions || {},
  fabstatus: state.fabstatus
});

const mapDispatchToProps = {
  getAuctions,
  toggleFAB,
  bidAuctions
};

export default connect(mapStateToProps, mapDispatchToProps)(AuctionList);
