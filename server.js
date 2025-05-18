const BASE_URL = 'http://localhost:8000'
const express = require("express")
const bodyparser = require('body-parser')
const mysql = require('mysql2/promise');
const cors = require('cors');
const { error } = require("better-auth/api");
const app = express()



// ใช้ middleware
app.use(bodyparser.json())
app.use(cors())


   let validateData = ()=>{
    const errors = []

    if (!locationInput) {
        errors.push("กรุณากรอกข้อมูลสถานที่");
    }
    if (!checkInDate) {
        errors.push("กรุณากรอกข้อมูลวันที่เช็กอิน");
    }
    if (!checkOutDate) {
        errors.push("กรุณากรอกข้อมูลวันที่เช็กเอ้าท์");
    }
    if (!guests) {
        errors.push("กรุณากรอกจำนวนผู้เข้าพัก");
    }
    console.log(errors)
    return errors;

  }

const port =  8000;


    
  const connection = async () => {
  return await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "hotel",
    port: 3306
  });
};

app.get('/hotel_booking', async (req, res) => {
  let conn ;
 
   try {
    conn = await connection();
     const [results] = await conn.query('SELECT * FROM hotel_booking');
     console.log("เชื่อมต่อสำเร็จ");
    
    res.json(results)//ูลทั้งหมด
  } catch (error) {
    console.error("Error fetching users", error);
    res.status(500).json({ error: 'Error fetching users' });
  } 
   
});

// path = POST /users สำหรับการสร้าง users ใหม่บันทึกเข้าไป
//add ไม่ได้คิดว่า user ผืด

app.post('/hotel_booking', async (req, res) => {

  try {
    const user = req.body
    const errors =  '' // validateData(user);

    if(errors.length > 0){
      throw{
      message:'กรอกข้อมูลไม่ครบ',
      errors:errors
     }
    }
    const results = await conn.query('INSERT INTO hotel_booking SET ?', user)//ทำหน้าที่: สั่ง insert ข้อมูลจาก user เข้า table hotel_booking //ใช้ ? เพื่อป้องกัน SQL injection และ map ค่า user ไปใส่


    res.json({
      message: 'insert ok',
      data: results[0]
    })
  } catch (error) {
    const errorMessage = error.message || 'something wrong'
    const errors = error.errors || []

    console.error('error message', error.message)
    res.status(500).json({
      message: errorMessage,
      errors:errors
    })
  }
})

// GET /users/:id สำหรับการดึง users รายคนออกมา
app.get('/hotel_booking/:id', async (req, res) => {
  try {
    let id = req.params.id
    const results = await conn.query('SELECT * FROM hotel_booking WHERE id = ?', [id])

    if (results[0].length == 0) {
      throw { statusCode: 404, message: 'หาไม่เจอ' }
    }

    res.json(results[0][0])
  } catch (error) {
    console.error('error message', error.message)
    let statusCode = error.statusCode || 500
    res.status(statusCode).json({
      message: 'something wrong',
      errorMessage: error.message
    })
  }
})

// path = PUT /users/:id สำหรับการแก้ไข users รายคน (ตาม id ที่บันทึกเข้าไป)
app.put('/hotel_booking/:id', async (req, res) => {
  try {
    let id = req.params.id
    let updateUser = req.body
    const results = await conn.query(
      'UPDATE hotel_booking SET ? WHERE id = ?',
      [updateUser, id]
    )
    res.json({
      message: 'update ok',
      data: results[0]
    })
  } catch (error) {
    console.error('error message', error.message)
    res.status(500).json({
      message: 'something wrong'
    })
  }
})


// path DELETE /users/:id สำหรับการลบ users รายคน (ตาม id ที่บันทึกเข้าไป)
app.delete('/hotel_booking/:id', async (req, res) => {
  try {
    let id = req.params.id
    const results = await conn.query('DELETE from hotel_booking WHERE id = ?', parseInt(id))
    res.json({
      message: 'delete ok',
      data: results[0]
    })
  } catch (error) {
    console.error('error message', error.message)
    res.status(500).json({
      message: 'something wrong'
    })
  }
})

//กรองข้อมูล
app.post('/hotel_booking/Fitter', (req, res) => {
  const { beach, pet, disabled } = req.body;
  // ประมวลผลข้อมูลที่กรอง
  res.json({ success: true, filtered: true });
});

// เริ่ม server

    app.listen(port, (req,res) => {
      console.log(`Server is running at http://localhost:${port}`);
    });



