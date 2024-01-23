package scrapping

import (
	"encoding/json"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/gocolly/colly"
)

type MainEvent struct {
	Name      string
	Fight     string
	ImagePath string
}

func ScrappingMainEvent() {
	c := colly.NewCollector()
	c.SetRequestTimeout(120 * time.Second)
	mainEvents := make([]MainEvent, 0)
	createOrUpdateJson := true

	if previousMainEvents, err := loadingMainEventFile(); err != nil {
		log.Println("Error: ", err)
	} else {
		mainEvents = append(mainEvents, previousMainEvents...)
	}

	c.OnRequest(func(r *colly.Request) {
		fmt.Println("Visiting", r.URL)
	})

	c.OnError(func(_ *colly.Response, err error) {
		log.Println("Something went wrong:", err)
	})

	c.OnHTML(".c-hero--full", func(e *colly.HTMLElement) {
		event := MainEvent{}
		event.Name = e.ChildText(".c-hero--full__headline-prefix")
		event.Fight = e.ChildText(".c-hero--full__headline")
		event.ImagePath = e.ChildAttr("img", "src")
		hasBeenReplaced := false

		for i, mainEvent := range mainEvents {
			if mainEvent.Name == event.Name && mainEvent.Fight != event.Fight {
				mainEvents[i] = event
				hasBeenReplaced = true
				log.Println("MainEvents has been replaced")
			} else if mainEvent.Name == event.Name && mainEvent.Fight == event.Fight && mainEvent.ImagePath == event.ImagePath {
				createOrUpdateJson = false
				log.Println("MainEvent has already been scrapped")
				break
			}
		}
		if hasBeenReplaced == false && createOrUpdateJson == true {
			mainEvents = append(mainEvents, event)
			log.Println("Event has been added to MainEvents")
		}
	})

	c.OnResponse(func(r *colly.Response) {
		fmt.Println("Visited", r.Request.URL)
	})

	c.OnScraped(func(r *colly.Response) {
		if createOrUpdateJson == true {
			js, err := json.MarshalIndent(mainEvents, "", "    ")
			if err != nil {
				log.Fatal(err)
			}
			fmt.Println("Writing data to file  ", mainEvents)
			if err := os.WriteFile("mainEvents.json", js, 0664); err == nil {
				fmt.Println("Data written to file successfully")
			}
		}
		fmt.Println("Finished", r.Request.URL)
	})

	c.Visit("https://www.ufc.com/events")
}

func loadingMainEventFile() ([]MainEvent, error) {
	file, err := os.ReadFile("mainEvents.json")
	if err != nil {
		return nil, err
	}
	var previousMainEvents []MainEvent
	if err := json.Unmarshal(file, &previousMainEvents); err != nil {
		return nil, err
	}
	return previousMainEvents, nil
}
