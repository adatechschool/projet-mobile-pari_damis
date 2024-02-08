package scheduler

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

type SportEvent struct {
	SportEventId string `json:"id"`
}

type SportEventStatus struct {
	Status           string `json:"status"`
	MatchStatus      string `json:"match_status"`
	WinnerID         string `json:"winner_id"`
	FinalRound       int    `json:"final_round"`
	FinalRoundLength string `json:"final_round_length"`
	Method           string `json:"method"`
	Winner           string `json:"winner"`
	ScheduledLength  int    `json:"scheduled_length"`
	WeightClass      string `json:"weight_class"`
	TitleFight       bool   `json:"title_fight"`
	MainEvent        bool   `json:"main_event"`
}

type Summary struct {
	SportEvent       SportEvent       `json:"sport_event"`
	SportEventStatus SportEventStatus `json:"sport_event_status"`
}

type Response struct {
	GeneratedAt string    `json:"generated_at"`
	Summaries   []Summary `json:"summaries"`
}

func Match() (string, error) {

	resp, err := http.Get("https://api.sportradar.com/mma/trial/v2/fr/schedules/2024-02-04/summaries.json?api_key=nrmu6fxvt5e5bzdzhx2845fq")
	if err != nil {
		log.Fatalln(err)
		return "", err
	}
	// fmt.Println(resp)
	defer resp.Body.Close()

	var responseData Response

	decoder := json.NewDecoder(resp.Body)
	err = decoder.Decode(&responseData)
	if err != nil {
		log.Fatalln(err)
		return "", err
	}
	// Result = string(data)
	fmt.Println("Hello, World!")
	// fmt.Println(Result)
	for _, summary := range responseData.Summaries {
		fmt.Printf("Statut de l'événement sportif : %s\n", summary.SportEvent.SportEventId)
		if summary.SportEventStatus.Status == "closed" {
			fmt.Printf("Gagnant du combat : %s\n", summary.SportEventStatus.Winner)
			fmt.Printf("Type de victoire : %s\n", summary.SportEventStatus.Method)
			fmt.Printf("Nombre de round : %v\n", summary.SportEventStatus.FinalRound)
		}
	}
	// return Result
	return "Succès", nil
}
