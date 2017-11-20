const processedData = require('./process-data');

module.exports = class VendingMachine {
  constructor(data){
    this.data = processedData(data)
  }

  countInventory(inputChange){
    const change = this.data.machine[inputChange]
    const inventory = []

    for(let item in change){
      inventory.push(change[item].itemName)
    }

    return inventory.join(', ')
  }

  refillStock(inputChange){
    const change = this.data.machine[inputChange]
    const inventory = []

    for(let item in change){
      inventory.push(change[item].itemName)
    }

    return inventory.join(', ')
  }
}