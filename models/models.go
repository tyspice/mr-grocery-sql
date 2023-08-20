package models

import (
	"database/sql"
	"fmt"
	"time"

	_ "github.com/go-sql-driver/mysql"
)

var db *sql.DB

func InitDB(userName string, password string, host string, port string) error {
	fmt.Println("Initializing DB")
	connectionString := userName + ":" + password + "@tcp(" + host + ":" + port + ")/mr_grocery?parseTime=true"
	var err error
	db, _ = sql.Open("mysql", connectionString)
	retryCount := 0
	for retryCount <= 5 {
		err = db.Ping()
		if err != nil {
			fmt.Println("DB not initialized, waiting and retrying")
			time.Sleep(3 * time.Second)
		}
		retryCount++
	}

	if err == nil {
		InitTables()
	}
	return db.Ping()
}

func InitTables() {
	if _, err := db.Exec(
		`CREATE TABLE IF NOT EXISTS items (
			id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, 
			item TEXT NULL,
			category VARCHAR(255) NULL,
			notes VARCHAR(255) NULL,
			status ENUM('nonce', 'out', 'low', 'adequate', 'stocked') NULL,
			updated DATETIME DEFAULT(NOW()),
			UNIQUE(id)
		)`); err != nil {
		panic(err)
	}

	if _, err := db.Exec(
		`CREATE TABLE IF NOT EXISTS user_groups(
			id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
			name VARCHAR(255) NULL,
			UNIQUE(id)
		)`); err != nil {
		panic(err)
	}

	if _, err := db.Exec(
		`CREATE TABLE IF NOT EXISTS users (
			id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
			first_name VARCHAR(255) NULL,
			last_name VARCHAR(255) NULL,
			email VARCHAR(255) NOT NULL,
			password VARCHAR(255) NULL,
			role ENUM('admin', 'normy') NOT NULL,
			user_group_id INT NOT NULL,
			FOREIGN KEY(user_group_id) REFERENCES user_groups(id),
			UNIQUE(id, email)
		)`); err != nil {
		panic(err)
	}
}

func Finished() {
	fmt.Println("Closing DB connection")
	db.Close()
}
