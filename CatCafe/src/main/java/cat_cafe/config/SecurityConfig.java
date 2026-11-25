package cat_cafe.config;

import org.springframework.security.config.Customizer;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration 
@EnableMethodSecurity (prePostEnabled = true)
public class SecurityConfig {

    @Bean 
    SecurityFilterChain filterChain(HttpSecurity httpSecurity){

        //Lors du rajout des token et corsconfig ne pas oublier d'nlever le csrf.disable et changer le .cors

        httpSecurity.csrf(csrf -> csrf.disable())
            .cors(Customizer.withDefaults())
            .authorizeHttpRequests(authorize -> {
            authorize
            .requestMatchers("/error").permitAll() // a enlever 
            .requestMatchers("/api/**").permitAll()
            .requestMatchers(HttpMethod.POST, "/api/gerant/auth").permitAll().anyRequest().authenticated();
            
        });
        return httpSecurity.build();
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
