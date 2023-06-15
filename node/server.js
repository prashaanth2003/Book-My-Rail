const express = require('express'); 
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express(); 
const con = require('./db_connect');

app.use(cors());

app.use(express.urlencoded({ extended: false }))
app.use(express.json());

// use rail;
// select * from t_schedule A inner join t_schedule B on A.train_no = B.train_no and A.platform_no < B.platform_no where A.station_name = "Delhi - DLI" and B.station_name = "Chennai Central - MAS"; 
app.post('/login', (req, res) => {
    con.query("select password from passenger where username = '" + String(req.body.username) + "'", function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      });
})

app.post('/signup/usercheck', (req, res) => {
    con.query("select count(*) as c from passenger where username = '"+ String(req.body.username) +"'", function (err, result, fields) {
        if(err) throw err;
        console.log(result);
        res.send(result);
    })
})

app.post('/signup/submit', (req, res) => {
    const q = "insert into passenger values('"+ String(req.body.username) +"', "+ req.body.aadhaar +", '"+ String(req.body.name) + "', " + req.body.age + ", '"+ String(req.body.gender) +"', '"+ String(req.body.address) +"', "+ req.body.mobile +", '"+ String(req.body.password) +"', '"+ String(req.body.email) + "')"
    con.query(q, function (err, result, fields) {
        if(err) throw err;
        console.log(result);
        res.send(result);
    })
})

app.post('/planYourJourney/trainSchedule', (req, res) => {
    const q = "select A.station_name as from_station, B.station_name as to_station, A.arrival as arrival, B.arrival as departure, A.platform_no as arr_platform_no, B.platform_no as dep_platform_no, C.train_no as train_no, C.train_name as train_name, C.total_coach as total_coach, C.total_seats as total_seats, D.booked_seats as booked_seats, C.FC_total as FC_total, D.FC_booked as FC_booked, C.AC_total as AC_total, D.AC_booked as AC_booked, C.ST_total as ST_total, D.ST_booked as ST_booked, C.SL_total as SL_total, D.SL_booked as SL_booked from (((t_schedule A inner join t_schedule B on A.train_no = B.train_no and A.arrival < B.arrival) inner join train_details C on C.train_no = A.train_no) inner join date_entry D on D.train_no = C.train_no) where A.station_name = '"+ String(req.body.from) +"' and B.station_name = '"+ String(req.body.to) +"' and D.date = STR_TO_DATE('" + String(req.body.date_picker) + "', '%d/%m/%Y') "; 
    con.query(q, function (err, result, fields) {
        if(err) throw err;
        console.log(result);
        res.send(result);
    })
})  

app.post('/planYourJourney/connectingtrain', (req, res) => {
    const q= "select A.station_name as from_station_1, B.station_name as to_station_1, D.station_name as from_station_2, E.station_name as to_station_2, A.arrival as arrival_1, B.arrival as departure_1, D.arrival as arrival_2, E.arrival as departure_2, A.platform_no as arr_platform_1 , B.platform_no as dep_platform_1, D.platform_no as arr_platform_2, E.platform_no as dep_platform_2, C.train_no as train_no_1, C.train_name as train_name_1, C.total_coach as total_coach_1, C.total_seats as total_seats_1, G.booked_seats as booked_seats_1, C.FC_total as FC_total_1, G.FC_booked as FC_booked_1, C.AC_total as AC_total_1, G.AC_booked as AC_booked_1, C.ST_total as ST_total_1, G.ST_booked as ST_booked_1, C.SL_total as SL_total_1, G.SL_booked as SL_booked_1, F.train_no as train_no_2, F.train_name as train_name_2, F.total_coach as total_coach_2, F.total_seats as total_seats_2, H.booked_seats as booked_seats_2, F.FC_total as FC_total_2, H.FC_booked as FC_booked_2, F.AC_total as AC_total_2, H.AC_booked as AC_booked_2, F.ST_total as ST_total_2, H.ST_booked as ST_booked_2, F.SL_total as SL_total_2, H.SL_booked as SL_booked_2  from ((((t_schedule A inner join t_schedule B on A.train_no = B.train_no and A.arrival < B.arrival) inner join train_details C on C.train_no = A.train_no) inner join date_entry G on G.train_no = C.train_no) inner join (((t_schedule D inner join t_schedule E on D.train_no = E.train_no and D.arrival < E.arrival) inner join train_details F on F.train_no = D.train_no) inner join date_entry H on H.train_no = F.train_no ) on B.station_name = D.station_name and B.arrival < D.departure and C.train_no != F.train_no) where A.station_name = '"+ String(req.body.from) +"' and E.station_name = '"+ String(req.body.to) +"' and G.date = STR_TO_DATE('" + String(req.body.date_picker) + "', '%d/%m/%Y') and H.date = STR_TO_DATE('" + String(req.body.date_picker) + "', '%d/%m/%Y')"; 
    con.query(q, function (err, result, fields) {
        if(err) throw err;
        console.log(result);
        res.send(result);
    })
})
app.post('/planYourJourney/stationName', (req, res) => {
    const q = 'select distinct(station_name) from t_schedule'
    con.query(q, function(err, result) {
        if(err) throw err;
        res.send(result);
    })
})

