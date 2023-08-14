package models

import (
	"database/sql"
	"time"
)

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
	Updated  time.Time `json:"updated time_format:"string"`
}

func InsertItem(item *Item) (sql.Result, error) {
	result, err := db.Exec("INSERT INTO items (item, category, notes, status, updated) VALUES (?, ?, ?, ?, ?)", item.Item, item.Category, item.Notes, item.Status, item.Updated)
	return result, err
}

func GetItems() ([]Item, error) {
	res, err := db.Query("SELECT * FROM items")
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