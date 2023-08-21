package models

const UserModel string = `
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	name VARCHAR(255) NULL,
	email VARCHAR(255) NOT NULL,
	password VARCHAR(255) NULL,
	role ENUM('admin', 'normy') NOT NULL,
	user_group_id INT NOT NULL,
	FOREIGN KEY(user_group_id) REFERENCES user_groups(id),
	UNIQUE(id, email)
`

type Role string

const (
	Admin Role = "admin"
	Normy Role = "normy"
)

type User struct {
	Id       int64  `json:"id"`
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
	Role     Role   `json:"role"`
	GroupId  int64  `json:"GroupId"`
}

func GetUsers() ([]User, error) {
	res, err := db.Query("SELECT * FROM users")
	if err != nil {
		return nil, err
	}

	var users []User

	for res.Next() {
		var user User
		res.Scan(&user.Id, &user.Name, &user.Email, &user.Password, &user.Role, &user.GroupId)
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
		res.Scan(&user.Id, &user.Name, &user.Email, &user.Password, &user.Role, &user.GroupId)
	}

	return user, nil
}
