package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/adatechschool/projet-mobile-pari_damis/models"
)

func GetUser(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Users"))
	fmt.Println("users")
}

func CreateUser(w http.ResponseWriter, r *http.Request) {
	var user models.User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	fmt.Fprintf(w, "bio: %+v", user)
}
