# Welcome to your air mission
> Plan the route, as you wish
> 
Visit [https://drone.bdevg.com/](https://drone.bdevg.com/create-plan) to create plan. On this page, you can see a select box at the top left corner. Here you can select what  kind of operation do you want, wheather circle center, point center, generate line coordinates.

## What we support?
Currently we support only three kind of operations

1. Point
2. Circle
3. Lines

## Uses
Go to <https://drone.bdevg.com/create-plan> url then select any operation from left card. Now, you can create lines, points and circles. 
> What to do if map is not visible on the website.
> Reason could be **access token**. We are using free version of mapbox API **access token**.
> In this case, you can get you **[map box access token from here](https://docs.mapbox.com/help/how-mapbox-works/access-tokens/) for free**. After you  got the access token, open browser console on this website and set toekn in **localStorage** like `localStorage.mapToken = "Your_token"`.
> Now, refresh the page and you are on the go.
> 
After you done with the creation of the plans, go to this <https://drone.bdevg.com/view-plan> url and see if everything is working fine.

Then click on the **COPY GEOJSON DATA** button.

Now, you have just copied the coordinates that you required and you can use them where ever you want.
**Copied data example**
```js
{
  "points": [
    [
      85.51801266210879,
      26.494408046054286
    ],
    [
      85.18567623632624,
      26.164548013636942
    ]
  ],
  "lines": [
    [
      [
        84.8919264070512,
        26.26803804164885
      ],
      [
        84.8919264070512,
        26.26803804164885
      ],
      [
        85.02650892658376,
        25.962231374179872
      ]
    ]
  ],
  "circles": [
    {
      "cords": [
        84.82051527423998,
        26.381278494169145
      ],
      "radius": 20
    },
    {
      "cords": [
        85.22700941486437,
        25.860942264401068
      ],
      "radius": 20
    }
  ]
}
```

Now, you can use these coordinates to plan your mission or if you want to do

1. Full coordinates generated for the above coordinates as **geojson**
2. Do a real time moving drone simulation using **socket**

You need to clone it's server repository, because we don't have live server.
### How to use it's server
**setup**
```js
git clone https://github.com/ats1999/drone-air-mission-planning.git
cd server
npm i
// nodejs is required
```
In order to generate more coordinates, put the **above copied data into `server/input.json`** Now, you can only generate static coordinates or run a live simulation.

#### To generate static coordinates 
After putting data into `server/input.json` run `npm run static` inside **server** directory.

#### To run a live simulation
After putting data into `server/input.json` run `npm start` inside **server** directory.
Your real time coordinates will be sent through **socket**.

> If you are using any other server(other than nodejs) then you can use the content of `server/geojson.json` file to do your task.
> 
**Socket event :** we are using <https://socket.io/>

| socket.on(event) | Data |
| --- | --- |
| cords |  Object |

**Ex:**
```js
socket.on("cords",(data)=>{
    console.log(data.cord,data.id);
    // data.id is the drone id, which will be unique across a single run
})
```


### Getting static coordinates
Open `server/geojson.json` file after running `npm run static`  and copy the file or it's contents.

**Static coordinates for `Copied data example`**
```js
{
    "lines":[
        {
            "type": "Feature",
            "properties": {},
            "geometry":{
                "type": "LineString",
                "coordinates": [
                    [
                        84.8919264070512,
                        26.26803804164885
                    ],
                    
                        25.962231374179872
                    ],
                    // 10000s of more coordinates
                ]
            }
        }
    ],
  "points": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          85.51801266210879,
          26.494408046054286
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          85.18567623632624,
          26.164548013636942
        ]
      }
    }
  ],
  "polygons": [
    {
      "type": "Feature",
      "properties": {
        "madeUsing": "Circle to polygon"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              84.82051527423998,
              26.56114256691405
            ],
            [
              84.79531270710906,
              26.559722077335355
            ],
            // 1000s of coordinates 
            [
              84.82051527423998,
              26.56114256691405
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "madeUsing": "Circle to polygon"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              85.22700941486437,
              26.04080633714597
            ],
            // 1000s of coordinates 
            [
              85.15332382116533,
              26.028157041277037
            ],
            [
              85.25209911760834,
              26.039385897679434
            ],
            [
              85.22700941486437,
              26.04080633714597
            ]
          ]
        ]
      }
    }
  ]
}
```

## Our plan

* [ ] Support all formates
* [x] generate data at client as well as server(real time)
* [x] json file output
* [ ] support of removing plan after adding from web
* [ ] editing feature
# all contributions are welcome 👏
