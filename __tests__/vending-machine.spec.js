jest.setMock("../src/process-data", require("../__mocks__/process-data.mock"));

const vendingMachine = require("../src/vending-machine");
describe("loading vending machine", () => {
  beforeEach(() => {
    test = {};
    test.processedData = {
      machine: {
        [test.vending]: {
          1: {
            item: "Mars Bar",
            price: 2.25,
            count: 10
          },
          2: {
            item: "M&M Pack",
            price: 1.25,
            count: 7
          },
          3: {
            item: "Coke",
            price: 1.75,
            count: 9
          },
          4: {
            item: "Pepsi",
            price: 2.55,
            count: 11
          },
          5: {
            item: "RootBeer",
            price: 1.50,
            count: 8
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
        const change = test.subject.getChange(test.vending);
        expect(change).toBe("Mars Bar, M&M Pack, Coke, Pepsi, RootBeer");
      });
    });
  });
});
