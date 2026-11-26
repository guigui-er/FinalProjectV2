package cat_cafe.restcontroller;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import cat_cafe.dao.IDAOBoisson;


@WebMvcTest (controllers = BoissonRestController.class)
public class BoissonRestControllerTest {

    @Autowired 
    private MockMvc mockmvc;

    @MockitoBean
    private IDAOBoisson daoBoisson; 

    @Test 
    @WithMockUser
    void shouldFindAllStatusOk() throws Exception {

        String url = "/api/boissons";

        ResultActions result = this.mockmvc.perform(MockMvcRequestBuilders.get(url));

        result.andExpect(MockMvcResultMatchers.status().isOk());
        result.andExpect(MockMvcResultMatchers.jsonPath("$").exists());

        Mockito.verify(this.daoBoisson).findAll();

    }

    @Test 
    @WithMockUser
    void shouldFindByIdStatusOk() throws Exception {

        String url = "/api/boissons/{id}";

        ResultActions result = this.mockmvc.perform(MockMvcRequestBuilders.get(url,1));

        result.andExpect(MockMvcResultMatchers.status().isOk());
        //result.andExpect(MockMvcResultMatchers.jsonPath("$").exists());

        Mockito.verify(this.daoBoisson).findById(1);

    }

    @Test 
    @WithMockUser
    void shouldFindByChaudStatusOk() throws Exception {

        String url = "/api/boissons/chaudes";

        ResultActions result = this.mockmvc.perform(MockMvcRequestBuilders.get(url));

        result.andExpect(MockMvcResultMatchers.status().isOk());
        result.andExpect(MockMvcResultMatchers.jsonPath("$").exists());

        Mockito.verify(this.daoBoisson).findByChaudTrue();

    }

    @Test 
    @WithMockUser 
    void shouldDeleteStatusOk() throws Exception {

        String url = "/api/boissons/{id}";

        ResultActions result = this.mockmvc.perform(
            MockMvcRequestBuilders.delete(url,1).with(SecurityMockMvcRequestPostProcessors.csrf())
        );
        result.andExpect(MockMvcResultMatchers.status().isOk());

        Mockito.verify(this.daoBoisson).deleteById(1);
    }
    




}