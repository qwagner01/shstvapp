# shstvapp
How to use shstvapp:

app.js:
- logs into Google Spreadsheets scheduler (is shared with you, Mr. Scrofani) where all data is stored
- creates an array for each letter day and the special schedule with info of periods (ex. A[0].period returns 1), start time, end time, and lunch wave
- creates extra info array with data for letter day, bool special schedule, image links, and video link
- renders page with only the schedule for the day and the extra info
- at articles route, grabs body of Quinn's flask Inklings web scraper

index.jade:
- links to some bootstrap css and js files
- carousel of images (links in extra info array in Google Sheets)
- for loop to deal with amount of classes + waves in the schedule for the day
- embedded YouTube video autoplaying

Pretty much all other files aren't important or are standard. getTime.js was supposed to be the client-side time calculator based on local time of the computer.

things to implement:
1. special schedule functionality. Currently, my code that errors is commented out.
2. keeps track of time remaining.
3. resizes all images for carousel.
4. rearrange UI placement.
5. make it grab text from '/articles' route automatically and inject it into jade.
6. allow more or less than three images in carousel.
7. keep client_secret.json safe in the future!
