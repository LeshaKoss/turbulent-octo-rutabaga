#Upload music:
####POST: /upload  
```
curl -v -F sound='@test.wav' https://radiant-spire-1878.herokuapp.com/upload
```
Return uuid name of file, e.g. `c9cbbd4f-9f97-4bbd-8a24-232f60a5ddd3.wav`

#Get list of all files:
####GET: /
Return html with list of uploaded files, e.g. `['c9cbbd4f-9f97-4bbd-8a24-232f60a5ddd3.wav', 'a4b50eb5-377a-4652-9389-17b014d85b4b.wav']`

#Get one file by name:
####GET: /sounds/*%filename%*
Return file with requested name
