#! /usr/bin/env node
import inquirer from 'inquirer';
import chalk from 'chalk';
import Table from 'cli-table3';
// Function to calculate charges for single phase
function calculateSinglePhase(units, noOfTV) {
    let variableCharges = units * 5; // Example rate
    let minimumCharges = units <= 100 ? 100 : 150; // Example rate
    let phlSurcharge = units * 0.5; // Example rate
    let exciseDuty = 0;
    let tvLicense = noOfTV * 35.00;
    let salesTax = (variableCharges + minimumCharges + phlSurcharge) * 0.17; // Example rate 17%
    let taxableAmount = variableCharges + minimumCharges + phlSurcharge + salesTax;
    let incomeTax = 0;
    let netAmount = taxableAmount + exciseDuty + tvLicense + incomeTax;
    return {
        variableCharges,
        minimumCharges,
        phlSurcharge,
        exciseDuty,
        tvLicense,
        salesTax,
        taxableAmount,
        incomeTax,
        netAmount
    };
}
// Function to calculate charges for 3 phase
function calculateThreePhase(units, noOfTV) {
    let variableCharges = units * 7; // Example rate
    let minimumCharges = units <= 100 ? 120 : 170; // Example rate
    let phlSurcharge = units * 0.7; // Example rate
    let exciseDuty = 0;
    let tvLicense = noOfTV * 35.00;
    let salesTax = (variableCharges + minimumCharges + phlSurcharge) * 0.17; // Example rate 17%
    let taxableAmount = variableCharges + minimumCharges + phlSurcharge + salesTax;
    let incomeTax = 0;
    let netAmount = taxableAmount + exciseDuty + tvLicense + incomeTax;
    return {
        variableCharges,
        minimumCharges,
        phlSurcharge,
        exciseDuty,
        tvLicense,
        salesTax,
        taxableAmount,
        incomeTax,
        netAmount
    };
}
// Function to display the results in a table
function displayTable(phase, units, noOfTV, charges) {
    let table = new Table({
        head: ['Description', 'Amount'],
        colWidths: [30, 30]
    });
    table.push(['Phase', phase], ['Units Billed', units], ['No. of TV', noOfTV], ['Variable Charges', charges.variableCharges], ['Minimum Charges', charges.minimumCharges], ['PHL Surcharge', charges.phlSurcharge], ['Excise Duty', charges.exciseDuty], ['TV License', charges.tvLicense], ['Sales Tax', charges.salesTax], ['Taxable Amount', charges.taxableAmount], ['Income Tax', charges.incomeTax], ['Net Amount of Current Bill', charges.netAmount]);
    console.log(chalk.green.bold(table.toString()));
    console.log(chalk.yellow.bold('Thank you for using the KE Calculator!'));
}
// Inquirer prompt
async function promptUser() {
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'phase',
            message: 'Select the phase:',
            choices: ['Single phase', '3 phase', 'bill rates']
        },
        {
            type: 'input',
            name: 'unitsBilled',
            message: 'Enter the units billed:',
            validate: (input) => !isNaN(input) && Number(input) > 0 && Number(input) <= 1000
        },
        {
            type: 'input',
            name: 'noOfTV',
            message: 'Enter the number of TV(s):',
            validate: (input) => !isNaN(input) && Number(input) >= 0
        }
    ]);
    let phase = answers.phase;
    let unitsBilled = parseInt(answers.unitsBilled);
    let noOfTV = parseInt(answers.noOfTV);
    let charges;
    if (phase === 'Single phase') {
        charges = calculateSinglePhase(unitsBilled, noOfTV);
    }
    else {
        charges = calculateThreePhase(unitsBilled, noOfTV);
    }
    displayTable(phase, unitsBilled, noOfTV, charges);
}
// Run the prompt
promptUser().catch(console.error);
