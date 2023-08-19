package router

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/tyspice/mr-grocery-sql/models"
)

func InitRouter() *gin.Engine {
	fmt.Println("Starting Server")
	r := gin.Default()

	// Ping test
	r.GET("/ping", func(c *gin.Context) {
		c.String(http.StatusOK, "pong")
	})

	r.GET("/users", func(c *gin.Context) {
		users, err := models.GetUsers()
		if err != nil {
			c.JSON(http.StatusInternalServerError, "Woops!")
		} else {
			c.JSON(http.StatusOK, users)
		}
	})

	r.GET("/items", func(c *gin.Context) {
		items, err := models.GetItems()
		if err != nil {
			c.JSON(http.StatusInternalServerError, err)
		} else {
			c.JSON(http.StatusOK, items)
		}
	})

	r.POST("/items", func(c *gin.Context) {
		var item models.Item

		if err := c.BindJSON(&item); err != nil {
			c.JSON(http.StatusInternalServerError, err)
		}

		var err error
		if (item.Id == 0) {
			_, err = models.InsertItem(&item)
		} else {
			_, err = models.UpdateItem(&item)
		}

		if err != nil {
			c.JSON(http.StatusInternalServerError, err)
		}

		c.JSON(http.StatusOK, "Success")
	})

	r.DELETE("/items/:id", func(c *gin.Context) {
		id := c.Param("id")
		
		if _, err := models.DeleteItem(id); err != nil {
			c.JSON(http.StatusInternalServerError, err)
		}
		c.JSON(http.StatusOK, "Success")
	})


	return r
}