package auth

import (
	"errors"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"github.com/tyspice/mr-grocery-sql/config"
	"github.com/tyspice/mr-grocery-sql/models"
	"golang.org/x/crypto/bcrypt"
)

type Credentials struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type UserClaim struct {
	jwt.RegisteredClaims
	UserId  int64 `json:"userId"`
	GroupId int64 `json:"groupId"`
	Exp     int64 `json:"exp"`
}

func VerifyUsernameAndPassword(email string, password string) (models.User, error) {
	user, err := models.GetUserByEmail(email)
	if err != nil {
		return user, err
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
	if err != nil {
		return user, err
	}
	return user, nil
}

func GenerateJWT(user *models.User) (string, error) {
	t := jwt.NewWithClaims(jwt.SigningMethodHS256, UserClaim{
		UserId:  user.Id,
		GroupId: user.GroupId,
		Exp:     time.Now().Add(time.Hour * time.Duration(24*config.Cfg.Server.TokenLifespan)).Unix(),
	})
	s, err := t.SignedString([]byte(config.Cfg.Server.Secret))
	return s, err
}

func ExtractToken(c *gin.Context) string {
	bearerToken := c.Request.Header.Get("Authorization")
	if len(strings.Split(bearerToken, " ")) == 2 {
		return strings.Split(bearerToken, " ")[1]
	}
	return ""
}

func ParseAndValidateToken(tokenString string) (UserClaim, error) {
	var claim UserClaim
	token, err := jwt.ParseWithClaims(tokenString, &claim, func(token *jwt.Token) (interface{}, error) {
		return []byte(config.Cfg.Server.Secret), nil
	})
	if err != nil {
		return claim, err
	}

	if !token.Valid {
		return claim, errors.New("invalid Token")
	}

	if time.Now().Unix() > claim.Exp {
		return claim, errors.New("token Expired")
	}
	return claim, nil
}
