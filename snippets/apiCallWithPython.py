from requests.auth import HTTPBasicAuth

requests.get(BASE_URL + ENDPOINT, auth=HTTPBasicAuth(USER, PASS))