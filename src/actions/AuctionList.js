export default function getAuctions() {
  return dispatch => new Promise(resolve =>
    resolve(dispatch({
      type: 'AUCTIONS_UPDATE',
      payload: [{ key: 'Have A Test' }, { key: 'Have A Try' }],
    }))).catch(e => console.log(e));
}
