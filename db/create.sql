create database if not exists rail;
use rail;
drop table if exists fare;
drop table if exists tickets;
drop table if exists t_schedule;
drop table if exists date_entry;
drop table if exists train_details;
drop table if exists passenger;	


create table if not exists passenger(username varchar(25) primary key, aadhaar numeric unique not null, name varchar(25) not null, age numeric not null, gender char(1) not null, address varchar(50) not null, mobile numeric not null, password varchar(25) not null, email varchar(25) not null, check(age >= 18));
create table if not exists train_details(train_no varchar(25) primary key, train_name varchar(25) not null, from_station varchar(25) not null, to_station varchar(25) not null, total_coach numeric not null default 4, total_seats numeric not null, FC_total numeric not null, AC_total numeric not null, ST_total numeric not null, SL_total numeric not null);
create table if not exists fare(station_id varchar(25) not null, train_no varchar(25) not null, FC_fare numeric not null, AC_fare numeric not null, ST_fare numeric not null, SL_fare numeric not null, foreign key (train_no) references train_details(train_no));
create table if not exists tickets(ticket_no varchar(25), username varchar(25), profile_name varchar(25) not null, age numeric not null, gender char(1) not null, date date not null, train_no varchar(25) not null, coach_no varchar(25) not null, seat_no varchar(25) not null, from_station varchar(25) not null, to_station varchar(25) not null, fare numeric not null, foreign key (train_no) references train_details(train_no));
create table if not exists t_schedule(station_name varchar(25) not null, platform_no numeric not null, train_no varchar(25) not null, arrival time not null, departure time not null, foreign key (train_no) references train_details(train_no));
create table if not exists date_entry(train_no varchar(25) not null, date date not null, booked_seats numeric not null default 0, FC_booked numeric not null default 0, AC_booked numeric not null default 0, ST_booked numeric not null default 0, SL_booked numeric not null default 0, foreign key (train_no) references train_details(train_no), primary key (train_no, date));


insert into train_details values("12163", "Chennai Express", "Delhi - DLI", "Chennai Central - MAS", 8, 300, 50, 50, 100, 100);
insert into train_details values("12632", "Nellai Express", "Thirunelveli - TEN", "Chennai Central - MAS", 12, 450, 75, 75, 150, 150);
insert into train_details values("12635", "Vaigai Express", "Chennai Central - MAS", "Madurai - MDU", 8, 300, 50, 50, 100, 100);
insert into train_details values("16859", "Mangalore Express", "Chennai Central - MAS", "Mangalore Central - MAQ", 12, 450, 75, 75, 150, 150);

insert into t_schedule values( "Delhi - DLI", 1, "12163", '06:00:00', '06:10:00'); 
insert into t_schedule values( "Agra - AGC", 2, "12163", '06:40:00', '06:50:00'); 
insert into t_schedule values( "Gwalior - GWL", 3, "12163", '07:20:00', '07:30:00'); 
insert into t_schedule values( "Bhopal - BPL", 4, "12163", '08:00:00', '08:10:00'); 
insert into t_schedule values( "Nagpur - NGP", 5, "12163", '08:40:00', '08:50:00'); 
insert into t_schedule values( "Warangal - WL", 6, "12163", '09:20:00', '09:30:00'); 
insert into t_schedule values( "VIjayawada - VZA", 7, "12163", '10:00:00', '10:10:00');
insert into t_schedule values( "Chennai Central - MAS", 8, "12163", '10:40:00', '11:30:00'); 

