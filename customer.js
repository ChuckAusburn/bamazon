//Developer: Chuck Ausburn 



// Require prompt node package 
var prompt = require('prompt');

// Require mySQL node package
var mysql = require('mysql');

// Require the table padding function
var padText = require('./padTable.js')


// Link to mySQL Database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",  
    password: "password",  
    database: "bamazon_db"
});

// Connect to Database
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
});



// Display All Items inside Database and sell an item to customer
connection.query('SELECT * FROM products', function (err, res) {

    // Error Handler
    if (err) throw err;


    // Show User message
    console.log('Check out our selection...\n');

    // Set up table header
    console.log('  ID  |      Product Name      |  Department Name  |   Price  | In Stock');
    console.log('- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - ')

    // Loop through database and show all items
    for (var i = 0; i < res.length; i++) {

        //
        // ---------- Add in padding ----------
        var itemID = res[i].ItemID + ''; // convert to string
        itemID = padText("  ID  ", itemID);

        var productName = res[i].ProductName + ''; //  string conversion
        productName = padText("      Product Name      ", productName);

        var departmentName = res[i].DepartmentName + ''; //  string conversion
        departmentName = padText("  Department Name  ", departmentName);

        var price = '$' + res[i].Price.toFixed(2) + ''; //  string conversion
        price = padText("   Price  ", price);

        var quantity = res[i].StockQuantity + ''; //  string conversion
        // ----------------------------------------------

        // Log table entry
        console.log(itemID + '|' + productName + '|' + departmentName + '|' + price + '|    ' + quantity);
    }

    // =================================================================================================

    // After the table is shown, ask the user to purchase  
    prompt.start();

    // Request Item ID
    console.log('\nWhich item do you want to purchase?');
    prompt.get(['buyItemID'], function (err, result) {

        // Show Item ID selected
        var buyItemID = result.buyItemID;
        console.log('You selected Item # ' + buyItemID + '.');

        // Ask for Quanity  
        console.log('\nHow many do you wish to purchase?')
        prompt.get(['buyItemQuantity'], function (err, result) {

            // Show quantity selected
            var buyItemQuantity = result.buyItemQuantity;
            console.log('You selected to buy ' + buyItemQuantity + ' of these.');

            // Once the customer has placed the order, check inventory
            connection.query('SELECT StockQuantity FROM Products WHERE ?', [{ ItemID: buyItemID }], function (err, res) {
                if (err) throw err; // Error Handler
                // Check if the item Id was valid  
                if (res[0] == undefined) {
                    console.log('Sorry... We found no items with Item ID "' + buyItemID + '"');
                    connection.end(); // end the script/connection
                }
                // Valid Item ID, so compare bamazon inventory with user requested quantity 
                else {
                    var bamazonQuantity = res[0].StockQuantity;
                    // Sufficient inventory
                    if (bamazonQuantity >= buyItemQuantity) {

                        // Update mySQL database with changed inventory
                        var newInventory = parseInt(bamazonQuantity) - parseInt(buyItemQuantity); // ensure we have integers for subtraction & database
                        connection.query('UPDATE Products SET ? WHERE ?', [{ StockQuantity: newInventory }, { ItemID: buyItemID }], function (err, res) {
                            if (err) throw err; // Error Handler
                        }); // end inventory update query


                        // Show customer their purchase total  
                        var customerTotal;
                        connection.query('SELECT Price FROM Products WHERE ?', [{ ItemID: buyItemID }], function (err, res) {

                            var buyItemPrice = res[0].Price;
                            customerTotal = buyItemQuantity * buyItemPrice.toFixed(2);

                            console.log('\nYour total is $' + customerTotal + '.');

                            // ------------------------- Re factor for Executive Challenge ------------------------
                            // Find the department for the purchase item
                            connection.query('SELECT DepartmentName FROM Products WHERE ?', [{ ItemID: buyItemID }], function (err, res) {
                                var itemDepartment = res[0].DepartmentName;

                                // Find the current Revenue for that department
                                connection.query('SELECT TotalSales FROM Departments WHERE ?', [{ DepartmentName: itemDepartment }], function (err, res) {
                                    var totalSales = res[0].TotalSales;

                                    // Calculate new sale revenue
                                    var totalSales = parseFloat(totalSales) + parseFloat(customerTotal);

                                    // Add the revenue from each transaction to the TotalSales column for the related department.
                                    connection.query('UPDATE Departments SET ? WHERE ?', [{ TotalSales: totalSales }, { DepartmentName: itemDepartment }], function (err, res) {
                                        if (err) throw err; // Error Handler
                                        console.log('Transaction Completed. Thank you!')
                                        connection.end(); // end the script/connection

                                    }); // end new revenue update query

                                }); // end current revenue query

                            }); // end department name query 
                            // -------------------------------------------------------------------------------------
                        }); // end customer purchase update query 
                    }
                    // Insufficient inventory
                    else {
                        console.log('Sorry... We only have ' + bamazonQuantity + ' of those items. Order cancelled.');
                        connection.end(); // end the script/connection
                    }
                }

            }); // end item quantity query

        }); // end of prompt 2

    }); // end of prompt 1

}); // end of main query