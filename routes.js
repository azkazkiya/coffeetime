// backend/routes.js
const express = require('express');
const router = express.Router();
const db = require('./db');

// Mendapatkan semua kopi
router.get('/coffees', (req, res) => {
    db.query('SELECT * FROM coffeedrinknote', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});
//mendapatkan opsi
router.get('/options', async (req, res) => {
    try {
        // Mengambil kategori yang unik dari tabel coffeedrinknote
        const [kategoriRows] = await db.execute("SELECT DISTINCT kategori FROM coffeedrinknote");
        // Mengambil makanan_pelengkap yang unik dari tabel coffeedrinknote
        const [makananPelengkapRows] = await db.execute("SELECT DISTINCT makanan_pelengkap FROM coffeedrinknote");

        // Menyusun hasil menjadi array dari kategori dan makanan_pelengkap
        const kategoriOptions = kategoriRows.map(row => row.kategori);
        const makananPelengkapOptions = makananPelengkapRows.map(row => row.makanan_pelengkap);

        // Mengirimkan hasil sebagai JSON response
        res.json({ kategori: kategoriOptions, makanan_pelengkap: makananPelengkapOptions });
    } catch (error) {
        // Menangani error dan mengirimkan respons error
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data options.' });
    }
});


// Menambahkan kopi baru
router.post('/coffees', (req, res) => {
    const { Nama, deskripsi, kategori, makanan_pelengkap } = req.body;
    db.query(
        'INSERT INTO coffeedrinknote (Nama, deskripsi, kategori, makanan_pelengkap) VALUES (?, ?, ?, ?)',
        [Nama, deskripsi, kategori, makanan_pelengkap],
        (err, results) => {
            if (err) return res.status(500).json(err);
            res.json({ id: results.insertId, Nama, deskripsi, kategori, makanan_pelengkap });
        }
    );
});

// Mengedit kopi
router.put('/coffees/:id', (req, res) => {
    const { id } = req.params;
    const { Nama, deskripsi, kategori, makanan_pelengkap } = req.body;
    db.query(
        'UPDATE coffeedrinknote SET Nama = ?, deskripsi = ?, kategori = ?, makanan_pelengkap = ? WHERE id = ?',
        [Nama, deskripsi, kategori, makanan_pelengkap, id],
        (err) => {
            if (err) return res.status(500).json(err);
            res.json({ id, Nama, deskripsi, kategori, makanan_pelengkap });
        }
    );
});

// Menghapus kopi
router.delete('/coffees/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM coffeedrinknote WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: 'Kopi dihapus' });
    });
});

module.exports = router;
