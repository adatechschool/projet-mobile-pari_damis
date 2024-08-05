package scrapping

import (
	"encoding/json"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/gocolly/colly"
)

type MatchAllFighters struct {
	NomCombattant string
	ImagePath     string
	DetailsURL    string
	Category      string
	Wld           string
	MethodWinKO   string
	MethodWinDec  string
	MethodWinSub  string
	Status        string
	Pob           string // Place of Birth
	Age           string
	Weigth        string
}

var Item MatchAllFighters

func ScrappingImageAllFightersInfo() {
	c := colly.NewCollector()
	c.SetRequestTimeout(120 * time.Second)
	matchs := make([]MatchAllFighters, 0)

	// Base URL pour compléter les URLs relatives
	baseURL := "https://www.ufc.com"

	// Cloner le collecteur principal pour les détails des combattants
	detailCollector := c.Clone()

	// Callbacks pour la collecte des détails des combattants
	detailCollector.OnHTML("body", func(e *colly.HTMLElement) {
		titre := e.ChildText(".hero-profile__name")
		println(titre)

		fighterIndex := -1
		for i, fighter := range matchs {
			if e.Request.URL.String() == fighter.DetailsURL {
				fighterIndex = i
				break
			}
		}
		if fighterIndex == -1 {
			return
		}

		// Extraire les informations supplémentaires
		// matchs[fighterIndex].Category = e.ChildText(".hero-profile__division-title")
		// matchs[fighterIndex].Wld = e.ChildText(".hero-profile__division-body")
		// matchs[fighterIndex].MethodWinKO = e.ChildText(".c-stat-3bar__value")
		// matchs[fighterIndex].MethodWinDec = e.ChildText(".c-stat-3bar__value")
		// matchs[fighterIndex].MethodWinSub = e.ChildText(".c-stat-3bar__value")
		// matchs[fighterIndex].Status = e.ChildText(".c-bio__text")
		// matchs[fighterIndex].Pob = e.ChildText(".c-bio__text")
		// matchs[fighterIndex].Age = e.ChildText(".field--name-age .field__item")
		// matchs[fighterIndex].Weigth = e.ChildText(".c-bio__text")

		// Affichage des informations pour vérifier l'extraction
		// fmt.Printf("Details for %s:\n", matchs[fighterIndex].NomCombattant)
		// fmt.Printf("Category: %s\n", matchs[fighterIndex].Category)
		// fmt.Printf("WLD: %s\n", matchs[fighterIndex].Wld)
		// fmt.Printf("Method Win KO: %s\n", matchs[fighterIndex].MethodWinKO)
		// fmt.Printf("Method Win Dec: %s\n", matchs[fighterIndex].MethodWinDec)
		// fmt.Printf("Method Win Sub: %s\n", matchs[fighterIndex].MethodWinSub)
		// fmt.Printf("Status: %s\n", matchs[fighterIndex].Status)
		// fmt.Printf("Place of Birth: %s\n", matchs[fighterIndex].Pob)
		// fmt.Printf("Age: %s\n", matchs[fighterIndex].Age)
		// fmt.Printf("Weight: %s\n", matchs[fighterIndex].Weigth)
	})

	// Callbacks pour la page principale
	c.OnHTML(".view-items-outer-wrp", func(e *colly.HTMLElement) {
		e.ForEach(".c-listing-athlete-flipcard__front", func(y int, g *colly.HTMLElement) {
			Item.NomCombattant = g.ChildText(".c-listing-athlete__name")
			Item.ImagePath = g.ChildAttr("img", "src")

			// Récupérer le href du bouton ou lien avec la classe e-button--black
		})
		e.ForEach(".c-listing-athlete-flipcard__back", func(y int, g *colly.HTMLElement) {
			DetailsURL := g.ChildAttr(".e-button--black ", "href")
			fmt.Printf("Details URL avant add: %s\n", Item.DetailsURL)
			Item.DetailsURL = baseURL + DetailsURL

			// Affichage des informations de base pour chaque combattant
			fmt.Printf("Found fighter: %s\n", Item.NomCombattant)
			fmt.Printf("Image URL: %s\n", Item.ImagePath)
			fmt.Printf("Details URL: %s\n", Item.DetailsURL)

			// Visiter la page de détails de chaque combattant
			if Item.DetailsURL != "" {
				detailCollector.Visit(Item.DetailsURL)
			}
		})
		matchs = append(matchs, Item)
		Item = MatchAllFighters{}
	})

	// Sauvegarder les données finales après avoir scrappé tous les détails
	c.OnScraped(func(r *colly.Response) {
		js, err := json.MarshalIndent(matchs, "", "    ")
		if err != nil {
			log.Fatal(err)
		}
		fmt.Println("Writing data to file")
		if err := os.WriteFile("allFightersinfo.json", js, 0664); err == nil {
			fmt.Println("Data written to file successfully")
		}
	})

	// Gestion des erreurs
	c.OnError(func(r *colly.Response, e error) {
		fmt.Println("Got this error:", e)
	})

	// Démarrer le scrapping
	c.Visit("https://www.ufc.com/athletes/all?filters%5B0%5D=status%3A23")
}
