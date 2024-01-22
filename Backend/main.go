package main

import (
	"fmt"
	"time"

	scheduler "github.com/adatechschool/projet-mobile-pari_damis/Scheduler"
	"github.com/adatechschool/projet-mobile-pari_damis/database"
	"github.com/adatechschool/projet-mobile-pari_damis/routes"
	"github.com/gin-gonic/gin"
	"github.com/go-co-op/gocron"
)

// "net/http"

// "time"

// scheduler "github.com/adatechschool/projet-mobile-pari_damis/Scheduler"

// "github.com/go-co-op/gocron"

func init() {
	myScheduler := gocron.NewScheduler(time.UTC)

	myScheduler.Every(1).Day().Monday().At("10:20").Do(scheduler.Match)
	myScheduler.StartAsync()
	database.ConnectToDatabase()
}
func main() {
	r := gin.Default()

	fmt.Println("Server online")
	routes.Routes(r)
	r.Run() //
}
