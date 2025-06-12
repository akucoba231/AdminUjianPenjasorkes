   let url = "";
    let myapi = "";
    const url1 = "https://nlpdata-5393.restdb.io/rest/";
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
  
  let headerRow = document.createElement('tr');
  

  
  let rowTitle = Object.keys(lembarUjian[0])
  
  rowTitle.forEach((item)=>{
    if(item == "_id" || item == "id_lembar_ujian" || item == "id_tema"){
      //not doing anything
    }
    else{
    let th = document.createElement("th")
    th.textContent = item
    headerRow.appendChild(th);
    }
  })
  
  for(let i = 1; i < 6; i++){
    let th = document.createElement("th")
    th.textContent = "Jawaban " + i
    headerRow.appendChild(th);
  }
  
  tableHead.appendChild(headerRow)
  
  lembarUjian.forEach((item)=>{
    //untuk inisialisasi row
    let tr = document.createElement('tr')
    Object.keys(item).forEach((key)=>{
      if(key == "_id" || key == "id_lembar_ujian" || key == "id_tema"){
      // not doing anything
    }
    else{
      let td = document.createElement('td')
      
      td.textContent = item[key]
      tr.appendChild(td)
    }
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
  window.history.back();
}

