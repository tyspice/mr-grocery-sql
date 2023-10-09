package router

import (
	"errors"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/tyspice/mr-grocery-sql/auth"
	"github.com/tyspice/mr-grocery-sql/middlewares"
	"github.com/tyspice/mr-grocery-sql/models"
)

func extractUserClaim(c *gin.Context) (auth.UserClaim, error) {
	var userClaim auth.UserClaim
	var ok bool
	result, exists := c.Get("userClaim")
	userClaim, ok = result.(auth.UserClaim)
	if exists == false || ok == false {
		return userClaim, errors.New("user claim not found")
	}
	return userClaim, nil
}

func InitRouter() *gin.Engine {
	fmt.Println("Starting Server")
	r := gin.Default()

	r.GET("/token", func(c *gin.Context) {

		var credentials auth.Credentials
		var ok bool
		credentials.Email, credentials.Password, ok = c.Request.BasicAuth()
		if !ok {
			c.JSON(http.StatusBadRequest, "Please supply a username and password")
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
		userClaim, err := extractUserClaim(c)
		if err != nil {
			c.JSON(http.StatusInternalServerError, err)
		}
		items, err := models.GetItems(userClaim.GroupId)
		if err != nil {
			c.JSON(http.StatusInternalServerError, err)
		} else {
			c.JSON(http.StatusOK, items)
		}
	})

	v0.POST("/items", func(c *gin.Context) {
		var item models.Item

		userClaim, err := extractUserClaim(c)
		if err != nil {
			c.JSON(http.StatusInternalServerError, err)
		}

		if err := c.BindJSON(&item); err != nil {
			c.JSON(http.StatusInternalServerError, err)
			return
		}

		if item.Id == 0 {
			_, err = models.InsertItem(&item, userClaim.GroupId)
		} else {
			_, err = models.UpdateItem(&item, userClaim.GroupId)
		}

		if err != nil {
			c.JSON(http.StatusInternalServerError, err)
			return
		}

		c.JSON(http.StatusOK, "Success")
	})

	v0.DELETE("/items/:id", func(c *gin.Context) {
		id := c.Param("id")

		userClaim, err := extractUserClaim(c)
		if err != nil {
			c.JSON(http.StatusInternalServerError, err)
		}

		if _, err := models.DeleteItem(id, userClaim.GroupId); err != nil {
			c.JSON(http.StatusInternalServerError, err)
			return
		}
		c.JSON(http.StatusOK, "Success")
	})

	return r
}
