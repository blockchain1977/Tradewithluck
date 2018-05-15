import petData from '../assets/pets.json';
import adoption from '../blockchain/Adoption';

const url = 'http://52.199.0.93:3000/';

export function getAuctions() {
  return dispatch => {
    adoption.checkallAdoptedStatus().then(status =>
      dispatch({
        type: 'AUCTIONS_UPDATE',
        payload: petData.map(pet => ({
          key: pet.id,
          name: pet.name,
          image: url + pet.picture,
          age: pet.age,
          breed: pet.breed,
          location: pet.location,
          adopted: status[parseInt(pet.id, 10)]
        }))
      })
    );
  };
}

export function bidAuctions(index) {
  return dispatch => {
    adoption.handleAdopt(index).then(() =>
      dispatch({
        type: 'AUCTIONS_ITEM_BID',
        payload: index
      })
    );
  };
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
