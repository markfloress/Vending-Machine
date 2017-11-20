const processedData = require('./process-data');

module.exports = class VendingMachine {
  constructor(data){
    this.data = processedData(data)
  }

  countInventory(machineStock){
    const stock = this.data.machine[machineStock]
    const inventory = []

    for(let item in stock){
      inventory.push(stock[item].itemName)
    }

    return inventory.join(', ')
  }

  refillStock(machineStock){
    const stock = this.data.machine[machineStock]
    const inventoryCount = []
    const inventoryName = []

    for(let item in stock){
      inventoryCount.push(stock[item].itemStock)
    }

    for(let name in stock){
      inventoryName.push(stock[name].itemName)
    }

    const refillCount = inventoryCount.map( x => {
      if(x < 15){
        let increase = 15 - x
        return x + increase
      } else {
        return x
      }

      return x
    })

    const refilledStock = inventoryName.reduce((arr, val, idx) => {
      return arr.concat(`${val}: ${refillCount[idx]}`)
    }, [])

    return refilledStock.join(', ')
  }
}