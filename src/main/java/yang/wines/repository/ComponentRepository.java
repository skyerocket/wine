package yang.wines.repository;
import yang.wines.model.Component;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ComponentRepository extends JpaRepository<Component,Long> {
    List<Component> findAllByLotCode(String lotCode);
}
