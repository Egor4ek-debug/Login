// // Подключаем необходимые модули
// import express from 'express';
// import urlencoded from 'body-parser';
// import Client from 'pg';
// import 'dotenv/config';

// const db = new Client.Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'test',
//   password: process.env.password,
//   port: 5432,
// });

// // Создаем экземпляр приложения Express
// const app = express();

// // Настраиваем middleware для обработки данных из формы
// app.use(urlencoded({ extended: true }));

// // Настраиваем шаблонизатор EJS
// app.set('view engine', 'ejs');

// // Определяем маршрут для отображения формы регистрации
// app.get('/register', (req, res) => {
//   res.render('D:\\SRC\\Info Security\\register.ejs');
// });

// // Определяем маршрут для обработки данных из формы регистрации
// app.post('/register', async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     await db.connect();
//     await db.query(
//       'INSERT INTO data(login_user,password_user) VALUES ($1,$2)',
//       [username, password]
//     );

//     res.send(`Вы успешно зарегистрировались, ${username}! `);
//   } catch (err) {
//     console.log(err);
//   } finally {
//     await db.end();
//   }
// });

// // Определяем маршрут для отображения формы авторизации
// app.get('/login', (req, res) => {
//   res.render('D:\\SRC\\Info Security\\login.ejs');
// });

// // Определяем маршрут для обработки данных из формы авторизации
// app.post('/login', async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     await db.connect();
//     let login = await db.query(
//       'SELECT * FROM data WHERE login_user = $1 AND password_user = $2;',
//       [username, password]
//     );
//     console.log(login.rowCount);
//     if (login.rowCount === 0) {
//       res.send('Error');
//     } else {
//       res.send(`Вы успешно зарегистрировались, ${username}! `);
//     }
//   } catch (err) {
//     console.log(err);
//   } finally {
//     await db.end();
//   }

//   // pool.connect(function (err, client, done) {
//   //   if (err) {
//   //     return console.error('connexion error', err);
//   //   }
//   //   client.query(
//   //     'SELECT * FROM data WHERE login_user = $1 AND password_user = $2;',
//   //         [username, password]);
//   //     function (err, result) {
//   //       // call `done()` to release the client back to the pool
//   //       done();

//   //       if (err) {
//   //         return console.error('error running query', err);
//   //       }
//   //       console.log(result.rows[0]['username']);
//   //     }
//   //   );
//   // });
// });

// // Запускаем сервер на порту 3000
// app.listen(3000, () => {
//   console.log('Сервер запущен на порту 3000');
// });

import express from 'express';
import urlencoded from 'body-parser';
import Pool from 'pg';
import 'dotenv/config';

const pg_connect = {
  user: 'postgres',
  host: 'localhost',
  database: 'test',
  password: process.env.password,
  port: 5432,
};

const pool = new Pool.Pool(pg_connect);

const app = express();

app.use(urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get('/register', (req, res) => {
  res.render('D:\\SRC\\Info Security\\register.ejs');
});

app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    await pool.connect();
    await pool.query(
      'INSERT INTO data(login_user,password_user) VALUES ($1,$2)',
      [username, password]
    );
    res.send(`Вы успешно зарегистрировались, ${username}!`);
  } catch (err) {
    console.log(err);
    pool.end();
  }
});

app.get('/login', (req, res) => {
  res.render('D:\\SRC\\Info Security\\login.ejs');
});

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    await pool.connect();
    let login = await pool.query(
      'SELECT * FROM data WHERE login_user = $1 AND password_user = $2;',
      [username, password]
    );
    console.log(login.rowCount);
    if (login.rowCount === 0) {
      res.send('Error');
    } else {
      res.send(`Вы успешно зарегистрировались, ${username}!`);
    }
  } catch (err) {
    console.log(err);
    pool.end();
  }
});

app.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});
