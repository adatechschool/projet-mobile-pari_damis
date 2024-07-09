package scrapping

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"time"
)

type Fighter struct {
	ID         int       `json:"id"`
	Name       string    `json:"name"`
	Nickname   *string   `json:"nickname"`
	Photo      string    `json:"photo"`
	Gender     string    `json:"gender"`
	BirthDate  string    `json:"birth_date"`
	Age        *int      `json:"age"`
	Height     string    `json:"height"`
	Weight     string    `json:"weight"`
	Reach      string    `json:"reach"`
	Stance     string    `json:"stance"`
	Category   string    `json:"category"`
	Team       Team      `json:"team"`
	LastUpdate time.Time `json:"last_update"`
}

type Team struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

type Response struct {
	Response []Fighter `json:"response"`
}

func FillFightersDb() {
	categories := [18]string{
		"Bantamweight",
		"Catch Weight",
		"Catchweight",
		"Featherweight",
		"Flyweight",
		"Heavyweight",
		"Light Heavyweight",
		"Lightweight",
		"Middleweight",
		"Open Weight",
		"Super Heavyweight",
		"Welterweight",
		"Women's Bantamweight",
		"Women's Catch Weight",
		"Women's Featherweight",
		"Women's Flyweight",
		"Women's Lightweight",
		"Women's Strawweight",
	}

	var responseData Response

	responseFinaldata := []Response{}

	for _, category := range categories {
		apiURL := fmt.Sprintf("https://v1.mma.api-sports.io/fighters?category=%s", category)

		client := http.Client{}
		req, err := http.NewRequest("GET", apiURL, nil)
		if err != nil {
			log.Fatal(err)
		}

		req.Header = http.Header{
			"x-rapidapi-key":  {"414bef35c8648d22dcdbd16dc885ffc1"},
			"x-rapidapi-host": {"v1.mma.api-sports.io"},
			"Accept":          {"application/json"},
		}

		resp, err := client.Do(req)
		if err != nil {
			log.Fatal(err)
		}

		defer resp.Body.Close()

		decoder := json.NewDecoder(resp.Body)
		err = decoder.Decode(&responseData)
		if err != nil {
			log.Fatalln(err)
		}

		responseFinaldata = append(responseFinaldata, responseData)
		fmt.Println(responseData)

	}
	FileJson, err := json.MarshalIndent(responseFinaldata, "", "    ")
	if err != nil {
		log.Fatal(err)
	}

	err = os.WriteFile("../FightersDb.json", FileJson, 0644)
	if err != nil {
		log.Panicln(err)
	}
}
