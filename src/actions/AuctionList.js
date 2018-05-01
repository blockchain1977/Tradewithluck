import petData from '../assets/pets.json';
import { adoption } from '../../App';

export function getAuctions() {
  const url = 'http://ec2-54-92-55-120.ap-northeast-1.compute.amazonaws.com:3000/';

  return dispatch =>
    new Promise((resolve, reject) =>
      adoption
        .deployed()
        .then(instance => {
          const adoptionInstance = instance;
          return adoptionInstance.getAdopters.call();
        })
        .then(adopters =>
          resolve(
            dispatch({
              type: 'AUCTIONS_UPDATE',
              payload: petData.map(pet => ({
                key: pet.id,
                name: pet.name,
                image: url + pet.picture,
                age: pet.age,
                breed: pet.breed,
                location: pet.location,
                adoptstatus:
                  adopters[parseInt(pet.id, 10)] !== '0x0000000000000000000000000000000000000000'
              }))
            })
          )
        )
        .catch(reject)
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
