class User {
    constructor(tcNo, isim, soyisim, dogum, hesaplar) {
        this.tcNo = tcNo;
        this.isim = isim;
        this.soyisim = soyisim;
        this.dogum = dogum;
        this.hesaplar = hesaplar;
    }
}
class Hesap {
    constructor(hesapAd, iban, bakiye, islemler) {
        this.hesapAd = hesapAd;
        this.iban = iban;
        this.bakiye = bakiye;
        this.islemler = islemler;
    }
}

class Islem {
    constructor(islemTuru, islemUcret, islemAciklama, islemTarih) {
        this.islemTuru = islemTuru;
        this.islemUcret = islemUcret;
        this.islemAciklama = islemAciklama;
        this.islemTarih = islemTarih;
    }
}



var users = []
users.push(new User("12345678910", "Ahmet", "Özge", "01.01.2000", []),
    new User("12345678912", "Emre", "Taşkın", "02.05.1995", []))
var selectedIndex = -1;





function tabloDoldur() {

    var tablo = document.getElementById("userTable");
    while (tablo.rows.length > 0) { // Tablo satır sayısı 0'dan büyük olduğu sürece döngüyü devam ettir
        tablo.deleteRow(0); // Tablonun ilk satırını sil
    }
    for (var i = 0; i < users.length; i++) {
        var user = users[i]
        var tr = document.createElement("tr");

        var kullaniciAdiTD = document.createElement("td");
        kullaniciAdiTD.textContent = user.isim + ' ' + user.soyisim;

        var tcNOTD = document.createElement("td");
        tcNOTD.textContent = user.tcNo;

        var islemTD = document.createElement("td");
        var islemButton = document.createElement("button");
        islemButton.setAttribute("id", "view");
        islemButton.setAttribute("data-bs-toggle", "modal");
        islemButton.setAttribute("data-bs-target", "#actionModal");
        islemButton.addEventListener('click', function () {
            selectedIndex = this.closest('tr').rowIndex - 1;
            islemYap()
        });
        islemButton.textContent = "İşlem Yap";
        islemButton.classList = "btn btn-success bg-success"

        var goruntuleTD = document.createElement("td");
        var goruntuleButton = document.createElement("button");
        goruntuleButton.setAttribute("id", "view");
        goruntuleButton.setAttribute("data-bs-toggle", "modal");
        goruntuleButton.setAttribute("data-bs-target", "#viewModal");
        goruntuleButton.addEventListener('click', function () {
            selectedIndex = this.closest('tr').rowIndex - 1;
            detayGoruntule()
        });
        goruntuleButton.textContent = "Detay Görüntüle";
        goruntuleButton.classList = "btn btn-primary bg-primary"


        var guncelleTD = document.createElement("td");
        var guncelleButton = document.createElement("button");
        guncelleButton.setAttribute("id", "view");
        guncelleButton.setAttribute("data-bs-toggle", "modal");
        guncelleButton.setAttribute("data-bs-target", "#updateModal");
        guncelleButton.addEventListener('click', function () {
            selectedIndex = this.closest('tr').rowIndex - 1;
            bilgiGuncelle()
        });
        guncelleButton.textContent = "Bilgi Güncelle";
        guncelleButton.classList = "btn btn-warning bg-warning"

        var silTD = document.createElement("td");
        var silButton = document.createElement("button");
        silButton.setAttribute("id", "delete");
        silButton.setAttribute("data-bs-toggle", "modal");
        silButton.setAttribute("data-bs-target", "#deleteModal");
        silButton.addEventListener('click', function () {
            selectedIndex = this.closest('tr').rowIndex - 1;
        });
        silButton.textContent = "x";
        silButton.classList = "btn btn-danger bg-danger"

        islemTD.appendChild(islemButton);
        goruntuleTD.appendChild(goruntuleButton);
        guncelleTD.appendChild(guncelleButton);
        silTD.appendChild(silButton);
        tr.appendChild(kullaniciAdiTD);
        tr.appendChild(tcNOTD);
        tr.appendChild(islemTD);
        tr.appendChild(goruntuleTD);
        tr.appendChild(guncelleTD);
        tr.appendChild(silTD);
        tablo.appendChild(tr);


    }

}

function kullanicilariCek() {

    
    tabloDoldur();


}

function kullaniciSil() {

    if (selectedIndex !== -1) {
        users.splice(selectedIndex, 1);
    }
    selectedIndex = -1;
    tabloDoldur();
    var modal = document.getElementById("deleteClose"); // kapatılacak modal'ın id'si ile seç

    modal.click();

}

