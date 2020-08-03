const express = require("express");
const app = express();
const bodyParser = require('body-parser');
let Handlebars = require("handlebars");
let fs = require('fs');
let uuid = require('uuid');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())

app.use(express.static("public"));

// app.get(

//     "/",  //root dirctly(defult page[home] for  website)
//     function (request, response) {
//         console.log("A request for home has been received");
//         response.send('<h1 style="color:blue;"> Home page 111 </h1>');
//     });


app.get(

    "/message",  //root dirctly(defult page[home] for  website)

    function (request, response) {
        console.log("A request for the message route has been received");
        response.send("hello service nsw students");
    });

app.get("coffee-accessories",
    function (req, res) {
        res.send([
            {
                id: "1",
                accessoryName: "Cup Wall Art",
                image: "/Images/Coffee acc1.jpg"
            }
        ])
    })

app.post(
    "/submit-review",
    function (req, res) {
        console.log("Submitting review", JSON.stringify(req.body));
        console.log("Coffee Type", req.body.coffee);
        res.send("your request has been accepted")

    }
)

// Save Data in the back end
let coffeeOrders = [];

app.post(
    "/add-Order",
    function (req, res) {
        var coffeeOrder = req.body;
        console.log(uuid.v4());
        coffeeOrder.id = uuid.v4();
        coffeeOrders.push(coffeeOrder);
        res.redirect(`/OrderConfirmation/${coffeeOrder.id}`);
       }
)

app.get(
    "/orders",
    function (req, res) {
        var templateFile = fs.readFileSync("views/coffee-orders.hbs", "utf8");
        var template = Handlebars.compile(templateFile);
        res.send(template({orders : coffeeOrders}));
    }
)

app.get(
    "/OrderConfirmation/:orderId",
    function (req, res) {
        var order = coffeeOrders.find(coffeeOrder => coffeeOrder.id == req.params.orderId);
        var templateFile = fs.readFileSync("views/orderConfirmation.hbs", "utf8");
        var template = Handlebars.compile(templateFile);
        res.send(template({order : order}));
    }
)























const port = 3000;

app.listen(port, function () {
    console.log("The express server is listening")
});

