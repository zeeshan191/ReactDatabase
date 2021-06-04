const express = require("express");
const app = express();
const cors = require("cors");
const oracledb = require('oracledb');

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

app.use(cors());
app.use(express.json());

let db=oracledb.getConnection({
      // user          : "system",
      // password      : "Welcome1",
      // connectString : "DESKTOP-B0R2LSM/XE"
host: 'DESKTOP-B0R2LSM', //'localhost',
            user: 'system',
            password : 'Welcome1',
            port : 1522, //port mysql
            database:'XE'


    });
	


/* db.connection.execute((err) => {
  if (err) {
    console.log("These is error while connecting to db", err.stack);
  } else {
    console.log("Succeed and connection thread id is ", db.threadId);
  }
}); */


async function run() {

  try {
db = await oracledb.getConnection({
     // user          : "system",
      // password      : "Welcome1",
      // connectString : "DESKTOP-B0R2LSM/XE"
	  host: 'DESKTOP-B0R2LSM', //'localhost',
            user: 'system',
            password : 'Welcome1',
            port : 1522, //port mysql
            database:'XE'

    });
	
    const result = await db.execute(
      `SELECT count(1)
       FROM tab`,
    );
    console.log(result.rows);

  } catch (err) {
    console.error(err);
  } 
}


app.get("/getMaxId", (req, res) =>{
  db.execute("select v1,v2 from test_node", (error, results) => {
    if (error) throw error;
    res.send(results.rows);
  })
})


app.get("/getfullRecords", (req, res) =>{
  db.execute("select * from test_node", (error, results) => {
    if (error) throw error;
    res.send(results.rows);
  })
})

app.post("/getproduct", (req, res) =>{
  db.execute("select PROD_ID as ItemID,PROD_NAME as ItemName,PROD_PRICE as ItemPrice,PROD_QTY as ItemQty,PROD_DESC as ItemDescribtion from products", (error, results) => {
    if (error) throw error;
    res.send(results.rows);
  })
})
app.post("/getcustomer1", (req, res) =>{
	
  db.execute("select CUST_ID as id,CUST_NAME as name,CUST_PHNUMBER as mobile ,CUST_EMAIL as email from customer", (error, results) => {
    if (error) throw error;
    res.send(results.rows);
  })
})
app.post("/getaccount", (req, res) =>{
	//console.log("Test values in services req values :", req);
	//console.log("Test values in services res values :", res);
  db.execute("select USER_NAME as USERNAME,USER_BUSINESSNAME as BUSINESSNAME,USER_EMAIL as EMAIL,USER_ADDRESS as ADDRESS from MS_USERS", (error, results) => {
    if (error) throw error;
    res.send(results.rows);
  })
})

app.post("/getaccount1", (req, res) =>{
	//	console.log("Test values in services req values :", req);
	//console.log("Test values in services res values :", res);
	const useremail=req.body.useremail;
	
db.execute("select * from MS_USERS where USER_EMAIL=:useremail", [useremail],(error, results) => {
    if (error) throw error;
    res.send(results.rows);
  })
})

app.post("/deleteproduct", (req, res) =>{
	
	const productid=req.body.itemId;
	
db.execute("delete from products where prod_id=:id",[productid], (error, results) => {
	
    if (error) throw error;
	 db.execute("commit");
    res.send(results.rows);
  })
})


app.post("/deletecustomer1", (req, res) =>{
	
	const custphnumber=req.body.custphnumber;
	
db.execute("delete from customer where cust_id=:mobile",[custphnumber], (error, results) => {
	
    if (error) throw error;
	 db.execute("commit");
    res.send(results.rows);
  })
})

