pipeline {
    agent any

    stages {
        stage('Maven Package') {
            agent {
                docker {
                    image 'maven:3.10.0-eclipse-temurin-21'
                    args '''
                        -v $HOME/.m2:/root/.m2:z
                        -u root
                        --network devops
                    '''
                    reuseNode true
                }
            }
            steps {
                dir('CatCafe') {
                    withSonarQubeEnv('catcafe-sonar') {
                        sh 'mvn clean verify org.sonarsource.scanner.maven:sonar-maven-plugin:sonar -Dsonar.projectKey=CatCafe'
                    }
                }
            }
        }

        stage('Docker Compose') {
            steps {
                sh 'docker compose up -d --build java db pma'
            }
        }

        stage('Installation dépendances'){
            agent {
                docker {
                    image 'node:lts-bullseye'
                    args '''
                        -v $HOME/.npm:/root/.npm:z
                        -u root
                        --network devops
                    '''
                    reuseNode true
                }
            }
            steps {
                dir('catCafeAngular'){
                    sh 'npm i'
                    sh './node_modules/.bin/ng build'
                    withSonarQubeEnv('catcafeAngular-sonar') {
                        sh './node_modules/.bin/sonar-scanner-npm -Dsonar.projectKey=CatCafeAngular'
                    }
                }
            }
        }

        stage('Docker Compose Angular') {
            steps {
                sh 'docker compose up -d --build angular'
            }
        }
    }
}