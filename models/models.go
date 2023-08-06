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
	connectionString := userName + ":" + password + "@tcp(" + host + ":" + port + ")/my_thing?timeout=10s"
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
	return db.Ping()
}

func Finished() {
	fmt.Println("Closing DB connection")
	db.Close()
}

type Person struct {
	Id int64 `json:"id"`
	FirstName string `json:"firstName"`
	LastName string `json:"lastName"`
	Age int64	`json:"age"`
}

func GetPeople() ([]Person, error) {
	res, err := db.Query("SELECT * FROM people")
	if err != nil {
		return nil, err
	}

	var people []Person

	for res.Next() {
		var person Person
		res.Scan(&person.Id, &person.FirstName, &person.LastName, &person.Age)
		people = append(people, person)
	}

	return people, nil
}