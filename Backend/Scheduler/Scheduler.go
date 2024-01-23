package scheduler

import (
	"fmt"
	"io"
	"log"
	"net/http"
)

var Result string

func Match() string{
	resp, err := http.Get("https://api.sportradar.com/mma/trial/v2/fr/schedules/2024-01-20/summaries.json?api_key=nrmu6fxvt5e5bzdzhx2845fq")
	if err != nil {
		log.Fatalln(err)
	}
	fmt.Println(resp)

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		log.Fatalln(err)
	}
	Result = string(body)
	fmt.Println("Hello, World!")
	fmt.Println(Result)
	return Result
}

