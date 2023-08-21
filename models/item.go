package models

import (
	"database/sql"
	"time"
)

const ItemModel string = `
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, 
	item TEXT NULL,
	category VARCHAR(255) NULL,
	notes VARCHAR(255) NULL,
	status ENUM('nonce', 'out', 'low', 'adequate', 'stocked') NULL,
	updated DATETIME DEFAULT(NOW()),
	user_group_id INT NOT NULL,
	FOREIGN KEY(user_group_id) REFERENCES user_groups(id),
	UNIQUE(id)
`

type Status string

const (
	Nonce    Status = "nonce"
	Out      Status = "out"
	Low      Status = "low"
	Adequate Status = "adequate"
	Stocked  Status = "stocked"
)

type Item struct {
	Id       int64     `json:"id"`
	Item     string    `json:"item"`
	Category string    `json:"category"`
	Notes    string    `json:"notes"`
	Status   Status    `json:"status"`
	Updated  time.Time `json:"updated"`
	GroupId  int64     `json:"groupId"`
}

func InsertItem(item *Item, groupId int64) (sql.Result, error) {
	result, err := db.Exec("INSERT INTO items VALUES (NULL, ?, ?, ?, ?, DEFAULT, ?)", item.Item, item.Category, item.Notes, item.Status, groupId)
	return result, err
}

func UpdateItem(item *Item, groupId int64) (sql.Result, error) {
	result, err := db.Exec("UPDATE items SET item=?, category=?, notes=?, status=? WHERE id=?, user_group_id=?", item.Item, item.Category, item.Notes, item.Status, item.Id, groupId)
	return result, err
}

func DeleteItem(id string, groupId int64) (sql.Result, error) {
	result, err := db.Exec("DELETE FROM items WHERE id=?, user_group_id=?", id, groupId)
	return result, err
}

func GetItems(groupId int64) ([]Item, error) {
	res, err := db.Query("SELECT * FROM items WHERE user_group_id=?", groupId)
	if err != nil {
		return nil, err
	}

	var items []Item

	for res.Next() {
		var item Item
		res.Scan(&item.Id, &item.Item, &item.Category, &item.Notes, &item.Status, &item.Updated)
		items = append(items, item)
	}

	return items, nil
}
