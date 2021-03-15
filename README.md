# Welcome to your air mission

> Plan the route, as you wish

Visit [https://drone.bdevg.com/](https://drone.bdevg.com/create-plan) to create the plan. On this page, you can see a select box at the top left corner. Here you can select what kind of operation do you want, whether circle centre, point centre, generate line coordinates.

## What we support?

Currently, we support only three kinds of operations

1. Point
2. Circle
3. Lines

## Uses

Go to [https://drone.bdevg.com/create-plan](https://drone.bdevg.com/create-plan) URL then select any operation from the left card. Now, you can create lines, points and circles.

> What to do if map is not visible on the website.
> Reason could be **access token**. We are using free version of mapbox API **access token**.
> In this case, you can get you <b>[map box access token from here](https://docs.mapbox.com/help/how-mapbox-works/access-tokens/) for free</b>. After you got the access token, open browser console on this website and set toekn in **localStorage** like `localStorage.mapToken = "Your_token"`.
> Now, refresh the page and you are on the go.

After you are done with the creation of the plans, go to this [https://drone.bdevg.com/view-plan](https://drone.bdevg.com/view-plan) URL and see if everything is working fine.

Then click on the **COPY GEOJSON DATA** button.

Now, you have just copied the coordinates that you required and you can use them where ever you want.
**Copied data example**

``` js
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
2. Do a real-time moving drone simulation using **socket**

You need to clone it's server repository because we don't have a live server.

### How to use its server

**setup**

``` js
git clone https://github.com/ats1999/drone-air-mission-planning.git
cd server
npm i
// nodejs is required
```

In order to generate more coordinates, put the <b>above-copied data into `server/input.json`</b> Now, you can only generate static coordinates or run a live simulation.

#### To generate static coordinates

After putting data into `server/input.json` run `npm run static` inside the **server** directory.

#### To run a live simulation

After putting data into `server/input.json` run `npm start` inside the **server** directory.
Your real-time coordinates will be sent through the **socket**.

> If you are using any other server(other than nodejs) then you can use the content of `server/geojson.json` file to do your task.

**Socket event:** we are using [https://socket.io/](https://socket.io/)

| socket.on(event) | Data |
| --- | --- |
| cords | Object |
<br>
| socket.on(event) | Data |
| --- | --- |
| cords | {<br>        cords:[longitude, latitude],<br>        id:droneId     <br>} |
| <span style="color: #ce9178;">static\_\_data</span> | an array of geojsons lines, circles, points |

**Ex:**

``` js
socket.on("cords",(data)=>{
    console.log(data.cord,data.id);
    // data.id is the drone id, which will be unique across a single run
})
```

### Getting static coordinates

Open `server/geojson.json` file after running `npm run static` and copy the file or it's contents.

**Static coordinates for `Copied data example`**

> Note: Circles will be converted into polygon so it can scale with relative to the radius according to the map zoom lavel

``` js
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

## More control

Go to `server\config.json`
It has the default content

``` js
{
    "sendDataAtTimeInterval":10,
    "circleSteps":50,
    "lineSignmentLength":1
}
```

| Property | Description | Mode |
| --- | --- | --- |
| sendDataAtTimeInterval | When you run the live simulation,<br>Then it requires a time interval.<br>It'll send data at the time<br>the interval of specified milliseconds | Live simulation |
| circleSteps | The number of coordinates will be<br>generated for the **polygon**.<br>As I said earlier<br>we are making a polygon<br>around the radius of the circle.<br>The more number of coordinates, the more rounded circle will be. | Both |
| lineSignmentLength | The number of coordinates<br>will be generated for line in <i>**1KM**</i><br>For example, if it is 1 then 1000 coordinates will be generated in 1KM of line. | Live and Static, both |

## Our plan

* [ ] Support all formats
* [x] generate data at the client as well as the server(real-time)
* [x] JSON file output
* [ ] support of removing plan after adding from web
* [ ] editing feature

# all contributions are welcome 👏
