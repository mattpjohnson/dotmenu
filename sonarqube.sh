npx sonarqube-scanner \
  -Dsonar.projectKey=mattpjohnson_dotmenu \
  -Dsonar.organization=mattpjohnson-github \
  -Dsonar.sources=. \
  -Dsonar.tests=. \
  -Dsonar.test.inclusions=**/*.test.js \
  -Dsonar.exclusions=node_modules/**,coverage/**,dist/**,**/*.test.js \
  -Dsonar.host.url=https://sonarcloud.io \
  -Dsonar.login=$SONAR_LOGIN
