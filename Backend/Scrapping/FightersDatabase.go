package scrapping

import (
	// "encoding/json"
	// "fmt"
	// "log"
	// "net/http"
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

// func FillFightersDb() {
// 	categories := [18]string{
// 		"Bantamweight",
// 		"Catch Weight",
// 		"Catchweight",
// 		"Featherweight",
// 		"Flyweight",
// 		"Heavyweight",
// 		"Light Heavyweight",
// 		"Lightweight",
// 		"Middleweight",
// 		"Open Weight",
// 		"Super Heavyweight",
// 		"Welterweight",
// 		"Women's Bantamweight",
// 		"Women's Catch Weight",
// 		"Women's Featherweight",
// 		"Women's Flyweight",
// 		"Women's Lightweight",
// 		"Women's Strawweight",
// 	}
// 	for _, category := range categories {
// 		 apiURL := fmt.Sprintf("https://v1.mma.api-sports.io/fighters?category=%s", category)
// 		 resp, err := http.Get(apiURL)
// 		 if err != nil {
// 			 log.Fatal(err)
// 		 }

// 		 defer resp.Body.Close()

// 		 var responseData Response
	 
// 		 decoder := json.NewDecoder(resp.Body)
// 		 err = decoder.Decode(&responseData)
// 		 if err != nil {
// 			 log.Fatalln(err)
// 		 }
// 		 fmt.Println(responseData)
// 		 req.Header.Set("x-rapidapi-key","414bef35c8648d22dcdbd16dc885ffc1")
// 		 req.Header.Set("x-rapidapi-host","v1.mma.api-sports.io")
// 	}
	
	

// }
