package auth

import (
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/tyspice/mr-grocery-sql/config"
	"github.com/tyspice/mr-grocery-sql/models"
	"golang.org/x/crypto/bcrypt"
)

type Credentials struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func VerifyUsernameAndPassword(email string, password string) (models.User, error) {
	user, err := models.GetUser(email)
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
	t := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": user.Id,
		"exp": time.Now().Add(time.Hour * time.Duration(24 * config.Cfg.Server.TokenLifespan)).Unix(),
	})
	s, err := t.SignedString([]byte(config.Cfg.Server.Secret))
	return s, err
}