app.post('/booking/fareCalculation', (req, res) => {
    const q = 'select B.'+ String(req.body.select) + '_fare - A.'+ String(req.body.select)+ '_fare as fare from fare A inner join fare B on A.train_no = B.train_no where A.train_no = "'+ String(req.body.train_no) +'" and A.station_id = "'+ String(req.body.from) +'" and B.station_id = "'+ String(req.body.to) +'"';
    con.query(q, function(err, result) {
        if(err) throw err;
        res.send(result);
    })
})
app.post('/booking/connectfareCalculation', (req, res) => {
    console.log(req.body)
    const q = 'select B.'+ String(req.body.select) + '_fare - A.'+ String(req.body.select)+ '_fare as fare from fare A inner join fare B on A.train_no = B.train_no where A.train_no = "'+ String(req.body.train_no_1) +'" and A.station_id = "'+ String(req.body.from_1) +'" and B.station_id = "'+ String(req.body.to_1) +'"';
    const q1 = 'select B.'+ String(req.body.select2) + '_fare - A.'+ String(req.body.select2)+ '_fare as fare from fare A inner join fare B on A.train_no = B.train_no where A.train_no = "'+ String(req.body.train_no_2) +'" and A.station_id = "'+ String(req.body.from_2) +'" and B.station_id = "'+ String(req.body.to_2) +'"';
    let res1 = 0;
    con.query(q, function(err1, result1) {
        if(err1) throw err1;
        con.query(q1, function(err2, result2) {
            if(err2) throw err2;
            res.send([{fare: Number(result1[0].fare) + Number(result2[0].fare), fare1:Number(result1[0].fare), fare2: Number(result2[0].fare)}])
        })
    })
})

app.post('/dashboard/acc_detail', (req, res) => {
    const q = "select * from passenger where username='"+ String(req.body.username) + "'";
    con.query(q, function(err, result) {
        if(err) throw err;
        res.send(result);
    })
})

app.post('/dashboard/travel-history', (req, res) => {
    const q = "select A.fare as fare , A.ticket_no as ticket_no, A.from_station as from_station, A.to_station as to_station, A.train_no as train_no, A.date as date, B.train_name as train_name, A.profile_name as name from tickets A inner join train_details B on A.train_no = B.train_no where username='" + String(req.body.username) + "' order by date desc, ticket_no";
    console.log(req.body.username)
    con.query(q, function(err, result) {
        if(err) throw err;
        res.send(result);
        console.log(result);
    })
})

app.post('/booking/submission', (req, res) => {
    console.log(req.body)
    const passenger = req.body.passenger;
    console.log(passenger);
    let total = req.body[String(req.body.select)+"_total"];
    let booked = Number(req.body[String(req.body.select)+"_booked"]);
    if(total > booked) {
        req.body.passenger.map((item) => {
            booked += 1;
            let seat_no = String(req.body.select) + "_" + String(booked);
            let ticket_no = String(req.body.train_no) + "_" + String(req.body.date_picker) + "_" + String(seat_no);
            const q1 = "insert into tickets values('" + ticket_no + "', '" + String(req.body.username) + "', '" + String(item.name) + "', " + item.age + ", '" + String(item.gender)[0] + "', STR_TO_DATE('" + String(req.body.date_picker) + "', '%d/%m/%Y'), '" + String(req.body.train_no) + "', '" + String(req.body.select) + "', '" + String(seat_no) + "', '" + String(req.body.from_station) + "', '" + String(req.body.to_station)+ "', " + String(req.body.fare.fare) + ")";
            con.query(q1, function(err) {
                if (err) throw err;
            })
            const q2 = "update date_entry set " + String(req.body.select) + "_booked = " + String(req.body.select) + "_booked + 1, booked_seats = booked_seats + 1 where train_no = '" + String(req.body.train_no) + "' and date = STR_TO_DATE('" + String(req.body.date_picker) + "', '%d/%m/%Y')";
            con.query(q2, function(err) {
                if (err) throw err;
            })
        })
        res.send({"flag": 1});
    }else {
        res.send({"flag": 0});
    }    
})

