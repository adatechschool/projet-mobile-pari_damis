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

func ScrappingImageAllFightersInfo() {
	c := colly.NewCollector()
	c.SetRequestTimeout(120 * time.Second)
	matchs := make([]MatchAllFighters, 0)

	baseURL := "https://www.ufc.com"

	detailCollector := c.Clone()

	detailCollector.OnHTML("body", func(e *colly.HTMLElement) {
		namefighter := e.ChildText(".hero-profile__name")
		println("Name Fighter: %s\n", namefighter)
		detailURL := e.Request.URL.String()
		for i := range matchs {
			numberOfSection := 1
			numberOfSubgroup := 1
			if matchs[i].DetailsURL == detailURL {
				matchs[i].NomCombattant = e.ChildText(".hero-profile__name")
				matchs[i].ImagePath = e.ChildAttr("img", "src")
				matchs[i].Category = e.ChildText(".hero-profile__division-title")
				matchs[i].Wld = e.ChildText(".hero-profile__division-body")
				matchs[i].Status = e.ChildText(".c-bio__text")
				matchs[i].Pob = e.ChildText(".c-bio__text")
				matchs[i].Age = e.ChildText(".field--name-age .field__item")
				matchs[i].Weigth = e.ChildText(".c-bio__text")

				fmt.Printf("Details for %s:\n", matchs[i].NomCombattant)
				fmt.Printf("Category: %s\n", matchs[i].Category)
				fmt.Printf("WLD: %s\n", matchs[i].Wld)

				fmt.Printf("Status: %s\n", matchs[i].Status)
				fmt.Printf("Place of Birth: %s\n", matchs[i].Pob)
				fmt.Printf("Age: %s\n", matchs[i].Age)
				fmt.Printf("Weight: %s\n", matchs[i].Weigth)
				e.ForEach(".c-stat-3bar__legend", func(y int, g *colly.HTMLElement) {

					g.ForEach(".c-stat-3bar__group", func(y int, h *colly.HTMLElement) {
						switch numberOfSection {
						case 1:
							fmt.Println("premiere section ")
							switch numberOfSubgroup {
							case 1:

								fmt.Println("premiere section ")
								fmt.Println("et premier group ")

							case 2:
								fmt.Println("premiere section ")

							case 3:
								fmt.Println("premiere section ")

							}
						case 2:
							switch numberOfSubgroup {
							case 1:
								fmt.Println("deuxieme section ")
								fmt.Println("et premier group ")
								matchs[i].MethodWinKO = h.ChildText(".c-stat-3bar__value")

							case 2:
								fmt.Println("deuxieme section ")
								fmt.Println("et deuxieme group ")
								matchs[i].MethodWinDec = h.ChildText(".c-stat-3bar__value")
							case 3:
								fmt.Println("deuxieme section ")
								fmt.Println("et troisieme group ")
								matchs[i].MethodWinSub = h.ChildText(".c-stat-3bar__value")
							}
							numberOfSubgroup++
						}

					
					})
					numberOfSection++
				})
				fmt.Printf("Method Win KO: %s\n", matchs[i].MethodWinKO)
				fmt.Printf("Method Win Dec: %s\n", matchs[i].MethodWinDec)
				fmt.Printf("Method Win Sub: %s\n", matchs[i].MethodWinSub)
				break
			}
		}
	})

	c.OnHTML(".view-items-outer-wrp", func(e *colly.HTMLElement) {
		e.ForEach(".c-listing-athlete-flipcard__back", func(y int, g *colly.HTMLElement) {
			Item := MatchAllFighters{}
			DetailsURL := g.ChildAttr(".e-button--black ", "href")
			Item.DetailsURL = baseURL + DetailsURL
			fmt.Printf("Details URL avant add: %s\n", Item.DetailsURL)

			fmt.Printf("Found fighter: %s\n", Item.NomCombattant)
			fmt.Printf("Image URL: %s\n", Item.ImagePath)
			fmt.Printf("Details URL: %s\n", Item.DetailsURL)

			matchs = append(matchs, Item)

			if Item.DetailsURL != "" {
				detailCollector.Visit(Item.DetailsURL)
			}
		})
	})

	c.OnHTML(".button", func(e *colly.HTMLElement) {
		nextPage := e.Attr("href")
		c.Visit(e.Request.AbsoluteURL(nextPage))
	})

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

	c.OnError(func(r *colly.Response, e error) {
		fmt.Println("Got this error:", e)
	})

	c.Visit("https://www.ufc.com/athletes/all?filters%5B0%5D=status%3A23")
}
