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

	resp, err := http.Get("https://api.sportradar.com/mma/trial/v2/fr/schedules/2024-02-04/summaries.json?api_key=NJLPJJ0QzW9CSb26DmAE9a0j54ce8Kkq46d84rDl")
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
			matchcancelled := "Match cancelled"
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

	database.DB.Preload("ResultOfBet").Where("result_of_bet_id IS NOT NULL").Find(&Bets, &ResultOfBet)
	// database.DB.Where("ResultOfBet = ?","!= nil").Find(&Bets)
	for i := 0; i < len(Bets); i++ { // start of the execution block
		points := 0
		if Bets[i].ResultOfBet.MatchCancelled != nil {
			fmt.Println("Match annulé!!!")
			fmt.Println(*Bets[i].ResultOfBet.MatchCancelled)
		} else {

			fmt.Println("-----------------------------------")
			fmt.Println(Bets[i].ResultOfBet.MatchCancelled)
			fmt.Println("Match id du bet:")
			fmt.Println(Bets[i].ID)
			fmt.Println("Match id du resultOfBet: ")
			fmt.Println(Bets[i].ResultOfBet.MatchID)
			fmt.Println("-------")
			fmt.Println("winner du bet: ")
			if Bets[i].Winner != nil {
				if *Bets[i].Winner == *Bets[i].ResultOfBet.Winner {
					points += 1
					fmt.Println(*Bets[i].Winner)
					fmt.Println("Bon vainqueur parié")
				} else {
					fmt.Println(*Bets[i].Winner)
					fmt.Println("mauvais vainqueur parié")
				}
			} else {
				fmt.Println("pas de winner parié")
			}
			fmt.Println("winner du resulat: ")
			fmt.Println(*Bets[i].ResultOfBet.Winner)
			fmt.Println("-------")
			fmt.Println("Finish du bet:")
			if Bets[i].FinishMethod != nil {
				if *Bets[i].FinishMethod == *Bets[i].ResultOfBet.FinishMethod && *Bets[i].Winner == *Bets[i].ResultOfBet.Winner {
					fmt.Println(*Bets[i].FinishMethod)
					points += 2
				} else {
					fmt.Println(*Bets[i].FinishMethod)
					fmt.Println("Mauvais finish parié")
				}
			} else {
				fmt.Println("pas de finish parié")
			}

			fmt.Println("Finish du resultat:")
			fmt.Println(*Bets[i].ResultOfBet.FinishMethod)
			fmt.Println("-------")
			fmt.Println("Rounds parié du bet :")
			if Bets[i].Rounds != nil {
				fmt.Println(*Bets[i].Rounds)
				// if *Bets[i].Rounds[0] == *Bets[i].ResultOfBet.Rounds[0]{
				// points+= 10
				// fmt.Println("Bon round 1 parié")
				// }else{
				// 	fmt.Println("Mauvais round parié pas round 1 ")
				// }
				// if *Bets[i].Rounds[1] == *Bets[i].ResultOfBet.Rounds[1]{
				// points+= 10
				// fmt.Println("Bon round 2 parié")
				// }else{
				// 	fmt.Println("Mauvais round parié pas round 2 ")
				// }
				// if *Bets[i].Rounds[2] == *Bets[i].ResultOfBet.Rounds[2]{
				// points+= 10
				// fmt.Println("Bon round 3 parié")

				// }else{
				// 	fmt.Println("Mauvais round parié pas round 3 ")
				// }
				// if *Bets[i].Rounds[3] == *Bets[i].ResultOfBet.Rounds[3]{
				// 	points+= 10
				// 	fmt.Println("Bon round 4 parié")
				// 	}else{
				// 		fmt.Println("Mauvais round parié pas round 4 ")
				// 	}
				// if *Bets[i].Rounds[4] == *Bets[i].ResultOfBet.Rounds[4]{
				// 		points+= 10
				// 	    fmt.Println("Bon round 5 parié")

				// 		}else{
				// 		fmt.Println("Mauvais round parié pas round 5 ")
				// 		}
				// if *Bets[i].Rounds == *Bets[i].ResultOfBet.Rounds {

			} else {
				fmt.Println("pas de round parié")
			}
			fmt.Println("Rounds parié du resultat : ")
			fmt.Println(*Bets[i].ResultOfBet.Rounds)
			fmt.Println("-------")
			fmt.Println("total des points")
			fmt.Println(points)
			fmt.Println("Match status ( rien si pas annulé): ")
			fmt.Println(Bets[i].ResultOfBet.MatchCancelled)
			fmt.Println("-----------------------------------")

			// prints "Hello" 3 times

		}

	}
}
