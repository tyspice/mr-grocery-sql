package auth

import (
	"github.com/tyspice/mr-grocery-sql/models"
	"golang.org/x/crypto/bcrypt"
)

type Credentials struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func VerifyUsernameAndPassword(email string, password string) (bool, error) {
	user, err := models.GetUser(email)
	if err != nil {
		return false, err
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
	if err != nil {
		return false, err
	}
	return true, nil
}
