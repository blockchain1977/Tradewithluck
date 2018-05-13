class Adoption {
  constructor() {
    // const contract = require('truffle-contract');
    this.contract = new global.web3.eth.Contract(
      [
        {
          constant: true,
          inputs: [],
          name: 'getAdopters',
          outputs: [{ name: '', type: 'address[16]' }],
          payable: false,
          stateMutability: 'view',
          type: 'function'
        },
        {
          constant: false,
          inputs: [{ name: 'petId', type: 'uint256' }],
          name: 'adopt',
          outputs: [{ name: '', type: 'uint256' }],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      '0x06f7c7540412fdf41e0694c4d6bb7a17dd62b7a3',
      {
        from: '0x4aa7b8957c71880258d3b2a89e877e3ab8071ca7', // default from address
        gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
      }
    );
  }

  checkallAdoptedStatus() {
    // let adoptionInstance;
    return Promise.resolve(
      this.contract.methods
        .getAdopters()
        .call()
        .then(adopters => {
          const adoptionstatus = [];
          for (let i = 0; i < adopters.length; i++) {
            if (adopters[i] !== '0x0000000000000000000000000000000000000000') {
              adoptionstatus.push(true);
            } else {
              adoptionstatus.push(false);
            }
          }

          return adoptionstatus;
        })
    );
  }

  handleAdopt(petId) {
    // will set to actual account after wallet function implimented
    const account = '0x4aa7b8957c71880258d3b2a89e877e3ab8071ca7';

    return Promise.resolve(
      this.contract.methods
        .adopt(petId)
        .send({ from: account })
        .then(result => result)
    );
  }
}

const adoption = new Adoption();
export default adoption;
