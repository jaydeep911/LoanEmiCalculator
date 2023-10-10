export const calculateHomeLoanEMI = (
  principal,
  annualInterestRate,
  tenureInYears,
) => {
  // Calculate monthly interest rate
  const monthlyInterestRate = annualInterestRate / 12 / 100;

  // Calculate the number of monthly installments (tenure in months)
  const tenureInMonths = tenureInYears * 12;

  // Calculate EMI using the formula
  const emi =
    (principal *
      monthlyInterestRate *
      Math.pow(1 + monthlyInterestRate, tenureInMonths)) /
    (Math.pow(1 + monthlyInterestRate, tenureInMonths) - 1);

  return emi;

  // example for call
  // Example usage:
  // const principalAmount = 1000000; // 10 lakhs
  // const annualInterestRate = 8; // 8% per annum
  // const tenureInYears = 20; // 20 years

  // const emi = calculateHomeLoanEMI(
  //   principalAmount,
  //   annualInterestRate,
  //   tenureInYears,
  // );
  // console.log('EMI: ₹', emi.toFixed(2));
};

export const calculateLoanAmortizationSimple = (
  loanAmount,
  monthlyEMI,
  annualInterestRate,
  loanTenureInMonths,
) => {
  const monthlyInterestRate = annualInterestRate / 12 / 100;
  const amortizationSchedule = [];

  let remainingLoanAmount = loanAmount;
  for (let month = 1; month <= loanTenureInMonths; month++) {
    const interestPayment = remainingLoanAmount * monthlyInterestRate;
    const principalPayment = monthlyEMI - interestPayment;
    remainingLoanAmount -= principalPayment;

    amortizationSchedule.push({
      month,
      monthlyEMI,
      principalPayment,
      interestPayment,
      remainingLoanAmount,
    });
  }

  return amortizationSchedule;

  // Example usage:
  // const loanAmount = 1000000; // 10 lakhs
  // const annualInterestRate = 8; // 8% per annum
  // const loanTenureInMonths = 240; // 20 years loan tenure in months
  // const monthlyEMI = calculateHomeLoanEMI(loanAmount, annualInterestRate, loanTenureInMonths / 12);

  // const amortizationSchedule = calculateLoanAmortization(loanAmount, monthlyEMI, annualInterestRate, loanTenureInMonths);

  // // Display the full monthly report
  // console.log("Month\tMonthly EMI\tPrincipal Payment\tInterest Payment\tRemaining Loan Amount");
  // amortizationSchedule.forEach((entry) => {
  //   console.log(
  //     `${entry.month}\t₹${entry.monthlyEMI.toFixed(2)}\t\t₹${entry.principalPayment.toFixed(2)}\t\t₹${entry.interestPayment.toFixed(2)}\t\t₹${entry.remainingLoanAmount.toFixed(2)}`
  //   );
  // });
};

// export const calculateLoanReportWithPartPayment = (
//   principalAmount,
//   annualInterestRate,
//   monthlyEMI,
//   loanTenureMonths,
//   partPayments = [],
// ) => {
//   const monthlyInterestRate = annualInterestRate / 12 / 100;
//   const amortizationSchedule = [];

//   let remainingLoanAmount = principalAmount;
//   let currentMonth = 1;

//   for (let month = 1; month <= loanTenureMonths; month++) {
//     const interestPayment = remainingLoanAmount * monthlyInterestRate;
//     const principalPayment = monthlyEMI - interestPayment;

//     // Apply part payments
//     for (const partPayment of partPayments) {
//       if (month >= partPayment.startMonth && month <= partPayment.endMonth) {
//         remainingLoanAmount -= partPayment.amount;
//       }
//     }

//     remainingLoanAmount -= principalPayment;

//     amortizationSchedule.push({
//       month: currentMonth,
//       monthlyEMI,
//       principalPayment,
//       interestPayment,
//       remainingLoanAmount,
//     });

//     if (month === currentMonth) {
//       currentMonth++;
//     }
//   }

//   return amortizationSchedule;

//   //
//   // Example usage:
//   // const loanAmount = 1000000; // 10 lakhs
//   // const annualInterestRate = 8; // 8% per annum
//   // const loanTenureMonths = 240; // 20 years loan tenure in months
//   // const monthlyEMI = calculateHomeLoanEMI(loanAmount, annualInterestRate, loanTenureMonths / 12);

//   // const partPayments = [
//   //   {
//   //     amount: 50000,
//   //     startMonth: 12,
//   //     endMonth: 24,
//   //   },
//   //   {
//   //     amount: 30000,
//   //     startMonth: 36,
//   //     endMonth: 48,
//   //   },
//   // ];

//   // const amortizationSchedule = calculateLoanReport(
//   //   loanAmount,
//   //   annualInterestRate,
//   //   monthlyEMI,
//   //   loanTenureMonths,
//   //   partPayments
//   // );

