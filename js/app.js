// getValues from input with validation
function getValue(id) {
    const getInput = document.getElementById(id);
    const getInputValue = parseFloat(getInput.value);

    if (getInputValue < 0) {
        throw { message: id + " input should be a positive number" };
    } else if (isNaN(getInputValue)) {
        throw { message: id + " input should be a number" };
    } else {
        return getInputValue;
    }
}

// Error & Success showing toast
function toast(message, type) {
    const errorMessage = document.getElementById(type + "-body");
    errorMessage.innerText = message;
    let errorToast = document.getElementById(type + "-message");
    let toast = new bootstrap.Toast(errorToast);
    toast.show();
}

// reset input value when data submitted successfully
function resetValue() {
    for (const id of arguments) {
        const getInput = document.getElementById(id);
        getInput.value = "";
    }
}

// Get Expenses Data in Object
const inputData = {};

// get Total Expenses
function getTotalExpenses() {
    const expenses = inputData.cloth + inputData.rent + inputData.food;
    return expenses;
}

// get balance
function getBalance() {
    const balance = inputData.salary - getTotalExpenses();
    return balance;
}

// Handle Expenses Calculate
document.getElementById("calculate-btn").addEventListener("click", () => {
    try {
        if (getValue("salary") < getValue("food") + getValue("rent") + getValue("cloth")) {
            throw { message: "You haven't enough salary for expenses" };
        } else {
            inputData.salary = getValue("salary");
            inputData.food = getValue("food");
            inputData.rent = getValue("rent");
            inputData.cloth = getValue("cloth");

            // set total expenses
            const totalExpenses = getTotalExpenses();
            document.getElementById("total-expenses").innerText = totalExpenses;

            // set balance
            const balance = getBalance();
            document.getElementById("balance").innerText = balance;

            toast("Expenses Calculated, Saving Amount for future", "success");

            // reset input values
            resetValue("salary", "food", "rent", "cloth");
        }

        // remove class when error fix
        document.getElementById("error-msg").classList.add("d-none");

        // error catching
    } catch (error) {
        const errorContainer = document.getElementById("error-msg");
        if (error) {
            errorContainer.innerText = error.message;
            errorContainer.classList.remove("d-none");
        }
    }
});

// calculate & set remaining balance with error handling
function calculateSavings() {
    // get saving percentage value
    const savingPercentage = getValue("saving");

    // calculate savings amount
    const savingAmount = (savingPercentage / 100) * inputData.salary;

    // get remaining balance
    const remainingBalance = getBalance() - savingAmount;
    const remainingDisplay = document.getElementById("remaining-balance");

    // condition check for saving money
    if (remainingBalance <= 0) {
        throw { message: "You haven't enough money for saving" };
    } else {
        remainingDisplay.innerText = remainingBalance;
        document.getElementById("saving-amount").innerText = savingAmount; // set saving amount

        // displaying success message for savings
        toast("Successfully added " + savingPercentage + "% Savings", "success");

        // reset saving input value
        resetValue("saving");
    }
}

// Handle Saving Amount with error
document.getElementById("saving-btn").addEventListener("click", () => {
    try {
        if (isNaN(inputData.salary)) {
            throw { message: "Saving can't add before calculating expenses" };
        }
        // declare saving & remaining amount
        calculateSavings();

        // error catching
    } catch (error) {
        if (error) {
            // displaying error message
            toast(error.message, "warning");
        }
    }
});
