/* ====== UBAH DATA DI SINI ====== */

const KONTAK = {
  whatsapp: "6282348947542",
  instagram: "aliyhmufdh",
  pesanWA: "Halo, saya mau pesan:"
};

// Foto harus berada di folder images/
// dan nama file harus sama persis
const MAKANAN = [
  {
    nama: "Mac n Cheese Bolognese + Chicken Katsu",
    deskripsi: "Mac n cheese lumer, saus bolognese, dan chicken katsu renyah.",
    harga: 20000,
    foto: "images/mac-bolognese.jpeg"
  },
  {
    nama: "Mac n Cheese Carbonara + Chicken Sauce",
    deskripsi: "Mac n cheese lumer dengan saus carbonara dan chicken sauce.",
    harga: 25000,
    foto: "images/mac-carbonara.jpeg"
  }
];

const MINUMAN = [
  {
    nama: "Red Velvet",
    harga: 13000,
    foto: "images/redvelvet.jpeg"
  },
  {
    nama: "Taro",
    harga: 13000,
    foto: "images/taro.jpeg"
  },
  {
    nama: "Coklat",
    harga: 13000,
    foto: "images/coklat.jpeg"
  },
  {
    nama: "Thai Tea",
    harga: 13000,
    foto: "images/thaitea.jpeg"
  },
  {
    nama: "Green Tea",
    harga: 13000,
    foto: "images/greentea.jpeg"
  },
  {
    nama: "Lemon Tea",
    harga: 10000,
    foto: "images/lemontea.jpeg"
  },
  {
    nama: "Lychee Tea",
    harga: 10000,
    foto: "images/lychee.jpeg"
  }
];

/* ====== KODE TAMPILAN ====== */

const rupiah = (n) => "Rp" + n.toLocaleString("id-ID");

// Membuat gambar
function buatGambar(src, alt, ikon, wadah) {
  const img = document.createElement("img");

  img.src = src;
  img.alt = alt;
  img.loading = "lazy";

  // Jika gambar gagal ditemukan
  img.onerror = function () {
    wadah.textContent = ikon;
  };

  // Jika gambar berhasil ditemukan
  img.onload = function () {
    wadah.textContent = "";
    wadah.appendChild(img);
  };

  wadah.appendChild(img);
}

// Membuat link WhatsApp
function buatLinkWA(namaMenu) {
  const teks = encodeURIComponent(
    `${KONTAK.pesanWA} ${namaMenu}`
  );

  return `https://wa.me/${KONTAK.whatsapp}?text=${teks}`;
}

// Menampilkan makanan
function tampilkanMakanan() {
  const wadah = document.getElementById("menu-makanan");

  MAKANAN.forEach((item) => {
    const kartu = document.createElement("article");
    kartu.className = "card";

    const foto = document.createElement("div");
    foto.className = "photo";

    buatGambar(
      item.foto,
      item.nama,
      "🧀",
      foto
    );

    const isi = document.createElement("div");
    isi.className = "card-body";

    isi.innerHTML = `
      <h3>${item.nama}</h3>
      <p class="desc">${item.deskripsi}</p>
      <span class="price">${rupiah(item.harga)}</span>
    `;

    kartu.append(foto, isi);
    wadah.appendChild(kartu);
  });
}

// Menampilkan minuman
function tampilkanMinuman() {
  const wadah = document.getElementById("menu-minuman");

  MINUMAN.forEach((item) => {
    const li = document.createElement("li");

    const thumb = document.createElement("div");
    thumb.className = "thumb";

    buatGambar(
      item.foto,
      item.nama,
      "🥤",
      thumb
    );

    const nama = document.createElement("span");
    nama.className = "name";
    nama.textContent = item.nama;

    const harga = document.createElement("span");
    harga.className = "price";
    harga.textContent = rupiah(item.harga);

    li.append(thumb, nama, harga);
    wadah.appendChild(li);
  });
}

