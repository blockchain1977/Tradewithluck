import petData from '../assets/pets.json';

export function getAuctions() {
  const url = 'http://ec2-54-92-55-120.ap-northeast-1.compute.amazonaws.com:3000/';

  return dispatch =>
    new Promise(resolve =>
      resolve(
        dispatch({
          type: 'AUCTIONS_UPDATE',
          payload: petData.map(pet => ({
            key: pet.id,
            name: pet.name,
            image: url + pet.picture,
            age: pet.age,
            breed: pet.breed,
            location: pet.location
          }))
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
