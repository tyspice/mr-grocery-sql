package models

const UserGroupModel string = `
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	name VARCHAR(255) NULL,
	UNIQUE(id)
`
