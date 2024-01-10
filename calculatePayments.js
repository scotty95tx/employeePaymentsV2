class Employee {
    constructor(id, name, hourlyRate) {
      this.id = id;
      this.name = name;
      this.hourlyRate = hourlyRate;
    }
    getSalary(payrollExport) {
      let hoursWorked = 0;
      let totalPay = 0;
  
      for (let i = 0; i < payrollExport.length; i++) {
        if (payrollExport[i].id === this.id) {
          hoursWorked += payrollExport[i].hours;
        }
      }
  
      totalPay += this.hourlyRate * hoursWorked;
  
      return {
        hours: hoursWorked,
        name: this.name,
        type: "None",
        pay: totalPay,
      };
    }
  }
  
  class Laborer extends Employee {
    constructor(id, name, hourlyRate) {
      super(id, name, hourlyRate);
    }
  
    getSalary(payrollExport) {
      let hoursWorked = super.getSalary(payrollExport).hours;
      let totalPay = super.getSalary(payrollExport).pay;
  
      if (hoursWorked > 10) {
        totalPay += hoursWorked * 1 + 20;
      }
  
      return {
        hours: hoursWorked,
        name: this.name,
        type: "Laborer",
        pay: totalPay,
      };
    }
  }
  
  class Foreman extends Employee {
    constructor(id, name, hourlyRate) {
      super(id, name, hourlyRate);
    }
    getSalary(payrollExport) {
      let hoursWorked = super.getSalary(payrollExport).hours;
      let totalPay = super.getSalary(payrollExport).pay;
  
      if (hoursWorked > 15) {
        totalPay += this.hourlyRate * 0.05 * hoursWorked;
      }
  
      return {
        hours: hoursWorked,
        name: this.name,
        type: "Foreman",
        pay: totalPay,
      };
    }
  }
  
  class Super extends Employee {
    constructor(id, name, hourlyRate) {
      super(id, name, hourlyRate);
    }
    getSalary(payrollExport) {
      let hoursWorked = super.getSalary(payrollExport).hours;
      let totalPay = super.getSalary(payrollExport).pay;
  
      if (hoursWorked > 20) {
        totalPay += 50;
      }
      return {
        hours: hoursWorked,
        name: this.name,
        type: "Super",
        pay: totalPay,
      };
    }
  }
  
  let employees = [
    new Laborer(8579, "bob", 25),
    new Foreman(100, "Pete", 40),
    new Super(123, "Daniel", 18),
  ];
  
  const payrollExport = [
    {id: 8579, hours: 50},
    {id: 4020, hours: 55},
    {id: 100, hours: 45},
    {id: 123, hours: 52},
  ];
  
  for (let i = 0; i < employees.length; i++) {
    console.log(employees[i].getSalary(payrollExport));
  }
