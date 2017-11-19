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

  queryCohort(cohort){
    return this.data.cohorts[cohort]
  }
}