app.post('/booking/connectsubmission', (req, res) => {
    const passenger = req.body.passenger;
    let total_1 = req.body[String(req.body.select)+"_total_1"];
    let booked_1 = Number(req.body[String(req.body.select)+"_booked_1"]);
    let total_2 = req.body[String(req.body.select2)+"_total_2"];
    let booked_2 = Number(req.body[String(req.body.select2)+"_booked_2"]);
    if(total_1 > booked_1 && total_2 > booked_2) {
        req.body.passenger.map((item) => {
            booked_1 += 1;
            booked_2 += 1;
            let seat_no_1 = String(req.body.select) + "_" + String(booked_1);
            let ticket_no_1 = String(req.body.train_no_1) + "_" + String(req.body.date_picker) + "_" + String(seat_no_1);
            let seat_no_2 = String(req.body.select2) + "_" + String(booked_2);
            let ticket_no_2 = String(req.body.train_no_2) + "_" + String(req.body.date_picker) + "_" + String(seat_no_2);
            const q1 = "insert into tickets values('" + ticket_no_1 + "', '" + String(req.body.username) + "', '" + String(item.name) + "', " + item.age + ", '" + String(item.gender)[0] + "', STR_TO_DATE('" + String(req.body.date_picker) + "', '%d/%m/%Y'), '" + String(req.body.train_no_1) + "', '" + String(req.body.select) + "', '" + String(seat_no_1) + "', '" + String(req.body.from_station_1) + "', '" + String(req.body.to_station_1)+ "', " + String(req.body.fare.fare1) + ")";
            con.query(q1, function(err) {
                if (err) throw err;
            })
            const q2 = "update date_entry set " + String(req.body.select) + "_booked = " + String(req.body.select) + "_booked + 1, booked_seats = booked_seats + 1 where train_no = '" + String(req.body.train_no_1) + "' and date = STR_TO_DATE('" + String(req.body.date_picker) + "', '%d/%m/%Y')";
            con.query(q2, function(err) {
                if (err) throw err;
            })
            const q3 = "insert into tickets values('" + ticket_no_2 + "', '" + String(req.body.username) + "', '" + String(item.name) + "', " + item.age + ", '" + String(item.gender)[0] + "', STR_TO_DATE('" + String(req.body.date_picker) + "', '%d/%m/%Y'), '" + String(req.body.train_no_2) + "', '" + String(req.body.select2) + "', '" + String(seat_no_2) + "', '" + String(req.body.from_station_2) + "', '" + String(req.body.to_station_2)+ "', " + String(req.body.fare.fare2) + ")";
            con.query(q3, function(err) {
                if (err) throw err;
            })
            const q4 = "update date_entry set " + String(req.body.select) + "_booked = " + String(req.body.select) + "_booked + 1, booked_seats = booked_seats + 1 where train_no = '" + String(req.body.train_no_2) + "' and date = STR_TO_DATE('" + String(req.body.date_picker) + "', '%d/%m/%Y')";
            con.query(q4, function(err) {
                if (err) throw err;
            })
        })
        res.send({"flag": 1});
    }else {
        res.send({"flag": 0});
    }    
})

app.post('/ticket/fetch', (req, res) => {
        console.log(req.body);
        const q = "select * from tickets where train_no = '" + String(req.body.train_no) + "' and username = '" + String(req.body.username) + "' and date = STR_TO_DATE('" + String(req.body.date) + "', '%d/%m/%Y')";
        con.query(q, function(err, result) {
            if (err) throw err;
            res.send(result);
            console.log(result);
        })
})
app.post('/ticket/connectfetch1',  (req, res) => {
    console.log(req.body);
    const q = "select * from tickets where train_no = '" + String(req.body.train_no_1) + "' and username = '" + String(req.body.username) + "' and date = STR_TO_DATE('" + String(req.body.date) + "', '%d/%m/%Y')";
        con.query(q, function(err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        })
})
app.post('/ticket/connectfetch2',  (req, res) => {
    const q = "select * from tickets where train_no = '" + String(req.body.train_no_2) + "' and username = '" + String(req.body.username) + "' and date = STR_TO_DATE('" + String(req.body.date) + "', '%d/%m/%Y')";
        con.query(q, function(err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        })
})
app.post('/trainenq/details', (req,res) => {
    const q = "select station_name,arrival from t_schedule where train_no='" + String(req.body.temp) + "'"
    console.log(req.body.temp)
    con.query(q, function(err, result) {
        if(err) throw err;
        res.send(result);
        console.log(result);
    })
})

app.listen(5000, () => {
    console.log("connected")
});
