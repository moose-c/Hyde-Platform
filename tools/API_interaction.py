import requests

dataset_id=1
request = requests.get('http://localhost:8080/ncWMS2/admin/datasetStatus', params="irrigated_rice")
request.text
# more readable:
request_json = request.json()
request_json

##  Query parameters, directly:
https://api.datamuse.com/words?rel_rhy=jingle, or
parameter = {"key_word":"value"}
request = request.get('[url]', parameter)


