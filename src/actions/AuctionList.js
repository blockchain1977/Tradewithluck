import petData from '../assets/pets.json';
import Adoption from '../blockchain/Adoption';

export function getAuctions() {
  return dispatch => {
    const url = 'http://ec2-54-92-55-120.ap-northeast-1.compute.amazonaws.com:3000/';

    new Adoption().checkallAdoptedStatus().then(status =>
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
