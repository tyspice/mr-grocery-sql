package main

import (
	"fmt"
	"log"
	"os"

	"github.com/kelseyhightower/envconfig"
	"github.com/tyspice/mr-grocery-sql/models"
	"github.com/tyspice/mr-grocery-sql/router"
	"gopkg.in/yaml.v2"
)

type Config struct {
	Server struct {
		Port string `yaml:"port" envconfig:"SERVER_PORT"`
	} `yaml:"server"`
	Database struct {
		Username string `yaml:"username" envconfig:"DB_USERNAME"`
		Password string `yaml:"password" envconfig:"DB_PASSWORD"`
		Host     string `yaml:"host" envconfig:"DB_HOST"`
		Port     string `yaml:"port" envconfig:"DB_PORT"`
	} `yaml:"database"`
}

func initConfig() Config {
	var cfg Config
	f, err := os.Open("local.yaml")
	if err == nil {
		decoder := yaml.NewDecoder(f)
		err = decoder.Decode(&cfg)
		if err != nil {
			panic(err)
		}
	} else {
		// We assume that the error was caused by a missing
		// local file which isn't fatal because it most likely means
		// we'll fall back to an env variable
		log.Println(err.Error())
	}
	f.Close()

	err = envconfig.Process("", &cfg)
	if err != nil {
		panic(err)
	}
	return cfg
}

func main() {
	config := initConfig()
	err := models.InitDB(config.Database.Username, config.Database.Password, config.Database.Host, config.Database.Port)
	if err != nil {
		panic(err)
	} else {
		fmt.Println("DB successfully initialized")
	}
	defer models.Finished()

	r := router.InitRouter()
	r.Run(":" + config.Server.Port)
}
