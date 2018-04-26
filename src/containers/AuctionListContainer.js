import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getAuctionList } from "../actions/AuctionList";

class AuctionList extends Component {
  componentDidMount = () => this.fetchAuctions();

  /**
   * Fetch Data from API, saving to Redux
   */
  fetchAuctions = () => {
    return this.props
      .getAuctionList();
  };

  render = () => {
    const { Layout, auctions } = this.props;

    return (
      <Layout
        auctions={auctions.auctions}
      />
    );
  };
}

const mapStateToProps = state => ({
  auctions: state.auctions || {}
});

const mapDispatchToProps = {
  getAuctionList
};

export default connect(mapStateToProps, mapDispatchToProps)(
  AuctionList
);
