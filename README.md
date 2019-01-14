# shstvapp
h1 How to use shstvapp:

app.js:
- logs into Google Spreadsheets scheduler (is shared with you, Mr. Scrofani) where all data is stored
- creates an array for each letter day and the special schedule with info of periods (ex. A[0].period returns 1), start time, end time, and lunch wave
- creates extra info array with data for letter day, bool special schedule, image links,

index.jade:
- links to some bootstrap css and js files

pretty much all other files aren't important or are standard

things to implement:
1. special schedule functionality. Currently, my code that errors is commented out.
2. keeps track of time remaining.
3. resizes all images for carousel.
4. rearrange UI placement.
5. make it grab text in '/articles' automatically and inject it into jade.
6. allow more or less than three images in carousel.
7. keep client_secret.json safe in the future!
