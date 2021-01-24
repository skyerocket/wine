# Wine

## Instruction

1. `./mvnw spring-boot:run`
2. `cd client`
3. `npm install && npm start`

The web app runs on http://localhost:3000

The web service runs on http://localhost:8080

## Demonstration

!['demonstration'](https://gph.is/g/aNLGMK1)

Note these things aren't achieved: 

1) Highlight search text. It should be a backend Elasticsearch work and I don't know how. 

2) Animation. The Material UI transition effects cause strict-mode gives error.

3) AWS Hosting. The Java microservices are likely to be pushed to AWS using EKS/ECS, not familiar how.

## APIs

Endpoints:

`/api/detail`

`/api/detail/{lotCode}`

`/api/search`

`/api/search/{param}`

`/api/breakdown/` 

`/api/breakdown/year/{lotCode}`

`/api/breakdown/region/{lotCode}`

`/api/breakdown/variety/{lotCode}`

`/api/breakdown/year-variety/{lotCode}`

Example Endpoint: http://localhost:8080/api/breakdown/year-variety/11YVCHAR001

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

Example Endpoint: http://localhost:8080/api/search/01

Example Return:
```json
[
    {
        "id": 6,
        "lotCode": "15MPPN002-VK",
        "volume": 100000,
        "description": "2015 Mornington Peninsula Pinot Noir - Vintage Kerr special batch",
        "tankCode": "T100-03",
        "productState": "Filtered",
        "ownerName": "Vintage Kerr"
    },
    {
        "id": 17,
        "lotCode": "11YVCHAR001",
        "volume": 1000,
        "description": "2011 Yarra Valley Chardonnay",
        "tankCode": "T25-01",
        "productState": "Ready for bottling",
        "ownerName": "YV Wines Pty Ltd"
    }
]
```
