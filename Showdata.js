// ดึงพารามิเตอร์จาก URL

const urlParams = new URLSearchParams(window.location.search);
const searchKeyword = urlParams.get('search');

// ฟังก์ชันกรองข้อมูล
function filterHotels(hotels,keyword){
  return hotels.filter(hotel =>
    hotel.location.toLowerCase() === keyword.toLowerCase()||
    (hotel.province && hotel.province.toLowerCase()=== keyword.toLowerCase())
  );
}
// เรียกฟังก์ชัน fetchHotelData เมื่อมี keyword ใน URL (โค้ดเดิม)
if(searchKeyword){
  fetchHotelData(searchKeyword);
}else{
  document.getElementById('resulte').innerHTML = "<p>กรุณากรอกคำค้นหา</p>"
}
// ฟังก์ชันดึงข้อมูลโรงแรม (โค้ดเดิม - แก้ไข URL เล็กน้อย)
async function fetchHotelData(keyword) {
try{

    const response = await fetch(`http://localhost:8000/hotel_booking`)
    const data = await response.json();
   // กรองข้อมูลเฉพาะจังหวัดที่ตรงกัน
const filteredData = filterHotels(data,keyword);

    if (filteredData.length === 0){
      document.getElementById('results').innerHTML = `
      <p>ไม่พบข้อมูลที่ต้องการ ${keyword}</p>
      <p>ข้อมูลที่มึ : ${[...new Set(data.map(h => h.location))].join(',')}</p>
      `;
    }else{
      displayResults(filteredData);

    }
    }catch(error){
      console.error("Error fetching data :" ,error);
      document.getElementById('results').innerHTML = `
      <p>เกิดข้อผิดพลาดในการโหลดข้อมูล</p>
      <p>${error.message}</p>
      `;


    }
  
}


// ฟังก์ชันแสดงผลข้อมูลโรงแรม
let allHotels = [];

function displayResults(hotels){

  const resultsContainer = document.getElementById("results")

  let html = '';

  hotels.forEach(hotel =>{
 
   

  html += `
  <div class="hotel-container">
     <div class="hotel-images">
      <h3>${hotel.name || 'ไม่ระบุชื่อ'}</h3>
     
       <img id="hotelimages"src="${hotel.images}" width="300" height="200">
     
     </div>
    <div class="hotel-card">
      <p id="ID">${hotel.id}</p>
      <p> ที่อยู่ : ${hotel.location || 'กรุณาระบุจังหวัด'}</p>
      <p> ราคา : ${hotel.price_per_night} บาท/คืน</p>
      <p> สิ่งอำนวยความสะดวก : ${hotel.amenities}</p>
       <p> ประเภทห้องพัก : ${hotel.rooms}</p>

       <p> รีวิวห้องพัก :${hotel.rating} </p>
 
       <a href="payment.html"><button id="BoogingRoom">จองที่พัก</button></a>
       <a href="index.html"><button id="cencel" type="reset">ยกเลิกการจอง</button></a>
    </div>

  </div>

  
  `;
 
});

resultsContainer.innerHTML = html;
return 
                                                                                                                                                             
}




//เมื่อ user คลิกจองแต่ละ่โรงแรม ปุ่มจะจับคู่ กับ id และส่งไปหน้า login เพื่อให้เข้าระบบการจอง


/*
=====ขออภัยส่วนนี้ขออนุญาตหาข้อมูลเพิ่มเติมเกี่ยวกับการกรองข้อมูลจะกลับมาแก้ไขคะ ===
//กำหนดราคา
const PriceRange = document.getElementById("range");





const BtnFilter = document.getElementById("Filter");
// ช่องเลือกกรองชายหาด
const BtnBeach = document.getElementById("Beach");
const BtnHotelFitter = document.getElementById("H-Fitter");


// เพิ่ม Event Listener ให้กับปุ่ม Filter
BtnFilter.addEventListener("click", () => {
  if (BtnBeach.checked) {
    const beachHotels = allHotels.filter(hotel => hotel.Fitter === "ติดชายทะเล")

    displayResults(beachHotels);
  } else {
    const message = "ไม่พบข้อมูล"
   alert(message)
  }
});
*/