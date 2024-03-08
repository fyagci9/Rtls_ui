const express = require('express');
const app = express();
const port = 3000;
const ejs = require('ejs');
const fs = require('fs');


app.use(express.static((__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

const users = [
  { username: "frt", password: "frt" }
];

const data = [
  {
    "name": "ble-pd-1C34F1633706",
    "xCoordinate": 4.849423,
    "yCoordinate": 1.292485,
    "zCoordinate": -2.094846,
    "active": true,
    "time": 1708953951
  },
  {
    "name": "ble-pd-1C34F16110FF",
    "xCoordinate": 4.8493,
    "yCoordinate": 1.291213,
    "zCoordinate": -2.095265,
    "active": false,
    "time": 1708953951
  }
];

// Ana sayfayı işle
app.get('/', (req, res) => {
  res.render('login/index');
});

// Giriş işlemini yönet
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    // Kullanıcı doğruysa, dashboard sayfasına yönlendir
    res.redirect('/dashboard');
  } else {
    res.send('Hatalı kullanıcı adı veya şifre!');
  }
});

app.get('/dashboard', (req, res) => {
  res.render('dashboard/home');
});

app.get('/dashboard/canvasedit',(req,res)=>{
  res.render('dashboard/canvasedit');
})

// Dashboard sayfasını işle
app.get('/dashboard/taglist', (req, res) => {
  // EJS şablonunu yükleyip verileri yerine yerleştiriyoruz
  res.render('dashboard/taglist', { jsonData: data }, (err, str) => {
    if (err) {
      console.error('hata oluştu:', err);
      res.send(' hata oluştu');
      return;
    }
    res.send(str);
  });
});

app.get('/dashboard/persregi', (req, res) => {
  res.render('dashboard/persregi');
});

app.listen(port, () => {
  console.log(`Sunucu http://localhost:${port} adresinde çalışıyor`);
});
