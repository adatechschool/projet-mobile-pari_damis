package main

import (
	"fmt"
	"net/http"

	"github.com/adatechschool/projet-mobile-pari_damis/routes"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

func init() {
	ConnectToDatabase()
}
func main() {
	fmt.Println("Hello, World!")
	r := chi.NewRouter()
	r.Use(middleware.Logger)
	routes.Routes(r)
	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Hello World!"))
	})
	//john
	http.ListenAndServe(":3000", r)
}
