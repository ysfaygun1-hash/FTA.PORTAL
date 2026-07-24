// ----------------------
// Tüm Temmuz Menüsü
// ----------------------

fetch("FTA TEMMUZ YEMEK LİSTESİ.csv")
.then(response => response.text())
.then(data => {

    const satirlar = data.trim().split(/\r?\n/);
    const veriler = satirlar.slice(1).map(s => s.split(";"));

    const tumMenuAlan = document.getElementById("tumMenu");
    const buton = document.getElementById("tumunuGoster");

    let acik = false;

    if (buton) {

        buton.addEventListener("click", function () {

            if (!acik) {

                let html = "";

                veriler.forEach(veri => {

                    html += `
                    <div class="menu-kart">

                        <h3>${veri[0]}</h3>

                        <div class="satir"><span>🥣 Çorba</span><strong>${veri[1]}</strong></div>
                        <div class="satir"><span>🍗 Ana Yemek 1</span><strong>${veri[2]}</strong></div>
                        <div class="satir"><span>🍲 Ana Yemek 2</span><strong>${veri[3]}</strong></div>
                        <div class="satir"><span>🍚 Yanında</span><strong>${veri[4]}</strong></div>
                        <div class="satir"><span>🔥 Kalori</span><strong>${veri[5]}</strong></div>

                    </div>
                    `;

                });

                tumMenuAlan.innerHTML = html;
                buton.textContent = "📕 Menüyü Gizle";
                acik = true;

            } else {

                tumMenuAlan.innerHTML = "";
                buton.textContent = "📋 Tüm Temmuz Menüsünü Göster";
                acik = false;

            }

        });

    }

});


// ----------------------
// Günlük Menü
// ----------------------

async function menuGetir(firma) {

    const dosya =
        firma === "fta"
        ? "FTA TEMMUZ YEMEK LİSTESİ.csv"
        : "VIA TEMMUZ YEMEK LİSTESİ.csv";

    const cevap = await fetch(dosya);
    const veri = await cevap.text();

    const satirlar = veri.trim().split(/\r?\n/);

    const bugun = new Date();

    const tarih =
        String(bugun.getDate()).padStart(2, "0") + "." +
        String(bugun.getMonth() + 1).padStart(2, "0") + "." +
        bugun.getFullYear();

    const bulunan = satirlar.find(s => s.startsWith(tarih));

    const hedef =
        firma === "fta"
        ? document.getElementById("ftaMenu")
        : document.getElementById("viaMenu");

    if (!hedef) return;

    if (bulunan) {

        const s = bulunan.split(";");

        hedef.innerHTML = `
            <div class="menu-kart">

                <h3>${s[0]}</h3>

                <div class="satir"><span>🥣 Çorba   </span><strong>${s[1]}</strong></div>
                <div class="satir"><span>🍗 Ana Yemek 1   </span><strong>${s[2]}</strong></div>
                <div class="satir"><span>🍲 Ana Yemek 2   </span><strong>${s[3]}</strong></div>
                <div class="satir"><span>🍚 Yanında   </span><strong>${s[4]}</strong></div>
                <div class="satir"><span>🔥 Kalori   </span><strong>${s[5]}</strong></div>

            </div>
        `;

    } else {

        hedef.innerHTML = "<p>Bugünün menüsü bulunamadı.</p>";

    }

}

menuGetir("fta");
menuGetir("via");