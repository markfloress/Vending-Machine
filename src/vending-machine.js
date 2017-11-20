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


  resupplyCoins(coinsStock){
    const stock = this.data.machineChange[coinsStock]
    const coins = Object.keys(stock)

    const dollarCount = stock.dollar.count
    const quarterCount = stock.quarter.count
    const dimeCount = stock.dime.count
    const nickelCount = stock.nickel.count
    const pennyCount = stock.penny.count
    const coinCount = []

    if(dollarCount < 10){
      let inc = 10 - dollarCount
      coinCount.push(dollarCount+inc)
    } else {
      coinCount.push(dollarCount)
    }

    if(quarterCount < 50){
      let inc = 50 - quarterCount
      coinCount.push(quarterCount+inc)
    } else {
      coinCount.push(quarterCount)
    }

    if(dimeCount < 50){
      let inc = 50 - dimeCount
      coinCount.push(dimeCount+inc)
    } else {
      coinCount.push(dimeCount)
    }

    if(nickelCount < 100){
      let inc = 100 - nickelCount
      coinCount.push(nickelCount+inc)
    } else {
      coinCount.push(nickelCount)
    }

    if(pennyCount < 200){
      let inc = 200 - pennyCount
      coinCount.push(pennyCount+inc)
    } else {
      coinCount.push(pennyCount)
    }

    const resuppliedChange = coins.reduce((arr, val, idx) => {
      return arr.concat(`${val}: ${coinCount[idx]}`)
    }, [])

    return resuppliedChange.join(', ')
  }
}