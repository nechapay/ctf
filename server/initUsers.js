module.exports = async app => {
  const store = app.get('store')

  // let tm = await store.collection('ctf_users').findOne({ name: '1' })
  // if (!tm) {
  //   await store.collection('ctf_users').insertOne({ name: '1', password: '!_$1' })
  // }
  // tm = await store.collection('ctf_users').findOne({ name: '2' })
  // if (!tm) {
  //   await store.collection('ctf_users').insertOne({ name: '2', password: '!_$1' })
  // }
  // await store.collection('ctf_users').deleteMany({ name: '1' })
  let tm = await store.collection('ctf_users').findOne({ name: 'Команда1' })
  if (!tm) {
    await store.collection('ctf_users').insertOne({ name: 'Команда1', password: '1_$1' })
  }

  tm = await store.collection('ctf_users').findOne({ name: 'Команда2' })
  if (!tm) {
    await store.collection('ctf_users').insertOne({ name: 'Команда2', password: '2_$1' })
  }

  tm = await store.collection('ctf_users').findOne({ name: 'Команда3' })
  if (!tm) {
    await store.collection('ctf_users').insertOne({ name: 'Команда3', password: '3_$1' })
  }
  tm = await store.collection('ctf_users').findOne({ name: 'Команда4' })
  if (!tm) {
    await store.collection('ctf_users').insertOne({ name: 'Команда4', password: '4_$1' })
  }
  tm = await store.collection('ctf_users').findOne({ name: 'Команда5' })
  if (!tm) {
    await store.collection('ctf_users').insertOne({ name: 'Команда5', password: '5_$1' })
  }
  //
  // tm = await store.collection('ctf_users').findOne({ name: 'кактус' })
  // if (!tm) {
  //   await store.collection('ctf_users').insertOne({ name: 'кактус', password: '4_$1' })
  // }
  //
  // tm = await store.collection('ctf_users').findOne({ name: 'битcoin' })
  // if (!tm) {
  //   await store.collection('ctf_users').insertOne({ name: 'битcoin', password: '5_$1' })
  // }
  //
  // tm = await store.collection('ctf_users').findOne({ name: 'мтс' })
  // if (!tm) {
  //   await store.collection('ctf_users').insertOne({ name: 'мтс', password: '6_$1' })
  // }
  //
  // tm = await store.collection('ctf_users').findOne({ name: 'userы' })
  // if (!tm) {
  //   await store.collection('ctf_users').insertOne({ name: 'userы', password: '7_$1' })
  // }
  //
  // tm = await store.collection('ctf_users').findOne({ name: 'xxx' })
  // if (!tm) {
  //   await store.collection('ctf_users').insertOne({ name: 'xxx', password: '8_$1' })
  // }
  //
  // tm = await store.collection('ctf_users').findOne({ name: 'it' })
  // if (!tm) {
  //   await store.collection('ctf_users').insertOne({ name: 'it', password: '9_$1' })
  // }
  //
  // tm = await store.collection('ctf_users').findOne({ name: 'компьютер' })
  // if (!tm) {
  //   await store.collection('ctf_users').insertOne({ name: 'компьютер', password: '10_$1' })
  // }
  //
  // tm = await store.collection('ctf_users').findOne({ name: 'Гай_Фокс' })
  // if (!tm) {
  //   await store.collection('ctf_users').insertOne({ name: 'Гай_Фокс', password: '11_$1' })
  // }
  //
  // tm = await store.collection('ctf_users').findOne({ name: 'dvd' })
  // if (!tm) {
  //   await store.collection('ctf_users').insertOne({ name: 'dvd', password: '12_$1' })
  // }

  // await store.collection('ctf_users').deleteMany({})
  await store.collection('ctf_user_tasks').deleteMany({})

  await store.collection('ctf_tasks').deleteMany({})
  await store.collection('ctf_tasks').insertMany([
    {
      id: 7,
      name: '«Программирование»',
      tasks: [
        {
          id: 1,
          name: 'Задание 1',
          path: 'ПР_1.docx',
          score: 100,
          answer: 'correct 1'
        },
        {
          id: 2,
          name: 'Задание 2',
          path: 'ПР_2.docx',
          score: 200,
          answer: 'correct 2'
        },
        {
          id: 3,
          name: 'Задание 3',
          path: 'ПР_3.docx',
          score: 300,
          answer: 'correct 3'
        },
        {
          id: 4,
          name: 'Задание 4',
          path: 'ПР_4.docx',
          score: 400,
          answer: 'correct 4'
        },
        {
          id: 5,
          name: 'Задание 5',
          path: 'ПР_5.docx',
          score: 500,
          answer: 'correct 5'
        },
        {
          id: 6,
          name: 'Задание 6',
          path: 'ПР_6.zip',
          score: 600,
          answer: 'correct 6'
        },
        {
          id: 7,
          name: 'Задание 7',
          path: 'ПР_7.docx',
          score: 700,
          answer: 'correct 7'
        },
        {
          id: 8,
          name: 'Задание 8',
          path: 'ПР_8.docx',
          score: 800,
          answer: 'correct 8'
        }
      ]
    },
    {
      id: 1,
      name: '«Информационная безопасность»',
      tasks: [
        {
          id: 1,
          name: 'Задание 1',
          path: 'ИБ_1.docx',
          score: 100,
          answer: '55,40,23',
          tryCount: 2
        },
        {
          id: 2,
          name: 'Задание 2',
          path: 'ИБ_2.docx',
          score: 200,
          answer: '1,4'
        },
        {
          id: 3,
          name: 'Задание 3',
          path: 'ИБ_3.docx',
          score: 300,
          answer: '240'
        },
        {
          id: 4,
          name: 'Задание 4',
          path: 'ИБ_4.docx',
          score: 400,
          answer: 'Мы должны выиграть эту войну'
        },
        {
          id: 5,
          name: 'Задание 5',
          path: 'ИБ_5.docx',
          score: 500,
          answer: 'Война дает право завоевателям диктовать покоренным любые условия'
        },
        {
          id: 6,
          name: 'Задание 6',
          path: 'ИБ_6.zip',
          score: 650,
          answer: '9'
        }
      ]
    },
    {
      id: 2,
      name: 'Стеганография',
      tasks: [
        {
          id: 1,
          name: 'Задание 1',
          path: 'СТ_1.docx',
          score: 700,
          answer: 'Александр Васильевич Суворов'
        },
        {
          id: 2,
          name: 'Задание 2',
          path: 'СТ_2.docx',
          score: 850,
          answer: '22061941'
        },
        {
          id: 3,
          name: 'Задание 3',
          path: 'СТ_3.docx',
          score: 1000,
          answer: 'Иоганн Тритемий в 1499 году'
        }
      ]
    },
    {
      id: 3,
      name: 'Крипта',
      tasks: [
        {
          id: 1,
          name: 'Задание 1',
          path: 'КР_1.docx',
          score: 100,
          answer: 'вам нечего бояться, если вам нечего скрывать'
        },
        {
          id: 2,
          name: 'Задание 2',
          path: 'КР_2.docx',
          score: 200,
          answer: 'БЕСПРИНЦИПНОСТЬЭТОНЕОТСТУТСТВИЕПРИНЦИПОВАИХИЗОБИЛИЕ'
        },
        {
          id: 3,
          name: 'Задание 3',
          path: 'КР_3.docx',
          score: 300,
          answer: '220,284'
        },
        {
          id: 4,
          name: 'Задание 4',
          path: 'КР_4.docx',
          score: 400,
          answer: 'ПАРОХОД'
        },
        {
          id: 5,
          name: 'Задание 5',
          path: 'КР_5.docx',
          score: 500,
          answer: 'Защитник'
        },
        {
          id: 6,
          name: 'Задание 6',
          path: 'КР_6.docx',
          score: 600,
          answer: 'все наше достоинство заключено в мысли'
        },
        {
          id: 7,
          name: 'Задание 7',
          path: 'КР_7.docx',
          score: 700,
          answer: 'Зову тебя не для того, Чтоб укорять людей, чья злоба Убила друга моего, Иль чтоб изведать тайны гроба'
        },
        {
          id: 8,
          name: 'Задание 8',
          path: 'КР_8.docx',
          score: 800,
          answer: '4523'
        },
        {
          id: 9,
          name: 'Задание 9',
          path: 'КР_9.docx',
          score: 900,
          answer: 'ЛАМПА'
        },
        {
          id: 10,
          name: 'Задание 10',
          path: 'КР_10.docx',
          score: 1000,
          answer: '30'
        }
      ]
    },
    {
      id: 4,
      name: 'Логика',
      tasks: [
        {
          id: 1,
          name: 'Задание 1',
          path: 'Л_1.docx',
          score: 100,
          answer: 'а'
        },
        {
          id: 2,
          name: 'Задание 2',
          path: 'Л_2.docx',
          score: 200,
          answer: 'плац'
        },
        {
          id: 3,
          name: 'Задание 3',
          path: 'Л_3.docx',
          score: 300,
          answer: '5'
        },
        {
          id: 4,
          name: 'Задание 4',
          path: 'Л_4.docx',
          score: 400,
          answer: 'АПВГ'
        },
        {
          id: 5,
          name: 'Задание 5',
          path: 'Л_5.docx',
          score: 500,
          answer: '3'
        },
        {
          id: 6,
          name: 'Задание 6',
          path: 'Л_6.docx',
          score: 600,
          answer: 'эюякод'
        },
        {
          id: 7,
          name: 'Задание 7',
          path: 'Л_7.docx',
          score: 700,
          answer: 'горизонт,196'
        },
        {
          id: 8,
          name: 'Задание 8',
          path: 'Л_8.docx',
          score: 800,
          answer: '23'
        },
        {
          id: 9,
          name: 'Задание 9',
          path: 'Л_9.docx',
          score: 900,
          answer: 'нет,31'
        },
        {
          id: 10,
          name: 'Задание 10',
          path: 'Л_10.docx',
          score: 1000,
          answer: 'Успех в военном деле зиждется на воле, Драгомиров М.И.'
        }
      ]
    },
    {
      id: 5,
      name: 'Магия чисел',
      tasks: [
        {
          id: 1,
          name: 'Задание 1',
          path: 'МЧ_1.docx',
          score: 100,
          answer: '720005200'
        },
        {
          id: 2,
          name: 'Задание 2',
          path: 'МЧ_2.docx',
          score: 200,
          answer: '1',
          tryCount: 1
        },
        {
          id: 3,
          name: 'Задание 3',
          path: 'МЧ_3.docx',
          score: 300,
          answer: '6345'
        },
        {
          id: 4,
          name: 'Задание 4',
          path: 'МЧ_4.docx',
          score: 400,
          answer: '3011*3833'
        },
        {
          id: 5,
          name: 'Задание 5',
          path: 'МЧ_5.docx',
          score: 500,
          answer: '52'
        },
        {
          id: 6,
          name: 'Задание 6',
          path: 'МЧ_6.docx',
          score: 600,
          answer: '4,12,19,48'
        },
        {
          id: 7,
          name: 'Задание 7',
          path: 'МЧ_7.docx',
          score: 700,
          answer: '10,11,11111,11111,101,101,101,101,111,111,10101,11001,10101,10,11'
        },
        {
          id: 8,
          name: 'Задание 8',
          path: 'МЧ_8.docx',
          score: 800,
          answer: '7,2,3,5,4,11,6,10,1'
        },
        {
          id: 9,
          name: 'Задание 9',
          path: 'МЧ_9.docx',
          score: 900,
          answer: '9999978596061 … 99100'
        },
        {
          id: 10,
          name: 'Задание 10',
          path: 'МЧ_10.docx',
          score: 1000,
          answer: '5'
        }
      ]
    },
    {
      id: 6,
      name: 'Энигма',
      tasks: [
        {
          id: 1,
          name: 'Задание 1',
          path: 'Файлы_ЭНИГМА.zip',
          score: 100,
          answer: 'У е к д л к и м в я е к е к д м я е к'
        },
        {
          id: 2,
          name: 'Задание 2',
          path: 'Файлы_ЭНИГМА.zip',
          score: 200,
          answer: 'Один в поле не воин'
        },
        {
          id: 3,
          name: 'Задание 3',
          path: 'Файлы_ЭНИГМА.zip',
          score: 300,
          answer: 'F q a i y h l m d q o f x f k a i v m i y v m b g l'
        },
        {
          id: 4,
          name: 'Задание 4',
          path: 'Файлы_ЭНИГМА.zip',
          score: 400,
          answer: 'Славу свою добываю в бою'
        },
        {
          id: 5,
          name: 'Задание 5',
          path: 'Файлы_ЭНИГМА.zip',
          score: 500,
          answer: 'Санкт-Петербург'
        },
        {
          id: 6,
          name: 'Задание 6',
          path: 'Файлы_ЭНИГМА.zip',
          score: 600,
          answer: 'А.В.Суворов'
        },
        {
          id: 7,
          name: 'Задание 7',
          path: 'Файлы_ЭНИГМА.zip',
          score: 700,
          answer: 'Федор Ушаков, 0'
        },
        {
          id: 8,
          name: 'Задание 8',
          path: 'Файлы_ЭНИГМА.zip',
          score: 800,
          answer: 'E q t q k s n c a q m t b k n q m y n s v n b s a b m y n s v, 4'
        },
        {
          id: 9,
          name: 'Задание 9',
          path: 'Файлы_ЭНИГМА.zip',
          score: 900,
          answer: 'Орден Святого Георгия'
        },
        {
          id: 10,
          name: 'Задание 10',
          path: 'Файлы_ЭНИГМА.zip',
          score: 1000,
          answer: 'СССР, Польша'
        }
      ]
    }
  ])
}
