FROM eclipse-temurin:21-jdk

WORKDIR /app

#ENV   SPRING_DATASOURCE_URL=jdbc:mysql://quest-db/projet_quest

COPY ./target/*.jar CatCafe-0.0.1-SNAPSHOT.jar

CMD [ "java", "-jar", "CatCafe-0.0.1-SNAPSHOT.jar" ]

EXPOSE 8080