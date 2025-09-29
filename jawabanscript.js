console.log("Data berasal dari 2 server 4");
   let url = "";
   let myapi = "";
   let url1 = "https://nlpdata-5393.restdb.io/rest/";
   const url2 = "https://nlpdata2-9d3f.restdb.io/rest/";
   const url3 = "https://ujianpenjas2.my.id/aplikasi-slim/public/";
   const url4 = "https://ujianpenjas.my.id/aplikasi-slim/public/";
   const myapi1 = "684301ad72702c6cc4b3d7d2";
   const myapi2 = "6843f2e8e22293a1177497af";

   let search = {
      "token" : getToken(),
   }

   url = url3;
   myapi = myapi1;
   
   let temaUjian = []
   let lembarUjian = []
   let dataJawaban = []
   
   let temaUjian2 = []
   let lembarUjian2 = []
   let dataJawaban2 = []


   let namaUjian = document.getElementById('nama-ujian');
   let kodeUjian = document.getElementById('kode-ujian');
   let tombolExport = document.getElementById('export');
   
    // fungsi untuk mengambil data judul ujian

   
  function ambilTema(){

   let settings = {
    "async": true,
    "crossDomain": true,
    "url": url + "tema" + getFilter(search),
    "method": "GET",  
    "headers": {
      "content-type": "application/json",
      "x-apikey": `${myapi}`,
      "cache-control": "no-cache"
    }
  }

    $.ajax(settings).done(function (response) {
      temaUjian = response[0] //response sekarang hanya array 1 data
      console.log(temaUjian)
      setTimeout(()=>{
         //ambilTema2();
        //ambilLembarUjian();
      }, 1000)

    })
    .fail(function(e){
     console.log(JSON.stringify(e))
     kodeUjian.textContent = JSON.stringify(e)
   });
  }

// ambil tema server2
 function ambilTema2(){
   let settings2 = {
    "async": true,
    "crossDomain": true,
    "url": url4 + "tema" + getFilter(search),
    "method": "GET",  
    "headers": {
      "content-type": "application/json",
      "x-apikey": `${myapi}`,
      "cache-control": "no-cache"
    }
  }
    
    $.ajax(settings2).done(function (response) {
      temaUjian2 = response[0] ////response sekarang hanya array 1 data
            //console.log(response)
      setTimeout(()=>{
         //ambilTema2();
         ambilLembarUjian();
      }, 1000)

    })
    .fail(function(e){
     console.log(JSON.stringify(e))
     kodeUjian.textContent = JSON.stringify(e)
   });
    
 }

    // fungsi untuk mengambil lembar ujian

  function ambilLembarUjian(){

  let filterUjian = {
     "id_tema" : temaUjian.id,
  }
  let lembarSet = {
    "async": true,
    "crossDomain": true,
    "url": url + "lembarujian" + getFilter(filterUjian),
    "method": "GET",  
    "headers": {
      "content-type": "application/json",
      "x-apikey": `${myapi}`,
      "cache-control": "no-cache"
    }
  }

    $.ajax(lembarSet).done(function (response) {
      lembarUjian = response
           // console.log(response)
      setTimeout(()=>{
         ambilLembarUjian2();
        //ambilJawaban();
      }, 1000)
    })
    .fail(function(e){
     console.log(e.toString())
     kodeUjian.textContent = JSON.stringify(e)
   });
  }

