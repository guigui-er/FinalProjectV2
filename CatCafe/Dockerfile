FROM eclipse-temurin:21-jdk

WORKDIR /app

#ENV   SPRING_DATASOURCE_URL=jdbc:mysql://quest-db/projet_quest

COPY ./target/*.jar CatCafe-boot.jar

CMD [ "java", "-jar", "CatCafe-boot.jar" ]

EXPOSE 8080