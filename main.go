package main

import (
	"fmt"

	"github.com/tyspice/mr-grocery-sql/config"
	"github.com/tyspice/mr-grocery-sql/models"
	"github.com/tyspice/mr-grocery-sql/router"
)

func main() {
	err := config.InitConfig()
	if (err != nil) {
		panic(err)
	} else {
		fmt.Println("Configuration successfully initialized")
	}
	err = models.InitDB(config.Cfg.Database.Username, config.Cfg.Database.Password, config.Cfg.Database.Host, config.Cfg.Database.Port)
	if err != nil {
		panic(err)
	} else {
		fmt.Println("DB successfully initialized")
	}
	defer models.Finished()

	r := router.InitRouter()
	r.Run(":" + config.Cfg.Server.Port)
}
