jest.setMock("../src/process-data", require("../__mocks__/process-data.mock"));

const vendingMachine = require("../src/vending-machine");
describe("loading vending machine", () => {
  beforeEach(() => {
    test = {};
    test.processedData = {
      machine: {
        [test.vending]: {
          1: {
            itemName: "Mars Bar",
            price: 2.25,
            itemStock: 10
          },
          2: {
            itemName: "M&M Pack",
            price: 1.25,
            itemStock: 7
          },
          3: {
            itemName: "Coke",
            price: 1.75,
            itemStock: 9
          },
          4: {
            itemName: "Pepsi",
            price: 2.55,
            itemStock: 11
          },
          5: {
            itemName: "RootBeer",
            price: 1.50,
            itemStock: 8
          }
        }
      },

      machineChange: {
        [test.change]:{
          dollar: {
            count: 7
          },
          quarter: {
            count: 23
          },
          dime: {
            count: 35
          },
          nickel: {
            count: 78
          },
          penny: {
            count: 123
          }
        }
      }
    };
    test.subject = new vendingMachine(test.processedData);
    test.project = test.processedData[test.projectName];
  });

  describe("When user loads vending machine", () => {
    describe("When user prints the inventory", () => {
      it("should return mars, M&M, coke, pepsi and rootbeer", () => {
        const inventory = test.subject.countInventory(test.vending);
        expect(inventory).toBe("Mars Bar, M&M Pack, Coke, Pepsi, RootBeer");
      });
    });

    describe("When user refills the inventory", () => {
      it("should return all items with 15 stocks", () => {
        const refill = test.subject.refillStock(test.vending);
        expect(refill).toBe("Mars Bar: 15, M&M Pack: 15, Coke: 15, Pepsi: 15, RootBeer: 15");
      });
    });

    describe("When user resupplies the change", () => {
      it("should return all the coins with maximum count", () => {
        const resupply = test.subject.resupplyCoins(test.change);
        expect(resupply).toBe("dollar: 10, quarter: 50, dime: 50, nickel: 100, penny: 200");
      });
    });

    describe("When user selects an item based on their payment", () => {
      it("should return items that can be purchased: M&M pack and rootbeer", () => {
        const filter = test.subject.filterSelection(test.vending, 1.50);
        expect(filter).toBe("M&M Pack, RootBeer");
      });
    });

    describe("When user selects an item based on their payment", () => {
      it("should return items that can be purchased: M&M pack", () => {
        const filter = test.subject.filterSelection(test.vending, 1.25);
        expect(filter).toBe("M&M Pack");
      });
    });

    describe("When user selects an item based on their payment", () => {
      it("should return items that can be purchased: mars bar, M&M pack, coke, rootbeer", () => {
        const filter = test.subject.filterSelection(test.vending, 2.50);
        expect(filter).toBe("Mars Bar, M&M Pack, Coke, RootBeer");
      });
    });

    describe("When user pays below the cheapest item", () => {
      it("should throw an error and say get more money", () => {
        expect(() => test.subject.filterSelection(test.vending, 1.00)).toThrow();
      });
    });
    
    describe("When user wants go get change for 1.50", () => {
      it("should return 1 dollar, 2 quarter in change", () => {
        const change = test.subject.getChange(1.50);
        expect(change).toBe('1 dollar, 2 quarter');
      });
    });

    describe("When user wants go get change for 2.25", () => {
      it("should return 2 dollar, 1 quarter in change", () => {
        const change = test.subject.getChange(2.25);
        expect(change).toBe('2 dollar, 1 quarter');
      });
    });

    describe("When user wants go get change for 1.10", () => {
      it("should return 1 dollar, 1 dime", () => {
        const change = test.subject.getChange(1.10);
        expect(change).toBe('1 dollar, 1 dime');
      });
    });
  });
});
