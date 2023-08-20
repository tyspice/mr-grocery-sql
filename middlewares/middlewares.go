package middlewares

import (
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/tyspice/mr-grocery-sql/auth"
)

func JwtAuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		var err error
		tokenString := auth.ExtractToken(c)
		if tokenString != "" {
			_, err = auth.ParseAndValidateToken(tokenString)
		} else {
			err = errors.New("please supply a valid token")
		}
		if err != nil {
			c.JSON(http.StatusUnauthorized, err.Error())
			c.Abort()
			return
		}
		c.Next()
	}
}