function islemEkle(userIndex, hesapIndex, islemTuru, islemUcret, islemAciklama) {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    const islemTarih = `${month}.${day}.${year}`;
    var user = users[userIndex];
    var islemler = user.hesaplar[hesapIndex].islemler;
    var islem = new Islem(islemTuru,islemUcret,islemAciklama,islemTarih);

    islemler = [islem, ...islemler];
    user.hesaplar[hesapIndex].islemler = islemler;
}

function detayGoruntule() {
    document.getElementById("viewAccountIban").value = "";
    document.getElementById("viewAccountNumber").value = "";
    var user = users[selectedIndex];
    var secenekler = document.getElementById("accounts-options");
    secenekler.innerHTML = "";
    var tablo = document.getElementById("accountTable");
    tablo.innerHTML = "";
    var opt = document.createElement("option");
    opt.text = "Hesap seçiniz..."
    i = 0
    secenekler.add(opt);
    for (var i = 0; i < user.hesaplar.length; i++) {
        var option = document.createElement("option");
        option.setAttribute("value", i);
        option.text = user.hesaplar[i].hesapAd;
        secenekler.add(option);
    }




}

function hesabiGoster(selectObject) {
    var tablo = document.getElementById("accountTable");
    while (tablo.rows.length > 0) { // Tablo satır sayısı 0'dan büyük olduğu sürece döngüyü devam ettir
        tablo.deleteRow(0); // Tablonun ilk satırını sil
    }
    document.getElementById("viewAccountIban").value = "";
    document.getElementById("viewAccountNumber").value = "";

    var islemler = users[selectedIndex].hesaplar[selectObject].islemler;
    console.log(islemler)
    document.getElementById("viewAccountIban").value = users[selectedIndex].hesaplar[selectObject].iban
    document.getElementById("viewAccountNumber").value = users[selectedIndex].hesaplar[selectObject].bakiye + ' ' + 'TL';
    for (var i = 0; i < islemler.length; i++) {
        var islem = islemler[i];
        var tr = document.createElement("tr");

        var islemTuruTD = document.createElement("td");
        islemTuruTD.textContent = islem.islemTuru;

        var islemUcretTD = document.createElement("td");
        islemUcretTD.textContent = islem.islemUcret + 'TL';

        var islemAciklamaTD = document.createElement("td");
        islemAciklamaTD.textContent = islem.islemAciklama;

        var islemTarihTD = document.createElement("td");
        islemTarihTD.textContent = islem.islemTarih;

        tr.appendChild(islemTuruTD);
        tr.appendChild(islemUcretTD);
        tr.appendChild(islemAciklamaTD);
        tr.appendChild(islemTarihTD);

        tablo.appendChild(tr);
        console.log(islem)
    }
}

function bilgiGuncelle() {
    var user = users[selectedIndex];
    document.getElementById("updateTC").value = user.tcNo;
    document.getElementById("updateIsim").value = user.isim;
    document.getElementById("updateSoyisim").value = user.soyisim;
    document.getElementById("updateDogum").value = user.dogum;
    document.getElementById("guncelleUyari").classList = "d-none";
}

function guncelle(e) {
    e.preventDefault();

    var user = users[selectedIndex];

    tcNo = document.getElementById("updateTC").value;
    isim = document.getElementById("updateIsim").value;
    soyisim = document.getElementById("updateSoyisim").value;
    dogum = document.getElementById("updateDogum").value;
    if (tcNo.length == 11) {
        if (isim.length > 1) {
            if (soyisim.length > 1) {
                if (dogum.length > 1) {
                    user.tcNo = tcNo;
                    user.isim = isim;
                    user.soyisim = soyisim;
                    user.dogum = dogum;
                    users.push(user);
                    tabloDoldur();
                    document.getElementById("updateClose").click();
                }
                else {
                    document.getElementById("guncelleUyari").classList = "alert alert-danger";
                    document.getElementById("guncelleUyari").innerText = "Doğum tarihi giriniz."
                }
            }
            else {
                document.getElementById("guncelleUyari").classList = "alert alert-danger";
                document.getElementById("guncelleUyari").innerText = "Soyisim giriniz."
            }
        } else {
            document.getElementById("guncelleUyari").classList = "alert alert-danger";
            document.getElementById("guncelleUyari").innerText = "İsim giriniz."
        }
    }
    else {
        document.getElementById("guncelleUyari").classList = "alert alert-danger";
        document.getElementById("guncelleUyari").innerText = "TC Kimlik No 11 haneli olmalıdır."
    }
}

