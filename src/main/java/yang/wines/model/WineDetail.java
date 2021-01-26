package yang.wines.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class WineDetail {
    @Id @GeneratedValue
    private Long id;
    private String lotCode;
    private Double volume;
    private String description;
    private String tankCode;
    private String productState;
    private String ownerName;

    public WineDetail() {
    }

    public WineDetail( String lotCode, Double volume, String description, String tankCode, String productState, String ownerName) {
        this.lotCode = lotCode;
        this.volume = volume;
        this.description = description;
        this.tankCode = tankCode;
        this.productState = productState;
        this.ownerName = ownerName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLotCode() {
        return lotCode;
    }

    public void setLotCode(String lotCode) {
        this.lotCode = lotCode;
    }

    public Double getVolume() {
        return volume;
    }

    public void setVolume(Double volume) {
        this.volume = volume;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTankCode() {
        return tankCode;
    }

    public void setTankCode(String tankCode) {
        this.tankCode = tankCode;
    }

    public String getProductState() {
        return productState;
    }

    public void setProductState(String productState) {
        this.productState = productState;
    }

    public String getOwnerName() {
        return ownerName;
    }

    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
    }
}