//   // // Display the full monthly report
//   // console.log("Month\tMonthly EMI\tPrincipal Payment\tInterest Payment\tRemaining Loan Amount");
//   // amortizationSchedule.forEach((entry) => {
//   //   console.log(
//   //     `${entry.month}\t₹${entry.monthlyEMI.toFixed(2)}\t\t₹${entry.principalPayment.toFixed(2)}\t\t₹${entry.interestPayment.toFixed(2)}\t\t₹${entry.remainingLoanAmount.toFixed(2)}`
//   //   );
//   // });
// };

export function calculateLoanReport(
  principalAmount,
  annualInterestRate,
  monthlyEMI,
  loanTenureMonths,
  partPayments = [],
  loanStartDate,
) {
  const monthlyInterestRate = annualInterestRate / 12 / 100;
  const amortizationSchedule = [];
  const startDate = new Date(loanStartDate);
  const endDate = new Date(startDate);
  const monthlyEMIORG = monthlyEMI;

  let remainingLoanAmount = principalAmount;
  let currentMonth = 1;

  let calculatedPrinciple = 0;
  let calculatedInterest = 0;
  let calculatedPartPayment = 0;
  let quarterCounter = 0;

  // for (let month = 1; month <= loanTenureMonths; month++) {
  while (remainingLoanAmount > 1) {
    const interestPayment = remainingLoanAmount * monthlyInterestRate;
    if (remainingLoanAmount <= monthlyEMI) {
      monthlyEMI = remainingLoanAmount;
    }

    let principalPayment = monthlyEMI - interestPayment;
    calculatedPrinciple = calculatedPrinciple + principalPayment;
    calculatedInterest = calculatedInterest + interestPayment;

    // Apply part payments

    let partPaymentOfMonth = 0;
    for (const partPayment of partPayments) {
      const partPaymentStartDate = new Date(partPayment.startDate);
      const partPaymentEndDate = new Date(partPayment.endDate);

      if (
        (partPayment.interval === 'Monthly' &&
          endDate >= partPaymentStartDate) ||
        (partPayment.interval === 'Yearly' &&
          endDate.getMonth() === partPaymentStartDate.getMonth()) ||
        // (partPayment.interval === 'Quarterly' &&
        //   endDate.getMonth() === partPaymentStartDate.getMonth() &&
        //   (endDate.getMonth() + 1) % 3 === 0)
        (partPayment.interval === 'Quarterly' &&
          endDate.getMonth() >= partPaymentStartDate.getMonth() &&
          endDate.getMonth() <= partPaymentEndDate.getMonth()) ||
        (partPayment.interval === 'OneTime' &&
          endDate >= partPaymentStartDate &&
          endDate <= partPaymentEndDate)
      ) {
        if (remainingLoanAmount >= partPayment.amount) {
          if (partPayment.interval === 'Quarterly') {
            if (
              partPayment.interval === 'Quarterly' &&
              quarterCounter % 3 === 0 &&
              endDate >= partPaymentStartDate &&
              endDate <= partPaymentEndDate
            ) {
              remainingLoanAmount -= partPayment.amount;
              if (remainingLoanAmount - principalPayment > 0) {
                calculatedPartPayment =
                  calculatedPartPayment + partPayment.amount;
                partPaymentOfMonth = partPayment.amount;
              }
            }
          } else {
            remainingLoanAmount -= partPayment.amount;
            if (remainingLoanAmount - principalPayment > 0) {
              calculatedPartPayment =
                calculatedPartPayment + partPayment.amount;
              partPaymentOfMonth = partPayment.amount;
            }
          }
        }
      }
    }
    // Adjust principal payment if it's greater than remaining loan amount
    if (principalPayment > remainingLoanAmount) {
      principalPayment = remainingLoanAmount;
    }

    // Adjust principal payment if it's greater than remaining loan amount
    if (principalPayment > remainingLoanAmount) {
      principalPayment = remainingLoanAmount;
    }

    // If remaining loan amount is less than or equal to the monthly EMI, set the last EMI as remaining loan amount
    if (remainingLoanAmount <= monthlyEMI) {
      monthlyEMI = remainingLoanAmount + interestPayment; // Adjust EMI to cover interest
      principalPayment = remainingLoanAmount;
      remainingLoanAmount = 0; // Remaining loan is paid off
      partPaymentOfMonth = 0;
    } else {
      remainingLoanAmount -= principalPayment;
    }

    amortizationSchedule.push({
      month: currentMonth,
      monthlyEMI,
      principalPayment,
      interestPayment,
      remainingLoanAmount,
      partPaymentOfMonth: partPaymentOfMonth,
      paymentDate: new Date(endDate),
    });
    currentMonth++;
    quarterCounter++;
    endDate.setMonth(endDate.getMonth() + 1);

    if (remainingLoanAmount <= monthlyEMIORG) {
      console.log(
        'remainingLoanAmount ' +
          remainingLoanAmount +
          ' principalPayment ' +
          principalPayment +
          '   EMI ' +
          monthlyEMIORG,
      );
    }
  }

  return {
    amortizationSchedule,
    loanEndDate: endDate,
    calculatedPrinciple: calculatedPrinciple,
    calculatedInterest: calculatedInterest,
    calculatedPartPayment: calculatedPartPayment,
  };
}