app.post("/updateproduct", (req, res) =>{
	
  const productids = req.body.itemID;
  const productname = req.body.itemName;
  const productqty = req.body.itemQty;
  const productdesc = req.body.itemDescribtion;
  const productprice = req.body.itemPrice;
  
  
db.execute("update products set prod_name=:name,prod_price=:price,prod_qty=:qty,prod_desc=:descs where prod_id=:productid",[
	
	 productname,
	 productprice,
	 productqty,
	 productdesc,
	 productids
    ], 
	(error, results) => {
    if (error) throw error;
	 db.execute("commit");
    res.send(results.rows);
  })
})
app.post("/updatecustomer1", (req, res) =>{
	
  const customername = req.body.name;
  const customerphnumber = req.body.mobile;
  const customeremail = req.body.email;
  const custid = req.body.id;
  
  db.execute("update customer set cust_name=:name,cust_email=:email,cust_phnumber=:mobile where cust_id=:custid",[
	
	customername,
    customeremail,
	customerphnumber,
	custid
    ], 
	(error, results) => {
    if (error) throw error;
	 db.execute("commit");
    res.send(results.rows);
  })
})

app.post("/createTest", (req, res) => {
  const v1data = req.body.v1data;
  const v2data = req.body.v2data;

  // console.log("Test values in services req values :", req);

  // console.log("Test values in services res values :", res);

  db.execute(
    "insert into test_node(v1,v2) values(:v11,:v12)",
    [
	 v1data,
	 v2data,
    ],
    (err, result) => {
      // console.log("Test values in services :", name);
      if (err) {
        console.log("There is error ", err + result);
      } else {
		  db.execute("commit");
		  
        res.send("values inserted");
      }
    }
	
  );
});


app.post("/createproduct", (req, res) => {
	
 
  const productid = req.body.itemID;
  const productname = req.body.itemName;
  const productqty = req.body.itemQty;
  const productdesc = req.body.itemDescribtion;
  const productprice = req.body.itemPrice;
  

  // console.log("Test values in services req values :", req);

  // console.log("Test values in services res values :", res);

  db.execute(
    "INSERT INTO PRODUCTS(PROD_ID,PROD_NAME,PROD_QTY,PROD_DESC,PROD_PRICE)VALUES(PROD_IDS.NEXTVAL,:prodName,:prodqty,:proddesc,:prodprice)",
    [
	 
	 productname,
	 productqty,
	 productdesc,
	 productprice
    ],
    (err, result) => {
      // console.log("Test values in services :", name);
      if (err) {
        console.log("There is error ", err + result);
      } else {
		  db.execute("commit");
        res.send("values inserted in Oracle db : "+productid);
      }
    }
  );
});


app.post("/createcustomer1", (req, res) => {
 
 
  const customername = req.body.name;
  const customerphnumber = req.body.mobile;
  const customeremail = req.body.email;
  
  

  // console.log("Test values in services req values :", req);

  // console.log("Test values in services res values :", res);

  db.execute(
    "INSERT INTO CUSTOMER(CUST_ID,CUST_NAME,CUST_PHNUMBER,CUST_EMAIL)VALUES(CUST_IDSS.NEXTVAL,:custName,:custPhNumber,:custEmail)",
    [
	
	customername,
	customerphnumber,
	customeremail
	
    ],
    (err, result) => {
       //Aconsole.log("Test values in services :", name);
      if (err) {
        console.log("There is error ", err + result);
      } else {
		  db.execute("commit");
        res.send("values inserted in Oracle db : "+customerphnumber);
      }
    }
  );
});

app.post("/login1", (req, res) => {

  const useremail = req.body.email;
  const userpassword = req.body.password;
  
 db.execute(
    "select CASE WHEN count(1) > 0 THEN 'True' ELSE 'False' END AS userAvailable from MS_USERS where user_email = :userEmail and user_password = :userPassword",
    [
	
	useremail,
	userpassword
	
	
    ],
    (err, result) => {
       //Aconsole.log("Test values in services :", name);
      if (err) {
        console.log("There is error ", err + result);
      } else {
		  db.execute("commit");
         res.send(result.rows);
      }
    }
  );
});

app.post("/checkforusername", (req, res) => {

  const useremail = req.body.emailId;
  db.execute(
    "select CASE WHEN count(1) > 0 THEN 'True' ELSE 'False' END AS userAvailable from MS_USERS where user_email = :userEmail",
    [
	useremail
	],
    (err, result) => {
       //Aconsole.log("Test values in services :", name);
      if (err) {
        console.log("There is error ", err + result);
      } else {
		  db.execute("commit");
         res.send(result.rows);
      }
    }
  );
});


