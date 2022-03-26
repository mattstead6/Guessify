Introducing " ", the brand new game to test your music knowledge. in this game, users are tasked with guessing the correct name of a song within 30 seconds, as many times as possible within a time limit of 5 minutes. The game goes something like this:

1. user chooses genre to be quizzed on
2. a GET fetch request is sent to the server for a random song of the chosen genre
3. the user has 30 seconds (until the end of the sonng clip) to enter the correct name of a song before another song is fetched
   - when a song is fetched, its data is persisted on the local db.jsonn file, to be displayed at the end of the game
4. If the user guesses incorectly 3 times, they are penalized for each wrong guess and the application fetches a new song
5. if the user is unsure what the song name is, they can choose to skip
6. at the end of the 5 minutes, the app will display a "TIME'S UP" message
7. then the user will be redirected to a high scores page, and also display the user's final score.

Game Rules:
10 points per correct answer
-10 points per wrong answer
-5 points per skip
-5 points per auto-refresh-song
