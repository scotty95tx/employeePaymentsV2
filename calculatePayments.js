class PaymentCalculator {
    calculateEmployeePayment(id, employeeData, payrollExport) {
        this.employeeData = employeeData
        this.id = employeeData[id].id
        this.name = employeeData[id].name
        this.hourlyRate = employeeData[id].hourlyRate
        this.type = employeeData[id].type
        
        for (let i = 0; i < payrollExport.length; i++) {
            if (payrollExport[i].id === this.id) {
                this.hoursWorked = payrollExport[i].hours
            }
        }
        
        this.totalPay = this.hourlyRate * this.hoursWorked

        for (let i = 0; i < payrollExport.length; i++) {
            if (payrollExport[i].id === this.id) {
                this.hoursWorked = payrollExport[i].hours
            }
        }
    }
}

class CalculateLaborerPay extends PaymentCalculator {
    calculateEmployeePayment(id, employeeData, payrollExport) {
        super.calculateEmployeePayment(id, employeeData, payrollExport)
        if (this.hoursWorked > 10) {
            this.totalPay += this.hoursWorked * 1 + 20
        }
        
        return {hours: this.hoursWorked, name: this.name, type: this.type, pay: this.totalPay}
    }
}

class CalculateForemanPay extends PaymentCalculator {
    calculateEmployeePayment(id, employeeData, payrollExport) {
        super.calculateEmployeePayment(id, employeeData, payrollExport)
        if (this.hoursWorked > 15) {
            this.totalPay += this.hourlyRate * .05 * this.hoursWorked
        }

        return {hours: this.hoursWorked, name: this.name, type: this.type, pay: this.totalPay}
    }
}

class CalculateSuperPay extends PaymentCalculator {
    calculateEmployeePayment(id, employeeData, payrollExport) {
        super.calculateEmployeePayment(id, employeeData, payrollExport)
        if (this.hoursWorked > 20) {
            this.totalPay += 50
        }
        return {hours: this.hoursWorked, name: this.name, type: this.type, pay: this.totalPay}
    }
}

const employeeData = {
    1079 : {
        id: 1079,
        name: "Bob",
        age: 29,
        gender: "male",
        race: "Native Hawaiian",
        dateOfBirth: "Feb 14th, 1994",
        hourlyRate: 45,
        type: "Laborer"
    },
    4020 : {
        id: 4020,
        name: "Sir William Wallace",
        age: 753,
        gender: "male",
        race: "Scottish",
        dateOfBirth: "Dec 12th, 1270",
        hourlyRate: 50,
        type: "Foreman"
    },
    123 : {
        id: 123,
        name: "Thomas Shelby",
        age: 133,
        gender: "male",
        race: "Irish",
        dateOfBirth: "June 6th, 1890",
        hourlyRate: 80,
        type: "SuperIntendent"
    },
    8759 : {
        id: 8759,
        name: "Ragnar Lothbrok",
        age: 1268,
        gender: "male",
        race: "Danish",
        dateOfBirth: "August 30th, 755",
        hourlyRate: 30,
        type: "Laborer"
    }
}

const payrollExport = [{id: 8759, hours: 50}, {id: 4020, hours: 55}, {id: 1079, hours: 45}, {id: 123, hours: 52}]

function calculateAllPay(employeeData, payrollExport) {
    let allPay = [{SUCCESS: true, ERROR: 'none'}]
    for (let i = 0; i < payrollExport.length; i++) {
        if (employeeData[payrollExport[i].id].type == "Laborer") {
            allPay.push(new CalculateLaborerPay().calculateEmployeePayment(payrollExport[i].id, employeeData, payrollExport))
        } else if (employeeData[payrollExport[i].id].type == "Foreman") {
            allPay.push(new CalculateForemanPay().calculateEmployeePayment(payrollExport[i].id, employeeData, payrollExport))
        } else if (employeeData[payrollExport[i].id].type == "SuperIntendent") {
            allPay.push(new CalculateSuperPay().calculateEmployeePayment(payrollExport[i].id, employeeData, payrollExport))
        } else {
            return [{SUCCESS: false, ERROR: `Employeee ${payrollExport[i].id} does not have a valid type`}]
        }
    }
    return allPay
}

console.log(calculateAllPay(employeeData, payrollExport))