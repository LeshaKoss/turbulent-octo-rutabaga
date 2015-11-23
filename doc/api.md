#Upload music:
####POST: /upload  
```
curl -v -F sound='@test.wav' https://radiant-spire-1878.herokuapp.com/upload
```
Return uuid name of file, e.g. `c9cbbd4f-9f97-4bbd-8a24-232f60a5ddd3.wav`

#Get list of all files:
####GET: /sounds
Return json with list of uploaded files, e.g.:
```
{
  "sounds": [
    "4eb9645e-81b4-4106-a48e-f0b886f43d75.wav",
    "e5cb75b3-cabd-45d6-a859-4d9e855cba38.wav",
    "a5033022-09e4-4d62-b4f5-51fe937a8f56.wav"
  ]
}
```

#Get one file by name:
####GET: /sounds/*%filename%*
Return file with requested name
