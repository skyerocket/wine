package yang.wines;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import java.io.FileReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Iterator;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;


@Configuration
class LoadDatabase {

    private static final Logger log = LoggerFactory.getLogger(LoadDatabase.class);

    private void loadJson(String path, ComponentRepository repository) {
        JSONParser parser = new JSONParser();
        try {
            Object obj = parser.parse(new FileReader(path));
            JSONObject jsonObject = (JSONObject) obj;
            String lotCode = jsonObject.get("lotCode").toString();
            JSONArray components = (JSONArray) jsonObject.get("components");
            for (Object o : components) {
                JSONObject comp = (JSONObject) o;
                Component component = new Component(lotCode,
                        Double.valueOf(comp.get("percentage").toString()),
                        Integer.parseInt(comp.get("year").toString()),
                        comp.get("variety").toString(),
                        comp.get("region").toString());
                log.info("preloading" + repository.save(component));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Bean
    CommandLineRunner initDatabase(ComponentRepository repository) {
        return args -> {

            try (Stream<Path> walk = Files.walk(Paths.get("src/main/resources/static/"))) {

                List<String> result = walk.filter(Files::isRegularFile)
                        .map(x -> x.toString()).collect(Collectors.toList());

                result.forEach(path -> loadJson(path, repository));

            } catch (IOException e) {
                e.printStackTrace();
            }


        };
    }

}