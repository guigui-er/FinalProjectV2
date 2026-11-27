FROM eclipse-temurin:21-jdk

WORKDIR /app

ENV SPRING_DATASOURCE_URL=jdbc:mysql://db/projet_final

COPY ./target/*.jar CatCafe-0.0.1-SNAPSHOT.jar

CMD [ "java", "-jar", "CatCafe-0.0.1-SNAPSHOT.jar" ]

EXPOSE 8080