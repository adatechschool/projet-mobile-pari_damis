package scrapping

import (
	"encoding/json"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/gocolly/colly"
)

type MatchAllFighter struct {
	NomCombattant string
	ImagePath     string
}

func ScrappingImageAllFighters() {
	c := colly.NewCollector()
	c.SetRequestTimeout(120 * time.Second)
	matchs := make([]MatchAllFighter, 0)

	// Callbacks

	c.OnHTML(".view-items-outer-wrp", func(e *colly.HTMLElement) {
		item := MatchAllFighter{}
		e.ForEach((".c-listing-athlete-flipcard__front"), func(y int, g *colly.HTMLElement) {
			item.NomCombattant = g.ChildText(".c-listing-athlete__name")
			item.ImagePath = g.ChildAttr("img", "src")
			matchs = append(matchs, item)

		})

		fmt.Printf("%v", item.NomCombattant)
		fmt.Printf("%v", item.ImagePath)

	}) //    fmt.Println("enfant", h.ChildAttrs("img","alt") )

	//    fmt.Println("enfant", h.ChildAttrs("img","alt") )

	c.OnHTML(".button", func(e *colly.HTMLElement) {
		nextPage := e.Attr("href")
		c.Visit(e.Request.AbsoluteURL(nextPage))
	})

	c.OnRequest(func(r *colly.Request) {
		fmt.Println("Visiting", r.URL)
	})

	c.OnResponse(func(r *colly.Response) {
		fmt.Println("Got a response from", r.Request.URL)
	})

	c.OnError(func(r *colly.Response, e error) {
		fmt.Println("Got this error:", e)
	})

	c.OnScraped(func(r *colly.Response) {
		fmt.Println("Finished", r.Request.URL)
		js, err := json.MarshalIndent(matchs, "", "    ")
		if err != nil {
			log.Fatal(err)
		}
		fmt.Println("Writing data to file")
		if err := os.WriteFile("allFighters.json", js, 0664); err == nil {
			fmt.Println("Data written to file successfully")
		}

	})

	c.Visit("https://www.ufc.com/athletes/all?filters%5B0%5D=status%3A23")

}
