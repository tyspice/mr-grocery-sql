package models

type User struct {
	Id        int64  `json:"id"`
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	Email     string `json:"email"`
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