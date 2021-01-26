package yang.wines.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public
class Component {

    private @Id @GeneratedValue
    int id;
    private String lotCode;
    private Double percentage;
    private int year;
    private String variety;
    private String region;

    public Component() {
    }

    public Component(String lotCode, Double percentage, int year, String variety, String region) {
        this.lotCode = lotCode;
        this.percentage = percentage;
        this.year = year;
        this.variety = variety;
        this.region = region;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getLotCode() {
        return lotCode;
    }

    public void setLotCode(String lotCode) {
        this.lotCode = lotCode;
    }

    public Double getPercentage() {
        return percentage;
    }

    public void setPercentage(Double percentage) {
        this.percentage = percentage;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public String getVariety() {
        return variety;
    }

    public void setVariety(String variety) {
        this.variety = variety;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    @Override
    public String toString() {
        return "Component{" +
                "id=" + id +
                ", lotCode='" + lotCode + '\'' +
                ", percentage=" + percentage +
                ", year=" + year +
                ", variety='" + variety + '\'' +
                ", region='" + region + '\'' +
                '}';
    }
}