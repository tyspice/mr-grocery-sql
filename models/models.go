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
	if _, err := db.Exec("CREATE TABLE IF NOT EXISTS items (" + ItemModel + ")"); err != nil {
		panic(err)
	}

	if _, err := db.Exec("CREATE TABLE IF NOT EXISTS user_groups(" + UserGroupModel + ")"); err != nil {
		panic(err)
	}

	if _, err := db.Exec("CREATE TABLE IF NOT EXISTS users (" + UserModel + ")"); err != nil {
		panic(err)
	}
}

func Finished() {
	fmt.Println("Closing DB connection")
	db.Close()
}
