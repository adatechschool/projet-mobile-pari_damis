package routes

import (
	"github.com/adatechschool/projet-mobile-pari_damis/controllers"
	"github.com/go-chi/chi/v5"
)

func Routes(r chi.Router) {

	r.Group(func(r chi.Router) {
		r.Get("/users", controllers.GetUser)
		r.Post("/user", controllers.CreateUser)
	})
}
