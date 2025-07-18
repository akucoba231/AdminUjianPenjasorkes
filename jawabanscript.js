   let url = "";
   let myapi = "";
   let url1 = "https://nlpdata-5393.restdb.io/rest/";
   const url2 = "https://nlpdata2-9d3f.restdb.io/rest/";
   const myapi1 = "684301ad72702c6cc4b3d7d2";
   const myapi2 = "6843f2e8e22293a1177497af";

   url = url1;
   myapi = myapi1;
   
   let temaUjian = []
   let lembarUjian = []
   let dataJawaban = []
   
   
   let namaUjian = document.getElementById('nama-ujian');
   let kodeUjian = document.getElementById('kode-ujian');
   let tombolExport = document.getElementById('export');
   
    // fungsi untuk mengambil data judul ujian
   let settings = {
    "async": true,
    "crossDomain": true,
    "url": url + "tema",
    "method": "GET",  
    "headers": {
      "content-type": "application/json",
      "x-apikey": `${myapi}`,
      "cache-control": "no-cache"
    }
  }

  function ambilTema(){

    $.ajax(settings).done(function (response) {
      temaUjian = response
            //console.log(response)
      setTimeout(()=>{

        ambilLembarUjian();
      }, 1000)

    })
    .fail(function(e){
     console.log(JSON.stringify(e))
     kodeUjian.textContent = JSON.stringify(e)
   });
  }

    // fungsi untuk mengambil lembar ujian
  let lembarSet = {
    "async": true,
    "crossDomain": true,
    "url": url + "lembarujian",
    "method": "GET",  
    "headers": {
      "content-type": "application/json",
      "x-apikey": `${myapi}`,
      "cache-control": "no-cache"
    }
  }

  function ambilLembarUjian(){

    $.ajax(lembarSet).done(function (response) {
      lembarUjian = response
           // console.log(response)
      setTimeout(()=>{
        ambilJawaban();
      }, 1000)
    })
    .fail(function(e){
     console.log(e.toString())
     kodeUjian.textContent = JSON.stringify(e)
   });
  }

    // fungsi untuk mengambil jawaban
  let jawabanSet = {
    "async": true,
    "crossDomain": true,
    "url": url + "jawaban",
    "method": "GET",  
    "headers": {
      "content-type": "application/json",
      "x-apikey": `${myapi}`,
      "cache-control": "no-cache"
    }
  }

  function ambilJawaban(){

    $.ajax(jawabanSet).done(function (response) {
      dataJawaban = response
           // console.log(response)
      getId();
    })
    .fail(function(e){
     console.log(e.toString())
     kodeUjian.textContent = JSON.stringify(e)
   });
  }

  function updateTable(id_tema){
  //console.log(temaUjian);
    let tmp = temaUjian.filter(item =>item.id == id_tema)
  temaUjian = tmp[0]; // ujian hanya 1
  lembarUjian = lembarUjian.filter(item=>item.id_tema == id_tema)
  
  if(lembarUjian.length <= 0){
    forbidden()
  }
  else {
    //do nothing
  }
  
  
  namaUjian.textContent = temaUjian.judul
  kodeUjian.textContent = temaUjian.token
  
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

    dataJawaban.forEach((coba)=>{
      if(coba['id_lembar_ujian'] == item.id_lembar_ujian){
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

function getId(){
  let tmp = window.location.href;
  tmp = tmp.split('?id_tema=');
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

      /*
        const dummyData = [
            {
                id: 1,
                tanggal: '2024-05-10',
                id_ujian: 'PJ001',
                nama_ujian: 'Atletik Dasar',
                nama_siswa: 'Budi Santoso',
                kelas: 'X A',
                absen: 5,
                total_score: 85,
                jawaban1: 0,
                jawaban2: 0,
                jawaban3: 0,
                jawaban4: 0,
                jawaban5: 0
            },
            {
                id: 2,
                tanggal: '2024-05-10',
                id_ujian: 'PJ002',
                nama_ujian: 'Senam Lantai',
                nama_siswa: 'Siti Aminah',
                kelas: 'X B',
                absen: 12,
                total_score: 90,
                jawaban1: 0,
                jawaban2: 0,
                jawaban3: 0,
                jawaban4: 0,
                jawaban5: 0
            },
            {
                id: 3,
                tanggal: '2024-05-11',
                id_ujian: 'PJ003',
                nama_ujian: 'Renang Gaya Bebas',
                nama_siswa: 'Rudi Hartono',
                kelas: 'XI C',
                absen: 7,
                total_score: 78,
                jawaban1: 0,
                jawaban2: 0,
                jawaban3: 0,
                jawaban4: 0,
                jawaban5: 0
            },
            {
                id: 4,
                tanggal: '2024-05-11',
                id_ujian: 'PJ004',
                nama_ujian: 'Permainan Bola Voli',
                nama_siswa: 'Dewi Lestari',
                kelas: 'XI D',
                absen: 20,
                total_score: 92,
                jawaban1: 0,
                jawaban2: 0,
                jawaban3: 0,
                jawaban4: 0,
                jawaban5: 0
            },
            {
                id: 5,
                tanggal: '2024-05-12',
                id_ujian: 'PJ005',
                nama_ujian: 'Kebugaran Jasmani',
                nama_siswa: 'Fajar Kurniawan',
                kelas: 'XII E',
                absen: 3,
                total_score: 88,
                jawaban1: 0,
                jawaban2: 0,
                jawaban3: 0,
                jawaban4: 0,
                jawaban5: 0
            }
        ];

        document.addEventListener('DOMContentLoaded', () => {
            const tableBody = document.querySelector('#dataTable tbody');

            function renderTable(data) {
                tableBody.innerHTML = '';
                data.forEach(rowData => {
                    const row = document.createElement('tr');
                    Object.keys(rowData).forEach(key => {
                        const cell = document.createElement('td');
                        cell.textContent = rowData[key];

                        if (key !== 'id') {
                            cell.setAttribute('contenteditable', 'true');
                        } else {
                            cell.classList.add('id-column');
                        }

                        cell.addEventListener('blur', (e) => {
                            const rowIndex = Array.from(row.parentNode.children).indexOf(row);
                            const colIndex = Array.from(e.target.parentNode.children).indexOf(e.target);
                            const columnKey = Object.keys(dummyData[rowIndex])[colIndex];
                            
                            // Update data di array dummyData
                            dummyData[rowIndex][columnKey] = e.target.textContent;
                            console.log(`Data updated: ${columnKey} di baris ${rowIndex} menjadi ${e.target.textContent}`);
                            console.log(dummyData[rowIndex]);
                        });
                        row.appendChild(cell);
                    });
                    tableBody.appendChild(row);
                });
            }

            renderTable(dummyData);
        });
        */

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
