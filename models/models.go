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
	connectionString := userName + ":" + password + "@tcp(" + host + ":" + port + ")/mr_grocery?timeout=10s"
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
	_, err := db.Exec("CREATE TABLE IF NOT EXISTS items (id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, item TEXT NULL, category VARCHAR(255) NULL, notes VARCHAR(255) NULL, status ENUM('nonce', 'out', 'low', 'adequate', 'stocked') NULL, updated DATETIME NULL)")

	if err != nil {
		panic(err)
	}

	_, err = db.Exec("CREATE TABLE IF NOT EXISTS users (id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, first_name VARCHAR(255) NULL, last_name VARCHAR(255) NULL, email VARCHAR(255) NULL)")

	if err != nil {
		panic(err)
	}
}

func Finished() {
	fmt.Println("Closing DB connection")
	db.Close()
}