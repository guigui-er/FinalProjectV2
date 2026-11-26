FROM eclipse-temurin:21-jdk

WORKDIR /app

#ENV   SPRING_DATASOURCE_URL=jdbc:mysql://quest-db/projet_quest

COPY ./target/*.jar CatCafe.jar

CMD [ "java", "-jar", "CatCafe.jar" ]

EXPOSE 8080