

DROP DATABASE IF EXISTS bamazon_db;


CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (

 item_id INT(10) AUTO_INCREMENT,
 
 product_name VARCHAR (30) NOT NULL, 
 
 department_name VARCHAR (30) NOT NULL, 
 
 price DECIMAL (10,2) NULL,
 
 stock_quantity INT NULL,
 
 PRIMARY KEY (item_id) 
 
 );
    --
    USE bamazon_db;


    INSERT INTO products
        (item_id, product_name, department_name, price, stock_quantity)
    VALUES
        (10781, "Running Shorts", "Sporting Goods", 40.00, 12);

    INSERT INTO products
        (item_id, product_name, department_name, price, stock_quantity)
    VALUES
        (03181, "Computer", "Technology", 500.00, 5);

    INSERT INTO products
        (item_id, product_name, department_name, price, stock_quantity)
    VALUES
        (14151, "VR Goggles", "Technology", 200.00, 15);

    INSERT INTO products
        (item_id, product_name, department_name, price, stock_quantity)
    VALUES
        (65748, "'63 Stingray ", "Automotive", 50000.00, 1);

    INSERT INTO products
        (item_id, product_name, department_name, price, stock_quantity)
    VALUES
        (99230, "Rolex", "Jewelry", 3000.00, 7);

    INSERT INTO products
        (item_id, product_name, department_name, price, stock_quantity)
    VALUES
        (77739, "Running Shoes", "Footwear", 220.00, 4);

    INSERT INTO products
        (item_id, product_name, department_name, price, stock_quantity)
    VALUES
        (00481, "Running Shorts", "Sporting Goods", 40.00, 12);

    INSERT INTO products
        (item_id, product_name, department_name, price, stock_quantity)
    VALUES
        (01681, "Computer", "Technology", 500.00, 5);

    INSERT INTO products
        (item_id, product_name, department_name, price, stock_quantity)
    VALUES
        (22948, "Brazil Tix", "Travel", 5000.00, 8);

    INSERT INTO products
        (item_id, product_name, department_name, price, stock_quantity)
    VALUES
        (36927, "BroTox", "Cosmetics", 450.00, 12);

