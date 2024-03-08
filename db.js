const mongoose = require('mongoose');

// MongoDB'ye bağlanma
mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// Veri şemasını tanımlama
const dataSchema = new mongoose.Schema({
    name: String,
    xCoordinate: Number,
    yCoordinate: Number,
    zCoordinate: Number,
    active: Boolean,
    time: Date
});

// Veri modeli oluşturma
const DataModel = mongoose.model('Data', dataSchema);

// HTML tablosundaki verileri alarak MongoDB'ye ekleme
$('tbody tr').each(function () {
    const rowData = $(this).find('td'); // Her satırdaki hücreleri al
    const newData = new DataModel({
        name: rowData.eq(1).text(),
        xCoordinate: parseFloat(rowData.eq(2).text()),
        yCoordinate: parseFloat(rowData.eq(3).text()),
        zCoordinate: parseFloat(rowData.eq(4).text()),
        active: (rowData.eq(5).text() === 'true'), // Boolean dönüşümü
        time: new Date(rowData.eq(6).text()) // Tarih dönüşümü
    });
    
    // MongoDB'ye veriyi ekleme
    newData.save(function (err, data) {
        if (err) return console.error(err);
        console.log(data + " saved to collection.");
    });
});
