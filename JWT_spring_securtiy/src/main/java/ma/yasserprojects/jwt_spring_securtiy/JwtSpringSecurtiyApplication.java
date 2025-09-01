package ma.yasserprojects.jwt_spring_securtiy;

import ma.yasserprojects.jwt_spring_securtiy.role.Role;
import ma.yasserprojects.jwt_spring_securtiy.role.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
@EnableJpaAuditing
@EnableAsync
public class JwtSpringSecurtiyApplication {

    public static void main(String[] args) {
        SpringApplication.run(JwtSpringSecurtiyApplication.class, args);
    }
        @Bean
        public CommandLineRunner runner(RoleRepository roleRepository) {
        return args -> {
            if(roleRepository.findByName("USER").isEmpty()) {
                roleRepository.save(
                        Role.builder().name("USER").build()
                );
            }
        };
        }
}
