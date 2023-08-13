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
	_, err := db.Exec("CREATE TABLE IF NOT EXISTS items (id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, items TEXT NULL, category VARCHAR(255) NULL, notes VARCHAR(255) NULL, status ENUM('nonce', 'out', 'low', 'adequate', 'stocked') NULL, updated DATETIME NULL)")

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

type Status string

const (
	Nonce    Status = "nonce"
	Out      Status = "out"
	Low      Status = "low"
	Adequate Status = "adequate"
	Stocked  Status = "stocked"
)

type Item struct {
	Id       int64     `json:"id"`
	Item     string    `json:"item"`
	Category string    `json:"category"`
	Notes    string    `json:"notes"`
	Status   Status    `json:"status"`
	Updated  time.Time `json:"updated"`
}

func GetItems() ([]Item, error) {
	res, err := db.Query("SELECT * FROM items")
	if err != nil {
		return nil, err
	}

	var items []Item

	for res.Next() {
		var item Item
		res.Scan(&item.Id, &item.Item, &item.Category, &item.Notes, &item.Status, &item.Updated)
		items = append(items, item)
	}

	return items, nil
}

type User struct {
	Id        int64  `json:"id"`
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	Email     string `json:"email"`
}

func GetUsers() ([]User, error) {
	res, err := db.Query("SELECT * FROM users")
	if err != nil {
		return nil, err
	}

	var users []User

	for res.Next() {
		var user User
		res.Scan(&user.Id, &user.FirstName, &user.LastName, &user.Email)
		users = append(users, user)
	}

	return users, nil
}
