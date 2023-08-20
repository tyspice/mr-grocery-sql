package router

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/tyspice/mr-grocery-sql/auth"
	"github.com/tyspice/mr-grocery-sql/middlewares"
	"github.com/tyspice/mr-grocery-sql/models"
)

func InitRouter() *gin.Engine {
	fmt.Println("Starting Server")
	r := gin.Default()

	r.GET("/token", func(c *gin.Context) {

		var credentials auth.Credentials

		if err := c.BindJSON(&credentials); err != nil {
			c.JSON(http.StatusInternalServerError, err.Error())
			return
		}

		user, err := auth.VerifyUsernameAndPassword(credentials.Email, credentials.Password)
		if err != nil {
			c.JSON(http.StatusForbidden, "Forbidden")
			return
		}

		jwt, err := auth.GenerateJWT(&user)
		if err != nil {
			c.JSON(http.StatusInternalServerError, err.Error())
		}
		c.JSON(http.StatusOK, jwt)
	})

	v0 := r.Group("/api/v0")
	v0.Use(middlewares.JwtAuthMiddleware())

	v0.GET("/items", func(c *gin.Context) {
		items, err := models.GetItems()
		if err != nil {
			c.JSON(http.StatusInternalServerError, err)
		} else {
			c.JSON(http.StatusOK, items)
		}
	})

	v0.POST("/items", func(c *gin.Context) {
		var item models.Item

		if err := c.BindJSON(&item); err != nil {
			c.JSON(http.StatusInternalServerError, err)
			return
		}

		var err error
		if item.Id == 0 {
			_, err = models.InsertItem(&item)
		} else {
			_, err = models.UpdateItem(&item)
		}

		if err != nil {
			c.JSON(http.StatusInternalServerError, err)
			return
		}

		c.JSON(http.StatusOK, "Success")
	})

	v0.DELETE("/items/:id", func(c *gin.Context) {
		id := c.Param("id")

		if _, err := models.DeleteItem(id); err != nil {
			c.JSON(http.StatusInternalServerError, err)
			return
		}
		c.JSON(http.StatusOK, "Success")
	})

	return r
}
