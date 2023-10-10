export const convertTwoDigitNumber = num => {
  if (num < 10) {
    return ones[num];
  } else if (num < 20) {
    return teens[num - 10];
  } else {
    const ten = Math.floor(num / 10);
    const one = num % 10;
    return tens[ten] + (one !== 0 ? ' ' + ones[one] : '');
  }
};

export const convertThreeDigitNumber = num => {
  const hundred = Math.floor(num / 100);
  const remainingTwoDigits = num % 100;

  if (hundred === 0) {
    return convertTwoDigitNumber(remainingTwoDigits);
  } else {
    return (
      ones[hundred] +
      ' Hundred' +
      (remainingTwoDigits !== 0
        ? ' ' + convertTwoDigitNumber(remainingTwoDigits)
        : '')
    );
  }
};

export const convertToIndianRupeesWords = (num: Number) => {
  const ones = [
    'Zero',
    'One',
    'Two',
    'Three',
    'Four',
    'Five',
    'Six',
    'Seven',
    'Eight',
    'Nine',
  ];

  const tens = [
    '',
    '',
    'Twenty',
    'Thirty',
    'Forty',
    'Fifty',
    'Sixty',
    'Seventy',
    'Eighty',
    'Ninety',
  ];

  const teens = [
    'Ten',
    'Eleven',
    'Twelve',
    'Thirteen',
    'Fourteen',
    'Fifteen',
    'Sixteen',
    'Seventeen',
    'Eighteen',
    'Nineteen',
  ];

  if (num === 0) {
    return 'Zero Rupees';
  } else if (num < 0) {
    return 'Negative ' + convertToIndianRupeesWords(-num);
  } else {
    const crore = Math.floor(num / 10000000);
    const lakh = Math.floor((num % 10000000) / 100000);
    const thousand = Math.floor((num % 100000) / 1000);
    const remaining = num % 1000;

    let result = '';

    if (crore > 0) {
      result += convertThreeDigitNumber(crore) + ' Crore ';
    }

    if (lakh > 0) {
      result += convertThreeDigitNumber(lakh) + ' Lakh ';
    }

    if (thousand > 0) {
      result += convertThreeDigitNumber(thousand) + ' Thousand ';
    }

    if (remaining > 0) {
      result += convertThreeDigitNumber(remaining);
    }

    return result.trim() + ' Rupees';
  }

  //   // Example usage:
  //   const amount = 123456789.12; // Replace with your desired amount
  //   const words = convertToIndianRupeesWords(amount);
  //   console.log(words); // Output: "Twelve Crore Thirty Four Lakh Fifty Six Thousand Seven Hundred Eighty Nine Rupees Twelve Paise"
};

