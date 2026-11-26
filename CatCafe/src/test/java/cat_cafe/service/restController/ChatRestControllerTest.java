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

import cat_cafe.dao.IDAOChat;
import cat_cafe.dao.IDAOCompte;
import cat_cafe.model.ChatMF;
import cat_cafe.model.TypeAliment;
import cat_cafe.restcontroller.ChatRestController;

@WebMvcTest (controllers = ChatRestController.class)
public class ChatRestControllerTest {

    @Autowired 
    private MockMvc mockmvc;

    @MockitoBean
    private IDAOChat daoChat; 

    @MockitoBean
    private IDAOCompte daoClient; 



    @Test 
    @WithMockUser
    void shouldFindAllStatusOk() throws Exception {

        String url = "/api/chat";

        ResultActions result = this.mockmvc.perform(MockMvcRequestBuilders.get(url));

        result.andExpect(MockMvcResultMatchers.status().isOk());
        result.andExpect(MockMvcResultMatchers.jsonPath("$").exists());

        Mockito.verify(this.daoChat).findAll();

    }

    @Test 
    @WithMockUser
    void shouldFindByIdStatusOk() throws Exception {

        String url = "/api/chat/id/{id}";

        ResultActions result = this.mockmvc.perform(MockMvcRequestBuilders.get(url,1));

        result.andExpect(MockMvcResultMatchers.status().isOk());
        //result.andExpect(MockMvcResultMatchers.jsonPath("$").exists());

        Mockito.verify(this.daoChat).findById(1);

    }

    @Test 
    @WithMockUser
    void shouldFindBySexeStatusOk() throws Exception {

        String url = "/api/chat/sexe/{sexe}";

        ResultActions result = this.mockmvc.perform(MockMvcRequestBuilders.get(url, "femelle"));

        result.andExpect(MockMvcResultMatchers.status().isOk());
        result.andExpect(MockMvcResultMatchers.jsonPath("$").exists());

        Mockito.verify(this.daoChat).findBySexe(ChatMF.femelle);

    }

    @Test 
    @WithMockUser
    void shouldFindByAdoptableStatusOk() throws Exception {

        String url = "/api/chat/adoptable";

        ResultActions result = this.mockmvc.perform(MockMvcRequestBuilders.get(url));

        result.andExpect(MockMvcResultMatchers.status().isOk());
        result.andExpect(MockMvcResultMatchers.jsonPath("$").exists());

        Mockito.verify(this.daoChat).findByAdoptedFalse();

    }

    @Test 
    @WithMockUser 
    void shouldDeleteStatusOk() throws Exception {

        String url = "/api/chat/id/{id}";

        ResultActions result = this.mockmvc.perform(
            MockMvcRequestBuilders.delete(url,1).with(SecurityMockMvcRequestPostProcessors.csrf())
        );
        result.andExpect(MockMvcResultMatchers.status().isOk());

        Mockito.verify(this.daoChat).deleteById(1);
    }




}
