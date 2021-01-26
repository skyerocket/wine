package yang.wines.repository;
import yang.wines.model.WineDetail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WineDetailRepository extends JpaRepository<WineDetail,Long> {
    List<WineDetail> findAllByDescriptionContainsOrLotCodeContaining(String search, String search2);
    WineDetail findByLotCode(String lotCode);
}
