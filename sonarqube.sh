npx sonarqube-scanner \
  -Dsonar.projectKey=mattpjohnson_dotmenu \
  -Dsonar.organization=mattpjohnson-github \
  -Dsonar.sources=. \
  -Dsonar.exclusions=node_modules/**,coverage/**,dist/** \
  -Dsonar.host.url=https://sonarcloud.io \
  -Dsonar.login=$SONAR_LOGIN