insert into t_schedule values( "Thirunelveli - TEN", 1, "12632", '13:00:00', '13:10:00'); 
insert into t_schedule values( "Kovilpatti - CVP", 2, "12632", '13:40:00', '13:50:00'); 
insert into t_schedule values( "Virudhunagar - VPT", 3, "12632", '14:20:00', '14:30:00'); 
insert into t_schedule values( "Madurai - MDU", 4, "12632", '15:00:00', '15:10:00'); 
insert into t_schedule values( "Dindigul - DG", 5, "12632", '15:40:00', '15:50:00'); 
insert into t_schedule values( "Trichy - TPJ", 6, "12632", '16:20:00', '16:30:00'); 
insert into t_schedule values( "Villupuram - VM", 7, "12632", '17:00:00', '17:10:00'); 
insert into t_schedule values( "Chengalpattu - CGL", 8, "12632", '17:40:00', '17:50:00'); 
insert into t_schedule values( "Tambaram - TBM", 9, "12632", '18:20:00', '18:30:00'); 
insert into t_schedule values( "Chennai Central - MAS", 10, "12632", '19:00:00', '19:10:00'); 

insert into t_schedule values( "Chennai Central - MAS", 1, "12635", '18:00:00', '18:10:00'); 
insert into t_schedule values( "Tambaram - TBM", 2, "12635", '18:40:00', '18:50:00'); 
insert into t_schedule values( "Chengalpattu - CGL", 3, "12635", '19:20:00', '19:30:00'); 
insert into t_schedule values( "Villupuram - VM", 4, "12635", '20:00:00', '20:10:00'); 
insert into t_schedule values( "Virudhachalam - VRI", 5, "12635", '20:40:00', '20:50:00'); 
insert into t_schedule values( "Ariyalur - ALU", 6, "12635", '21:20:00', '21:30:00'); 
insert into t_schedule values( "Trichy - TPJ", 7, "12635", '22:00:00', '22:10:00'); 
insert into t_schedule values( "Dindigul - DG", 8, "12635", '22:40:00', '22:50:00'); 
insert into t_schedule values( "Sholavadhan - SDN", 9, "12635", '23:20:00', '23:30:00'); 
insert into t_schedule values( "Madurai - MDU", 10, "12635", '23:59:59', '23:59:59'); 

insert into t_schedule values( "Chennai Central - MAS", 1, "16859", '15:00:00', '15:10:00'); 
insert into t_schedule values( "Tambaram - TBM", 2, "16859", '15:40:00', '15:50:00'); 
insert into t_schedule values( "Chengalpattu - CGL", 3, "16859", '16:20:00', '16:30:00'); 
insert into t_schedule values( "Villupuram - VM", 4, "16859", '17:00:00', '17:10:00');
insert into t_schedule values( "Virudhachalam - VRI", 5, "16859", '17:40:00', '17:50:00'); 
insert into t_schedule values( "Ariyalur - ALU", 6, "16859", '18:20:00', '18:30:00'); 
insert into t_schedule values( "Trichy - TPJ", 7, "16859", '19:00:00', '19:10:00');  
insert into t_schedule values( "Karur - KRR", 8, "16859", '19:40:00', '19:50:00'); 
insert into t_schedule values( "Erode - ED", 9, "16859", '20:20:00', '20:30:00'); 
insert into t_schedule values( "Tirupur - TUP", 10, "16859", '21:00:00', '21:10:00'); 
insert into t_schedule values( "Coimbatore - CBE", 11, "16859", '21:40:00', '21:50:00'); 
insert into t_schedule values( "Kozhikode - CLD", 12, "16859", '22:20:00', '22:30:00'); 
insert into t_schedule values( "Payyanur - PAY", 13, "16859", '23:00:00', '23:10:00'); 
insert into t_schedule values( "Mangalore Central - MAQ", 14, "16859", '23:59:59', '23:59:59'); 

insert into fare values( "Delhi - DLI", "12163", 0, 0, 0, 0); 
insert into fare values( "Agra - AGC", "12163", 250, 200, 100, 50); 
insert into fare values( "Gwalior - GWL","12163", 500, 400, 200, 100); 
insert into fare values( "Bhopal - BPL","12163", 750, 600, 300, 150); 
insert into fare values( "Nagpur - NGP","12163", 1000, 800, 400, 200); 
insert into fare values( "Warangal - WL","12163", 1250, 1000, 500, 250); 
insert into fare values( "VIjayawada - VZA","12163", 1500, 1200, 600, 300);
insert into fare values( "Chennai Central - MAS","12163", 1750, 1400, 700, 350); 

