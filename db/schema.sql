-- DROP DATABASE
DROP DATABASE IF EXISTS ecommerce_db;

-- CREATE DATABASE
CREATE DATABASE ecommerce_db;

CREATE TABLE category (
    id INT PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(30) NOT NULL,
);

CREATE TABLE product (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(30) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock INT DEFAULT 10 NOT NULL,
    FOREIGN KEY (category_id) REFERENCES category(id)
);

CREATE TABLE tag (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tag_name VARCHAR(30),
);

CREATE TABLE product-tag (
    id INT PRIMARY KEY AUTO_INCREMENT,
    FOREIGN KEY (product_id) REFERENCES product(id),
    FOREIGN KEY (tag_id) REFERENCES tag(id)
);

