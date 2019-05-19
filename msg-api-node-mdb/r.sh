
curl -d @data.json -H "Content-Type: application/json" -X POST http://localhost:$1/labels   
curl -d @data.json -H "Content-Type: application/json" -X PUT http://localhost:$1/labels   
curl -X DELETE "http://localhost:$1/labels?applCode=x21&labelKey=utl.label.key.test.four&labelLocale=de_DE" 
