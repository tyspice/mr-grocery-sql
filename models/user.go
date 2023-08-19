package models

type User struct {
	Id        int64  `json:"id"`
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	Email     string `json:"email"`
	Password  string `json:"password"`
}

func GetUsers() ([]User, error) {
	res, err := db.Query("SELECT * FROM users")
	if err != nil {
		return nil, err
	}

	var users []User

	for res.Next() {
		var user User
		res.Scan(&user.Id, &user.FirstName, &user.LastName, &user.Email)
		users = append(users, user)
	}

	return users, nil
}

func GetUser(email string) (User, error) {
	var user User
	res, err := db.Query("SELECT * FROM users WHERE email=?", email)
	if err != nil {
		return user, err
	}

	for res.Next() {
		res.Scan(&user.Id, &user.FirstName, &user.LastName, &user.Email, &user.Password)
	}

	return user, nil
}