function generateIBAN() {
    const bankCode = "00061";
    const accountType = "1"; // bireysel hesap
    const customerNumber = Math.floor(Math.random() * 1000000).toString().padStart(6, "0"); // 6 haneli müşteri numarası
    const accountNumber = Math.floor(Math.random() * 10000000000).toString().padStart(10, "0"); // 10 haneli hesap numarası
    const ibanWithoutCheckDigit = "TR00" + bankCode + accountType + customerNumber + accountNumber;// BigInt kullanarak mod 97 hesaplama
    return ibanWithoutCheckDigit;
}

function yeniHesap(e) {
    var user = users[selectedIndex];
    e.preventDefault();
    var hesapisim = document.getElementById("actionAccountName").value;

    document.getElementById("actionAccountName").value = "";

    var bakiye = document.getElementById("yeniHesapBakiye").value;
    document.getElementById("yeniHesapBakiye").value = "";
    if (hesapisim.length > 0) {
        if(bakiye.length==0){
            bakiye = 0
        }
        var iban = generateIBAN();
        
        var islemler = [];
        user.hesaplar.push( new Hesap(hesapisim,iban,bakiye,islemler));
        document.getElementById("islemClose").click();
        islemEkle(selectedIndex, user.hesaplar.length - 1, "Hesap Açma", bakiye, "Hesabınız açılmıştır.");
    }
    else {
        document.getElementById("hesapAcmaUyari").classList = "alert alert-danger mt-2"
    }

}

function islemYap() {
    var user = users[selectedIndex];
    document.getElementById("paraCek").disabled = true;
    document.getElementById("paraYatir").disabled = true;
    document.getElementById("hesapAcmaUyari").classList = "d-none"
    document.getElementById("paraAktarmaUyari").classList = "d-none";
    document.getElementById("hesapParaIslemUyari").classList = "d-none"
    var secenekler = document.getElementById("action-option");
    secenekler.innerHTML = "";
    var opt = document.createElement("option");
    opt.text = "Hesap seçiniz..."
    secenekler.add(opt);
    for (var i = 0; i < user.hesaplar.length; i++) {
        var option = document.createElement("option");
        option.setAttribute("value", i);
        option.text = user.hesaplar[i].hesapAd;
        secenekler.add(option);
    }

    var secenekler = document.getElementById("gondericiHesap");
    secenekler.innerHTML = "";
    var opt = document.createElement("option");
    opt.text = "Hesap seçiniz..."
    secenekler.add(opt);
    for (var i = 0; i < user.hesaplar.length; i++) {
        var option = document.createElement("option");
        option.setAttribute("value", i);
        option.text = user.hesaplar[i].hesapAd;
        secenekler.add(option);
    }

    var secenekler = document.getElementById("aliciHesap");
    secenekler.innerHTML = "";
    var opt = document.createElement("option");
    opt.text = "Hesap seçiniz..."
    secenekler.add(opt);
    for (var i = 0; i < users.length; i++) {
        var tmpUser = users[i]
        for (var j = 0; j < tmpUser.hesaplar.length; j++) {
            var option = document.createElement("option");
            option.setAttribute("value", i + ',' + j);
            option.text = tmpUser.isim + ' ' + tmpUser.soyisim + ' - ' + tmpUser.hesaplar[j].hesapAd;
            secenekler.add(option);
        }
    }

}

function paraCekmeYatirma(value) {
    document.getElementById("actionAcountPrice").value = "";
    document.getElementById("actionAcountPrice").disabled = true;
    document.getElementById("paraCek").disabled = true;
    document.getElementById("paraYatir").disabled = true;
    if (value >= 0) {
        document.getElementById("actionAcountPrice").disabled = false;
        document.getElementById("paraCek").disabled = false;
        document.getElementById("paraYatir").disabled = false;
    }
}

