# BeritApp

Sebuah projek semantik web untuk mencari berita di internet. Menggunakan React.js untuk pengembangannya

## Anggota Kelompok
- Natillah Faalih N M N(NPM. 140810170044)
- Muhammad Fakhri Rahman (NPM. 140810170026)
- Ghema Allan Ferdiansyah (NPM. 140810170046)

## Instalasi

Intalasi projek ini terbagi menjadi 2 yaitu upload dataset dan instalasi web

### Persiapan

- Download NodeJs (https://nodejs.org/en/)
- Install NodeJs
- Download Apache Jena Fuseki (https://jena.apache.org/documentation/fuseki2/)
- Ekstrak file hasil download
- Clone projek ini menggunakan cmd dengan
`
git clone https://github.com/faalhnst/berita.git
`

### Upload Dataset

- Ubah direktori menjadi folder apache-jena-fuseki yang telah di ekstrak pada cmd
- ketik
`
fuseki-server 
`
- buka halaman
`
http://localhost:3030
` pada browser
- Klik
`
Manage Dataset
` in Apache Jena Fuseki
- Set 
`
berita-app
` as its dataset name
- Pilih
`
Persistent
` sebagai tipe dataset
- Upload dataset 
`
berita.ttl
`yang terletak pada
`
..\database
` hasil clone

### Instalasi Web
- Ubah direktori menjadi folder hasil clone git 
- pasang dependencies yang dibutuhkan dengan 
`
npm install
`
- Kemudian jalankan dengan 
`
npm start
`
- Web secara otomatis terbuka di browser pada 
`
http://localhost:3000
`

## Struktur Projek
- Seluruh file tampilan dan fungsi tersimpan pada homepage.js