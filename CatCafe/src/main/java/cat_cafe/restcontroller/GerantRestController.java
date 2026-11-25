package cat_cafe.restcontroller;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cat_cafe.dao.IDAOAssise;
import cat_cafe.dao.IDAOChat;
import cat_cafe.dao.IDAOCommande;
import cat_cafe.dao.IDAOCompte;
import cat_cafe.dao.IDAOReservation;
import cat_cafe.dto.request.AuthRequest;
import cat_cafe.dto.response.AuthResponse;
import cat_cafe.dto.response.GerantResponse;
import cat_cafe.dto.response.StatsGerantResponse;
import cat_cafe.dto.response.TableAssisesResponse;
import cat_cafe.dto.response.TableReservationsResponse;
import cat_cafe.model.Chat;
import cat_cafe.model.Commande;
import cat_cafe.model.Gerant;
import cat_cafe.model.Reservation;
import cat_cafe.service.CommandeService;
import cat_cafe.service.GerantService;
import cat_cafe.service.ReservationService;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.RequestParam;


    
@RestController 
@RequestMapping("/api/gerant")
public class GerantRestController {

    private final AuthenticationManager authenticationManager; 
    private final JwtEncoder jwtEncoder;

    private GerantService gerantService;
    private CommandeService commandeService;
    private IDAOAssise daoAssise;
    private IDAOReservation daoReservation;

    public GerantRestController(AuthenticationManager authenticationManager,JwtEncoder jwtEncoder,GerantService gerantService, CommandeService commandeService, IDAOAssise daoAssise, IDAOReservation daoReservation){
        this.authenticationManager = authenticationManager;
        this.jwtEncoder = jwtEncoder;
        this.gerantService=gerantService;
        this.commandeService=commandeService;
        this.daoAssise= daoAssise;
        this.daoReservation = daoReservation;
    }
    
    @GetMapping("/stats")
    public StatsGerantResponse stats() {
        return gerantService.stats();

    }

    @GetMapping("/etattable")
    public List<TableAssisesResponse> findAllAssisesResponse(){
        return this.daoAssise.findAll()
        .stream()
        .map(assise -> {
            Reservation reservation = gerantService.trouverReservation(assise);
            Commande commande = gerantService.trouverCommandeTable(reservation);
            if (commande == null) {
                reservation = null;
            }
            return TableAssisesResponse.convert(assise, reservation, commande);
        })
        .toList();
    }

    @Transactional 
    @GetMapping("/etatreservation")
    public List<TableReservationsResponse> findAllReservationsResponse(){
        return this.daoReservation.findAll()
        .stream()
        .map(reservation -> {
            Commande commande = gerantService.trouverCommandeReservation(reservation);
            double prixTotal = (commande != null) ? commandeService.calculerPrixTotal(commande) : 0.0;
            return TableReservationsResponse.convert(reservation,commande,prixTotal);
        })
        .toList();
    }

    @PostMapping("/auth")
    public AuthResponse auth(@Valid @RequestBody AuthRequest request) {
        // On prépare l'authentification utilisateur
        Authentication auth = new UsernamePasswordAuthenticationToken(request.username(), request.password());

        // On demande à Spring Security de vérifier l'authentification
        auth = this.authenticationManager.authenticate(auth);
        
        // Si tout est OK, "auth" fera référence à l'utilisateur connecté !
        // Si ça n'a pas fonctionné, Erreur 401, la suite ne s'exécutera pas

        Instant now = Instant.now();

        String scope = auth.getAuthorities()
            .stream() // Transforme la liste en Stream Java
            // .map(a -> a.getAuthority()) // Permet de transformer le GrantedAuthority en autre chose : en String
            .map(GrantedAuthority::getAuthority) // Permet de transformer le GrantedAuthority en autre chose : en String

            // Recollecter les String en une seule String, séparateur " " (espace)
            .collect(Collectors.joining(" "))
        ;

        // Payload - Contenu du jeton JWT
        JwtClaimsSet payload = JwtClaimsSet.builder()
            .subject(request.username()) // Le nom d'utilisateur
            .issuedAt(now) // La date / heure de la création du jeton
            .expiresAt(now.plus(1, ChronoUnit.HOURS)) // Date de validité = 1 heure

            // Liste des rôles / autorisations / etc.
            .claim("scope", scope)

            .build()
        ;

        // Header - En-tête du jeton JWT
        JwsHeader header = JwsHeader
            .with(MacAlgorithm.HS256) // HmacSHA256
            .build()
        ;

        // Génération du jeton JWT avec le JwtEncoder
        String token = this.jwtEncoder
            .encode(JwtEncoderParameters.from(header, payload))
            .getTokenValue()
        ;
        
        return new AuthResponse(true, token);
    }
    

}


