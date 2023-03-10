Original: 

index.html: 296 B, 4 ms
script.js: 296 B, 2 ms
style.css: 295 B, 1 ms
Finish Time: 499 ms
72 requests
5.8 kb transferred
1.8 MB resources


Load CSS First:

index.html: 296 B, 3 ms
style.css: 295 B, 1 ms
script.js: 296 B, 1 ms
Finish Time: 460 ms
64 requests
5.8 kb transferred
1.7 MB resources

Minify CSS:

index.html: 296 B, 3 ms
style.css: 295 B, 1 ms
script.js: 296 B, 1 ms
Finish Time: 510ms
64 requests
5.7 kb transferred
1.7 MB resources

Move JS and code to bottom before closing html:

index.html: 296 B, 4 ms
style.css: 295 B, 2 ms
script.js: 296 B, 1 ms
Finish Time: 450 ms
64 requests
5.7 kb transferred
1.7 MB resources

Minify JS code:
index.html: 296 B, 4 ms
style.css: 295 B, 2 ms
script.js: 296 B, 1 ms
Finish Timne: 440 ms
64 requests
5.7 kb transferred
1.7 MB resources

Optimizations were tested as instructed with the results listed above. Some observations, most changes in terms of minify were negligible in performance but 
the order of calling the function made a slight difference.

The rest of the assignment is complete with the api and the
markers at the given locations. 


Current time: 3hrs+