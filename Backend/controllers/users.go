package controllers

import (
	"net/http"
)

func GetUser(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Users"))
}
