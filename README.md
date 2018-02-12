# Analysis of Twitter Data

1. How many Twitter users are in the database?
2. Which Twitter users link the most to other Twitter users? (Provide the top ten.)
3. Who is are the most mentioned Twitter users? (Provide the top five.)
4. Who are the most active Twitter users (top ten)?
5. Who are the five most grumpy (most negative tweets) and the most happy (most positive tweets)? (Provide five users for each group)



Node.js Express Application

API Endpoints:

| Question | Endpoint   | Description                             |
| -------- | ---------- | --------------------------------------- |
| 1.       | /users     | returns amount of users                 |
| 2.       | /mentions  | 10 most mentioning users                |
| 3.       | /mentioned | 5 most mentioned users                  |
| 4.       | /active    | 10 most active users (amount of posts)  |
| 5.       | /grumpy    | 5 most grumpy tweets (average polarity) |
| 5.       | /happy     | 5 most happy tweets (average polarity)  |



## Results:

1. ```json
   659774
   ```

2. ```json
   [{"id":"lost_dog","mentions":549},
    {"id":"dogzero","mentions":334},
    {"id":"tweetpet","mentions":310},
    {"id":"VioletsCRUK","mentions":296},
    {"id":"tsarnick","mentions":258},
    {"id":"SongoftheOss","mentions":257},
    {"id":"what_bugs_u","mentions":246},
    {"id":"Karen230683","mentions":244},
    {"id":"keza34","mentions":239},
    {"id":"SallytheShizzle","mentions":234}]
   ```

3. ```json
   [{"_id":"@mileycyrus","mentioned":4310},
    {"_id":"@tommcfly","mentioned":3837},
    {"_id":"@ddlovato","mentioned":3349},
    {"_id":"@Jonasbrothers","mentioned":1263},
    {"_id":"@DavidArchie","mentioned":1222}]
   ```

4. ```json
   [{"_id":"lost_dog","total":549},
    {"_id":"webwoke","total":345},
    {"_id":"tweetpet","total":310},
    {"_id":"SallytheShizzle","total":281},
    {"_id":"VioletsCRUK","total":279},
    {"_id":"mcraddictal","total":276},
    {"_id":"tsarnick","total":248},
    {"_id":"what_bugs_u","total":246},
    {"_id":"Karen230683","total":238},
    {"_id":"DarkPiano","total":236}]
   ```

5. ```json
   [{"_id":"alyssa_f17","avg":0},
    {"_id":"catfuel","avg":0},
    {"_id":"IntheOffing","avg":0},
    {"_id":"caffeinated_mom","avg":0},
    {"_id":"mattfca","avg":0}]
   ```

6. ```json
   [{"_id":"RobFoxKerr","avg":4},
   {"_id":"puchal_ek","avg":4},
   {"_id":"EvolveTom","avg":4},
   {"_id":"bpbabe","avg":4},
   {"_id":"sdancingsteph","avg":4}]
   ```

   ​
