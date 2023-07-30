package models

import (
	"database/sql"
	"fmt"
)

var db *sql.DB

func InitDB(userName string, password string) error {
	fmt.Println("Initializing DB")
	connectionString := userName + ":" + password + "@tcp(127.0.0.1:3306)/my_thing"
	var err error
	db, err = sql.Open("mysql", connectionString)

	if err != nil {
		return err
	}
	fmt.Println("DB successfully initialized")
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