// ambil lembar ujian server2
  function ambilLembarUjian2(){
     let filterUjian2 = {
        "id_tema" : temaUjian2.id,
     }
     let lembarSet2 = {
    "async": true,
    "crossDomain": true,
    "url": url4 + "lembarujian" + getFilter(filterUjian2),
    "method": "GET",  
    "headers": {
      "content-type": "application/json",
      "x-apikey": `${myapi}`,
      "cache-control": "no-cache"
    }
  }

    $.ajax(lembarSet2).done(function (response) {
      lembarUjian2 = response
           // console.log(response)
      setTimeout(()=>{
         //ambilLembarUjian2();
         ambilJawaban();
      }, 1000)
    })
    .fail(function(e){
     console.log(e.toString())
     kodeUjian.textContent = JSON.stringify(e)
   });
  }

    // fungsi untuk mengambil jawaban
  function ambilJawaban(){


let filterJawaban = {
     "id_tema" : temaUjian.id
   }
  let jawabanSet = {
    "async": true,
    "crossDomain": true,
    "url": url + "jawaban" + getFilter(filterJawaban),
    "method": "GET",  
    "headers": {
      "content-type": "application/json",
      "x-apikey": `${myapi}`,
      "cache-control": "no-cache"
    }
  }


    $.ajax(jawabanSet).done(function (response) {
      dataJawaban = response
           // console.log(response)
       setTimeout(()=>{
          ambilJawaban2();
         //getId(); 
       }, 1500
       )
    })
    .fail(function(e){
     console.log(e.toString())
     kodeUjian.textContent = JSON.stringify(e)
   });
  }

// ambil jawaban server2
function ambilJawaban2(){

  let filterJawaban2 = {
     "id_tema" : temaUjian2.id
   }
  let jawabanSet2 = {
    "async": true,
    "crossDomain": true,
    "url": url4 + "jawaban" + getFilter(filterJawaban2),
    "method": "GET",  
    "headers": {
      "content-type": "application/json",
      "x-apikey": `${myapi}`,
      "cache-control": "no-cache"
    }
  }

    $.ajax(jawabanSet2).done(function (response) {
      dataJawaban2 = response
           // console.log(response)
       setTimeout(()=>{
          //ambilJawaban2();
         getId(); 
       }, 500
       )
    })
    .fail(function(e){
     console.log(e.toString())
     kodeUjian.textContent = JSON.stringify(e)
   });
  }



  function updateTable(token_tema){
  //console.log(temaUjian);
  //let tmp = temaUjian.filter(item =>item.token == token_tema);
  //temaUjian = tmp[0]; // ujian hanya 1 //update sudah bukan array
  //lembarUjian = lembarUjian.filter(item=>item.id_tema == temaUjian.id);
  // karena data temaUjian dan temaUjian2 sudah bukan array, lanjut ke sesi selanjutnya
  // server utama
  lembarUjian = lembarUjian.filter(item=>item.id_tema == temaUjian.id);
  // server 2
  lembarUjian2 = lembarUjian2.filter(item=>item.id_tema == temaUjian2.id);
  // penyatuan semua data
  let allLembarUjian = mergeUnique(lembarUjian, lembarUjian2); //lihat fungsi mergeUnique
  let allDataJawaban = mergeUnique(dataJawaban, dataJawaban2);
   
  console.log(allLembarUjian);
     
  namaUjian.textContent = temaUjian.judul
  kodeUjian.textContent = temaUjian.token

  
  if(allLembarUjian.length <= 0){ //data semua ujian
    forbidden()
  }
  else {
    //do nothing

    let tableHead = document.querySelector('#dataTable thead');
    let tableBody = document.querySelector('#dataTable tbody');
  //console.log(tableHead)
    tableHead.innerHTML = ""
    tableBody.innerHTML = ""

  // untuk menambahkan judul ujian ke file

    let titleRow = document.createElement('tr');
    let titleTable = document.createElement('td');
    titleTable.textContent = temaUjian.judul;
    titleTable.setAttribute("colspan","19");
    titleRow.appendChild(titleTable);
    tableHead.appendChild(titleRow);

    for(let j = 0; j < 4; j++){
      let emptyRow = document.createElement('tr');
      let emptyCell = document.createElement('td');
      emptyRow.appendChild(emptyCell)

      tableHead.appendChild(emptyRow);
    }



  // untuk menambahkan thead
    let headerRow = document.createElement('tr');

  let rowTitle = ["nomor","tanggal","nama","kelas","absen","asalsekolah","email","total_score","judul_tema"] //Object.keys(lembarUjian[lembarUjian.length-1]);
  
  rowTitle.forEach((item)=>{
    if(item == "total_score" || item == "judul_tema"){
      if(item == "total_score"){
        item = "Total Nilai";
      }
      else {
        item = "Judul Ujian"
      }
    }
    else {
      item = ucfirst(item);
    } 

    let th = document.createElement("th")
    th.textContent = item
    headerRow.appendChild(th);

  })
  
  for(let i = 1; i < 11; i++){
    let th = document.createElement("th")
    th.textContent = "Jawaban " + i
    headerRow.appendChild(th);
  }
  
  tableHead.appendChild(headerRow)
  


  // untuk menambahkan tbody
  lembarUjian.forEach((item, index)=>{
    //untuk inisialisasi row
    let tr = document.createElement('tr')

    rowTitle.forEach((key)=>{
      let td = document.createElement('td')
      if(item[key] == undefined){
        if(key == "nomor"){
          td.textContent = index+1;
        }
        else{
          td.textContent = null;
        }
      }
      else{
        td.textContent = item[key]
      }
      tr.appendChild(td)

    })
    
    
   //untuk mendapatkan semua jawaban siswa ini
    let jawabanSiswaIni = []

    allDataJawaban.forEach((coba)=>{
      if(coba['id_lembar_ujian'] == item._id){
        //console.log(true)
        jawabanSiswaIni.push(coba)
        let tdJawaban = document.createElement('td');
        tdJawaban.textContent = coba['jawaban'];
        tr.appendChild(tdJawaban);
      }
    })
    //console.log(item.id_lembar_ujian)
    //console.log("batas")
    //console.log(jawabanSiswaIni)

    
    tableBody.appendChild(tr)
  })

}



}

