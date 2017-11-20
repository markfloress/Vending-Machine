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

    const refillCount = inventoryCount.map( count => {
      if(count < 15){
        let increase = 15 - count
        return count + increase
      } else {
        return count
      }

      return count
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

  filterSelection(machineStock, inputPayment){
    const stock = this.data.machine[machineStock]
    const payment = inputPayment
    const selection = []
    const filteredSelection = []

    for(let item in stock){
      selection.push(stock[item])
    }

    selection.map( item => {
      if(item.price <= payment){
        filteredSelection.push(item.itemName)
      } else if ( payment < 1.24) {
        throw new Error('GET MO MONAAY!')
      }
    })

    return filteredSelection.join(', ')
  }


  getChange(inputChange){
    const change = inputChange
    const noDecimal = Math.floor(change)
    const noWholeNumber = change - noDecimal
    const coinCount = []    

    const dollar = noDecimal
    if(dollar){
      coinCount.push(`${dollar} dollar`)
    }

    const quarter = Math.floor(noWholeNumber / 0.25)
    if(quarter){
      coinCount.push(`${quarter} quarter`)
    }

    const dime = Math.floor((noWholeNumber - quarter*0.25) / 0.10)
    if(dime){
      coinCount.push(`${dime} dime`)
    }

    // nickel
    if(quarter){
      const nickel = Number(Math.floor((noWholeNumber - quarter*0.25) / 0.05))
      if(nickel){coinCount.push(`${nickel} nickel`)}
    } else if (dime){
      const nickel = Number(Math.floor((noWholeNumber - dime*0.10) / 0.05))
      if(nickel){coinCount.push(`${nickel} nickel`)}
    } else {
      null
    }

    // penny
    if(quarter){
      const penny = Number(Math.floor((noWholeNumber - quarter*0.25) / 0.01))
      if(penny){coinCount.push(`${penny} penny`)}
    } else if (dime){
      const penny = Number(Math.floor((noWholeNumber - dime*0.10) / 0.01))
      if(penny){coinCount.push(`${penny} penny`)}
    } else if (nickel){
      const penny = Number(Math.floor((noWholeNumber - nickel*0.05) / 0.01))
      if(penny){coinCount.push(`${penny} penny`)}
    } else {
      null
    }
  
    return coinCount.join(', ')
  }
}