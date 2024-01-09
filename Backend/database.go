package main

import (
	"fmt"
	"os"

	"github.com/Valgard/godotenv"
	"github.com/adatechschool/projet-mobile-pari_damis/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func ConnectToDatabase() {
	dotenv := godotenv.New()
	if err := dotenv.Load(".env"); err != nil {
		panic(err)
	}
	dsn := os.Getenv("DATABASE")
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic(err)
	} else {
		fmt.Println("succed")
		db.AutoMigrate(&models.User{})
	}

}
