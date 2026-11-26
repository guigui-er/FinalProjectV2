pipeline {
    agent any

    stages {
        /*stage('Maven Package') {
            steps {
                //dir('BOOT-SECURITY/quest-boot') {
                    withSonarQubeEnv('sonar-id') {
                        sh './node_modules/.bin/sonar-scanner-npm -Dsonar.projectKey=cle-projet-angular'
                    }
                }
            //} // A voir si ça fonctionne !!
        }*/

        stage('Maven Package') {
            agent {
                docker {
                    image 'maven:3.10.0-eclipse-temurin-21'
                    args '''
                        -v $HOME/.m2:/root/.m2:z
                        -u root
                    '''
                    reuseNode true // Permet de partager l'espace de travail entre l'agent Jenkins et l'agent Docker
                }
            }
            steps {
                dir('CatCafe'){
                    sh 'mvn clean package -DskipTests'
                }
                //dir('BOOT-SECURITY/quest-boot') {
                /*withSonarQubeEnv('sonar-id') {
                    sh './node_modules/.bin/sonar-scanner-npm -Dsonar.projectKey=cle-projet-angular'
                }*/
            }
            //} // A voir si ça fonctionne !!
        }

        stage('Docker Compose') {
            steps {
                sh 'docker compose up -d --build java db pma'
            }
        }

        stage('Installation dépendances') {
            dir{'catCafeAngular'}{
                steps {
                    sh 'npm i'
                }
            }
        }

        stage('NG Build') {
            dir{'catCafeAngular'}{
                steps {
                    sh './node_modules/.bin/ng build'
                }   
            }
        }

        /*stage('SonarQube Analysis') {
            withSonarQubeEnv() {
                sh "./node_modules/sonar-scanner"
            }
        }*/

        stage('Docker Compose Angular') {
            steps {
                sh 'docker compose up -d --build angular'
            }
        }
    }
}