// Menampilkan kontak
function tampilkanKontak() {
  const wadah = document.getElementById("daftar-kontak");

  const wa = document.createElement("a");
  wa.href = buatLinkWA("");
  wa.target = "_blank";
  wa.rel = "noopener";
  wa.textContent = "Chat WhatsApp";

  const ig = document.createElement("a");
  ig.href = `https://instagram.com/${KONTAK.instagram}`;
  ig.target = "_blank";
  ig.rel = "noopener";
  ig.textContent = "Instagram @" + KONTAK.instagram;

  wadah.append(wa, ig);
}

// Logo
document.getElementById("logo").addEventListener("error", function () {
  this.removeAttribute("src");
});

// Tahun otomatis
document.getElementById("tahun").textContent =
  new Date().getFullYear();

// Jalankan fungsi
tampilkanMakanan();
tampilkanMinuman();
tampilkanKontak();


/* ====== ANIMASI ====== */

const kurangiGerak = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// 1) Logo melompat 5 kali (klik logo untuk mengulang)
const logo = document.getElementById("logo");

function lompatLogo() {
  if (kurangiGerak) return;
  logo.classList.remove("jump");
  void logo.offsetWidth; // reset animasi
  logo.classList.add("jump");
}

logo.addEventListener("animationend", () => logo.classList.remove("jump"));
logo.addEventListener("click", lompatLogo);
setTimeout(lompatLogo, 400);

// 2) Menu muncul satu per satu saat terlihat di layar
function aktifkanReveal() {
  const items = document.querySelectorAll(".card, .drinks li");

  items.forEach((el) => {
    el.classList.add("reveal");
    el.tabIndex = 0;
  });

  if (kurangiGerak || !("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("show"));
    return;
  }

  const pengamat = new IntersectionObserver((entries) => {
    let urutan = 0;
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      en.target.style.transitionDelay = urutan++ * 140 + "ms";
      en.target.classList.add("show");
      pengamat.unobserve(en.target);
    });
  }, { threshold: 0.30 });

  items.forEach((el) => pengamat.observe(el));
}

// 3) Spark saat menu ditekan
const WARNA_SPARK = ["#FFC300", "#FF6FA5", "#B57BFF", "#4CC9F0", "#FF9F1C", "#F9D77E"];

function percikan(x, y) {
  if (kurangiGerak) return;
  const jumlah = 18;

  for (let i = 0; i < jumlah; i++) {
    const s = document.createElement("span");
    s.className = "spark" + (i % 3 === 0 ? " dot" : "");

    const sudut = (Math.PI * 2 * i) / jumlah + Math.random() * 0.4;
    const jarak = 45 + Math.random() * 60;
    const ukuran = 8 + Math.random() * 12;

    s.style.left = x + "px";
    s.style.top = y + "px";
    s.style.setProperty("--dx", Math.cos(sudut) * jarak + "px");
    s.style.setProperty("--dy", Math.sin(sudut) * jarak + "px");
    s.style.setProperty("--s", (s.classList.contains("dot") ? ukuran * 0.5 : ukuran) + "px");
    s.style.setProperty("--c", WARNA_SPARK[Math.floor(Math.random() * WARNA_SPARK.length)]);

    s.addEventListener("animationend", () => s.remove());
    document.body.appendChild(s);
  }
}

function tekanMenu(el, x, y) {
  percikan(x, y);
  el.classList.remove("pop");
  void el.offsetWidth;
  el.classList.add("pop");
}

document.addEventListener("click", (e) => {
  const el = e.target.closest(".card, .drinks li");
  if (el) tekanMenu(el, e.clientX, e.clientY);
});

// Akses keyboard (Enter / Spasi)
document.addEventListener("keydown", (e) => {
  if (e.key !== "Enter" && e.key !== " ") return;
  const el = e.target.closest && e.target.closest(".card, .drinks li");
  if (!el) return;
  e.preventDefault();
  const r = el.getBoundingClientRect();
  tekanMenu(el, r.left + r.width / 2, r.top + r.height / 2);
});

document.addEventListener("animationend", (e) => {
  if (e.target.classList && e.target.classList.contains("pop")) e.target.classList.remove("pop");
});

aktifkanReveal();
