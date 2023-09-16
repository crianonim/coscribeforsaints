jq '.significantLink.[].name' < src/medicines3.json

jq '.significantLink.[] |{name, description, url }' < medicines3.json


jq '[.significantLink.[] |{name, description, url } ]' < medicines5.json >> meds.json