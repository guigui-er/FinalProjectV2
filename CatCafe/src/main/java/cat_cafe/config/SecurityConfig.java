package cat_cafe.config;

import org.springframework.security.config.Customizer;

import java.nio.charset.StandardCharsets;
import java.util.List;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.nimbusds.jose.jwk.source.ImmutableSecret;

@Configuration 
@EnableMethodSecurity (prePostEnabled = true)
public class SecurityConfig {

    private static final String SECRET_KEY = "6b0edde7b72abee782ae955abae6aa34a7bf130aec448aead7352b3e2c575a4a"; //openssl rand -hex 32

    private SecretKey secretKey() {
        // On transforme le secret en tableau d'octets
        // On retourne la clé secrète au format Hmac SHA 256
        return new SecretKeySpec(SECRET_KEY.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
    }

    // Ce JwtEncoder permettra de générer des jetons JWT, signés avec la clé privée
    @Bean
    JwtEncoder jwtEncoder() {
        SecretKey secretKey = this.secretKey();

        return new NimbusJwtEncoder(new ImmutableSecret<>(secretKey));
    }

    // Ce JwtDecoder permettra de valider les jetons reçus dans les requêtes HTTP, utilisé par le Filter qui se chargera de valider le jeton
    @Bean
    JwtDecoder jwtDecoder() {
        SecretKey secretKey = this.secretKey();

        return NimbusJwtDecoder
            .withSecretKey(secretKey)
            .macAlgorithm(MacAlgorithm.HS256) // HmacSHA256
            .build();
    }

    @Bean 
    SecurityFilterChain filterChain(HttpSecurity httpSecurity){
        //Lors du rajout des token et corsconfig ne pas oublier d'nlever le csrf.disable et changer le .cors

        httpSecurity.csrf(csrf -> csrf.disable())
            .cors(Customizer.withDefaults())
            .authorizeHttpRequests(authorize -> {
            authorize
            .requestMatchers(HttpMethod.POST, "/api/gerant/auth").permitAll()
            .requestMatchers("/api/gerant/**").authenticated().anyRequest().permitAll();
            
        });

        // Activer le filtre de validation du jeton JWT
        httpSecurity.oauth2ResourceServer(oauth2 -> oauth2.jwt(Customizer.withDefaults()));

        return httpSecurity.build();
    }

    @Bean
    JwtAuthenticationConverter jwtAuthenticationConverter() {
        JwtGrantedAuthoritiesConverter granted = new JwtGrantedAuthoritiesConverter();
        JwtAuthenticationConverter converter = new JwtAuthenticationConverter();

        // Par défaut, le préfix est "SCOPE_"
        granted.setAuthorityPrefix("");

        converter.setJwtGrantedAuthoritiesConverter(granted);

        return converter;
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        UrlBasedCorsConfigurationSource corsSource = new UrlBasedCorsConfigurationSource();
        CorsConfiguration corsConfiguration = new CorsConfiguration();

        // corsConfiguration.setAllowedMethods(List.of("GET", "POST", "DELETE", "PUT"));
        corsConfiguration.setAllowedMethods(List.of("*"));

        // corsConfiguration.setAllowedHeaders(List.of("Authorization", "Content-Type"));
        corsConfiguration.setAllowedHeaders(List.of("*"));

        corsConfiguration.setAllowedOrigins(List.of("http://localhost:4200"));

        // Pour toutes les ressources, on applique la politique CORS définie plus haut
        corsSource.registerCorsConfiguration("/**", corsConfiguration);

        return corsSource;
    }

    @Bean 
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean 
    AuthenticationManager authenticationManager(AuthenticationConfiguration config){
        return config.getAuthenticationManager();
    }


}