function getId(){
  let tmp = window.location.href;
  tmp = tmp.split('?token=');
  if(tmp.length > 1){
    updateTable(tmp[1])
  }
  else{
    //updateTable(25)
    forbidden()
  }
}

ambilTema()

function forbidden(){
  alert("Mohon maaf data lembar ujian atau data jawaban tidak ditemukan.");
  tombolExport.textContent = "Data jawaban belum ada";
  tombolExport.setAttribute('disabled','');
  tombolExport.style.background = "#999";
  //window.history.back();
}

function ucfirst(text){
  let tmp = text.split('');
  tmp[0] = tmp[0].toUpperCase();
  return tmp.join("");
}

        // Fungsi untuk export ke XLSX
function exportToXLSX() {
            /* Ambil data dari tabel HTML */
  const table = document.getElementById('dataTable');
  const ws = XLSX.utils.table_to_sheet(table);

            /* Buat workbook baru */
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Data Ujian");

            /* Tulis file XLSX */
  XLSX.writeFile(wb, "Data_Jawaban_Ujian_Penjaskorkes_" + temaUjian.token + "_" + thisTime() + ".xlsx");
}


function thisTime(){
  let ts = new Date();
  let tsMonth = ts.getMonth()+1;
  tsMonth = tsMonth.toString();
  tsMonth = tsMonth.length > 1 ? tsMonth : `0${tsMonth}`;
  let tsDate = ts.getDate()
  tsDate = tsDate.toString().length > 1 ? tsDate : `0${tsDate}`;

  let timestamp = ts.getFullYear() + '-' + tsMonth + '-' + tsDate; //+ ' ' + ts.getHours() + ':' + ts.getMinutes() + ':' + ts.getSeconds();
  
  return timestamp;
}

// fungsi tambahan untuk mengurangi beban server
function getFilter(obj = {}){
    let search = obj;
    // search["id_tema"] = ujian.id

    // if(email == ""){
    //     search["nama"] = nama;
    // }
    // else {
    //     search["email"] = email;
    // }

    search = JSON.stringify(search).replace(/\\"/g,'');
    let tmp = search;
    //if(slimFr == true){
        search = "/?q=" + tmp;
    /*}
    else {
        search = "?q=" + tmp;
    }*/
    return search; // string
    
}


function getToken(){   
  let tmp = window.location.href;
  tmp = tmp.split('?token=');
  if(tmp.length > 1){
    return tmp;
  }
  else{
    //updateTable(25)
    //forbidden()
     alert('Token tidak ditemukan.');
     forbidden();
  }
}

function mergeUnique(arr1, arr2) {
  return Array.from(
    new Map(
      [...arr1, ...arr2].map(obj => [JSON.stringify(obj), obj])
    ).values()
  );
}
