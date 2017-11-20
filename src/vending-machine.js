const processedData = require('./process-data');

module.exports = class VendingMachine {
  constructor(data){
    this.data = processedData(data)
  }

  getChange(inputChange){
    const change = this.data.machine[inputChange]
    const inventory = []

    for(let item in change){
      inventory.push(change[item].item)
    }

    return inventory.join(', ')
  }
}