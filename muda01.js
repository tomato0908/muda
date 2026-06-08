// HTMLからの要素の取得(表示に関する動作部分)
let rist = document.querySelector('ol#areadisplay');
let answer = document.querySelector('#answer');
let title = document.querySelector('div#title');
let inputdata = document.querySelector('#inputdata');
let finalcal = document.querySelector('button#finalcal');
let logdisplay = document.querySelector('#logdisplay');


logdisplay.style.display = "none";
finalcal.style.display = "none";



//動作の登録内容
const operation = [];
let reg = document.querySelector('button#reg');
reg.addEventListener('click',regdisplay);

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
    let lendata = document.querySelector("#len");
    let widdata = document.querySelector("#wid");
   
    // 識別動作，各種動作の値を二次元配列に収納する
    //  [
    // [動作識別，手伸ばし，振り向き，歩行，屈み]
    // [動作識別，手伸ばし，振り向き，歩行，屈み]
    // [動作識別，手伸ばし，振り向き，歩行，屈み]．．．
    // ]
    // のように入っている
    
    const setarry =[checkValue,lendata.value, widdata.value];
    operation.push(setarry);
    
    // セットした情報の表示
    let dis = document.createElement('li');
    let caldis = document.createElement('p');

    //    現在セットした長さから面積を算出
    let a = (setarry[1])*(setarry[2]);
    a = Math.round(a * 1000) / 1000;
    calsum.push(a);

    // 計算式の登録
    caldis.textContent = setarry[1] + "(m) × " + setarry[2] + "(m) =" + a + "㎡";

    // 言葉の結果を表示
    dis.textContent += a + "㎡が";
    // console.log(calsum);
   
    if(setarry[0]=="削減"){
        dis.textContent += "削減されました．";
    }
    else {
        dis.textContent += "増加しました．";
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
    // pronumbox.style.display = "block";
    finalcal.style.display = "block";

    // インプットboxのクリア
    lendata.value = "";
    widdata.value = "";
}



// 最終的な計算結果

finalcal.addEventListener('click',finalcaldisplay);
function finalcaldisplay() {

    //  登録部分,最終登録ボタンの消去
    inputdata.style.display ="none";
    finalcal.style.display ="none";

    //増減面積の合計 
    let area = 0;
    let sumdis = document.createElement('p');

    var first = true;

    for(let i=0; i<operation.length; i++) {
        if(operation[i][0]=="削減") {
            area = area + calsum[i];
            if(first) {
                sumdis.textContent += calsum[i];
                first = false;
            }
            else {
                sumdis.textContent += " + " + calsum[i];
            }
            
        }
        else {
            area = area - calsum[i];
            if(first) {
                sumdis.textContent += calsum[i];
                first = false;
            }
            else {
                sumdis.textContent += " - " + calsum[i];
            }
        }
    }
    area = Math.round(area * 1000) / 1000;
    sumdis.textContent += " = " + area;

    // 活スペース計算
    let katuareadis = document.createElement('p');
    katuareadis.textContent = "活人スペース・・" + area +"(㎡)";

    // 高価金額計算
    let moneydis = document.createElement('p');
    let money = 0;
    money = area * 12036;
    money = Math.round(money * 1000)/1000;
    moneydis.textContent = "効果金額・・" + area + "(㎡) × 12036(円) = " + money + "(円/年)";

    // consolログ
    console.log("最終結果");
    console.log("変動面積"+area);
    console.log("活人スペース"+area);
    console.log("効果金額"+money);

    // 画面に追加する
    answer.appendChild(sumdis);
    answer.appendChild(katuareadis);
    answer.appendChild(moneydis);

}