app.post("/registerUser", (req, res) => {
 
  const useremail = req.body.useremail;
  const userpassword = req.body.userpassword;
  const userbusinessname =req.body.userbusinessname;
  const username = req.body.username;
  const useraddress = req.body.useraddress;
  
  
 db.execute("INSERT INTO MS_USERS(USER_ID,USER_EMAIL,USER_PASSWORD,USER_STATUS,USER_BUSINESSNAME,USER_NAME ,USER_ADDRESS)VALUES(USERID_S.NEXTVAL,:userEmail,:userPassword,'Active',:userBusName,:userName,:userAddress)",
    [
	
	useremail,
	userpassword,
	userbusinessname,
	username,
	useraddress
	
    ],
    (err, result) => {
     
      if (err) {
        console.log("There is error ", err + result);
      } else {
		  db.execute("commit");
        res.send("values inserted in Oracle db : "+username);
      }
    }
  );
});

app.post("/addBill", (req, res) => {
 console.log('Id Value in service req : ', req);
 console.log('Id Value in service req : ', req.body.lineItems);
 
 
  const useremail = req.body.useremail;
  const userpassword = req.body.userpassword;
  const userbusinessname =req.body.userbusinessname;
  const username = req.body.username;
  const useraddress = req.body.useraddress;
  
  
 db.execute("INSERT INTO MS_USERS(USER_ID,USER_EMAIL,USER_PASSWORD,USER_STATUS,USER_BUSINESSNAME,USER_NAME ,USER_ADDRESS)VALUES(USERID_S.NEXTVAL,:userEmail,:userPassword,'Active',:userBusName,:userName,:userAddress)",
    [
	
	useremail,
	userpassword,
	userbusinessname,
	username,
	useraddress
	
    ],
    (err, result) => {
     
      if (err) {
        console.log("There is error ", err + result);
      } else {
		  db.execute("commit");
        res.send("values inserted in Oracle db : "+username);
      }
    }
  );
});

app.post("/getDataOnId", (req, res) => {
  
  const stichId = req.body.stichId;
  
  // console.log('Id Value in service req : ', req);
  // console.log('Id Value in service res : ', res);
  // console.log('Id Value in service id : ', stichId);

  db.execute("select stich_id as id,stich_name as name,stich_gender as gender,to_date(stich_creatdate,'mm/dd/yyyy') as creationDate ,to_date(stich_closdate,'mm/dd/yyyy') as closingDate ,stich_neck as collorNeck ,stich_chest as chest,stich_stomach as stomach,stich_belly as belly,stich_sidecut as sideCut,stich_tophght as topHeight,stich_waist as waist,stich_hip as hip,stich_thigh as thighs,stich_lthigh as lowerThigh,stich_ankle as ankle,stich_desc as description,stich_status as status from stichpad where stich_id = :stichId",
  [  
  stichId,
  ],
  (error, result) => {
    // console.log("Test values in services :", stichId);
    // console.log("Test values in result :", result);
    if (error) {
      console.log("There is error ", error);
    } else {
      res.send(result.rows);
    }
  })
});

app.post("/deleteStichRecord", (req, res) => {
  
  const stichId = req.body.stichId;
  
  // console.log('Id Value in service req : ', req);
  // console.log('Id Value in service res : ', res);
  // console.log('Id Value in service id : ', stichId);

  db.execute("delete from stichpad where stich_id = :stichId",
[  
  stichId
  ],
  (error, result) => {
    // console.log("Test values in services :", stichId);
    // console.log("Test values in result :", result);
    if (error) {
      console.log("There is error ", error);
    } else {
		db.execute("commit");
      res.send("Successfully deleted");
    }
  })
});

app.listen(3003, () => {
	run();
  console.log("Server is up and running on port 3003");
});

module.exports = db;
