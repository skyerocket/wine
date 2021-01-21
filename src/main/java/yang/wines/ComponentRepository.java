package yang.wines;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

interface ComponentRepository extends JpaRepository<Component,String> {
    List<Component> findAllByLotCode(String lotCode);
}
