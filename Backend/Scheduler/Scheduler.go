package scheduler

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/adatechschool/projet-mobile-pari_damis/database"
	"github.com/adatechschool/projet-mobile-pari_damis/models"

	// "github.com/gin-gonic/gin"
	"github.com/lib/pq"
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
	var Bets []models.Bet

	for _, summary := range responseData.Summaries {
		// fmt.Printf("Statut de l'événement sportif : %s\n", summary.SportEvent.SportEventId)
		if summary.SportEventStatus.Status == "cancelled" {
			var matchcancelled string
			matchcancelled = "Match cancelled"
			resultofbet := models.ResultOfBet{
				MatchCancelled: &matchcancelled,
			}
			database.DB.Where("Match_id = ?", summary.SportEvent.SportEventId).Find(&Bets)
			for _, Bet := range Bets {

				database.DB.Model(&Bet).Association("ResultOfBet").Append(&resultofbet)

			}
		}
		if summary.SportEventStatus.Status == "closed" {
			// fmt.Printf("Gagnant du combat : %s\n", summary.SportEventStatus.Winner)
			// fmt.Printf("Type de victoire : %s\n", summary.SportEventStatus.Method)
			// fmt.Printf("Nombre de round : %v\n", summary.SportEventStatus.FinalRound)

			var methodFinish string
			var winner string
			if summary.SportEventStatus.Winner == "home_team" {
				winner = "1"
			}
			if summary.SportEventStatus.Winner == "away_team" {
				winner = "2"
			}
			// if summary.SportEventStatus.Winner == "draw?"{
			// 	winner = "draw?"
			// }
			if summary.SportEventStatus.Method == "ko_tko" {
				methodFinish = "KoTko"
			}
			if summary.SportEventStatus.Method == "submission" {
				methodFinish = "Soumission"
			}
			if summary.SportEventStatus.Method == "decision_split" || summary.SportEventStatus.Method == "decision_unanimous" || summary.SportEventStatus.Method == "decision_majority" {
				methodFinish = "Points"
			}
			var round pq.StringArray
			round = []string{winner, methodFinish, strconv.Itoa(summary.SportEventStatus.FinalRound)}
			resultofbet := models.ResultOfBet{
				Winner:       &winner,
				FinishMethod: &methodFinish,
				Rounds:       &round,
				MatchID:      summary.SportEvent.SportEventId,
			}

			database.DB.Where("Match_id = ?", summary.SportEvent.SportEventId).Find(&Bets)
			for _, Bet := range Bets {

				database.DB.Model(&Bet).Association("ResultOfBet").Append(&resultofbet)

			}

		}
	}
	// return Result
	return "Succès", nil
}

func PointPerBet() {
	var Bets []models.Bet

	var ResultOfBet []models.ResultOfBet

	database.DB.Preload("ResultOfBet").Where("result_of_bet_id IS NOT NULL").Find(&Bets,&ResultOfBet)
	// database.DB.Where("ResultOfBet = ?","!= nil").Find(&Bets)
	for i:=0; i<len(Bets); i++ {               // start of the execution block
        fmt.Println(Bets[i].ID)  
		fmt.Println(*Bets[i].ResultOfBet.Winner)
		// fmt.Println(*Bets[i].ResultOfBet)
		fmt.Println(Bets[i].ResultOfBet.MatchID)   // prints "Hello" 3 times
		fmt.Println(Bets[i].Winner)   
    }    
	

}
