
Test

curl -X GET "http://localhost:3000/UTL-API-NODE/service/labels?applCode=x20&labelKey=utl.label.key.test.two&labelLocale=de_DE"
curl -X GET "http://localhost:8081/UTL-API-BOOT/service/labels?appCode=x20&labelKey=utl.label.key.test.two&labelLocale=de_DE" -H  "accept: application/json"


curl -X GET http://localhost:3000/UTL-API-NODE/service/labels/x20

	Test POST
	curl -d @data.json -H "Content-Type: application/json" -X POST http://localhost:3000/labels   
	curl -d @data.json -H "Content-Type: application/json" -X PUT  http://localhost:3000/labels   

	curl -X DELETE "http://localhost:8081/UTL-API-BOOT/service/labels?appCode=joe&labelKey=utl.label.key.test.two&labelLocale=de_DE" 
	ok

	
	
	select utllabel0_.lvld_lbel_locale as lvld_lbe1_0_0_, utllabel0_.lvld_lbel_key as lvld_lbe2_0_0_, utllabel0_.lvld_appl_code as lvld_app3_0_0_, utllabel0_.lvld_lbel_value as lvld_lbe4_0_0_ from db2c.utld_labelvalues utllabel0_ ;

Delete  from db2c.utld_labelvalues utllabel0_ where  utllabel0_.lvld_appl_code='joe';

commit;

docker

build
docker image --tag utl-api-node-mdb:latest .
