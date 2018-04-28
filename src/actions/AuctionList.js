export function getAuctions() {
  return dispatch =>
    new Promise(resolve =>
      resolve(
        dispatch({
          type: 'AUCTIONS_UPDATE',
          payload: [
            {
              key: 'Good deal',
              image:
                'http://images.clipartpanda.com/auctioneer-clipart-New-Auction-Gavel-Clip-Art-Logo.jpg'
            },
            {
              key: 'Good price',
              image:
                'http://images.clipartpanda.com/auctioneer-clipart-New-Auction-Gavel-Clip-Art-Logo.jpg'
            }
          ]
        })
      )
    ).catch(e => console.log(e));
}

export function toggleFAB() {
  return dispatch =>
    // new Promise(resolve =>
    // resolve(
    dispatch({
      type: 'TOGGLE_FAB',
      payload: ''
    });
  // )
  // ).catch(e => console.log(e));
}
