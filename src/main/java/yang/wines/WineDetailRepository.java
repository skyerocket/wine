package yang.wines;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

interface WineDetailRepository extends JpaRepository<WineDetail,Long> {
    List<WineDetail> findAllByDescriptionContainsOrLotCodeContaining(String search, String search2);
    WineDetail findByLotCode(String lotCode);
}
