jest.setMock("../src/process-data", require("../__mocks__/process-data.mock"));

const vendingMachine = require("../src/vending-machine");
describe("loading vending machine", () => {
  beforeEach(() => {
    test = {};
    test.projectName = "aloha";
    test.processedData = {
      projects: {
        [test.projectName]: {
          passed: {
            number: 20,
            satisfaction: 100
          },
          failed: {
            number: 10,
            satisfaction: 80
          }
        }
      },

      experience: {
        1: {
          students: 5,
          averageSatisfaction: 10
        },
        2: {
          students: 6,
          averageSatisfaction: 14
        },
        3: {
          students: 7,
          averageSatisfaction: 12
        },
        4: {
          students: 8,
          averageSatisfaction: 18
        }
      },

      changes: {
        [test.change]: {
          inputs: {
            input1: 0.35,
            input2: 0.80,
            input3: 1.25
          }
        }
      }
    };
    test.subject = new vendingMachine(test.processedData);
    test.project = test.processedData[test.projectName];
  });

  describe("When user loads vending machine", () => {
    describe("When project name exists", () => {
      it("should return how many passed the project", () => {
        const project = test.subject.queryProject(test.projectName);
        expect(project.passed.number).toBe(20);
      });
      it("should return what the satisfaction level is for students who passed", () => {
        const passedSatisfaction = test.subject.queryProject(test.projectName);
        expect(passedSatisfaction.passed.satisfaction).toBe(100);
      });
      it("should return what the satisfaction level is for students who failed", () => {
        const failedSatisfaction = test.subject.queryProject(test.projectName);
        expect(failedSatisfaction.failed.satisfaction).toBe(80);
      });
    });

    describe("When project name does not exist", () => {
      it("should return an error", () => {
        expect(() => test.subject.queryProject("badname")).toThrow();
      })
    });

    describe("Querying experience level", () => {
      describe("Determining average satisfaction", () => {
        it("should return average satisfaction level based on experience when level exists", () => {
          const level = test.subject.queryExpRange(2, 3);
          expect(level).toBe(2);
        });
        it("should return undefined", () => {
          expect().toBe(undefined);
        });
      });
    });

    describe("Getting change back", () => {
      describe("When given change", () => {
        it("should return in change", () => {
          const change = test.subject.getChange(test.change);
          expect(change.inputs.input3).toBe();
        });
      });
    });
  });
});
