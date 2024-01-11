package main

import (
	"net/http"

	// "time"

	// scheduler "github.com/adatechschool/projet-mobile-pari_damis/Scheduler"
	
	"github.com/adatechschool/projet-mobile-pari_damis/routes"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	// "github.com/go-co-op/gocron"
)

func init() {
	// my_scheduler := gocron.NewScheduler(time.Local)

	// my_scheduler.Every(1).Seconds().Do(scheduler.Match)
	// my_scheduler.StartAsync()
	ConnectToDatabase()
}
func main() {
	r := chi.NewRouter()
	r.Use(middleware.Logger)
	routes.Routes(r)

	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Hello World!"))
	})
	http.ListenAndServe(":3000", r)
}
