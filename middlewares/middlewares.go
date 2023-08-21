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
		var userClaim auth.UserClaim
		tokenString := auth.ExtractToken(c)
		if tokenString != "" {
			userClaim, err = auth.ParseAndValidateToken(tokenString)
		} else {
			err = errors.New("please supply a valid token")
		}
		if err != nil {
			c.JSON(http.StatusUnauthorized, err.Error())
			c.Abort()
		} else {
			c.Set("userClaim", userClaim)
		}
		c.Next()
	}
}
