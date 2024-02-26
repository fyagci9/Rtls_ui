const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const ejs = require('ejs');

app.use(express.static('./public')); // Statik dosyaları sunmak için
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

// Basit bir kullanıcı veritabanı simülasyonu
const users = [
  { username: 'frt', password: 'frt' },
  { username: 'user2', password: 'password2' }
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
  
//   app.get('/dashboard', (req, res) => {
//       res.render('dashboard/taglist'); // EJS dosyanızın adını ve yolunu doğru şekilde belirtmelisiniz
//     });

// Dashboard sayfasını işle
app.get('/dashboard/taglist', (req, res) => {
  fs.readFile('data.txt', 'utf8', (err, data) => {
    if (err) {
      console.error('Dosya okunurken bir hata oluştu:', err);
      res.send('Dosya okunurken bir hata oluştu');
      return;
    }

    // Okunan verileri JSON formatına dönüştürüyoruz
    const jsonData = JSON.parse(data);

    // EJS şablonunu yükleyip verileri yerine yerleştiriyoruz
    fs.readFile('views/dashboard/taglist.ejs', 'utf8', (err, template) => {
      if (err) {
        console.error('Şablon dosyası okunurken bir hata oluştu:', err);
        res.send('Şablon dosyası okunurken bir hata oluştu');
        return;
      }

      // Verileri EJS şablonuna yerleştirerek HTML oluşturuyoruz
      const html = ejs.render(template, { jsonData });

      // Oluşturulan HTML'i istemciye gönderiyoruz
      res.send(html);
    });
  });
});

app.listen(port, () => {
  console.log(`Sunucu http://localhost:${port} adresinde çalışıyor`);
});