insert into fare values( "Thirunelveli - TEN","12632", 0, 0, 0, 0); 
insert into fare values( "Kovilpatti - CVP","12632", 250, 200, 100, 50); 
insert into fare values( "Virudhunagar - VPT","12632", 500, 400, 200, 100); 
insert into fare values( "Madurai - MDU","12632", 750, 600, 300, 150); 
insert into fare values( "Dindigul - DG","12632", 1000, 800, 400, 200); 
insert into fare values( "Trichy - TPJ","12632", 1250, 1000, 500, 250); 
insert into fare values( "Villupuram - VM ","12632", 1500, 1200, 600, 300); 
insert into fare values( "Chengalpattu - CGL","12632", 1750, 1400, 700, 350); 
insert into fare values( "Tambaram - TBM","12632", 2000, 1600, 800, 400); 
insert into fare values( "Chennai Central - MAS", "12632", 2250, 1800, 900, 450); 

insert into fare values( "Chennai Central - MAS","12635", 0, 0, 0, 0); 
insert into fare values( "Tambaram - TBM","12635", 250, 200, 100, 50); 
insert into fare values( "Chengalpattu - CGL","12635", 500, 400, 200, 100); 
insert into fare values( "Villupuram - VM","12635", 750, 600, 300, 150); 
insert into fare values( "Virudhachalam - VRI","12635", 1000, 800, 400, 200); 
insert into fare values( "Ariyalur - ALU","12635", 1250, 1000, 500, 250); 
insert into fare values( "Trichy - TPJ","12635", 1500, 1200, 600, 300); 
insert into fare values( "Dindigul - DG","12635", 1750, 1400, 700, 350); 
insert into fare values( "Sholavadhan - SDN","12635", 2000, 1600, 800, 400); 
insert into fare values( "Madurai - MDU", "12635", 2250, 1800, 900, 450); 

insert into fare values( "Chennai Central - MAS","16859", 0, 0, 0, 0); 
insert into fare values( "Tambaram - TBM","16859", 250, 200, 100, 50); 
insert into fare values( "Chengalpattu - CGL","16859", 500, 400, 200, 100); 
insert into fare values( "Villupuram - VM","16859", 750, 600, 300, 150);
insert into fare values( "Virudhachalam - VRI","16859", 1000, 800, 400, 200); 
insert into fare values( "Ariyalur - ALU","16859", 1250, 1000, 500, 250); 
insert into fare values( "Trichy - TPJ","16859", 1500, 1200, 600, 300);  
insert into fare values( "Karur - KRR","16859", 1750, 1400, 700, 350); 
insert into fare values( "Erode - ED","16859", 2000, 1600, 800, 400); 
insert into fare values( "Tirupur - TUP", "16859", 2250, 1800, 900, 450); 
insert into fare values( "Coimbatore - CBE", "16859", 2500, 2000, 1000, 500); 
insert into fare values( "Kozhikode - CLD", "16859", 2750, 2200, 1100, 550); 
insert into fare values( "Payyanur - PAY", "16859", 3000, 2400, 1200, 600); 
insert into fare values( "Mangalore Central - MAQ", "16859", 3250, 2600, 1300, 650); 

