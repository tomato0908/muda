// HTMLからの要素の取得(表示に関する動作部分)
let rist = document.querySelector('ol#timedisplay');
let answer = document.querySelector('#answer');
let title = document.querySelector('div#title');
let inputdata = document.querySelector('#inputdata');
let pronumbox = document.querySelector('#pronumbox');
let finalcal = document.querySelector('button#finalcal');
let logdisplay = document.querySelector('#logdisplay');


logdisplay.style.display = "none";
pronumbox.style.display = "none";
finalcal.style.display = "none";



//動作の登録内容
const operation = [];
let reg = document.querySelector('button#reg');
reg.addEventListener('click',regdisplay);
const meseeage = ["" ,"手伸ばし" ,"振り向き" ,"歩行" ,"しゃがみ" ,"cm " ,"° " ,"歩 " ,"cm " ,"が" ,"されました."];

// 最終結果の値
const calsum = [];

// 登録ボタンが押された後
function regdisplay() {

    // タイトルの消去
    title.style.display ="none";

    //  その動作が削減動作か追加動作かの識別
    let elements = document.getElementsByName('switching');
    let len = elements.length;
    let checkValue = '';

    for (let i = 0; i < len; i++){
        if (elements.item(i).checked){
            checkValue = elements.item(i).value;
            console.log(checkValue);
        }
    }   

    // 各動作の数値の取得
    let hdata = document.querySelector("#hand");
    let tdata = document.querySelector("#turn");
    let sdata = document.querySelector("#step");
    let ddata = document.querySelector("#down");

    // 識別動作，各種動作の値を二次元配列に収納する
    //  [
    // [動作識別，手伸ばし，振り向き，歩行，屈み]
    // [動作識別，手伸ばし，振り向き，歩行，屈み]
    // [動作識別，手伸ばし，振り向き，歩行，屈み]．．．
    // ]
    // のように入っている
    
    const setarry =[checkValue,hdata.value, tdata.value, sdata.value, ddata.value]
    operation.push(setarry);
    
    // セットした情報の表示
    let dis = document.createElement('li');
    let caldis = document.createElement('p');

    var first = true;
    for(let i=1; i<setarry.length; i++) {

        // 値がセットされている箇所のみを表示にする．
        
       if(setarry[i]>0) {
        // 内容の言葉の説明
        dis.textContent += meseeage[i] + setarry[i] + meseeage[i+4];
        if(!first) {
            caldis.textContent += " + "
        }

        // 内容の式の表示
        switch(i) {

            case 1:
                caldis.textContent += " ( " + setarry[1] + " / 20 )";
                break;
            
            case 2:
                caldis.textContent += " ( " + setarry[2] + " × 0.6 / 90 )";
                break;

            case 3:
                caldis.textContent += " ( " + setarry[3] + " × 0.8 )";
                break;

            case 4:
                caldis.textContent += " ( " + setarry[4] + " / 20 )";
                break;
        }

        first = false;
       }
    }

    //    現在セットした動作の削減，追加動作の合計値を算出
    let a = (setarry[1]/20) + (setarry[2]*0.6/90) + (setarry[3]*0.8) + (setarry[4]/20);
    a = Math.round(a * 1000) / 1000;

    calsum.push(a);
    caldis.textContent += " = " + a + "秒";
    console.log(calsum);
   

    if(setarry[0]=="削減"){
        dis.textContent += meseeage[9]+setarry[0]+meseeage[10];
    }
    else {
        dis.textContent += meseeage[9]+setarry[0]+meseeage[10];
    }

    // consoleろぐ
    console.log("今回セットされた情報は");
    console.log(setarry);
    console.log("現在セットされている情報は");
    console.log(operation);
    console.log(dis);

    // 画面への表示
    rist.appendChild(dis);
    dis.appendChild(caldis);
    
    // 登録ボタンの出現
    logdisplay.style.display = "block";
    pronumbox.style.display = "block";
    finalcal.style.display = "block";

    // インプットboxのクリア
    hdata.value = "";
    tdata.value = "";
    sdata.value = "";
    ddata.value = "";
}



// 最終的な計算結果

finalcal.addEventListener('click',finalcaldisplay);
function finalcaldisplay() {

    // 生産台数の取得
    let pronumel = document.querySelector("#pronum");
    let pronum = pronumel.value;
    let pronumdis = document.createElement('p');
    pronumdis.textContent = "生産台数は" + pronum + " 台/日 です．"
    answer.appendChild(pronumdis);

    //  登録部分,最終登録ボタンの消去
    inputdata.style.display ="none";
    finalcal.style.display ="none";
    pronumel.style.display ="none";
    pronumbox.style.display="none";
    
    //秒数時間の合計 
    let stime = 0;
    for(let i=0; i<operation.length; i++) {
        if(operation[i][0]=="削減") {
            stime = stime + calsum[i];
        }
        else {
            stime = stime - calsum[i];
        }
    }
    stime = Math.round(stime * 1000) / 1000;

    // (合計秒数*生産台数)/60 で一日当たりの分数
    let timedis = document.createElement('p');
    let mtime = 0;
    mtime = (stime * pronum)/60; 
    mtime = Math.round(mtime * 1000) / 1000;
    timedis.textContent = stime + "(秒) × " + pronum + "(台)/60 = " + mtime + "(分/日)";

    // 活人計算
    let katuzinndis = document.createElement('p');
    let katuzinn = 0;
    katuzinn = mtime / 442;
    katuzinn = Math.round(katuzinn * 1000) / 1000; 
    katuzinndis.textContent = "活人・・" + mtime +"(分) / 442(分) = " + katuzinn + "(名)";

    // 高価金額計算
    let moneydis = document.createElement('p');
    let money = 0;
    money = katuzinn * 6919000;
    moneydis.textContent = "効果金額・・" + katuzinn + "(名) × 6,919千(円) = " + money + "(円/年)";

    // consolログ
    console.log("最終結果");
    console.log("生産台数"+pronum);
    console.log("１日の変動秒数"+stime);
    console.log("１日の変動分数"+mtime);
    console.log("活人"+katuzinn);
    console.log("効果金額"+money);

    // 画面に追加する
    answer.appendChild(timedis);
    answer.appendChild(katuzinndis);
    answer.appendChild(moneydis);

}