function paraAktarma(value) {
    document.getElementById("paraAktarUcret").value = "";
    document.getElementById("paraAktar").disabled = true;
    if (value >= 0) {
        document.getElementById("actionAcountPrice").disabled = false;
        document.getElementById("paraCek").disabled = false;
        document.getElementById("paraYatir").disabled = false;
    }
}
function paraCekButon(e) {
    e.preventDefault();
    index = document.getElementById("action-option").value;
    ucret = parseInt(document.getElementById("actionAcountPrice").value);

    document.getElementById("actionAcountPrice").value = "";
    var hesap = users[selectedIndex].hesaplar[index];
    var bakiye = hesap.bakiye;
    if (ucret > bakiye) {
        document.getElementById("hesapParaIslemUyari").classList = "mt-2 alert alert-danger";
    } else {
        bakiye -= ucret
        users[selectedIndex].hesaplar[index].bakiye = bakiye;
        document.getElementById("islemClose").click();
        islemEkle(selectedIndex, index, "Para Çekme", ucret, "Hesabınızdan para çekilmiştir.");
    }



}
function paraYatirmaButon(e) {
    e.preventDefault();
    index = document.getElementById("action-option").value;
    ucret = parseInt(document.getElementById("actionAcountPrice").value);

    document.getElementById("actionAcountPrice").value = "";
    var hesap = users[selectedIndex].hesaplar[index];
    var bakiye = hesap.bakiye;

    bakiye += ucret
    users[selectedIndex].hesaplar[index].bakiye = bakiye;
    islemEkle(selectedIndex, index, "Para Yatırma", ucret, "Hesabınıza para yatırılmıştır.");


    document.getElementById("islemClose").click();

}

function paraAktarmaButon(e) {
    e.preventDefault();
    var gondericiIndex = parseInt(document.getElementById("gondericiHesap").value);
    var alici = document.getElementById("aliciHesap").value.split(",");
    var aliciIndex = parseInt(alici[0]);
    var aliciHesapIndex = parseInt(alici[1]);
    console.log(aliciIndex)
    console.log(aliciHesapIndex)
    ucret = parseInt(document.getElementById("paraAktarUcret").value);

    document.getElementById("paraAktarUcret").value = "";
    var hesap = users[selectedIndex].hesaplar[gondericiIndex];
    var bakiye = hesap.bakiye;

    if (ucret > bakiye) {
        document.getElementById("paraAktarmaUyari").classList = "mt-2 alert alert-danger";
        document.getElementById("paraAktarmaUyari").innerHTML = "Bakiyeniz yetersiz.";
    } else if (Number.isNaN(aliciIndex) && Number.isNaN(aliciHesapIndex)) {
        document.getElementById("paraAktarmaUyari").classList = "mt-2 alert alert-danger";
        document.getElementById("paraAktarmaUyari").innerHTML = "Lütfen alıcı hesap seçiniz.";
    }

    else {
        bakiye -= ucret
        users[selectedIndex].hesaplar[gondericiIndex].bakiye = bakiye;
        islemEkle(selectedIndex, gondericiIndex, "Havale", ucret, "Hesabınızdan havale işlemi yapılarak para çıkışı yapılmıştır.");
        users[aliciIndex].hesaplar[aliciHesapIndex].bakiye += ucret;
        islemEkle(aliciIndex, aliciHesapIndex, "Havale", ucret, "Hesabınıza havale işlemi ile para girişi olmuştur.");
        document.getElementById("islemClose").click();

    }

}


function kullaniciEkle(e) {
    e.preventDefault();
    var user = new User("","","","",[]);

    tcNo = document.getElementById("newTC").value;
    isim = document.getElementById("newIsim").value;
    soyisim = document.getElementById("newSoyisim").value;
    dogum = document.getElementById("newDogum").value;
    if (tcNo.length == 11) {
        if (isim.length > 1) {
            if (soyisim.length > 1) {
                if (dogum.length > 1) {
                    user.tcNo = tcNo;
                    user.isim = isim;
                    user.soyisim = soyisim;
                    user.dogum = dogum;
                    users.push(user);
                    tabloDoldur();
                    document.getElementById("yeniKullaniciUyari").classList = "d-none";
                    document.getElementById("newClose").click();
                }
                else {
                    document.getElementById("yeniKullaniciUyari").classList = "alert alert-danger";
                    document.getElementById("yeniKullaniciUyari").innerText = "Doğum tarihi giriniz."
                }
            }
            else {
                document.getElementById("yeniKullaniciUyari").classList = "alert alert-danger";
                document.getElementById("yeniKullaniciUyari").innerText = "Soyisim giriniz."
            }
        } else {
            document.getElementById("yeniKullaniciUyari").classList = "alert alert-danger";
            document.getElementById("yeniKullaniciUyari").innerText = "İsim giriniz."
        }
    }
    else {
        document.getElementById("yeniKullaniciUyari").classList = "alert alert-danger";
        document.getElementById("yeniKullaniciUyari").innerText = "TC Kimlik No 11 haneli olmalıdır."
    }

}