INSERT into date_entry select train_no, "2022-06-01", 0, 0, 0, 0, 0 from train_details;
INSERT into date_entry select train_no, "2022-06-02", 0, 0, 0, 0, 0 from train_details;
INSERT into date_entry select train_no, "2022-06-03", 0, 0, 0, 0, 0 from train_details;
INSERT into date_entry select train_no, "2022-06-04", 0, 0, 0, 0, 0 from train_details;
INSERT into date_entry select train_no, "2022-06-05", 0, 0, 0, 0, 0 from train_details;
INSERT into date_entry select train_no, "2022-06-06", 0, 0, 0, 0, 0 from train_details;
INSERT into date_entry select train_no, "2022-06-07", 0, 0, 0, 0, 0 from train_details;
INSERT into date_entry select train_no, "2022-06-08", 0, 0, 0, 0, 0 from train_details;
INSERT into date_entry select train_no, "2022-06-09", 0, 0, 0, 0, 0 from train_details;
INSERT into date_entry select train_no, "2022-06-10", 0, 0, 0, 0, 0 from train_details;
INSERT into date_entry select train_no, "2022-06-11", 0, 0, 0, 0, 0 from train_details;
INSERT into date_entry select train_no, "2022-06-12", 0, 0, 0, 0, 0 from train_details;
INSERT into date_entry select train_no, "2022-06-13", 0, 0, 0, 0, 0 from train_details;
INSERT into date_entry select train_no, "2022-06-14", 0, 0, 0, 0, 0 from train_details;
INSERT into date_entry select train_no, "2022-06-15", 0, 0, 0, 0, 0 from train_details;
INSERT into date_entry select train_no, "2022-06-16", 0, 0, 0, 0, 0 from train_details;
INSERT into date_entry select train_no, "2022-06-17", 0, 0, 0, 0, 0 from train_details;
INSERT into date_entry select train_no, "2022-06-18", 0, 0, 0, 0, 0 from train_details;
INSERT into date_entry select train_no, "2022-06-19", 0, 0, 0, 0, 0 from train_details;
INSERT into date_entry select train_no, "2022-06-20", 0, 0, 0, 0, 0 from train_details;
INSERT into date_entry select train_no, "2022-06-21", 0, 0, 0, 0, 0 from train_details;
INSERT into date_entry select train_no, "2022-06-22", 0, 0, 0, 0, 0 from train_details;
INSERT into date_entry select train_no, "2022-06-23", 0, 0, 0, 0, 0 from train_details;
INSERT into date_entry select train_no, "2022-06-24", 0, 0, 0, 0, 0 from train_details;
INSERT into date_entry select train_no, "2022-06-25", 0, 0, 0, 0, 0 from train_details;
INSERT into date_entry select train_no, "2022-06-26", 0, 0, 0, 0, 0 from train_details;
INSERT into date_entry select train_no, "2022-06-27", 0, 0, 0, 0, 0 from train_details;
INSERT into date_entry select train_no, "2022-06-28", 0, 0, 0, 0, 0 from train_details;
INSERT into date_entry select train_no, "2022-06-29", 0, 0, 0, 0, 0 from train_details;
INSERT into date_entry select train_no, "2022-06-30", 0, 0, 0, 0, 0 from train_details;

insert into passenger values ("sathya", 1234567890, "Sathya Naraayanaa S", 20, "M", "Kalpakkam", 9445446158, "sathya", "sathya@gmail.com");
insert into passenger values ("Satty",4394309,"Sathya Naarayanaa",25,"M","Kalpakkam",9445446158,"sathya","satty@gmail.com");
insert into passenger values ("Hothands",5994309,"Sudeep K",27,"M","Coimbatore",9445454158,"sudeep","sudeep@gmail.com");
insert into passenger values ("mrHope",4394789,"Nitish K S",47,"M","Chennai",7200838028,"nitish","niti@gmail.com");

insert into tickets values ("12345","mrHope","Janavarshini",18,'F',"2022-06-06","16859","Sitting",50,"Trichy - TPJ","Karur - KRR",50);
insert into tickets values ("12346","mrHope","Nitish K S",47,'M',"2022-06-06","16859","Sitting",51,"Trichy - TPJ","Karur - KRR",50);
insert into tickets values ("12355","mrHope","Sathya Naarayanaa",25,'M',"2022-06-07","16859","Sitting",50,"Trichy - TPJ","Karur - KRR",50);