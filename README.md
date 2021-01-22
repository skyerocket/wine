# wine

Run with `./mvnw spring-boot:run`
The web service runs on http://localhost:8080

Endpoints:

`/api/breakdown/` 

`/api/breakdown/year/{lotCode}`

`/api/breakdown/region/{lotCode}`

`/api/breakdown/variety/{lotCode}`

`/api/breakdown/year-variety/{lotCode}`

Example: http://localhost:8080/api/breakdown/year-variety/11YVCHAR001

Example Return:

```json
{
    "breakdown": [
        {
            "yearVariety": "2011 - Chardonnay",
            "percentage": "80.0"
        },
        {
            "yearVariety": "2010 - Chardonnay",
            "percentage": "10.0"
        },
        {
            "yearVariety": "2010 - Pinot Noir",
            "percentage": "5.0"
        },
        {
            "yearVariety": "2011 - Pinot Noir",
            "percentage": "5.0"
        }
    ],
    "breakDownType": "year-variety"
}
```
