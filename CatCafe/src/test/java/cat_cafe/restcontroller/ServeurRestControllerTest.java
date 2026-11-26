package cat_cafe.restcontroller;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import cat_cafe.dao.IDAOCompte;

@WebMvcTest(controllers = ServeurRestController.class)
public class ServeurRestControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private IDAOCompte dao;

    @Test
    @WithMockUser
    void shouldFindAllStatusOk() throws Exception {
        // given
        String url = "/api/serveur";

        // when
        ResultActions result = this.mockMvc.perform(
            MockMvcRequestBuilders.get(url)
        );

        // then
        result.andExpect(MockMvcResultMatchers.status().isOk()); // Status OK
        result.andExpect(MockMvcResultMatchers.jsonPath("$").exists()); // On vérifie si y'a bien une liste

        Mockito.verify(this.dao).findAllServeurs(); // On vérifie si findAll a été appelée
    }



    @Test
    @WithMockUser
    void shouldDeleteByIdStatusOk() throws Exception {
        // given
        int id = 1;
        String url = "/api/serveur/" + id;

        // when
        ResultActions result = this.mockMvc.perform(
            MockMvcRequestBuilders
                .delete(url)
                .with(SecurityMockMvcRequestPostProcessors.csrf())
        );

        // then
        result.andExpect(MockMvcResultMatchers.status().isOk());

        Mockito.verify(this.dao).deleteById(id); // On vérifie si deleteById a été appelée
    }

}
