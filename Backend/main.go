package main

import (
	"fmt"

	// scheduler "github.com/adatechschool/projet-mobile-pari_damis/Scheduler"

	// // scheduler "github.com/adatechschool/projet-mobile-pari_damis/Scheduler"
	// scrapping "github.com/adatechschool/projet-mobile-pari_damis/Scrapping"


	"github.com/adatechschool/projet-mobile-pari_damis/database"
	helper "github.com/adatechschool/projet-mobile-pari_damis/helper"
	"github.com/adatechschool/projet-mobile-pari_damis/routes"
	"github.com/gin-gonic/gin"
)

// "net/http"

// "time"

// scheduler "github.com/adatechschool/projet-mobile-pari_damis/Scheduler"

// "github.com/go-co-op/gocron"

func init() {
	// myScheduler := gocron.NewScheduler(time.Local)
	// scrapping.ScrappingImageAllFighters()
	// myScheduler.Every(1).Day().Thursday().At("11:25").Do(scheduler.Match)
	// myScheduler.StartAsync()
	database.ConnectToDatabase()
}
func main() {
	r := gin.Default()

	fmt.Println("Server online")
	routes.Routes(r)
	// scheduler.Match()
	// scheduler.PointPerBet()
	// scrapping.ScrappingMainEvent();
	// scheduler.GetMatchAndSaveThemInJson()
	fmt.Println("Monday of the current week:", helper.GetMondayOfCurrentWeek())
	fmt.Println("Friday of the current week:", helper.GetFridayOfCurrentWeek())
	r.Run("0.0.0.0:3001") //
}
