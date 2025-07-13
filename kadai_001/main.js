let untyped = '';
let typed = '';
let score = 0;

const untypedfield = document.getElementById('untyped');
const typedfield = document.getElementById("typed");
const wrap = document.getElementById('wrap')
const start = document.getElementById('start')
const scorePoint = document.getElementById('score-p')


const textLists = [
  'Hello World','This is my App','How are you?',
  'Today is sunny','I love JavaScript!','Good morning',
  'I am Japanese','Let it be','Samurai',
  'Typing Game','Information Technology',
  'I want to be a programmer','What day is today?',
  'I want to build a web app','Nice to meet you',
  'Chrome Firefox Edge Safari','machine learning',
  'Brendan Eich','John Resig','React Vue Angular',
  'Netscape Communications','undefined null NaN',
  'Thank you very much','Google Apple Facebook Amazon',
  'ECMAScript','console.log','for while if switch',
  'var let const','Windows Mac Linux iOS Android',
  'programming'
];

const createText = () => {
    // 正タイプした文字列をクリア
    typed = '';
    typedfield.textContent = typed;
  
  let random =Math.floor(Math.random() * textLists.length);
  untyped = textLists[random];
  untypedfield.textContent = untyped;
};
// createText();


const keyPress = e => {
 console.log(e.key);

   // 誤タイプの場合
  if(e.key !== untyped.substring(0,1)) {
    wrap.classList.add('mistyped')
    setTimeout(() => {
      wrap.classList.remove('mistyped');
    }, 100);
    return;
  }

    // 正タイプの場合
  // wrap.classList.remove('mistyped')
  score++;
  typed += untyped.substring(0,1);
  untyped = untyped.substring(1);
  typedfield.textContent =typed;
  untypedfield.textContent = untyped;
  scorePoint.textContent = score;       //課題1

   // テキストがなくなったら新しいテキストを表示
   if(untyped === '') {
    createText();
   }
};

const rankCheck = score => {
  // return `${score}文字打てました！`

  let text = '';
  if(score < 100) {
    text = `あなたのランクはCです。\nBランクまであと${100 - score}文字です。`;
  } else if(score < 200) {
    text = `あなたのランクはBです。\nAランクまであと${200 - score}文字です。`;    
  } else if(score < 300) {
    text = `あなたのランクはAです。\nSランクまであと${300 - score}文字です。`;    
  } else if(score >= 300) {
    text = `あなたのランクはSです。\nおめでとうございます!`;  
  }

  // 生成したメッセージと一緒に文字列を返す
  return `${score}文字打てました!\n${text}\n【OK】リトライ / 【キャンセル】終了`

};

const gameOver = id => {
 clearInterval(id);

//  console.log('ゲーム終了!')
 const result = confirm(rankCheck(score));    //なぜresultを定義するだけで実行される

   // OKボタンをクリックされたらリロードする
  if(result == true) {
    window.location.reload();
  }

};

const timer = () => {
  let time = count.textContent;

  const id = setInterval(() => {
     time--;                          //なぜ文字列？のtimeがこれでカウントダウンできる
     count.textContent = time;

     if(time <= 0) {
      gameOver(id);               //なぜここにid？循環参照にならない。なぜ関数内に関数
     }
  }, 1000);
};

// キーボードのイベント処理
// document.addEventListener('keypress', keyPress);

// ゲームスタート時の処理
start.addEventListener('click', ()=> {
   // カウントダウンタイマーを開始する
  timer();

    // ランダムなテキストを表示する
  createText();

    // 「スタート」ボタンを非表示にする
  start.style.display = 'none';

    // キーボードのイベント処理
  document.addEventListener('keypress', keyPress);
});

untypedfield.textContent = 'スタートボタンで開始';
