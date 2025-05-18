const showForm = (formId) => {
    document.querySelectorAll(".form").forEach(form => {
        form.classList.add("hidden");
    });
    document.getElementById(formId).classList.remove("hidden");
}

//const { error } = require("better-auth/api");
/*
function showForm(formId){
    const allForms = document.querySelectorAll('.navbarSearch');
    allForms.forEach(form =>{
        form.computedStyleMap.display='none';
    });

    const formToShow = document.getElementById(formId);
    if(formToShow){
        formToShow.style.display = 'block'
    }
}*/

// ฟังก์ชันจัดรูปแบบวันที่
const formatDate = (dateStr) => {
    if (!dateStr) return "ไม่ระบุ";
    const [year, month, day] = dateStr.split("-");
    return `${parseInt(day)}/${parseInt(month)}/${year}`;
}

const msgErr = () => {
    const locationInput = document.getElementById("locationInput").value.trim();
    const checkInDate = document.getElementById('checkInDate').value.trim();
    const checkOutDate = document.getElementById('checkOutDate').value.trim();
    const guests = document.getElementById('guests').value.trim();

    let errors = [];

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

const btnSearch = () => {
     
    const errors = msgErr();
    
    if (errors.length > 0) {
        alert(errors.join("\n")); // 
        return error; // หยุดการทำงาน
    }else{

    // ถ้าข้อมูลครบ แสดงผลลัพธ์ในคอนโซล
    const locationInput = document.getElementById("locationInput").value.trim();
    const checkInDate = document.getElementById('checkInDate').value.trim();
    const checkOutDate = document.getElementById('checkOutDate').value.trim();
    const guests = document.getElementById('guests').value.trim();
    
    console.log(`ค้นหา: ${locationInput}, วันที่เช็คอิน: ${formatDate(checkInDate)}, วันที่เช็คเอ้าท์: ${formatDate(checkOutDate)}, จำนวนผู้เข้าพัก: ${guests} ท่าน`);
    
    return true;

    }
};

   document.getElementById("btnSearch").addEventListener("click", async () => {
  const locationInput = document.getElementById("locationInput");
  const keyword =locationInput.value.trim();
  
  
  if (!keyword) {
    alert("กรุณากรอกชื่อจังหวัด");
    return;
  }

  try {
    // ส่งคำค้นหาไปยังหน้า Showdata.html
    window.location.href = `Showdata.html?search=${encodeURIComponent(keyword)}&exactMatch=true`;
    
 
  } catch (error) {
    console.error("Error:", error);
    alert("เกิดข้อผิดพลาดในการค้นหา");
  }
});



