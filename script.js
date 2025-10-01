//alert("server baru sedang diproses");
function share(token){
    alert(window.location.href + "?token=" + token)
 }



$(document).ready(function() {
    let url = "";
    let myapi = "";
    const url1 = "https://nlpdata-5393.restdb.io/rest/";
    const url2 = "https://nlpdata2-9d3f.restdb.io/rest/";
    const myapi1 = "684301ad72702c6cc4b3d7d2";
    const myapi2 = "6843f2e8e22293a1177497af";
    const url3 = "https://ujianpenjas2.my.id/aplikasi-slim/public/";

    url = url3;
    myapi = myapi1;
    
    // Sample data (tetap di sini agar DataTables bisa diinisialisasi dengan struktur data awal)
    let soalData = [];
    let jawabanData = [];
    let temaUjian = [];

    // Variabel untuk DataTables
    let soalTable, soalRealTable, jawabanTable;

    // Inisialisasi DataTables
    function initDataTables() {
        // Hancurkan DataTables jika sudah diinisialisasi sebelumnya untuk menghindari duplikasi
        if ($.fn.DataTable.isDataTable('#soal-table')) {
            $('#soal-table').DataTable().destroy();
        }
        if ($.fn.DataTable.isDataTable('#soal-real-table')) {
            $('#soal-real-table').DataTable().destroy();
        }
        if ($.fn.DataTable.isDataTable('#jawaban-table')) {
            $('#jawaban-table').DataTable().destroy();
        }

        // Inisialisasi baru
        soalTable = $('#soal-table').DataTable({
            responsive: true,
            scrollX: true,
            autoWidth: false,
            dom: '<"top"lf>rt<"bottom"ip>',
            data: temaUjian, // Menggunakan temaUjian sebagai data awal
            columns: [
                { data: 'id' },
                { data: 'tanggal' },
                { data: 'token' },
                { data: 'judul' },
                { data: 'deskripsi' },
                { 
                    data: null,
                    render: function(data, type, row) {
                        return `
                            <button class="btn-action btn-look" data-id="${row.id}" data-judul="${row.judul}" data-tokentema="${row.token}"><i class="fas fa-eye"></i> Lihat</button>
                            <button class="btn-action btn-edit" data-id="${row.id}" data-judul="${row.judul}"><i class="fas fa-edit"></i> Ubah</button>
                            <button class="btn-action btn-share" onclick="share('${row.token}')"><i class="fas fa-share"></i> Rilis</button>
                            <button class="btn-action btn-delete" data-id="${row.id}" data-api="${row._id}"><i class="fas fa-trash"></i> Hapus</button>
                        `;
                    }
                }
            ],
            language: {
                search: "Cari:",
                lengthMenu: "Tampilkan _MENU_ data per halaman",
                info: "Menampilkan _START_ sampai _END_ dari _TOTAL_ data",
                paginate: {
                    first: "Pertama",
                    last: "Terakhir",
                    next: "Selanjutnya",
                    previous: "Sebelumnya"
                }
            }
        });

        // 21/06/2025 14:00 Table Soal dari Ujian dinonaktifkan
        /*
        soalRealTable = $('#soal-real-table').DataTable({
            responsive: true,
            scrollX: true,
            autoWidth: false,
            dom: '<"top"lf>rt<"bottom"ip>',
            data: soalData, // Menggunakan soalData sebagai data awal
            columns: [
                { data: 'id' },
                { data: 'judul_soal' },
                { data: 'rincian' },
                { data: 'ideal' },
                { data: 'keyword' },
                { data: 'saran' },
                { data: 'nasihat' },
                { 
                    data: null,
                    render: function(data, type, row) {
                        return `
                            <button class="btn-action btn-edit" data-id="${row.id}"><i class="fas fa-edit"></i> Ubah</button>
                            <button class="btn-action btn-delete" data-id="${row.id_tema}" data-api="${row._id}"><i class="fas fa-trash"></i> Hapus</button>
                        `;
                    }
                }
            ],
            order: [[1, 'desc']],
            language: {
                search: "Cari:",
                lengthMenu: "Tampilkan _MENU_ data per halaman",
                info: "Menampilkan _START_ sampai _END_ dari _TOTAL_ data",
                paginate: {
                    first: "Pertama",
                    last: "Terakhir",
                    next: "Selanjutnya",
                    previous: "Sebelumnya"
                }
            }
        });
        */

        /*
        soalRealTable.on('order.dt search.dt', function () {
            soalRealTable.column(0, {search:'applied', order:'applied'}).nodes().each(function (cell, i) {
                cell.innerHTML = i+1;
            });
        }).draw();
        */

        jawabanTable = $('#jawaban-table').DataTable({
            responsive: true,
            scrollX: true,
            autoWidth: false,
            dom: '<"top"lf>rt<"bottom"ip>',
            data: jawabanData, // Menggunakan jawabapnData sebagai data awal
            columns: [
                { data: 'nomor' },
                { data: 'nama' },
                { data: 'jawaban' },
                { data: 'nilai' },
                { 
                    data: null,
                    render: function(data, type, row) {
                        return `
                            <button class="btn-action btn-edit" data-id="${row.nomor}"><i class="fas fa-edit"></i> Ubah</button>
                            <button class="btn-action btn-delete" data-id="${row.nomor}"><i class="fas fa-trash"></i> Hapus</button>
                        `;
                    }
                }
            ],
            language: {
                search: "Cari:",
                lengthMenu: "Tampilkan _MENU_ data per halaman",
                info: "Menampilkan _START_ sampai _END_ dari _TOTAL_ data",
                paginate: {
                    first: "Pertama",
                    last: "Terakhir",
                    next: "Selanjutnya",
                    previous: "Sebelumnya"
                }
            }
        });

        // Update nomor urut
        soalTable.on('order.dt search.dt', function () {
            soalTable.column(0, {search:'applied', order:'applied'}).nodes().each(function (cell, i) {
                cell.innerHTML = i+1;
            });
        }).draw();

        
        jawabanTable.on('order.dt search.dt', function () { // Tambahkan untuk jawabanTable
            jawabanTable.column(0, {search:'applied', order:'applied'}).nodes().each(function (cell, i) {
                cell.innerHTML = i+1;
            });
        }).draw();
    }

    // Panggil inisialisasi pertama kali
    initDataTables();

    // Fungsi untuk refresh DataTables (panggil ini setelah operasi CRUD)
    function refreshDataTables() {
        initDataTables();
    }

    // Update dashboard stats
    function updateStats() {
        $('#total-soal').text(temaUjian.length); // Menggunakan temaUjian.length untuk total soal
        $('#total-jawaban').text(jawabanData.length);
        
        const totalNilai = jawabanData.reduce((sum, item) => sum + parseFloat(item.total_score), 0);
        console.log("Total Nilai : " + totalNilai);
        console.log(jawabanData)
        const rataNilai = jawabanData.length > 0 ? (totalNilai / jawabanData.length).toFixed(2) : 0;
        $('#rata-nilai').text(rataNilai);
    }

    updateStats();

    // Menu navigation
    $('.menu li').click(function() {
        $('.menu li').removeClass('active');
        $(this).addClass('active');
        
        const page = $(this).data('page');
        $('.page').removeClass('active');
        $(`#${page}-page`).addClass('active');

        // Pastikan DataTables di-refresh saat navigasi
        if (page === 'soal') {
            soalTable.clear().rows.add(temaUjian).draw();
        } else if (page === 'jawaban') {
            jawabanTable.clear().rows.add(jawabanData).draw();
        }
        updateFABVisibility();
    });

    // fungsi untuk kembali
    $('#back').click(function(){
        $('.menu li').removeClass('active');
        //$(this).addClass('active'); // ini mungkin tidak perlu jika tujuannya hanya kembali ke halaman soal
        
        $('.page').removeClass('active');
        $(`#soal-page`).addClass('active');
        soalTable.clear().rows.add(temaUjian).draw(); // Refresh soalTable saat kembali
        updateFABVisibility();
    });

    // Modal functionality
    const soalModal = $('#soal-modal');
    const jawabanModal = $('#jawaban-modal');
    const soalRealModal = $('#soal-real-modal');
    const updateSoalRealModal = $('#update-soal-real-modal');
    const updateUjian = $('#update-soal-modal');

    let batalTambahUjian = document.getElementById('batal-tambah-ujian');
    let batalTambahSoal = document.getElementById('batal-tambah-soal');

    batalTambahUjian.onclick = (e) =>{
        e.preventDefault();

        soalModal.hide();
    }

    batalTambahSoal.onclick = (e) => {
        e.preventDefault();
        soalRealModal.hide();
    }

    // untuk membuka modal ujian (ujian memiliki beberapa soal)
    $('#tambah-soal').click(function() {
        // Reset form sebelum menampilkan modal
        $('#soal-form')[0].reset(); 
        soalModal.show();
    });

    // untuk membuka modal soal
    $('#tambah-soal-real').click(function() {
        // Reset form sebelum menampilkan modal
        $('#soal-real-form')[0].reset();
        soalRealModal.show();
        $('#modal-custom').scrollTop(0);   // Scroll ke atas
    });

    // belum dan tidak dipakai
    $('#tambah-jawaban').click(function() {
        // Reset form sebelum menampilkan modal
        $('#jawaban-form')[0].reset();
        jawabanModal.show();
    });

    // untuk menutup semua modal
    $('.close').click(function() {
        soalModal.hide();
        jawabanModal.hide();
        soalRealModal.hide();
        updateSoalRealModal.hide();
        updateUjian.hide()
    });

    // untuk menutup modal
    $(window).click(function(event) {
        if (event.target === soalModal[0]) {
            soalModal.hide();
        }
        if (event.target === jawabanModal[0]) {
            jawabanModal.hide();
        }
        if (event.target === soalRealModal[0]) {
            soalRealModal.hide();
        }
        if (event.target === updateSoalRealModal[0]) {
            updateSoalRealModal.hide();
        }
        if (event.target === updateUjian[0]) {
            updateUjian.hide();
        }
    });

    // Form submission
    $('#soal-form').submit(function(e) {
        e.preventDefault();
        
        let data = {
            id : 0, // ID akan di-generate oleh database
            tanggal: $('#tanggal').val(),
            judul : $('#soal-text').val(),
            deskripsi : $('#jawaban-ideal').val(), // Disini deskripsi adalah jawaban ideal, sesuai dengan penamaan sebelumnya
            token : $("#token").val(),
            status : "Tidak Aktif",
            
        };
        data["banner"] = "";

        buatTema(data); // Panggil fungsi buatTema
        soalModal.hide();
    });

    // Form submission
    $('#soal-real-form').submit(function(e) {
        e.preventDefault();
        
        let data = {
            id : 0, // ID akan di-generate oleh database
            id_tema : $('#id-tema').val(),
            judul_soal : $('#judul-soal').val(),
            rincian : $('#rincian').val(),
            ideal : $('#ideal').val(),
            keyword : $('#keyword').val(),
            saran : $('#saran').val(),
            nasihat : $('#nasihat').val(),
            cukup : $('#cukup').val(),
        };

        buatSoal(data); // Panggil fungsi buatSoal
        soalRealModal.hide();
    });

    $('#jawaban-form').submit(function(e) {
        e.preventDefault();
        
        const newJawaban = {
            nomor: jawabanData.length + 1, // Nomor sementara, bisa di-generate dari database
            nama: $('#nama-peserta').val(),
            jawaban: $('#jawaban-peserta').val(),
            nilai: parseInt($('#nilai-peserta').val())
        };
        
        jawabanData.push(newJawaban);
        jawabanTable.row.add(newJawaban).draw(); // Tambahkan langsung ke tabel
        
        $('#nama-peserta').val('');
        $('#jawaban-peserta').val('');
        $('#nilai-peserta').val('');
        
        jawabanModal.hide();
        updateStats();
    });

    // Edit and delete functionality
    $(document).on('click', '.btn-delete', function() {
        const id = $(this).data('id'); // Ini adalah 'id' lokal (contoh: nomor urut di tabel)
        const _id = $(this).data('api'); // Ini adalah '_id' dari restDB
        const tableId = $(this).closest('table').attr('id');
        
        if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
            if (tableId === 'soal-table') {
                temaDel(_id); // Panggil fungsi penghapusan tema dengan _id dari restDB
            } else if (tableId === 'soal-real-table') {
                const idTema = $(this).data('id'); // Ambil id_tema dari tombol
                soalDel(_id, idTema); // Panggil fungsi penghapusan soal dengan _id dan id_tema
            } else if (tableId === 'jawaban-table') {
                jawabanData = jawabanData.filter(item => item.nomor !== id);
                jawabanTable.clear().rows.add(jawabanData).draw();
                updateStats();
            }
        }
    });

    // Edit functionality would be similar but with a modal to edit existing data
    $(document).on('click', '.btn-edit', function() {
        alert('Fitur edit akan diimplementasikan di sini');
    });

    //fungsi filter pada table daftar soal
    function ambilSoalWhere(id_tema,token_tema){
        // Filter data soalData berdasarkan id_tema yang diberikan
        const filteredSoal = soalData.filter(item => item.id_tema == id_tema); //array
        //soalRealTable.clear().rows.add(filteredSoal).draw();

        //new function
        let cardSoal = $('.card-soal')[0];
        createListSoal(cardSoal, filteredSoal);
        buka(token_tema);
    }


    //23/06/2025
    //untuk data ujian yang dilihat
    let descUjian = {};
    // untuk banner
    descUjian['banner'] = "";
    // menampilkan soal per ujian
    $(document).on('click', '.btn-look', function() {
        $('.page').removeClass('active');
        $('#soal-real').addClass('active');
        const judulUjian = $(this).data('judul');
        const idTema = $(this).data('id');
        const token_tema = $(this).data('tokentema');
        //alert(JSON.stringify(token_tema));
        //alert(idTema);
        descUjian = flashData(idTema);
        opsiUjian();
        if(descUjian.banner.length > 5){
            previewBanner(descUjian.banner);
        }
        else {
            previewBanner("")
        }
        $('#id-tema').val(idTema); // Set id_tema ke input hidden di form soal real
        ambilSoalWhere(idTema, token_tema);
        updateFABVisibility(); // Perbarui visibilitas FAB setelah navigasi
    });

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
        loadscreen();
        $.ajax(settings).done(function (response) {
            console.log(response)
            temaUjian = response;
            soalTable.clear().rows.add(temaUjian).draw(); // Update DataTable setelah data diambil
            updateStats(); // Perbarui statistik setelah data tema diperbarui
            loadscreen();
        })
        .fail(function(e){
            $('#err-msg').text(JSON.stringify(e));
            loadscreen();
        });
    }

    // untuk memuat ulang ujian setelah update
    function ambilTemaUpdate(){
        loadscreen();
        $.ajax(settings).done(function (response) {
            temaUjian = response;
            let tmp = flashData(descUjian.id);
            descUjian = tmp;
            opsiUjian();
            loadscreen();
        })
        .fail(function(e){
            $('#err-msg').text(JSON.stringify(e));
            loadscreen();
        });
    }
    
    // fungsi untuk mengambil data soal
    let soalSet = {
      "async": true,
      "crossDomain": true,
      "url": url + "soal",
      "method": "GET",  
      "headers": {
            "content-type": "application/json",
            "x-apikey": `${myapi}`,
            "cache-control": "no-cache"
      }
    }

    function ambilSoal(){
        loadscreen();
        $.ajax(soalSet).done(function (response) {
            soalData = response;
            // soalRealTable.clear().rows.add(soalData).draw(); // Jangan langsung draw semua soal di sini, karena sudah ada filter ambilSoalWhere
            loadscreen();
            console.log("data update!");
        })
        .fail(function(e){
            $('#err-msg').text(JSON.stringify(e));
            loadscreen();
        });
    }

    // fungsi untuk membuat data ujian
    function buatTema(data){
        let buatTemaSet = {
            "async": true,
            "crossDomain": true,
            "url": url + "tema",
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "x-apikey": `${myapi}`,
                "cache-control": "no-cache"
            },
            "processData": false,
            "data": JSON.stringify(data)
        }

        loadscreen();
        $.ajax(buatTemaSet).done(function (response) {
            console.log(response);
            ambilTema(); // Panggil ambilTema untuk me-refresh data dan tabel
            loadscreen();
        });
    }

    // fungsi untuk membuat data soal
    function buatSoal(data){
        let buatSoalSet = {
            "async": true,
            "crossDomain": true,
            "url": url + "soal",
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "x-apikey": `${myapi}`,
                "cache-control": "no-cache"
            },
            "processData": false,
            "data": JSON.stringify(data)
        }

        loadscreen();
        $.ajax(buatSoalSet).done(function (response) {
            console.log(response);
            ambilSoal(); // Refresh data soalData
            // Setelah membuat soal baru, filter dan tampilkan soal yang relevan
            const idTema = $('#id-tema').val();
            
            if (idTema) {
                // Beri sedikit delay untuk memastikan 'soalData' sudah terupdate dari 'ambilSoal()'
                  loadscreen()
                setTimeout(() =>{
                  ambilSoalWhere(idTema)
                  loadscreen()
                }, 1200); 
            }
            loadscreen();
        });
    }

    // fungsi untuk menghapus tema
    function temaDel(_id){
        var temaDelSet = {
            "async": true,
            "crossDomain": true,
            "url": url + "tema/"+ _id,
            "method": "DELETE",
            "headers": {
                "content-type": "application/json",
                "x-apikey": myapi,
                "cache-control": "no-cache"
            }
        }
        loadscreen();
        $.ajax(temaDelSet).done(function (response) {
            console.log(response);
            ambilTema(); // Panggil ambilTema untuk me-refresh data dan tabel
            loadscreen();
        });
    }

    // untuk hapus soal
    function soalDel(_id, id_tema_for_filter){
        let settings = {
            "async": true,
            "crossDomain": true,
            "url": url + "soal/" + _id,
            "method": "DELETE",
            "headers": {
                "content-type": "application/json",
                "x-apikey": myapi,
                "cache-control": "no-cache"
            }
        }
        loadscreen();
        $.ajax(settings).done(function (response) {
            console.log(response);
            ambilSoal(); // Refresh data soalData
            // Setelah menghapus soal, filter dan tampilkan soal yang relevan
            /*setTimeout(() => ambilSoalWhere(id_tema_for_filter), 1000);*/
            soalData = soalData.filter(item=>item._id != _id)
            ambilSoalWhere(id_tema_for_filter)
            loadscreen();
        });
    }

    // fungsi loadscreen
    function loadscreen(){
        let ls = $('#loadscreen');
        if(ls.hasClass('ls-active')){
            ls.removeClass('ls-active');
            ls.addClass('ls-gone');
        }
        else {
            ls.removeClass('ls-gone');
            ls.addClass('ls-active');
        }
    }
    
    // Fungsi untuk menampilkan/menyembunyikan FAB
    function updateFABVisibility() {
      
        $('.fab').hide();
        const activePage = $('.page.active').attr('id'); // Ambil id halaman yang aktif
        
        if (activePage === 'soal-page') {
            $('#tambah-soal').show();
        } else if (activePage === 'jawaban-page') {
            $('#tambah-jawaban').show();
        } else if (activePage === 'soal-real') {
            $('#tambah-soal-real').show();
        }
        
    }

    // Inisialisasi awal
    updateFABVisibility();
    
    // Panggil fungsi pengambilan data saat pertama kali halaman dimuat
    ambilTema();
    function hold(){
    if(temaUjian.length <= 0){
    setTimeout(()=>{
      hold()
      },1000);
    }
    else{
      ambilSoal();
      setTimeout(()=>{
        lembarUjian();
      }, 1200);
    }
    }
    hold()
    
    
    // fungsi untuk mengambil lembar jawaban ujian
    let lembarsettings = {
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

    function lembarUjian(){
        loadscreen();
        $.ajax(lembarsettings).done(function (response) {
            jawabanData = response;
            //console.log(response);
            updateStats(); // Perbarui statistik setelah data tema diperbarui
            loadscreen();
        })
        .fail(function(e){
            $('#err-msg').text(JSON.stringify(e));
            loadscreen();
        });
    }
    
    // fungsi untuk membuka halaman jawaban
    function buka(token_tema){
      let cekUrl = window.location.href;
      if(cekUrl.includes('index.html')){
        cekUrl = cekUrl + "index.html";
      }
      let base = window.location.href.split("index.html")[0]
      let halamanJawaban = document.getElementById("halaman-jawaban");
      //console.log(halamanJawaban)
      
      halamanJawaban.setAttribute('data-to', token_tema);
    
    //console.log(halamanJawaban)
    
      halamanJawaban.onclick = (e)=>{
        return confirm("Anda akan dialihkan ke halaman jawaban, lanjutkan ?") ? window.open(base + "jawaban.html?token=" + token_tema) : "";
      }
    
    }

    // untuk tampilan soal, setelah halaman di hapus banner bisa hilang
    // ini untuk backup
    function getImageHeader(){
        let imageHeader = document.getElementById('image-header');
        let isi = imageHeader.innerHTML;
        return [imageHeader, isi];
    }
   
    // fungsi ini untuk menampilkan list soal (sebelumnya tabel)
    function createListSoal(el, arr){
        //console.log(el);
        let idTemaFilter = document.getElementById('id-tema');
        idTemaFilter = idTemaFilter.value;
        let backup = getImageHeader();


        el.innerHTML = "";
        let imageHeader = document.createElement('div');
        imageHeader.setAttribute('id','image-header');
        imageHeader.innerHTML = backup[1];
        el.appendChild(imageHeader);
        // untuk inisiasi ulang
        getBanner();
        hapusBannerVisible();
        if(arr.length <= 0){
            let block = document.createElement('div');
            block.setAttribute('class','card-wrapper');
            block.textContent = "Tidak ada soal terdeteksi";
            el.appendChild(block);
        }
        else { 

            Array.from(arr).forEach((item, k)=>{
                //console.log(k);
                let cardWrapper = document.createElement('div');
                cardWrapper.setAttribute('class','soal-wrapper')
                let judul = document.createElement('h3');
                judul.innerHTML = "<b>Judul Soal</b> : " + item.judul_soal;

                let rincian = document.createElement('p');
                rincian.innerHTML = "<b>Soal</b> : " + item.rincian;

                let jawab = document.createElement('p');
                jawab.innerHTML = "<b>Jawaban Ideal</b> : " + item.ideal;
                let word = document.createElement('p');
                word.innerHTML = "<b>Kata Kunci</b> : " +  item.keyword;

                let opsi = document.createElement('button');
                opsi.textContent = "Opsi";
                opsi.onclick = (e)=>{
                    e.preventDefault();
                    bukaOpsi(`opsi${k}`);
                }


                let isiOpsi = document.createElement('div');
                isiOpsi.setAttribute('class','opsi');
                isiOpsi.setAttribute('id','opsi' + k);

                let lihatOpsi = document.createElement('button');
                lihatOpsi.textContent = "Lihat";
                //lihat modal update
                lihatOpsi.onclick = (e)=>{
                    e.preventDefault();
                    openModalSoalUpdate(idTemaFilter, item);
                }
                let hapusOpsi = document.createElement('button');
                hapusOpsi.textContent = "Hapus";
                hapusOpsi.onclick = ()=>{
                    return confirm("Anda akan menghapus soal ini ?") ? soalDel(item._id, idTemaFilter) : '';
                }

                isiOpsi.appendChild(lihatOpsi);
                isiOpsi.appendChild(hapusOpsi);

                cardWrapper.appendChild(judul);
                cardWrapper.appendChild(rincian);
                cardWrapper.appendChild(jawab);
                cardWrapper.appendChild(word);
                cardWrapper.appendChild(isiOpsi);
                cardWrapper.appendChild(opsi);
                el.appendChild(cardWrapper);
            })
        }
    }   


    // untuk membuka modal sekaligus mengirim update (Soal)
    function openModalSoalUpdate(id_tema, arr){
        //let modalSoalUpdate = updateSoalRealModal;
        let update = $('.Update');
        let ubahSoal = document.getElementById('ubah-soal');
        let batalUbah = document.getElementById('batal-ubah');
        // judul, rincian, jawaban, keyword, saran, cukup, nasihat
        update[0].value = arr.judul_soal
        update[1].value = arr.rincian
        update[2].value = arr.ideal
        update[3].value = arr.keyword
        update[4].value = arr.saran
        update[5].value = arr.cukup
        update[6].value = arr.nasihat

        batalUbah.onclick = (e)=> {
            e.preventDefault()
            updateSoalRealModal.hide();
        }

        ubahSoal.onclick = (e)=>{
            updateSoalRealModal.hide();
            e.preventDefault();

            let jsondata = {
                "judul_soal" : update[0].value,
                "rincian" : update[1].value,
                "ideal" : update[2].value,
                "keyword" : update[3].value,
                "saran" : update[4].value,
                "cukup" : update[5].value,
                "nasihat" : update[6].value
            }

            let set = {
                "async": true,
                  "crossDomain": true,
                  "url": url + "soal/" + arr._id,
                  "method": "PUT",
                  "headers": {
                    "content-type": "application/json",
                    "x-apikey": myapi,
                    "cache-control": "no-cache"
                  },
                  "processData": false,
                  "data": JSON.stringify(jsondata)
            }
            //console.log(jsondata)
            loadscreen()
            
            $.ajax(set).done(function (response) {
              //console.log(response);
              ambilSoal();

              const idTema = $('#id-tema').val();
            
                if (idTema) {
                // Beri sedikit delay untuk memastikan 'soalData' sudah terupdate dari 'ambilSoal()'
                  loadscreen()
                  setTimeout(() =>{
                //console.log('ambil soal');
                  ambilSoalWhere(idTema)
                  loadscreen()
                }, 2200); 
            }
            loadscreen();
            })
            .fail(function(e){
                $('#err-msg').text(JSON.stringify(e));
                loadscreen();
            });
            
        }

        updateSoalRealModal.show();
    }

    // untuk melihat opsi soal (hapus,edit)
    function bukaOpsi(idEl){
        //console.log(idEl);
        //console.log(typeof idEl)
        let el = document.getElementById(idEl)
        if(el.style.display == "flex"){
            el.style.display = "none"
        }
        else {
            el.style.display = "flex";
        }
    } 

    // untuk menyimpan data ujian yang dilihat (dibuka)
    function flashData(id_tema){
        
        let tmp = temaUjian.filter(item=> item.id == id_tema);
        
        if(tmp.length > 1){
            alert('Error : terdapat dua ujian dengan id sama');
            return;
        }
        else {
            tmp = tmp[0];
        }

        return tmp;
    }


    // untuk membuka modal sekaligus mengirim update (Ujian)
    const ubahUjian = document.getElementById('ubah-ujian')
    ubahUjian.onclick = (e)=>{
        //console.log(descUjian);
        let judul = document.getElementById('update-judul-ujian');
        judul.value = descUjian.judul;
        let deskripsi = document.getElementById('update-deskripsi-ujian');
        deskripsi.value = descUjian.deskripsi;
        let token = document.getElementById('update-token-ujian');
        token.value = descUjian.token;
        let batal = document.getElementById('batal-ubah-ujian');
        batal.onclick = (e)=>{
            e.preventDefault();
            updateUjian.hide();
        }

        let proses = document.getElementById('proses-ubah-ujian');
        proses.onclick = (e)=>{
            e.preventDefault();
            var jsondata = {
                judul       : judul.value,
                deskripsi   : deskripsi.value,
                token       : token.value
            };
            var sets = {
                "async": true,
                "crossDomain": true,
                "url": url + "tema/" + descUjian._id,
                "method": "PUT",
                "headers": {
                "content-type": "application/json",
                "x-apikey": myapi,
                "cache-control": "no-cache"
            },
            "processData": false,
            "data": JSON.stringify(jsondata)    
            }
            loadscreen()
            $.ajax(sets).done(function (response) {
                loadscreen();
                console.log(response);
                ambilTemaUpdate();
            })
            .fail(function(e){
                $('#err-msg').text(JSON.stringify(e));
                loadscreen();
            });

            updateUjian.hide();

        }


        updateUjian.show();
    }

    //untuk hapus banner 
    function hapusBannerVisible(){
        let hapusBanner = document.getElementById('hapus-banner')
        if(descUjian.banner.length > 5){
            hapusBanner.style.display = "flex"
        }
        else {
            hapusBanner.style.display = "none"
        }
        hapusBanner.onclick = (e) => {
            return confirm("Banner berikut akan dihapus, lanjutkan ?") ? hapusBannerOveride() : "";
        }
    }

    function hapusBannerOveride(){
        let hapusBanner = document.getElementById('hapus-banner')
        hapusBanner.style.display = "none";
        //descUjian.banner = "";
        simpanBanner("");
        previewBanner("");
    }


    // untuk ubah banner ujian
    function getBanner(){
        let banner = document.getElementById('banner');
        
        //console.log(banner)
        banner.onclick = (e)=>{
            let inputFile = document.createElement('input');
            console.log(inputFile)
            inputFile.type = "file";
            inputFile.accept = "image/*";
            inputFile.click();
            loadscreen();

            inputFile.onchange = (e)=>{
                if(inputFile.files.length > 0){
                    prosesImage(inputFile.files[0]);
                    loadscreen();
                }
            }
            inputFile.oncancel = (e)=> {
                loadscreen()
            }
            inputFile.onclose = (e) => {
                loadscreen()
            }
        }
    }

    // untuk ubah status ujian
    let rilis = document.getElementById('rilis');
    rilis.onclick = (e) => {
        //alert("Fitur segera dirilis");
        if(descUjian.status.toLowerCase() == "aktif"){
            return confirm("Tekan tombol 'ok' untuk menonaktifkan ujian") ? aktifkan(0) : '';
        }
        else {
            return confirm("Ujian akan diaktifkan, lanjutkan ?") ? aktifkan(1) : '';
        }
    }

    function aktifkan(int){
        let pilihan = ["Tidak Aktif", "Aktif"];
        let jsondata = {
            "status" : pilihan[int]
        };
        let setAktif = {
            "async": true,
            "crossDomain": true,
            "url": url + "tema/" + descUjian._id,
            "method": "PUT",
            "headers": {
                "content-type": "application/json",
                "x-apikey": myapi,
                "cache-control": "no-cache"
            },
        "processData": false,
        "data": JSON.stringify(jsondata)
        }
        loadscreen()
        $.ajax(setAktif).done(function (response) {
            console.log(response);
            loadscreen();
            ambilTemaUpdate();
        })
        .fail(function(e){
            $('#err-msg').text(JSON.stringify(e));
            loadscreen();
        });
    }

    // untuk mengatur halaman opsi ujian 
    function opsiUjian(){
        $('#judul-ujian').text(descUjian.judul);
        let statusUjian = document.getElementById('status-ujian');
        getBanner();
        hapusBannerVisible();
        if (descUjian.status.toLowerCase() == "aktif") {
            statusUjian.textContent = "Aktif";
            statusUjian.classList.replace('red','green');
            rilis.textContent = "Nonaktifkan";
        }
        else {
            statusUjian.textContent = "Tidak Aktif";
            statusUjian.classList.replace('green','red');
            rilis.textContent = "Aktifkan";
        }
    }

    // untuk preview banner
    function previewBanner(string){
        let previewImage = document.getElementById('preview-image');
        //hapusBannerVisible();
        previewImage.src = string;
        //descUjian.banner = string;
        if(string.length > 5){
          previewImage.src = url + "uploads/" + string; // + "?" + getBase64(3); //belum perlu deh
         }
        
        hapusBannerVisible();
        
    }

    // untuk proses banner
    function prosesImage(file){
        if(file.size > (1*1024*1024)){
            alert("Mohon pilih gambar maksimal 1 Mb");
        }
        else {
            const reader = new FileReader()

            reader.onload = function(e){
                const base64string = e.target.result;
                console.log(base64string);
                previewBanner(base64string);
                simpanBanner(base64string);
            }
            reader.onerror = function(e){
                console.log("Error : " + e.target.error);
                alert("Gagal upload gambar.")
            }

            reader.readAsDataURL(file);
        }
    }

    //untuk upload banner ke server
    function simpanBanner(string){
        
        let jsondata = {
            "banner" : string
        };
        let setAktif = {
            "async": true,
            "crossDomain": true,
            "url": url + "tema/" + descUjian._id,
            "method": "PUT",
            "headers": {
                "content-type": "application/json",
                "x-apikey": myapi,
                "cache-control": "no-cache"
            },
        "processData": false,
        "data": JSON.stringify(jsondata)
        }
        //loadscreen()
        $.ajax(setAktif).done(function (response) {
            console.log(response);
            descUjian.banner = response[":banner"];
            hapusBannerVisible();
            //loadscreen();
            //ambilTemaUpdate();
        })
        .fail(function(e){
            $('#err-msg').text(JSON.stringify(e) + "Silakan refresh halaman ini.");
            loadscreen();
        });
    }


});

function getBase64(many)
{
    if (many < 1) {
        alert("Panjang karakter harus lebih besar dari 0.");
    }

    // Karakter Base64 URL-safe: A-Z, a-z, 0-9, '-', '_'
    // Jumlah karakter = 26 (uppercase) + 26 (lowercase) + 10 (digits) + 2 (special) = 64 karakter
    let base64Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
    let charsCount = base64Chars.length;
    let randomString = '';

    // Gunakan loop untuk memilih karakter acak sebanyak $length
    for (let i = 0; i < many; i++) {
        // Mendapatkan indeks acak dari 0 hingga (jumlah karakter - 1)
        // Fungsi random_int() direkomendasikan untuk keamanan kriptografi yang lebih baik
        // dibandingkan rand() atau mt_rand()
        let randomIndex = Math.floor(Math.random() * (charsCount-1));
        
        // Menambahkan karakter yang dipilih secara acak ke string hasil
        randomString += base64Chars[randomIndex];
    }

    return randomString;
}
