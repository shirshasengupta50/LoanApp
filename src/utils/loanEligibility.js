const calculateMaxLoan = (nmi, tenureYears, annualInterestRate, foir = 0.5)=>{
    let r = (annualInterestRate / 100) / 12;
    let n = tenureYears * 12; 

    let emiPerLakh = (100000 * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

    let maxLoan = (nmi * foir / emiPerLakh) * 100000;

    return Math.round(maxLoan);
}

module.exports =  calculateMaxLoan;