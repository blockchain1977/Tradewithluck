export default function getAuctions() {
  return dispatch => new Promise(resolve =>
    resolve(dispatch({
      type: 'AUCTIONS_UPDATE',
      payload: [{ key: 'Good deal' }, { key: 'Good price' }],
    }))).catch(e => console.log(e));
}
