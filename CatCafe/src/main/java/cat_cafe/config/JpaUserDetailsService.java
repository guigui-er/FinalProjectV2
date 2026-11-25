package cat_cafe.config;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import cat_cafe.dao.IDAOEmploye;

@Service 
public class JpaUserDetailsService implements UserDetailsService{

    private final IDAOEmploye daoEmploye; 

    public JpaUserDetailsService(IDAOEmploye daoEmploye){
        this.daoEmploye = daoEmploye; 
    }
    @Override 
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return this.daoEmploye.findByLogin(username)
        .map(employe -> User
            .withUsername(username)
            .password(employe.getPassword())
            .roles(employe.getClass().getSimpleName().toUpperCase())
            .build()
        )
        .orElseThrow(()-> new UsernameNotFoundException("Nom d'utilisateur inconnu"));
    }

    

    

}
