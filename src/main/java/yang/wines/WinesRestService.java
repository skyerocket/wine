package yang.wines;

import org.json.simple.JSONObject;
import org.springframework.web.bind.annotation.*;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class WinesRestService<V extends Comparable<? super V>> {

    private final ComponentRepository repository;
    private final WineDetailRepository wineRepository;

    WinesRestService(ComponentRepository componentRepository,
                     WineDetailRepository wineRepository) {
        this.repository = componentRepository;
        this.wineRepository = wineRepository;
    }

    @GetMapping(value = "/detail", produces = "application/json")
    List<WineDetail> allWine() {
        return wineRepository.findAll();
    }

    @GetMapping(value = "/detail/{lotCode}", produces = "application/json")
    WineDetail oneWine(@PathVariable String lotCode) {
        return wineRepository.findByLotCode(lotCode);
    }

    @GetMapping(value = "/search", produces = "application/json")
    int[] noWine() {
        return new int[0];
    }

    @GetMapping(value = "/search/{param}", produces = "application/json")
    List<WineDetail> wine(@PathVariable String param) {
        return wineRepository.findAllByDescriptionContainsOrLotCodeContaining(param, param);
    }

    @GetMapping("/breakdown")
    List<Component> all() {
        return repository.findAll();
    }

    @GetMapping(value = "/breakdown/year/{lotCode}", produces = "application/json")
    String year(@PathVariable String lotCode) {

        List<Component> components = repository.findAllByLotCode(lotCode);
        Map<Integer,Double> sums = components.stream()
                .collect(Collectors.groupingBy(
                        Component::getYear,
                        Collectors.summingDouble(Component::getPercentage)
                ))
                .entrySet()
                .stream()
                .sorted(Collections.reverseOrder(Map.Entry.comparingByValue()))
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue, (e1, e2) -> e1, LinkedHashMap::new));

        List<Map<String, Number>> breakdowns = new ArrayList<>();
        sums.forEach((key, value) -> {
            Map<String, Number> map = new HashMap<>();
            map.put("percentage",value);
            map.put("year",key);
            breakdowns.add(map);
        });

        JSONObject response = new JSONObject();
        response.put("breakDownType", "year");
        response.put("breakdown",breakdowns);

        return response.toString();
    }

    @GetMapping(value = "/breakdown/variety/{lotCode}", produces = "application/json")
    String variety(@PathVariable String lotCode) {

        List<Component> components = repository.findAllByLotCode(lotCode);
        Map<String,Double> sums = components.stream()
                .collect(Collectors.groupingBy(
                        Component::getVariety,
                        Collectors.summingDouble(Component::getPercentage)
                ))
                .entrySet()
                .stream()
                .sorted(Collections.reverseOrder(Map.Entry.comparingByValue()))
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue, (e1, e2) -> e1, LinkedHashMap::new));

        List<Map<String, String>> breakdowns = new ArrayList<>();
        sums.forEach((key, value) -> {
            Map<String, String> map = new HashMap<>();
            map.put("percentage",value.toString());
            map.put("variety",key);
            breakdowns.add(map);
        });

        JSONObject response = new JSONObject();
        response.put("breakDownType", "variety");
        response.put("breakdown",breakdowns);

        return response.toString();
    }

    @GetMapping(value = "/breakdown/region/{lotCode}", produces = "application/json")
    String region(@PathVariable String lotCode) {

        List<Component> components = repository.findAllByLotCode(lotCode);
        Map<String,Double> sums = components.stream()
                .collect(Collectors.groupingBy(
                        Component::getRegion,
                        Collectors.summingDouble(Component::getPercentage)
                ))
                .entrySet()
                .stream()
                .sorted(Collections.reverseOrder(Map.Entry.comparingByValue()))
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue, (e1, e2) -> e1, LinkedHashMap::new));

        List<Map<String, String>> breakdowns = new ArrayList<>();
        sums.forEach((key, value) -> {
            Map<String, String> map = new HashMap<>();
            map.put("percentage",value.toString());
            map.put("region",key);
            breakdowns.add(map);
        });

        JSONObject response = new JSONObject();
        response.put("breakDownType", "region");
        response.put("breakdown",breakdowns);

        return response.toString();
    }

    @GetMapping(value = "/breakdown/year-variety/{lotCode}", produces = "application/json")
    String yearVariety(@PathVariable String lotCode) {

            List<Component> components = repository.findAllByLotCode(lotCode);
            Map<Integer, Map<String, Double>> sums = components.stream()
                    .collect(Collectors.groupingBy(
                            Component::getYear, Collectors.groupingBy(Component::getVariety,
                                    Collectors.summingDouble(Component::getPercentage)
                            )
                    ));

            List<Map<String, String>> breakdowns = new ArrayList<>();
            sums.forEach((year, obj) -> {
                obj.forEach((region,percentage) -> {
                    Map<String, String> map = new HashMap<>();
                    map.put("yearVariety", year.toString() + " - " + region);
                    map.put("percentage", percentage.toString());
                    breakdowns.add(map);
                });
            });

        breakdowns.sort(Comparator.comparing(
                c -> Double.valueOf(c.get("percentage")),
                Comparator.nullsLast(Comparator.reverseOrder())
        ));

        JSONObject response = new JSONObject();
            response.put("breakDownType", "year-region");
            response.put("breakdown",breakdowns);

            return response.toString();
    }
}