export const calculateEMI = (
  loanPrincipal,
  annualInterestRate,
  loanTermMonths,
  loanStartDate,
) => {
  // Convert the annual interest rate to monthly rate and calculate the number of monthly payments
  const monthlyInterestRate = annualInterestRate / 100 / 12;
  const numberOfPayments = loanTermMonths;

  // Calculate the EMI using the formula
  const emi =
    (loanPrincipal *
      monthlyInterestRate *
      Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
    (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

  // Calculate the total loan amount paid over the loan term
  const totalPayment = emi * numberOfPayments;

  // Create a date object for the loan starting date
  const startDate = new Date(loanStartDate);

  // Calculate the end date of the loan term by adding months to the start date
  const endDate = new Date(startDate);
  endDate.setMonth(startDate.getMonth() + loanTermMonths);

  return {
    emi: emi.toFixed(2),
    totalPayment: totalPayment.toFixed(2),
    startDate: startDate.toDateString(),
    endDate: endDate.toDateString(),
  };
};

//   // Example usage:
//   const loanPrincipal = 100000; // Replace with the loan principal amount
//   const annualInterestRate = 6.5; // Replace with the annual interest rate
//   const loanTermMonths = 36; // Replace with the loan term in months
//   const loanStartDate = '2023-01-01'; // Replace with the loan starting date in YYYY-MM-DD format

//   const emiDetails = calculateEMI(loanPrincipal, annualInterestRate, loanTermMonths, loanStartDate);
//   console.log('EMI: ₹' + emiDetails.emi);
//   console.log('Total Payment: ₹' + emiDetails.totalPayment);
//   console.log('Loan Start Date: ' + emiDetails.startDate);
//   console.log('Loan End Date: ' + emiDetails.endDate);

function toAmount(amount) {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// console.log(calculateLoanSchedule(50000, 5.8, 48, "off", 0, new Date(), []));

/**
 * Function to calculate the detailed loan schedule with support for part payments.
 *
 * @param {number} loanAmount - The initial amount of the loan. This is the principal amount that the loan was issued for.
 * @param {number} yearlyInterest - The yearly interest rate as a percentage (e.g., for 5%, pass 5).
 * @param {number} months - The total number of months for which the loan was issued.
 * @param {string} [partPaymentFrequency="off"] - The frequency of part payments. This can be 'off', 'monthly', 'quarterly', 'yearly', or 'custom'.
 *                                              If 'off', part payments will not be considered in the calculations.
 *                                              If 'monthly', 'quarterly', or 'yearly', part payments will be made every month, every 3 months, or every 12 months respectively, using the value of the partPayment parameter.
 *                                              If 'custom', the function will expect a customPartPaymentSchedule array, with each object in the array specifying the installment number and part payment amount.
 * @param {number} [partPayment=0] - The amount of part payment. This will be used if the partPaymentFrequency is set to 'monthly', 'quarterly', or 'yearly'.
 * @param {Date} [startDate=new Date()] - The date of the first installment. The function will calculate the dates of subsequent installments by adding a month to this date for each installment.
 * @param {Object[]} [customPartPaymentSchedule=[]] - Array of custom part payment objects, each containing the installment number and part payment amount.
 *                                                   This will be used if partPaymentFrequency is set to 'custom'.
 *                                                   Each object in the array should be in the following format: { "installmentNumber": x, "partPayment": y }, where x is the installment number and y is the part payment amount for that installment.
 *
 * @returns {Object} An object containing the loan schedule as an array of objects and the total amounts of part payments made, interest paid, money saved by making part payments, monthly installment to be paid, and total amount paid.
 *                   Each object in the schedule array contains detailed information about each installment, including the installment number and date, opening balance, principal, interest, total payment, part payment, total payment including part payment, closing balance, and loan paid till today as a percentage.
 *
 * Note: All monetary amounts in the output are formatted as strings in the 'en-US' locale and 'USD' currency.
 *       To change the locale or currency, modify the 'toAmount' helper function inside this function.
 */
export const calculateLoanSchedule = (
  loanAmount,
  yearlyInterest,
  months,
  partPaymentFrequency = 'off',
  partPayment = 0,
  startDate = new Date(),
  customPartPaymentSchedule = [],
) => {
  // calculate the monthly interest rate
  const monthlyInterestRate = yearlyInterest / (12 * 100);
  // calculate the monthly payment using the loan payment formula
  //   const monthlyPayment = Math.round((loanAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -months)));
  const monthlyPayment =
    (loanAmount * monthlyInterestRate) /
    (1 - Math.pow(1 + monthlyInterestRate, -months));

  // remaining loan amount, starting with the initial full loan amount
  let remainingLoanAmount = loanAmount;
  // total interest paid, starting at 0
  let totalInterestPaid = 0;
  // total part payment, starting at 0
  let totalPartPayment = 0;
  // the date of the first installment
  let installmentDate = new Date(startDate);

  let totalPaymentToBePaid = 0;

  // array to hold the schedule
  let schedule = [];

  // loop through each month
  for (
    let installmentNumber = 1;
    installmentNumber <= months;
    installmentNumber++
  ) {
    // calculate the interest for the current month
    let monthlyInterest = remainingLoanAmount * monthlyInterestRate;
    // calculate the principal for the current month
    let principal = monthlyPayment - monthlyInterest;
    let principalORG = monthlyPayment - monthlyInterest;

    // opening balance for the current month
    let openingBalance = remainingLoanAmount;
    // initialize part payment made in the current month
    let partPaymentMade = 0;

    totalPaymentToBePaid += monthlyPayment;

    // check the part payment frequency
    if (partPaymentFrequency !== 'off') {
      if (
        partPaymentFrequency === 'monthly' ||
        (partPaymentFrequency === 'quarterly' && installmentNumber % 3 === 0) ||
        (partPaymentFrequency === 'yearly' && installmentNumber % 12 === 0)
      ) {
        partPaymentMade = partPayment;
      } else if (partPaymentFrequency === 'custom') {
        // find if there is a custom part payment for the current installment
        let customPartPayment = customPartPaymentSchedule.find(
          x => x.installmentNumber === installmentNumber,
        );
        if (customPartPayment) {
          // convert the part payment amount to number
          partPaymentMade = Number(
            customPartPayment.partPayment.replace(/[^0-9.-]+/g, ''),
          );
        }
      }
    }

    // check if a part payment was made in the current month
    if (partPaymentMade) {
      // increase the principal by the part payment
      principal += partPaymentMade;
      // reduce the remaining loan amount by the part payment
      remainingLoanAmount -= partPaymentMade;
      // increase the total part payment by the part payment
      totalPartPayment += partPaymentMade;
    }

    // reduce the remaining loan amount by the principal
    remainingLoanAmount -= principal;

    // if the remaining loan amount is less than or equal to 0, make adjustments
    if (remainingLoanAmount <= 0) {
      // adjust the principal by adding the negative remaining loan amount
      //   principal += remainingLoanAmount;
      principal += remainingLoanAmount;

      // increase the total interest paid by the monthly interest
      //   totalInterestPaid += monthlyInterest;
      // set the remaining loan amount to 0
      remainingLoanAmount = 0;
    }

    // increase the total interest paid by the monthly interest
    totalInterestPaid += monthlyInterest;

    // create an object for the current installment
    let installment = {
      installmentNumber: installmentNumber,
      installmentDate: installmentDate.toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
      }),
      openingBalance: toAmount(openingBalance),
      principal: toAmount(principal),
      principalORG: toAmount(principalORG),
      monthlyInterest: toAmount(monthlyInterest),
      monthlyPayment: toAmount(monthlyPayment),
      partPaymentMade: toAmount(partPaymentMade),
      monthlyPaymentWithPartPayment: toAmount(monthlyPayment + partPaymentMade),
      remainingLoanAmount: toAmount(remainingLoanAmount),
      loanPaid: (
        ((loanAmount - remainingLoanAmount) / loanAmount) *
        100
      ).toFixed(2),
    };

    // add the current installment to the schedule
    schedule.push(installment);
    // move the installment date to the next month
    installmentDate.setMonth(installmentDate.getMonth() + 1);

    // if the remaining loan amount is 0 or less, break the loop
    if (remainingLoanAmount <= 0) {
      break;
    }
  }

  // return the schedule and calculated totals
  return {
    schedule: schedule,
    totalPartPayment: totalPartPayment,
    totalInterestPaid: totalInterestPaid,
    moneySaved: monthlyPayment * months - (loanAmount + totalInterestPaid),
    monthlyPayment: monthlyPayment,
    totalAmount: loanAmount + totalInterestPaid + totalPartPayment,
  };
};
