const processedData = require('./process-data');

module.exports = class VendingMachine {
  constructor(data){
    this.data = processedData(data)
  }

  queryProject(name){
    if(!this.data.projects[name]){
      throw new Error('try another name')
    } else {
      return this.data.projects[name]         
    }
  } 

  queryExpRange(min, max){
    for(let i = min; i<max; i++){
      const minimum = this.data.experience[min].averageSatisfaction
      const maximum = this.data.experience[max].averageSatisfaction
    
      return totalAverage
    }
  }

  getChange(inputChange){
    const change = this.data.changes[inputChange]
    // let dollar = null
    // let quarter = null
    // let nickel = null
    // let dime = null

    if(change > 1){
      Math.trunc(change)
      return newChange
    }

    return
  }
}