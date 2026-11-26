package cat_cafe.service.restController;

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

import cat_cafe.dao.IDAOAlimentaire;

import cat_cafe.model.TypeAliment;
import cat_cafe.restcontroller.AlimentaireRestController;

@WebMvcTest (controllers = AlimentaireRestController.class)
public class AlimentaireRestControllerTest {

    @Autowired 
    private MockMvc mockmvc;

    @MockitoBean
    private IDAOAlimentaire daoAlimentaire; 

    @Test 
    @WithMockUser
    void shouldFindAllStatusOk() throws Exception {

        String url = "/api/alimentaires";

        ResultActions result = this.mockmvc.perform(MockMvcRequestBuilders.get(url));

        result.andExpect(MockMvcResultMatchers.status().isOk());
        result.andExpect(MockMvcResultMatchers.jsonPath("$").exists());

        Mockito.verify(this.daoAlimentaire).findAll();

    }

    @Test 
    @WithMockUser
    void shouldFindByIdStatusOk() throws Exception {

        String url = "/api/alimentaires/{id}";

        ResultActions result = this.mockmvc.perform(MockMvcRequestBuilders.get(url,1));

        result.andExpect(MockMvcResultMatchers.status().isOk());
        //result.andExpect(MockMvcResultMatchers.jsonPath("$").exists());

        Mockito.verify(this.daoAlimentaire).findById(1);

    }

    @Test 
    @WithMockUser
    void shouldFindByTypeStatusOk() throws Exception {

        String url = "/api/alimentaires/type/{type}";

        ResultActions result = this.mockmvc.perform(MockMvcRequestBuilders.get(url, "gateau"));

        result.andExpect(MockMvcResultMatchers.status().isOk());
        result.andExpect(MockMvcResultMatchers.jsonPath("$").exists());

        Mockito.verify(this.daoAlimentaire).findByType(TypeAliment.gateau);

    }

    @Test 
    @WithMockUser 
    void shouldDeleteStatusOk() throws Exception {

        String url = "/api/alimentaires/{id}";

        ResultActions result = this.mockmvc.perform(
            MockMvcRequestBuilders.delete(url,1).with(SecurityMockMvcRequestPostProcessors.csrf())
        );
        result.andExpect(MockMvcResultMatchers.status().isOk());

        Mockito.verify(this.daoAlimentaire).deleteById(1);
    }

}
