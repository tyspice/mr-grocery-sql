package main

import (
	"flag"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
	"github.com/tyspice/mr-grocery-sql/models"
)

func setupRouter() *gin.Engine {
	fmt.Println("Starting Server")
	r := gin.Default()

	// Ping test
	r.GET("/ping", func(c *gin.Context) {
		c.String(http.StatusOK, "pong")
	})

	r.GET("/people", func(c *gin.Context) {
		people, err := models.GetPeople()
		if err != nil {
			c.JSON(http.StatusInternalServerError, "Woops!")
		} else {
			c.JSON(http.StatusOK, people)
		}
	})
	return r
}

func main() {
	var userName string
	var password string
	flag.StringVar(&userName, "u", "root", "user name")
	flag.StringVar(&password, "p", "password", "password")
	flag.Parse()

	err := models.InitDB(userName, password)
	if err != nil {
		panic(err)
	}

	defer models.Finished()

	r := setupRouter()
	port := ":8080"
	r.Run(port)
}
