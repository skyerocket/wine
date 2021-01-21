package yang.wines;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class WinesRestService {

    private final ComponentRepository repository;

    WinesRestService(ComponentRepository componentRepository) {
        this.repository = componentRepository;
    }

    @GetMapping("/breakdown")
    List<Component> all() {
        return repository.findAll();
    }

    @GetMapping("/breakdown/year/{lotCode}")
    List<Component> one(@PathVariable String lotCode) {

        return repository.findAllByLotCode(lotCode);
    }
}
