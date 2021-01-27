//=============================================================================
// Mano_InputConfig.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017-2021 Sigureya
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// ver 5.0.3 2020/12/30
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/Sigureya/
//=============================================================================

/*:
 * @plugindesc コントローラ(ゲームパッド)・キーボードの設定を変更できます。
 * ユーザーが入力を拡張する場合の補助も行います。
 * @author しぐれん(https://github.com/Sigureya/RPGmakerMV)
 * @url https://raw.githubusercontent.com/Sigureya/RPGmakerMZ/master/Mano_InputConfig.js
 * 
 * @target MZ
 * @command IsKeyboardValid
 * @desc キーボードの設定が正しい場合、指定スイッチをONにします。
 * @arg switchId
 * @type switch
 * @default 0
 * @desc 結果を保存するスイッチ
 * Where to save the results
 *  
 * @param mapperOk
 * @text 決定/ok
 * @type struct<MultiLangString>
 * @default {"en":"ok","jp":"決定"}
 * 
 * @param mapperCancel
 * @text 取り消し/cancle
 * @type struct<MultiLangString>
 * @default {"en":"cancel","jp":"キャンセル"}
 * 
 * @param mapperShift
 * @text ダッシュ/dash
 * @type struct<MultiLangString>
 * @default {"en":"dash","jp":"ダッシュ"}
 * 
 * @param mapperMenu
 * @text メニュー/menu
 * @type struct<MultiLangString>
 * @default {"en":"menu","jp":"メニュー"}
 * 
 * @param mapperEscape
 * @text メニュー(2)/menu(2)
 * @type struct<MultiLangString>
 * @default {"en":"menu/cancel","jp":"メニュー/キャンセル"}
 * 
 * 
 * @param mapperPageup
 * @text 次/next
 * @type struct<MultiLangString>
 * @default {"en":"next","jp":"次"}
 * 
 * @param mapperPagedown
 * @text 前/prev
 * @type struct<MultiLangString>
 * @default {"en":"prev","jp":"前"}
 * 
 * @param mapperDelete
 * @text 設定を消去/delete
 * @type struct<MultiLangString>
 * @default {"en":"delete","jp":"設定を消去"}
 * 
 * 
 * @param extendsMapper
 * @text 入力拡張/inputExtension
 * @type struct<InputDefine>[]
 * @default []
 * 
 * @param overwriteWarning
 * @text 上書き警告
 * @desc このプラグインで割り当てたボタン設定が、既存の入力に対して上書きしている場合にconsoleへ警告を出します
 * @type boolean
 * @default true
 *
 * 
 * @param GamepadIsNotConnected
 * @text 未接続/GamepadIsNotConnected
 * @desc ゲームパッドが接続されていない場合の文章です。
 * @type note
 * @default "ゲームパッドが接続されていません\nボタンを押して再度試してください"
 * 
 * @param needButtonDetouch
 * @text ボタンから手を放すように促すメッセージ
 * @desc キーコンフィグはボタンから手を離さない限り終了しません。
 * 手を放すように促すメッセージを設定します。
 * @type note
 * @default "コンフィグを終了するためには\nボタンから手を放してください。"
 * 
 * @param apply
 * @text 設定の保存/apply
 * @type struct<KeyconfigCommand>
 * @default {"width":"4","text":"{\"jp\":\"設定を保存\",\"en\":\"save settings\"}"}
 * 
 * @param rollback
 * @text 変更を破棄/rollback
 * @type struct<KeyconfigCommand>
 * @default {"width":"4","text":"{\"jp\":\"変更前に戻す\",\"en\":\"rollback\"}"}
 * 
 * @param reset
 * @text 初期設定に戻す/reset
 * @type struct<KeyconfigCommand>
 * @default {"width":"4","text":"{\"jp\":\"初期設定に戻す\",\"en\":\"reset\"}"}
 * 
 * @param WASD
 * @type struct<KeyconfigCommand>
 * @default {"width":"3","text":"{\"jp\":\"WASD\",\"en\":\"WASD\"}"}
 * 
 * @param changeLayout
 * @text JIS/US
 * @type struct<KeyconfigCommand>
 * @default {"width":"3","text":"{\"jp\":\"JIS/US\",\"en\":\"JIS/US\"}"}
 * 
 * @param exit
 * @text やめる/exit
 * @type struct<KeyconfigCommand>
 * @default {"width":"3","text":"{\"jp\":\"やめる\",\"en\":\"exit\"}"}
 * 
 * @param gamepadConfigCommandText
 * @desc ゲームパッドコンフィグを開くコマンドの名前です
 * @type struct<MultiLangString>
 * @default {"en":"gamepad config","jp":"ゲームパッドコンフィグ"}
 * 
 * @param keyConfigCommandText
 * @desc キーコンフィグを開くコマンドの名前です
 * @type struct<MultiLangString>
 * @default {"en":"keyboard config","jp":"キーコンフィグ"}
 * 
 * 
 * @help
 * ※日本語テキストは下の方にあるのでスクロールしてください
 * 
 * Loads the game startup settings as default values.
 * Detects input changes regardless of where the plugin is installed.
 * It is OK even if the button is modified by another plug-in.
 *
 * The config data set by this plug-in is recorded in a file.
 * If you install a new plugin,
 * Reset the config with "Reset to default" after starting the game.
 *
 * ■ What to do if strange characters such as "? KEY: Symbol" are displayed
 * Occurs because the input added by other plugins is unknown.
 * If the above display is displayed, you can handle it by adding an element to extendsMapper.
 * After adding the element, copy the character of the part corresponding to KEY and copy it to KeySetting. * 
 * 
 * ゲームの起動時の設定をデフォルト値として読み込みます。
 * プラグインの導入位置に関わらず、入力の変更を検知します。
 * 他のプラグインでボタンが改造されていてもOKです。
 * 
 * このプラグインで設定したコンフィグデータは、ファイルに記録されます。
 * 新しいプラグインを入れた場合、
 * ゲーム起動後にコンフィグを「初期設定に戻す」でリセットしてください。
 * 
 * ■"?KEY:Symbol"のような変な文字が表示される場合の対処法
 * 他のプラグインによって追加された入力が不明なために発生します。
 * 上記のような表示が出ている場合、extendsMapperに要素を追加することで対応できます。
 * 要素を追加したのち、KEYにあたる部分の文字をコピーして、KeySettingにコピーしてください。
 * 
 * ■スクリプトで遷移を制御したい場合
 * 他のプラグインを改造したり、スクリプトで直接シーンを切り替える時に使います。
 * SceneManager.push(Mano_InputConfig.Scene_GamepadConfig  );  //ゲームパッドコンフィグ
 * SceneManager.push(Mano_InputConfig.Scene_KeyConfig );       // キーボードコンフィグ
 * これで、指定されたシーンに移動できます。
 * 
 * 2021/01/27 ver 5.2
 * 不明なシンボルの表示機能を強化
 * 
 * 
 * 更新履歴
 * 2021/01/23 ver5.1.0
 * 画面レイアウトを変更
 * 必須シンボルの扱いを調整
 * 不明なシンボルがある場合、画面上部へ表示するようにした
 * 
 * 2020/12/25 ver5.0.3
 * 必須シンボルチェックの動作が正しくなかったのを修正
 * バージョン管理を修正し、番号付けを変更。
 * 
 * 2020/12/25 ver5.0.2(旧5.2)
 * 拡張シンボル設定にバグがあったので修正
 * 
 * 2020/11/26 ver5.0.1(旧5.1)
 * プラグインが起動できないバグがあったので修正
 * 
 * 2020/11/24 ver5.0
 * プラグインパラメータを再設計。
 * 内部実装であるsymbolを意識する必要が無くなりました。
 * 
 * 2020/08/23 ver4.0
 * ツクールMZに対応。
 * 基本システムはMZ向けに最適化し、MVはラッパーで調整
 * 
 * 2020/05/25 ver 3.2
 * YEP_OptionCoreと競合するので、対策処理を追加。
 * 
 * 2020/04/01 ver 3.1
 * 英語対応につきヘルプを追加。
 * 
 * 2020/03/14 ver3.0
 * WASD移動を設定できる機能を追加。
 * キーコンフィグの内部実装を大幅改造。
 * 
 * 2020/02/26 ver2.9
 * コンフィグから抜けた際にボタンが連打されてしまう問題を対策。
 * RPGアツマールにおいて、他のゲームとコンフィグ設定が混ざる問題を修正。
 * 別プラグインとの競合があったので対策
 * symbolAutoSelectがキーコンフィグで機能していなかったのを修正。
 * 
 * 2019/07/12 ver2.81
 * ゲームパッドのハードごとの識別情報を表示する機能を追加。
 * 
 * 2019/07/06 ver2.8
 * 外部プラグインによって追加されたmapperのsymbolを強制的に取り込む機能。
 * プラグインパラメータで無効化できます。
 * 
 * 2019/03/19 ver2.7
 * キーボードに任意の初期設定を割り当てる機能を追加。
 * 
 * 2018/09/28 ver2.6
 * ゲームパッドコンフィグを改造すると誤作動があったので、誤作動を減らす改造。
 * また、プラグインの位置に関わらず入力の変更を捕まえられるように。
 * 
 * 2018/06/25 ver 2.5
 * 色々あった細かいバグ修正を重ねた最新版。
 * 
 * 2017/10/21 ver 2.2　更新
 * 外部から追加したシンボルがsymbolsと重複していた場合、追加しないようにした。
 * USキー配列に仮対応。
 * 
 * 2017/10/18 ver 2.1　更新
 * キーボードで目立ったバグの報告がなかったため、2.0に。
 * 外部からコンフィグを改造できる機能を導入。
 * 
 * 2017/10/13 ver 1.9　更新
 * キーボードのコンフィグにも対応。
 * 仕様が固まっていないので、1.9とします。
 * 2017/10/05 ver 1.0　公開
 * 
 */
/**
//処理の流れ
//パラメータから、命名済みのアクションをすべて設定する
//該当のリストからsymbol/name間の対応表を作る
//全てのシンボルを読み出し、対応表にないものにunknowで対応表に入れる

/*~struct~InputDefine:
 * メモ：キーボードとボタンを結びつけつつ、シンボルを書かずに割り当て
 * キーとボタンのどちらかに設定があれば、もう一方へ取り込む
 * 両方にデータがある場合、エラーで落とす
 * 次回更新の目玉
 * 
 * @param keys
 * @text キー設定/keySetting
 * @desc 半角英字で設定。例：ASD
 * Set the key corresponding to the action (ex:ASD)
 * 
 * @param button
 * @text パッドボタン/padButton
 * @desc ゲームパッドのボタン設定です。
 * スタンダードレイアウト基準(PSコン基準でも可)
 * @type select
 * @default NaN
 * @option none
 * @value NaN
 * @option 0(B/×)
 * @value 0
 * @option 1(A/○)
 * @value 1
 * @option 2(X/□)
 * @value 2
 * @option 3(Y/△)
 * @value 3
 * @option 4(L1)
 * @value 4
 * @option 5(R1)
 * @value 5
 * @option 6(L2)
 * @value 6
 * @option 7(R2)
 * @value 7
 * @option 8(select)
 * @value 8
 * @option 9(start)
 * @value 9
 * @option 10(L3)
 * @value 10
 * @option 11(R3)
 * @value 11
 * @option 16(center)
 * @value 16
 * 
 *
 * @param mandatory
 * @text 必須フラグ/mandatory
 * @type boolean
 * @default false
 * 
 * @param overwrite
 * @text 上書き/overwrite
 * @desc シンボル書き込みの際に上書きの有無を設定します
 * @type boolean
 * @default false
 * 
 * @param name
 * @text 行動名/actionName
 * @desc 言語別に行動の説明を入力します
 * @type struct<MultiLangString>
 * @default {"jp":"","en":""}
 * 
 */


/*~struct~ButtonInfo:
 *
 * @param buttonName
 * @text ボタンの名前
 * @desc ボタンの名前
 * 
 * @param action
 * @desc 割り当てる機能
 * @type combo
 * @option ok
 * @option cancel
 * @option shift
 * @option menu
 * @option pageup
 * @option pagedown
 * @default 
 * 
 * @param keys
 * @text キーボード設定(SHIFTなどは不可)
 * @desc 入力を設定するキーボードの一覧です。(英数指定)
 * ASDと書いた場合、ASDの3つのキーにシンボルが入ります。
 */
 /*~struct~MultiLangNote:
  * @param jp
  *  @text 日本語
  *  @type multiline_string
  *  @type note

  *  @param en
  *  @type multiline_string
  *  @type note
 */
 /*~struct~MultiLangNoteFull:
  * @param jp
  *  @text 日本語
  *  @type multiline_string
  *  @type note

  *  @param en
  *  @type multiline_string
  *  @type note

  *  @param ch
  *  @text 中文
  *  @type multiline_string
  *  @type note

  *  @param ko
  *  @text 한국
  *  @type multiline_string
  *  @type note

  *  @param ge
  *  @text Deutsche
  *  @type multiline_string
  *  @type note

  *  @param fr
  *  @text français
  *  @type multiline_string
  *  @type note

  *  @param ru
  *  @text русский
  *  @type multiline_string
  *  @type note
 */
 /*~struct~MultiLangString:
  * @param jp
  * @text 日本語

  * @param en
  * @text English
 */

 /*~struct~MultiLangStringFull:
  * @param jp
    @text 日本語

    @param en
    @text English

    @param ch
    @text 中文

    @param ko
    @text 한국

    @param ge
    @text Deutsche

    @param fr
    @text français

    @param ru
    @text русский
 */
 /*~struct~KeyconfigCommand:
  * 
  * @param width
  * @desc コマンドの幅
  * @type number
  * @min 0
  * @max 10
  * @default 3
  * 
  * @param text
  * @type struct<MultiLangString>
  * @default {}
  * 
*/
 /*~struct~ColorDefine:
  * 
  * @param 
  * @desc コマンドの幅
  * @type number
  * @min 0
  * @max 10
  * @default 3
  * 
  * @param mandatory
  * @default 
  * 
  * @param extends
  * @type struct<MultiLangString>
  * @default {}
  * 
*/

var Imported = Imported || {};
if(Imported.Mano_InputConfig){
    throw new Error("Mano_InputConfig is Duplicate")
}
Imported.Mano_InputConfig = true;

var Mano_InputConfig=( function(){
    'use strict'
    const  PLUGIN_NAME='Mano_InputConfig';
    const IS_Atsumaru = location.hostname==="html5.nicogame.jp";

/**
 * @param {Window_Base} window_ 
 * @param {Rectangle} rect 
 * @param {(window:Window_Base,rect:Rectangle)=>void} initFunction
 */
function window_initializeMVMZ(window_,rect,initFuncton){
    if(Utils.RPGMAKER_NAME==="MZ"){
        initFuncton.call(window_,rect);
        return
    }
    if(Utils.RPGMAKER_NAME==="MV"){
        initFuncton.call(window_,rect.x,rect.y,rect.width,rect.height);
        return;
    }
    throw( new Error("Unknow RPG MAKER:"+Utils.RPGMAKER_NAME));
}

function objectClone(obj){
    var result ={};
    Object.keys(obj).forEach(function(key){
        result[key] = obj[key];
    })
    return result;
}

//言語判定
//本体の処理タイミングがおかしいので、コピペしてきた
const isJapanese = function() {
    return $dataSystem.locale.match(/^ja/);
};
const isChinese = function() {
    return $dataSystem.locale.match(/^zh/);
};

const isKorean = function() {
    return $dataSystem.locale.match(/^ko/);
};

const isRussian = function() {
    return $dataSystem.locale.match(/^ru/);
};
class MultiLanguageText{
    constructor(){
        this.setNameEN("");
        this.setNameJP("");
        this.setDefaultName("");
    }
    static create(objText){
        const obj = JSON.parse(objText);
        const mtext = new MultiLanguageText();
        mtext.setNameJP(obj.jp);
        mtext.setNameEN(obj.en);

        return mtext;
    }
    /**
     * @param {String} name 
     */
    setNameJP(name){
        this.ja_JP =name;
    }
    /**
     * @param {String} name 
     */
    setNameEN(name){
        this.en_US =name;
    }
    /**
     * @param {String} name 
     */
    setDefaultName(name){
        this._defaultName=name;
    }
    isUnknow(){
        return this._defaultName[0]==="?";
    }
    refresh(){
        if(!this.isUnknow()){
            this.setDefaultName(this.currentName());
        }
    }
    currentName(){
        if(isJapanese()){
            return this.ja_JP;
        }
        return this.en_US;
    }

    name(){
        return this._defaultName;
    }
}
class SymbolColorManager_T{
    emptyColor(){
        return "#000000";
    }
    mandatoryColor(){
        return "#22e488";
    }
    normalColor(){
        return "#880000";
    }
    moveSymbolColor(){
        return this.mandatoryColor();
    }
}
const SymbolColorManager = new SymbolColorManager_T();
class I_SymbolDefine{

    symbolBackColor(){
        return this.backColor();
    }
    /**
     * @desc keyconfigで使う背景色
     */
    keyBackColor(){
        return "#ffd530" ;
        return this.backColor();
    }
    customBackColor(){
        return "";
    }
    backColor(){
        const  custom = this.customBackColor();
        if(custom){
            return custom;
        }
        if(this.isMandatory()){
            return SymbolColorManager.mandatoryColor()
        }
        if(this.isEmpty()){
            return SymbolColorManager.emptyColor();
        }
        return SymbolColorManager.normalColor();
    }

    textColor(){
        return "#ffd530";
    }
    isUnknow(){
        return false;
    }
    name(){
        return "";
    }
    isEnabled(){
        return !this.isEmpty();
    }
    symbol(){
        return "";
    }
    isMandatory(){
        return false;
    }
    isEmpty(){
        return !this.symbol();
    }
    //TODO:将来的にキーコンフィグでのシンボル表示を改造できるようにするため
    //今のところは準備工事にとどめる
    displayName(){
        return this.symbol();
    }
    helpText(){
        if(this.isEmpty()){
            return "シンボルが設定されていません\nプラグインパラメータから拡張設定の内容を確認してください";
        }
        return "";
    }
}
class MoveDefine extends I_SymbolDefine{
    constructor(symbol,name){
        super();
        this._symbol =symbol;
        this._name =name;
    }
    backColor(){
        return SymbolColorManager.moveSymbolColor();
    }
    symbol(){
        return this._symbol;
    }
    name(){
        return this._name;
    }
    displayName(){
        return this._name;
    }
    // isMandatory(){
    //     return true;
    // }
}
function createMoveSymbols(){
    const up = new MoveDefine("up","↑");
    const down = new MoveDefine("down","↓");
    const left =new MoveDefine("left","←");
    const right =new MoveDefine("right","→");
    return [up,down,left,right];
}
class SymbolDeleteObject extends I_SymbolDefine{
    isEnabled(){
        return true;
    }
    name(){
        return setting.mapperDelete.currentName();
    }
    symbol(){
        return null;
    }
    helpText(){
        return this.name();
    }
}
class EscapeSymbol extends I_SymbolDefine{
    /**
     * @param {MultiLanguageText} name 
     */
    constructor(name){
        super();
        this._name =name;
    }
    name(){
        return this._name.currentName();
    }
    symbol(){
        return "escape";
    }
    backColor(){
        return SymbolColorManager.mandatoryColor();
    }
}
class StandardSymbol extends I_SymbolDefine{
    /**
     * @param {String} symbol 
     * @param {MultiLanguageText} name 
     */
    constructor(symbol,name){
        super();
        this._symbol = symbol;
        this._name =name;
    }
    isMandatory(){
        return true;
    }
    name(){
        return this._name.currentName();
    }
    symbol(){
        return this._symbol;
    }
}
function basicSymbols(){
    const param = getParam();
    const ok =createDefaultKeyMapperItem("ok",param.mapperOk);
    const cancel = createDefaultKeyMapperItem("cancel",param.mapperCancel);
    const shift = createDefaultKeyMapperItem("shift",param.mapperShift);
    const menu = createDefaultKeyMapperItem("menu",param.mapperMenu);
    const pageup =createDefaultKeyMapperItem("pageup",param.mapperPageup)
    const pagedonw =createDefaultKeyMapperItem("pagedown",param.mapperPagedown);

    const escapeText = MultiLanguageText.create(param.mapperEscape);
    const escape = new EscapeSymbol(escapeText);
//    const escape =createDefaultKeyMapperItem("escape",param.mapperEscape);
    return [ok,cancel,shift,menu,pageup,pagedonw,escape];
}
class ExtendsSymbol extends I_SymbolDefine{
    /**
     * @param {MultiLanguageText} actionName 
     * @param {Number} buttonId 
     * @param {String} keys 
     */
    constructor(actionName,buttonId,keys){
        super();
        this._symbol ="";
        this._keys = keys ||"";
        this._buttonId =buttonId;
        this._actionName = actionName;
        this._overwriteEnabled =false;
        this.setMandatory(false);
    }
    setMandatory(value){
        this._mandatory = value;
    }
    name(){
        return this._actionName.currentName();
    }
    symbol(){
        return this._symbol;
    }
    /**
     * @returns {String}
     */
    padSymbol(){
        return Input.gamepadMapper[this._buttonId];
    }
        /**
     * @returns {String}
     */
    firstKeySymbol(){
        const charLen =this._keys.length;
        for(let i =0; i <charLen; ++i){
           const char_=  this._keys.charCodeAt(i);
           const symbol = Input.keyMapper[char_];
           if(symbol){
               return symbol;
           }
        }
        return null;
    }
    loadSymbol(){
        if(!this._symbol){
            const symbol =(this.padSymbol() || this.firstKeySymbol());
            this._symbol = symbol;
        }
        if(this.isEmpty()){
            this.setMandatory(false);
        }
    }
     mapperWrite(mapper,targetKey){
        if(!this._overwriteEnabled){
            const oldSymbol =mapper[targetKey];	
            if(oldSymbol){
                return;
            }
        }
        mapper[targetKey]= this._symbol;	
     }
     //TODO:前回消してしまったので、作り直し
    fillSymbol(){
        if(!this._symbol){return;}
        if(!isNaN( this._buttonId)){
            this.mapperWrite(Input.gamepadMapper,this._buttonId);
        }
        const len = this._keys.length;
        for(let i =0; i< len;++i){
            this.mapperWrite(Input.keyMapper,this._keys.charCodeAt(i));
        }
    }
}

function extendsSymbols(){
    const param = getParam();
    /**
     * @type {String[]}
     */
    const textList = JSON.parse(param.extendsMapper);
    const listX = textList.map((text)=>{
        const obj = JSON.parse(text);
        const mtext = MultiLanguageText.create(obj.name);
        const def = new ExtendsSymbol(mtext, Number(obj.button), String(obj.keys||""));
        def.setMandatory(obj.mandatory ==="true");
        return def;
    });
    for (const iterator of listX) {
        iterator.loadSymbol();
    }

    return listX;
}
/**
 * @param {String} symbol 
 */
function KeyWithTheSymbolPlaced(symbol){
    let keys ="";
    keyMapperFor(function(key,value){
        if(value===symbol){
            const keyN =Number(key);
            if(keyN >=48 && keyN<=90){
                const k=String.fromCodePoint(key);
                keys+=k;
            }
        }
    });
    return keys;
}

/**
 * @param {String} symbol 
 */
function buttonWithTheSymbolPlaced(symbol){
    for (const iterator of Object.entries(Input.gamepadMapper)) {
        if(iterator[1]===symbol){
            return Number(iterator[0]);
        }
    }
    return NaN;
}

/**
 * @param {any} mapper 
 * @param {(key:String,value:String)=>void} func 
 */
function mapperFor(mapper,func){
    for (const key in mapper) {
        if (mapper.hasOwnProperty(key)) {
            const element = mapper[key];
            func(key,element);
        }
    }
}
/**
 * @param {(key:String,value:String)=>void} func 
 */
function gamepadMapperFor(func){
    mapperFor(Input.gamepadMapper,func);
}
/**
 * @param {(key:String,value:String)=>void} func 
 */
function keyMapperFor(func){
    mapperFor(Input.keyMapper,func);
}


class UnknowSymbol extends I_SymbolDefine{
    /**
     * @param {String} symbol 
     */
    constructor(symbol){
        super();
        this._kesy = KeyWithTheSymbolPlaced(symbol);
        this._buttonId = buttonWithTheSymbolPlaced(symbol);
        this._symbol = symbol;
    }
    symbol(){
        return this._symbol;
    }
    
    name(){
        return "?"+this.buttonIdText()+this._kesy+":"+this.symbol();
    }
    buttonIdText(){
        if(isNaN(this._buttonId)){
            return "";
        }
        return "("+this._buttonId +")";
    }
    isUnknow(){
        return true;
    }

    paramSettingGuide(){
        return "button:"+this._buttonId +"  keys:"+this._kesy;
    }
    helpText(){
        return "不明なシンボルです 入力拡張に項目を追加してください\n"+this.paramSettingGuide();
    }
}
/**
 * @param {String} symbol 
 */
function createUnknowSymbolObject(symbol){
    return new UnknowSymbol(symbol);
}
class SymbolMapper_T{
    constructor(){
        /**
         * @type {Map<String,I_SymbolDefine>}
         */
        this._symbolDictionary = new Map();
        /**
         * @type {UnknowSymbol[]}
         */
        this._unknowList=[];
        this._basicSymbols = basicSymbols();
        this._extendSymbols = extendsSymbols();
        this._moveSymbols = createMoveSymbols();
        this.addDictionaryItems(this._basicSymbols);
        this.addDictionaryItems(this._moveSymbols);
    }
    onBoot(){
        this.loadExtendsSymbols();
        this.loadUnknowSymbols();
    }
    loadExtendsSymbols(){
        for (const iterator of this._extendSymbols) {
            iterator.loadSymbol();
        }
        for (const iterator of this._extendSymbols) {
            iterator.fillSymbol();
        }
        //他のプラグインによる設定が完了した後で呼び出される
        //なので、このタイミングで行う必要がある
        this.addDictionaryItems(this._extendSymbols);
    }
    loadUnknowSymbols(){
        /**
         * @type {String}
         */
        const padSymbols = Object.values(Input.gamepadMapper);
        const set = new Set(padSymbols);
        for (const iterator of Object.values(Input.keyMapper)) {
            set.add(iterator);
        }
        for (const iterator of this.getSymbolList()) {
            const symbol = iterator.symbol();
            if (symbol) {
                set.delete(symbol);
            }
        }
        for (const iterator of this.systemSymbols()) {
            set.delete(iterator);
        }
        set.forEach((unknowSymbol)=>{
            const obj =createUnknowSymbolObject(unknowSymbol)
            this._unknowList.push( obj);
            this._symbolDictionary.set(unknowSymbol,obj);
        });
    }

    /**
     * @param {I_SymbolDefine[]} list 
     */
    addDictionaryItems(list){
        for (const iterator of list) {
            const symbol = iterator.symbol();
            if(symbol){
                this._symbolDictionary.set(symbol,iterator);
            }
        }
    }

    getUnknowSymbols(){
        return this.getSymbolList().filter((def)=>{ return def.isUnknow()})
    }

    /**
     * @returns {I_SymbolDefine[]}
     */
    getSymbolList(){
        return this._basicSymbols.concat(this._extendSymbols,this._unknowList,[ new SymbolDeleteObject() ]);
    }

    /**
     * @param {String} symbol 
     */
    actionName(symbol){
        if(!symbol){ return "";}
        const item = this.findSymbol(symbol);
        if(item){  return item.name();}
        return "unknow:"+symbol;
    }

    /**
     * @param {String} symbol 
     */
    findSymbol(symbol){
        return this._symbolDictionary.get(symbol);
    }

    systemSymbols(){
        //TODO:移動系シンボルをここから外しても動くように改造するかもしれない
        return ["debug","control","tab","up","down","left","right"];
    }
    getMandatorySymbols(){
        const src= this._list.
        filter(function(def){return def.isMandatory()})
        .map(function(def2){return def2.symbol()});
        return new Set(src);
    }
    /**
     * @param {String} symbol 
     */
    isMandatorySymbol(symbol){
        if(!symbol){
            return false;
        }
        const def = this._symbolDictionary.get(symbol);
        if(def){
            return def.isMandatory();
        }
        return false;
    }

    /**
     * @returns {I_SymbolDefine[]}
     */
    allMandatorySymbols(){
        return this.getSymbolList().filter( (def)=>{ return def.isMandatory()});
    }

    isValidMapper(mapper){
        /**
         * @type {Set<String>}
         */
        const set  = new Set(Object.values(mapper));
        const m=this.allMandatorySymbols()
        for (const iterator of m) {
            const symbol = iterator.symbol();
            if(Input._isEscapeCompatible(symbol)){
                if(set.has("escape")){
                    continue;
                }
            }
            if(!set.has(symbol)){
                return false;
            }
        }
        return true;
    }
}
const symbolMapper = new SymbolMapper_T([]);
class GamepadButton{
    /**
     * @param {Number} buttonId 
     * @param {String} name 
     */
    constructor(buttonId,name){
        this.setName(name);
        this.setButtonId(buttonId);
    }
    /**
     * @param {String} name 
     */
    setName(name){
        this._name =name;
    }
    /**
     * @param {Number} buttonId 
     */
    setButtonId(buttonId){
        this._buttonId=buttonId;
    }
    name(){
        return this._name;
    }
    buttonId(){
        return this._buttonId;
    }
    text(){
        const buttonNumber= this._buttonId.toString().padStart(2,"  ");
        return buttonNumber +":"+this.name();
    }
    color(){
        return "#000000";
    }
}
//ボタンの名前を入れておくクラス
//また、編集可能なボタンを制御する際にも使う
class Gamepad{
    constructor(){
        const buttons =[
            new GamepadButton(0,"B/×"),
            new GamepadButton(1,"A/○"),
            new GamepadButton(2,"X/□"),
            new GamepadButton(3,"Y/△"),
            new GamepadButton(4,"L1"),
            new GamepadButton(5,"R1"),
            new GamepadButton(6,"L2"),
            new GamepadButton(7,"R2"),
            new GamepadButton(8,"select"),
            new GamepadButton(9,"start"),
            new GamepadButton(10,"L3"),
            new GamepadButton(11,"R3"),
            new GamepadButton(16,"center")
        ];//.map(function(g){return Object.freeze(g)});
        this._list = buttons;// Object.freeze(buttons);
    }
    maxItems(){
        return this._list.length;
    }
    indexOf(buttonNumber){
        return -1;
    }
    button(index){
        return this._list[index];
    }
    buttons(){
        return this._list;
    }
    /**
     * @param {Number} index
     */
    buttonName(index){
        const b = this.button(index);
        if(b){ return b.name();}
        return "";
    }
    createUnknowSymbolGuide(){
        for (const button of this._list) {
//            button.
        }
    }
}

function getParam(){
    return PluginManager.parameters(PLUGIN_NAME);
}
/**
 * @return {string[]}
 */
function createMandatorySymbols(params){
    return ["ok","cancel","menu"];
}
/**
 * @param {String} text 
 * @returns {String}
 */
function noteOrString(text){
    if(text ==undefined){
        return "undefined"
    }
    const last = text[text.length-1]
    if(text[0]==='"'&&last ==='"'){
        return JSON.parse(text);
    }
    return String(text);
}
/**
 * 
 * @param {String} symbol 
 * @param {String} objText 
 */
function createDefaultKeyMapperItem(symbol,objText){
    const mtext = MultiLanguageText.create(objText);
    return new StandardSymbol(symbol,mtext);
}

const setting = (function(){
    const params = getParam();
    const keyText ={
        up:"↑",
        down:"↓",
        right:"→",
        left:"←"
    };

    const guid = new MultiLanguageText();
    guid.setNameJP()
    const result= {

        keyWindowLineHeight:22,
        gamepad :new Gamepad(),
        overwriteWarning:(params.overwriteWarning==='true'),
        keyText:keyText,
        emptySymbolText:String(params.textEmpty),
        /**
         * @type {String}
         */
        needButtonDetouch:noteOrString(params.needButtonDetouch),
        /**
         * @type {String}
         */
        gamepadIsNotConnected: noteOrString(params.GamepadIsNotConnected),
        mandatorySymbols:createMandatorySymbols(params),
        windowSymbolListWidht:Number(params.windowSymbolListWidth),
        gamepadConfigCommandText:MultiLanguageText.create(params.gamepadConfigCommandText),
        keyConfigCommandText:MultiLanguageText.create(params.keyConfigCommandText),
        windowCustom:{
            gamepadWidth :240,
            symbolWidth:148,
        },
        mapperDelete:MultiLanguageText.create(params.mapperDelete),
        numVisibleRows:16,//Number(params.numVisibleRows),
        cols:4,
    };
    return result;
})();
/**
 * @param {String} base 
 */
function makeCONFIG_KEY(base) {
    if(IS_Atsumaru){
        return base +location.pathname;
    }
    return base;
}

const MA_KEYBOARD_CONFIG =makeCONFIG_KEY('KEYBOARD_CONFIG');
const MA_GAMEPAD_CONFIG = makeCONFIG_KEY('GAMEPAD_CONFIG');
const MA_KEYBOARD_LAYOUT =makeCONFIG_KEY('KEYBOARD_LAYOUT');

/**
 * @returns {String}
 * @param {String} symbol 
 * @desc シンボルからゲームパッドのボタン番号を文字列で返します
 */
function symbolToButtonNumber(symbol){
    for(var key in Input.gamepadMapper){
        if(Input.gamepadMapper[key]===symbol){
            return key;
        }
    }
    return ''
}

function readGamePadConfig( config ){
    const value = config[MA_GAMEPAD_CONFIG];
    if(value){
        return value;
    }
    return null;
}
function readKeyboardConfig(config){
    const value =config[MA_KEYBOARD_CONFIG];
    if(value){
        return value;
    }
    return null;
}
ConfigManager.setKeyLayoutMA =function(layout){
    ConfigManager.keyLayout_MA =layout;
};

function defaultKeyLayout() {
    if($gameSystem.isJapanese()){
        return 'JIS';
    }
    return 'US';
}
//saveconfig
const  ConfigManager_makeData = ConfigManager.makeData;
ConfigManager.makeData =function(){
    const result = ConfigManager_makeData.call(this);
    result[MA_GAMEPAD_CONFIG] =Input.gamepadMapper;
    result[MA_KEYBOARD_CONFIG] = Input.keyMapper;
    result[MA_KEYBOARD_LAYOUT] = ConfigManager.keyLayout_MA ||defaultKeyLayout();
    return result;
};
//loadconfig
const ConfigManager_applyData = ConfigManager.applyData;
ConfigManager.applyData =function(config){
    ConfigManager_applyData.call(this,config);
    const gamepad =readGamePadConfig(config);
    if(gamepad){
        Input.gamepadMapper = gamepad;
    }
    const keyMapper =readKeyboardConfig(config);
    if(keyMapper){
        Input.keyMapper =keyMapper;
    }
    ConfigManager.setKeyLayoutMA(config[MA_KEYBOARD_LAYOUT]||'JIS');
    Input.clear();
};

function createNormalizedInputMapper(mapper){
    const result={};
    for(const key in mapper){
        const val =mapper[key];
        if(val){
            result[key] = val
        }
    }
    return result;
}
/**
 * @return {boolean}
 * @param {[Number:string]} mapper 
 * @param {string} symbol 
 */
function inputMapperHasSymbol(mapper,symbol){
    for(var key in mapper){
        if(mapper[key]===symbol){
            return true;
        }
    }
    if(Input._isEscapeCompatible(symbol)){
        for(var key in mapper){
            if(mapper[key]==='escape'){
                return true;
            }
        }
    }
    return false;
}

const ColorSrc = window["ColorManager"] || null;
/**
 * @returns {Window_Base}
 * @param {Window_Base} window_base 
 */
function getColorSrc(window_base){
    return ColorSrc||window_base;
}

class Window_Selectable_InputConfigVer extends Window_Selectable{
    /**
     * @param {Rectangle} rect 
     */
    constructor(rect){
        super(rect);
    }
    /**
     * @returns {Number}
     */
    bottom(){
        return this.y + this.height;
    }
    /**
     * @param {Rectangle} rect 
     */
    initialize(rect){
        window_initializeMVMZ(this,rect,super.initialize);
    }
    isOkTriggered(){
        return Input.isTriggered("ok");
    }
    isCancelTriggered(){
        return Input.isTriggered('cancel');
    }
    textPadding(){
        return 6;
    }
    /**
     * @param {Rectangle} rect
     * @param {String} coorCord
     */
    drawSymbolBack(rect, color) {
        this.changePaintOpacity(false);
        this.contents.fillRect(rect.x + 1, rect.y + 1, rect.width - 2, rect.height - 2, color);
        this.changePaintOpacity(true);
    }
    /**
     * @returns {typeof ColorManager}
     * @desc MV/MZ共用処理。ソースコードはMZ向けで記述。
     */
    colorSrc(){
        return getColorSrc(this);
    }
    //TODO:フォントサイズなどを小さくする
    // resetFontSettings(){
    //     super.resetFontSettings();
    //     this.contents.fontSize =24;
    // }
    // lineHeight(){
    //     return 26;
    // }
}

class Window_InputSymbolList extends Window_Selectable_InputConfigVer{
    /**
     * @param {Rectangle} rect 
     */
    initialize(rect) {
        this.makeItemList();
        super.initialize(rect);
        this.deactivate();
        this.deselect();
    }
    makeItemList(){
        this._list = symbolMapper.getSymbolList();
    }
    maxItems(){
        return this._list.length;
    }
    /**
     * @param {Number} index 
     */
    symbolObject(index){
        return this._list[index];
    }
    currentSymbolObject(){
        return this.symbolObject(this.index());
    }
    /**
     * @param {String} symbol 
     */
    indexOfSymbol(symbol){
        const numItms = this.maxItems();
        for (let i = 0; i < numItms; i++) {
            const symbolObj = this.symbolObject(i);
            if(symbolObj && symbolObj.symbol()===symbol){
                return i;
            }
        }
        return -1;
    }
    /**
     * @param {String} symbol 
     */
    selectSymbol(symbol){
        const index = this.indexOfSymbol(symbol);
        if(index >=0){
            this.select(index);
        }else{
            this.select(0);
        }
    }
    // backColor(index){
    //     this.colorSrc()
    // }
    /**
     * @param {Number} index 
     */
    drawItem(index){
        const item = this.symbolObject(index);
        if(item){
            const rect = this.itemRectWithPadding(index);
            //this.drawSymbolBack( this.itemRect(index) ,item.backColor());
            this.changePaintOpacity(this.isItemEnabled(index));
            this.drawText(item.name(), rect.x, rect.y, rect.width);
        }
    }
    isCurrentItemEnabled(){
        return this.isItemEnabled(this._index);
    }
    /**
     * @param {Number} index 
     */
    isItemEnabled(index){
        const symbol = this.symbolObject(index);
        return symbol.isEnabled();
    }
    maxCols(){
        return 4;
    }
    updateHelp(){
        
        const symbol = this.currentSymbolObject()//this.symbolObject(this.index());
        if(symbol){
            this._helpWindow.setText(symbol.helpText());
        }else{
            this._helpWindow.clear();
        }
    }
}

class Window_InputConfigBase extends Window_Selectable_InputConfigVer{
    playDefaultSound(){
        SoundManager.playEquip();
    }
    playApplySound(){
        SoundManager.playEquip();
    }
    playSymbolSetSound(){
        SoundManager.playOk();
    }
    exitCommandIndex(){
        return -1;
    }
    /**
     * @param {Number} index 
     */
    isExitCommand(index){
        return this.exitCommandIndex() ===index;
    }
    processCancel() {
        this.updateInputData();
        if (this.isExitCommand(this._index)) {
            this.callCancelHandler();
        } else {
            SoundManager.playCancel();
            const cancellationIndex = this.exitCommandIndex();
            this.select(cancellationIndex);
        }
    }
    /**
     * @returns {String}
     * @param {Number} index 
     */
    symbol(index){
        throw new Error( "method not ipriments!")
    }
    currentSymbol(){
        return this.symbol(this._index);
    }
    /**
     * @param {Boolean} value 
     */
    redrawApplyCommand(value){

    }
    buttonItems(){
        return 0;
    }
    /**
     * @param {String} symbol 
     */
    hasSymbol(symbol){
        return inputMapperHasSymbol(this.mapper(),symbol);
    }
    canApplySetting(){
        return this.isValidMapper();
    }
    isValidMapper(){
        return symbolMapper.isValidMapper(this.mapper());
    }
    setMapper(mapper){
        throw new Error( "method not ipriments!")
    }
    resetMapper(){
        this.setMapper(this.defaultMapper());
    }
    defaultMapper(){
        return {}
    }
    mapper(){
        return {}
    }
    cloneMapper(){
        return createNormalizedInputMapper(this.mapper());
    }
    updateHelp(){
        const symbol = this.currentSymbol();
        const obj = symbolMapper.findSymbol(symbol);
        if(obj){
            this._helpWindow.setText(obj.helpText());
        }else{
            this._helpWindow.clear();
        }
    }
}

function createPadState(padId) {
    if (!navigator.getGamepads) {
        return null;
    }
    const gamepads =navigator.getGamepads();
    if(!gamepads){return null}

    return  gamepads[padId];
}

/**
 * @param {Gamepad} pad 
 */
function createPadinfoText(pad) {
    if(pad){
        const text= `${pad.id.replace("(","\n(")}
        buttons:${pad.buttons.length} mapping:${pad.mapping}`;
        return text;
    }
    return setting.gamepadIsNotConnected;
}
class Window_GamepadConfig_MA extends Window_InputConfigBase{
    initialize(rect) {
        this.setMapper(Input.gamepadMapper);
        this.makeCommandList();
        super.initialize( rect);
        this.defineNameWidth();
        this.defineSymbolTextWidth();
        this.select(0);
        this.refresh();
    }

    makeCommandList() {
        const exit =CommandManager.exit();
        const reset =CommandManager.reset()
        const apply = CommandManager.apply();
        this._command =[
            reset ,//default_,
            apply,
            exit
        ];
        this._exitCommandIndex = this.buttonItems() + this._command.indexOf(exit);
    }

    /**
     * @param {Number} index 
     */
    command(index){
        return this._command[this.commandIndex(index)];
    }

    commandIndex(index){
        return index - this.buttonItems();
    }
    maxItems() {
        return this.buttonItems() + this._command.length;
    }
    buttonItems(){
        return setting.gamepad.maxItems();
    }
    isItemEnabled(index){
        return index < this.buttonItems();
    }
    isEnabledCommand(index){
        return index >= this.buttonItems();
    }

    cursorDown(wrap) {
        const index = this.index();
        const maxItems = this.maxItems();
        const maxCols = this.maxCols();
        if (wrap || index < maxItems - maxCols) {
            this.select((index + maxCols) % maxItems);
        }
    }
    cursorUp(wrap) {
        const index = this.index();
        const maxItems = this.maxItems();
        const maxCols = this.maxCols();
        if (index >= maxCols || (wrap)) {
            this.select((index - maxCols + maxItems) % maxItems);
        }
    }
    callDefaultHandler() {
        this.callHandler('default');
    }
    processPadInfo(){
        if(!this._helpWindow){return;}
        if(this._helpWindow.visble){
            this._helpWindow.hide();
            this._helpWindow.clear();
        }else{
            this._helpWindow.setText(this._padInfoText);
        }
        this.activate();
    }
    processCommandOk(){
        const command = this.command(this.index());
        if(command ){
            this.updateInputData();
            this.deactivate();
            this.callHandler(command.handle);
        }else{
            this.playBuzzerSound();
        }
    }
    processOk() {
        const index = this.index();
        if (index < 0) {
            return;
        }
        if(this.isEnabledCommand(index)){
            this.processCommandOk();
            return;
        }

        if (this.isItemEnabled(index)) {
            this.updateInputData();
            this.deactivate();
            this.playSymbolSetSound();
            this.callOkHandler();
        }
    }

    windowWidth() {
        return setting.windowCustom.gamepadWidth * this.maxCols();
    }
    maxCols() {
        return setting.cols;
    }
    numVisibleRows() {
        return Math.ceil(this.maxItems() / this.maxCols());
    }
    windowHeight() {
        return this.fittingHeight(Math.min(setting.numVisibleRows, this.numVisibleRows()));
    }
    setMapper(map) {
        this._map = objectClone(map);
    }
    mapper(){
        return this._map;
    }
    defaultMapper(){
        return Mano_InputConfig.defaultGamepadMapper;
    }
    /**
     * @param {number} index
     * @return {string} buttonNumber
     */
    buttonNumber(index) {
        const button= setting.gamepad.button(index);
        return button.buttonId();
    }
    /**
     * @param {number} index
     * @return {string} buttonName
     */
    buttonName(index) {
        return setting.gamepad.buttonName(index);
    }
    /**
     * @param {number} index
     * @return {string} symbol
     */
    symbol(index) {
        const buttonNumber = this.buttonNumber(index);
        return this._map[buttonNumber];
    }
    /**
     * @param {number} index
     * @return {string} symbol
     */
    symbolText(index) {
        const s =this.symbol(index)
        return symbolMapper.actionName(s);

    }
    defineSymbolTextWidth() {
        var width = 0;
        for (var key in setting.symbolText) {
            width = Math.max(width, this.textWidth(setting.symbolText[key]));
        }
        this._symbolTextWidth = width;
    }
    /**
     * @return {number}
     */
    symbolTextWidth() {
        return this._symbolTextWidth;
    }
    defineNameWidth() {
        const _this =this;
        const w = setting.gamepad.buttons().map(function(button){
            return _this.textWidth(button.text());
        });

        this._nameWidth = Math.max(...w);
    }
    /**
     * @return {number}
     */
    nameWidth() {
        return this._nameWidth;
    }
    /**
     * @param {number} index
     */
    changeKeyMap(index, newSymbol) {
        const buttonNumber = this.buttonNumber(index);
        this._map[buttonNumber] = newSymbol;
        this.redrawItem(index);
        this.redrawApplyCommand(this.canApplySetting());
    }

    //メモ ボタン一覧を示すリストと、保存などに使うコマンドは別の配列
    //なので、描画機能は分けてある
    drawCommand(index){
        const command = this.command(index);
        if(command){
            this.changePaintOpacity(true);
            const rect = this.itemRectWithPadding(index);
            this.drawText(command.text(),rect.x,rect.y,rect.width);
        }
    }
    numberWidth(){
        return 20;
    }
    //TODO:番号とボタン名・Symbol名の色を別々にするとき想定で作った気がする
    drawButtonNumber(x,y,width,buttonNumber){
        const text = buttonNumber +":";
        this.drawText(text,x,y,width,"right");
    }

    button(index){
        return setting.gamepad.button(index);
    }

    butttonNameWidth(){
        return 60;
    }
    drawButton(index){
        const button = this.button(index);
        if(button){
            this.changeTextColor(getColorSrc(this).normalColor());
            const rect = this.itemRectWithPadding(index);
            const nameWidth =this.nameWidth();
            this.drawText(button.text(),rect.x,rect.y,nameWidth);
            const symbolWidth = rect.width - nameWidth;
            this.drawText(this.symbolText(index), rect.x + nameWidth + this.textPadding(), rect.y, symbolWidth);
        }
    }

    drawItem(index) {
        if(index< this.buttonItems()){
            this.drawButton(index);
            return;
        }
        this.drawCommand(index);
    }
    makePadInfoText(){
        const pad = createPadState(0);
        if(pad){
            const text= `${pad.id.replace("(","\n(")}
            buttons:${pad.buttons.length} mapping:${pad.mapping}`;
            this._helpWindow.setText(text);
            return;
        }
        this._helpWindow.setText(setting.gamepadIsNotConnected);
    }

    updateHelp(){
        if(this._index < this.buttonItems()){
            this.makePadInfoText();
            return;
        }
        this._helpWindow.clear();

        // const c = this.command(this._index);
        // if(c){
        //     this._helpWindow.setText(c.helpText());
        // }
    }
    /**
     * @return {boolean}
     */
    canApplySetting() {
        return symbolMapper.isValidMapper(this._map);
    }
    exitCommandIndex() {
        return this._exitCommandIndex;
    }
    applyCommandIndex() {
        return this.buttonItems() + 1;
    }
    defaultCommandIndex() {
        return this.buttonItems();
    }
    /**
     * @desc シンボルを書き換えた場合の再描画で使う
     * @param {Boolean} value 
     */
    redrawApplyCommand(value) {
        const index =this.applyCommandIndex()
        this.clearItem(index);
        this.drawItemBackground(index);
        this.changePaintOpacity(value);
        const rect = this.itemRectWithPadding(index);
        this.drawText(CommandManager.getApplyText(), rect.x, rect.y, rect.width);
        this.changePaintOpacity(true);
    }
    /**
     * @param {number} index
     * @return {ButtonActionItem}
     */
    item(index) {
        const item = this._list[index];
        if (item) {
            return item;
        }
        return null;
    }
    bottom(){
        return this.y +this.height;
    }
}

class Scene_InputConfigBase_MA extends Scene_MenuBase{
    constructor(){
        super();
        //メモ
        //popSceneModeとapplyOnExitは別
        //前者はシーン切り替え検知で、後者は一度設定が変更されたことの検知
        //混ぜてはいけない
        this._popSceneMode=false;
    }

    hasHelpText(){
        return !!this._helpWindow._text;
    }

    setHelpText(text){
        this._helpWindow.setText(text)
    }
    /**
     * @desc 派生先クラスで定義すること 初期設定のコンフィグ
     */
    defaultMapper(){
        return {};
    }
    testDefaultMapperIsValid(){
        if(this.hasHelpText()){
            return;
        }
        const symbols= symbolMapper.getMandatorySymbols();

        if(symbols.size <=0){
            return;
        }
        //出力したいもの
        //初期設定のmapperの中に無い、必須指定されているシンボル
        const mapper= this.mainWidnow().defaultMapper();

        for (const iterator of Object.values(mapper)) {
            symbols.delete(iterator);
        }
        if(symbols.size >0){
            this.setHelpText("初期設定に入っていない必須シンボルがあります");
        }
    }

    symbolListWidth(){
        return Graphics.boxWidth;
    }

    /**
     * @param {Number} numLines
     * @param {Boolean} selectable
     */
    calcWindowHeight(numLines,selectable){
        if(selectable){
            return Window_Selectable.prototype.fittingHeight(( numLines))
        }
        return Window_Base.prototype.fittingHeight(numLines);
    }
    bottomAreaHeight(){
        return 20;
    }
    helpWindowInitParam(){
        if(Utils.RPGMAKER_NAME ==="MV"){
            return this.helpWindowLines();;
        }
        return this.helpWindowRect();
    }
    /**
     * @returns {Number}
     */
    mainAreaTop(){
        if(Utils.RPGMAKER_NAME ==="MV"){
            return this._helpWindow.y + this._helpWindow.height;
        }
        return super.mainAreaTop();
    }
    isBottomButtonMode(){
        return false;
    }
    helpWindowLines(){
        return 3;
    }
    helpAreaHeight(){
        return this.calcWindowHeight(this.helpWindowLines(), false);
    }
    isBottomHelpMode(){
        return false;
    }

    makeUnknowSymbolText(){
        //不明なSymbolの一覧を取得
        //ループして表示用の内容を作る
        //

    }
    makeHelpText(){
        this.makeUnknowSymbolText();
    }

    createHelpWindow(){
        this._helpWindow = new Window_Help(this.helpWindowInitParam());
        this.addWindow(this._helpWindow);
        this.makeHelpText();
    }
    mainWindowHeight(){
        return this.symbolListWindowTop()-this.mainAreaTop();
    }

    mainWindowRect(){
        const x = 0;
        const y= this.mainAreaTop();
        const width = Graphics.boxWidth;
        const height =this.mainWindowHeight();
        return new Rectangle(x,y,width,height);
    }

    symbolListWindowTop(){

        return Graphics.boxHeight -this.symbolListWindowHeight();
    }
    symbolListWindowHeight(){
        return this.calcWindowHeight(3,true);
    }

    symbolListWindowRect() {
        const width = Graphics.boxWidth;
        const height = this.symbolListWindowHeight();
        const x =0;
        const y = this.symbolListWindowTop();
        return new Rectangle(x,y,width,height);
    }

    createSymbolListWindow() {
        const rect = this.symbolListWindowRect();
        const asw = new Window_InputSymbolList(rect);
        asw.setHandler('ok', this.onSymbolListOk.bind(this));
        asw.setHandler('cancel', this.onSymbolListCancel.bind(this));
        asw.hide();
        asw.refresh();
        asw.setHelpWindow(this._helpWindow);
        this.addWindow(asw);
        this._symbolListWindow = asw;
    }
    popScene(){
        this._popSceneMode=true;
    }

    resetMapper(){
        const mainWindow = this.mainWidnow();
        mainWindow.resetMapper();
        mainWindow.playDefaultSound();
        mainWindow.refresh();
        mainWindow.redrawApplyCommand(mainWindow.isValidMapper());
        mainWindow.activate();
    }

    applyConfig(){
        const mainWindow = this.mainWidnow();
        if(mainWindow.isValidMapper()){
            mainWindow.playApplySound();
            this._applyOnExit = true;
            this.popScene();
        }else{
            mainWindow.playBuzzerSound();
            mainWindow.activate();
        }
    }
    isAllButtonDetouch(){
        return Input._latestButton===null;
    }

    isAnyButtonLongPressed(){
        return Input._pressedTime >60;
    }

    update(){
        if(this._popSceneMode ){
            if(this.isAnyButtonLongPressed()){
                if(this._helpWindow){
                    this._helpWindow.setText(setting.needButtonDetouch);
                }
            }
            if(this.isAllButtonDetouch()){
                super.popScene();
                return;
            }
        }
        super.update();
    }

    onConfigOk(){
        this.selectSymbol();
    }
    selectSymbol() {
        const currentSymbol = this.mainWidnow().currentSymbol();
        this._symbolListWindow.show();
        this._symbolListWindow.activate();
        this._symbolListWindow.selectSymbol(currentSymbol);
    }
    /**
     * @return {Window_InputConfigBase}
     */
    mainWidnow() {
        return null;
    }

    /**
     * @param {I_SymbolDefine} symbol 
     */
    changeSymbol(symbol){
    }

    /**
     * @param {I_SymbolDefine} newSymbol 
     * @param {String} oldSymbol 
     */
    isMapperValid(newSymbol,oldSymbol){
        if(symbolMapper.isMandatorySymbol(oldSymbol)){
            return this.mainWidnow().hasSymbol(oldSymbol);
        }
        if(newSymbol.isMandatory()){
            return this.mainWidnow().isValidMapper();
        }
        return true;
    }
    /**
     * @desc TODO この複雑なテストは使用するか未定。全チェックで重いなら検討
     * @param {I_SymbolDefine} newSymbol 
     * @param {String} oldSymbol 
     */
    needSymbolTest(newSymbol,oldSymbol){
        const oldIsMandatory = symbolMapper.isMandatorySymbol(oldSymbol);
        if(newSymbol.isMandatory()){
            if(this.mainWidnow().hasSymbol(newSymbol.symbol())){

            }
        }

        if(symbolMapper.isMandatorySymbol(oldSymbol)){

        }
    }

    //オーバーライドしないこと！ここでデータの整合性チェックを行っている
    onSymbolListOk() {
        const mainWindow = this.mainWidnow();
        const newSymbol = this._symbolListWindow.currentSymbolObject();
        const oldSymbol = this.mainWidnow().currentSymbol();
        if(newSymbol.symbol()!==oldSymbol){
            this.changeSymbol(newSymbol);
            mainWindow.redrawApplyCommand(mainWindow.isValidMapper());
        }
        this.endActionSelect();
    }
    onSymbolListCancel() {
        this.endActionSelect();
    }
    endActionSelect() {
        this._symbolListWindow.deselect();
        this._symbolListWindow.hide();
        this.mainWidnow().activate();
    }
    symbolCenter() {
        return false;
    }
    mapper(){
        return {};
    }
    terminate(){
        super.terminate();
        if(this._applyOnExit){
            this.saveMapper();
        }
    }
    saveMapper(){
        //override
    }
    testMapperValid(){
        const symbols = symbolMapper.getMandatorySymbols();
        const mapper = this.mapper();
        for (const key in mapper) {
            if (mapper.hasOwnProperty(key)) {
                const element = mapper[key];
            }
        }
    }
    showUnknowSymbols(){
        const symbols = symbolMapper.getSymbolList().filter(function(s){
            return s.isUnknow();
        });
        if(symbols.length <=0){
            return;
        }
    }
}

class Scene_GamepadConfigMA extends Scene_InputConfigBase_MA{
    symbolCenter() {
        return false;
    }
    /**
     * @param {object} [gamepadMapper] 読み込むコンフィグデータ 無指定の場合、現在の設定値を読み込む
     */
    setGamepadMapper(gamepadMapper) {
        if (this._gamepadWindow) {
            this._gamepadWindow.setMapper(gamepadMapper);
            this._gamepadWindow.refresh();
        }
    }
    mapper(){
        return this._gamepadWindow.mapper();
    }
    create() {
        super.create();
        this.createAllWindows();
    }

    gamepadWindowRect(){
        return this.mainWindowRect();
        // const width = setting.windowCustom.gamepadWidth*setting.cols;
        // const height = this.calcWindowHeight(setting.numVisibleRows/2,true);
        // const x = (Graphics.boxWidth/2) -(width/2);
        // const y= this.mainAreaTop()
        // return new Rectangle(x,y,width,height);
    }

    createGamepadConfigWindow() {
        const rect = this.gamepadWindowRect();
        const gcw = new Window_GamepadConfig_MA(rect);
        gcw.setHandler('ok', this.onConfigOk.bind(this));
        gcw.setHandler('cancel', this.onConfigCancel.bind(this));
        gcw.setHandler(CommandManager.exit().handle, this.onConfigCancel.bind(this));
        gcw.setHandler(CommandManager.apply().handle, this.applyConfig.bind(this));
        gcw.setHandler(CommandManager.reset().handle, this.resetMapper.bind(this));
        gcw.setHelpWindow(this._helpWindow);
        this._gamepadWindow = gcw;
        this.addWindow(gcw);
    }

    /**
     * @param {I_SymbolDefine} symbolObject 
     */
    changeSymbol(symbolObject){
        const index = this._gamepadWindow.index();
        this._gamepadWindow.changeKeyMap(index, symbolObject.symbol());
    }
    mainWidnow() {
        return this._gamepadWindow;
    }
    saveMapper(){
        Input.gamepadMapper = this._gamepadWindow.cloneMapper();
    }

    isAnyPressed(){
//        Input.
//        Input.
    }
    onConfigCancel() {
        SoundManager.playCancel();
        SceneManager.pop();
    }
    createAllWindows() {
        this.createHelpWindow();
        this.createGamepadConfigWindow();
        this.createSymbolListWindow();
        this._gamepadWindow.activate();
    }
    makeHelpText(){
        super.makeHelpText();
    }
}

class Key_Base{
    /**
     * @returns {String}
     */
    get handle(){
        return "ok";
    }
    get locked(){
        return false;
    }
    get char(){
        return "";
    }
    get isLink(){
        return false;
    }
    get keycord(){
        return 0;
    }
    /**
     * @param {Window_KeyConfig_MA} keyWindow 
     * @param {Number} index 
     */
    draw(keyWindow,index){
        this.drawBasicChar(keyWindow,index);
    }
    /**
     * @param {Window_KeyConfig_MA} keyWindow 
     * @param {Number} index 
     */
    redraw(keyWindow,index){
        this.drawBasicChar(keyWindow,index);
    }
    /**
     * @param {Number} index 
     * @desc 一部の複数マスにまたがるキーのための機能 基本実装しないでいい
     */
    setIndex(index){

    }
    /**
     * @param {Window_KeyConfig_MA} keyWindow 
     * @param {Number} index 
     */
    drawBasicChar(keyWindow,index){
        const s = keyWindow.symbolFromKeyNumber(this.keycord);
        const rect = keyWindow.itemRect(index);
        keyWindow.drawInputDefine(this,s,rect);
    }
    /**
     * @param {Window_KeyConfig_MA} keyWindow 
     * @param {Number} index 
     */
    rect(keyWindow,index){
        return keyWindow.baseRect(index);
    }
}
class Key_Null extends Key_Base{
    get locked(){
        return true;
    }
    /**
     * @param {Window_KeyConfig_MA} keyWindow 
     * @param {Number} index 
     */
    draw(keyWindow,index){}
}

class Key_Char extends Key_Base{
    /**
     * @param {String} char 
     * @param {Number} keycord 
     */
    constructor(char,keycord){
        super();
        this._char = char;
        this._keycord = keycord;
    }
    get char(){
        return this._char;
    }
    get keycord(){
        return this._keycord;
    }
}

class Key_Locked extends Key_Char{
    get locked(){
        return true;
    }
}

class Key_Big extends Key_Char{
    /**
     * @param {String} char 
     * @param {Number} keycord 
     * @param {Number} width 
     * @param {Number} height 
     * @param {boolean} looked
     */
    constructor(char,keycord,width,height,looked){
        super(char,keycord);
        this._widthEx=Math.max(width,1);
        this._heightEx=Math.max(height,1);
        this._locked = looked||false; 
    }
    get locked(){
        return this._locked;
    }
    /**
     * @param {Window_KeyConfig_MA} keyWindow 
     */
    rect(keyWindow){
        const rect = keyWindow.baseRect(this._index);
        rect.width *=this._widthEx;
        rect.height *= this._heightEx;
        return rect;
    }
    /**
     * @param {Number} index 
     */
    setIndex(index){
        if(isNaN( this._index)){
            this._index = index;

        }
    }
    /**
     * @param {Window_KeyConfig_MA} keyWindow 
     * @param {Number} index 
     */
    draw(keyWindow,index){
        if(index ===this._index){
            super.draw(keyWindow,index);
        }
    }
    /**
     * @param {Window_KeyConfig_MA} keyWindow 
     * @param {Number} index 
     */
    redraw(keyWindow,index){
        super.draw(keyWindow,this._index);
    }
}

class Key_Command extends Key_Base{
    /**
     * @param {String} handlerName 
     * @param {MultiLanguageText} mtext 
     * @param {Number} width 
     */
    constructor(handlerName,mtext,width){
        super();
        this._callBackHandle =handlerName;
        this._widthEx =width;
        this._mtext = mtext;
    }
    static create(objText,handler){
        const obj = JSON.parse(objText);
        return new Key_Command(
            handler,
            MultiLanguageText.create(obj.text),
            Number(obj.width)
        );
    }
    get char(){
        return this._mtext.currentName();
    }
    text(){
        return this.char;
    }

    get isLink(){
        return this._widthEx >1;
    }
    get locked(){
        return false;
    }
    get keycord(){
        return 0;
    }
    get isCommand(){
        return true;
    }
    get handle(){
        return this._callBackHandle;
    }
    /**
     * @param {Window_KeyConfig_MA} keyConfigWindow 
     */
    onOk(keyConfigWindow){
        keyConfigWindow.callHandler(this._callBackHandle);
    }
    /**
     * @param {Number} index 
     */
    setIndex(index){
        if(isNaN(this._index)){
            this._index = index;
        }
    }

    /**
     * @param {Window_KeyConfig_MA} keyWindow 
     * @param {Number} index
     */
    rect(keyWindow,index){
        const rect = keyWindow.baseRect(this._index);
        rect.width *=this._widthEx;
        return rect;
    }
    /**
     * @param {Window_KeyConfig_MA} keyWindow 
     */
    draw(keyWindow,index){
      if(index ===this._index){
        const rect = this.rect(keyWindow,index);
        keyWindow.drawCommand(this.char,rect);
      }
    }
    helpText(){
        return "コマンドのヘルプ";
    }
}

class Key_CommandManager_T{
    constructor(){
        const params = getParam();
        this._apply =Key_Command.create(params.apply,"apply");
        this._wasd=Key_Command.create(params.WASD,"WASD");
        this._changeLayout=Key_Command.create(params.changeLayout,"keylayout");
        this._exit=Key_Command.create(params.exit,"exit");
        this._reset=Key_Command.create(params.reset,"reset");
    }
    keylayout(){
        return this._changeLayout;
    }
    getKeylayoutText(){
        return this._changeLayout.text();
    }
    wasd(){
        return this._wasd;
    }
    getWasdText(){
        return this._wasd.text();
    }
    reset(){
        return this._reset;
    }
    getResetText(){
        return this._reset.text();
    }
    apply(){
        return this._apply
    }
    getApplyText(){
        return this._apply.text();
    }
    exit(){
        return this._exit;
    }
    getExitText(){
        return this._exit.text();
    }
    createCommandList_ForKeyLayout(){
        const commandList =[
            this._reset,
            this._apply,
            this._wasd,
            this._changeLayout,
            this._exit
        ];
        const result =[];
        for (const iterator of commandList) {
            for(var i=0; i <iterator._widthEx;++i){
                result.push(iterator);
            }
        }
        return result;
    }
}
const CommandManager = new Key_CommandManager_T();
/**
 * @param {string} char 
 * @param {number} keycord 
 */
function keyinfo(char,keycord){
    return new Key_Char(char,keycord);
}

const WASD_KEYMAP={
    81:"pageup",    //Q
    69:"pagedown",  //E
    87:"up",        //W
    65:"left",      //A
    83:"down",      //S
    68:"right",     //D
};


const KEYS ={
    SPACE: new Key_Big("Space",32,4,1,false),
    ENTER_JIS: new Key_Big('Enter',13,2,2,true),
    ENTER_US:new Key_Big("Entre",13,3,1,true),
    NULL:new Key_Null(),
    UP:new Key_Locked(setting.keyText.up,38),
    DOWN:new Key_Locked(setting.keyText.down,40),
    LEFT:new Key_Locked(setting.keyText.left,37),
    RIGHT:new Key_Locked(setting.keyText.right,39),
    TENKEY0:new Key_Big('0',96,2,1,false),
    TENKEY1:keyinfo('1',97),
    TENKEY2:keyinfo('2',98),
    TENKEY3:keyinfo('3',99),
    TENKEY4:keyinfo('4',100),
    TENKEY5:keyinfo('5',101),
    TENKEY6:keyinfo('6',102),
    TENKEY7:keyinfo('7',103),
    TENKEY8:keyinfo('8',104),
    TENKEY9:keyinfo('9',105),
    TENKEY_DOT:keyinfo('.',110),
    TAB:keyinfo("TAB",9),
    _0:keyinfo('0',48),
    _1:keyinfo('1',49),
    _2:keyinfo('2',50),
    _3:keyinfo('3',51),
    _4:keyinfo('4',52),
    _5:keyinfo('5',53),
    _6:keyinfo('6',54),
    _7:keyinfo('7',55),
    _8:keyinfo('8',56),
    _9:keyinfo('9',57),

    A:keyinfo('A',65),
    B:keyinfo('B',66),
    C:keyinfo('C',67),
    D:keyinfo('D',68),
    E:keyinfo('E',69),
    F:keyinfo('F',70),
    G:keyinfo('G',71),
    H:keyinfo('H',72),
    I:keyinfo('I',73),
    J:keyinfo('J',74),
    K:keyinfo('K',75),
    L:keyinfo('L',76),
    M:keyinfo('M',77),
    N:keyinfo('N',78),
    O:keyinfo('O',79),
    P:keyinfo('P',80),
    Q:keyinfo('Q',81),
    R:keyinfo('R',82),
    S:keyinfo('S',83),
    T:keyinfo('T',84),
    U:keyinfo('U',85),
    V:keyinfo('V',86),
    W:keyinfo('W',87),
    X:keyinfo('X',88),
    Y:keyinfo('Y',89),
    Z:keyinfo('Z',90),

    SHIFT:new Key_Locked('Shift',16),
    CTRL:new Key_Locked('CTRL',17),
    INSERT:keyinfo('Ins',45),
    BACK:keyinfo('Back',8),
    HOME:keyinfo('Home',36),
    END:keyinfo('End',35),
    PAGEUP:keyinfo('PgUp',33),
    PAGEDOWN:keyinfo('PgDn',34),
    ESC:keyinfo('esc',27),

    ATMARK:keyinfo("@", 192),

    TENKEY_MINUS :keyinfo('-',109),
    TENKEY_PLUS :keyinfo('+',107),
    MINUS :keyinfo('-',189),
    COMMA :keyinfo(',',188),
    SEMICOLON:keyinfo(';',186),

    SLASH:keyinfo('/',191),
    BACKSLASH:keyinfo('\\',226),
    DOT :keyinfo('.',190),
    
    COLON:keyinfo(':',58),
    CARET:keyinfo('^',222),
    APOSTROPHE:keyinfo("'",222), 

    EQUAL_JIS:keyinfo('=',189),
    
    SQUARE_BRACKETS_OPEN :keyinfo('[',219),
    SQUARE_BRACKETS_CLOSE :keyinfo(']',221),
};

class Key_Layout{
    /**
     * @param {Key_Base[]} keyList 
     */
    static keylayout_SetupIndex(keyList){
        for (let index = 0; index < keyList.length; index++) {
            const element = keyList[index];
            element.setIndex(index);
        }
    }
    /**
     * @param {String} layoutName
     * @param {Key_Base[]} srcList 
     */
    constructor(layoutName,srcList){
        this._name = layoutName;
        this._buttonItems = srcList.length;
        const list = srcList.concat(CommandManager.createCommandList_ForKeyLayout());
        Key_Layout.keylayout_SetupIndex(list);

        this._list =Object.freeze( list);
        //要調整
        this._enterKeyIndex = this._list.indexOf(KEYS.ENTER_JIS)
    }

    buttonItems(){
        return this._buttonItems;
    }
    list(){
        return this._list;
    }
    /**
     * @param {Key_Big} enter 
     */
    setEnterKey(enter){
        this._enter=enter;
    }
}

const KEY_LAYOUT_JIS=(function(){ 
    const list =[
        KEYS.ESC,
        KEYS._1 ,
        KEYS._2 ,
        KEYS._3 ,
        KEYS._4, 
        KEYS._5, 
        KEYS._6, 
        KEYS._7, 
        KEYS._8, 
        KEYS._9, 
        KEYS._0, 
        KEYS.MINUS,
        KEYS.CARET,
        KEYS.INSERT ,
        KEYS.BACK ,
        KEYS.HOME ,
        KEYS.END ,
        KEYS.PAGEUP ,
        KEYS.PAGEDOWN ,
    
        KEYS.TAB,
    
        KEYS.Q ,
        KEYS.W ,
        KEYS.E ,
        KEYS.R ,
        KEYS.T ,
        KEYS.Y ,
        KEYS.U ,
        KEYS.I ,
        KEYS.O ,
        KEYS.P ,
        KEYS.ATMARK,
        KEYS.SQUARE_BRACKETS_OPEN,
        KEYS.ENTER_JIS,
        KEYS.ENTER_JIS,
        KEYS.TENKEY7 ,
        KEYS.TENKEY8 ,
        KEYS.TENKEY9 ,
        KEYS.TENKEY_MINUS,
        KEYS.NULL,
        KEYS.A ,
        KEYS.S ,
        KEYS.D ,
        KEYS.F ,
        KEYS.G ,
        KEYS.H ,
        KEYS.J ,
        KEYS.K ,
        KEYS.L ,
        KEYS.SEMICOLON,
        KEYS.COLON,
        KEYS.SQUARE_BRACKETS_CLOSE, 
        KEYS.ENTER_JIS,
        KEYS.ENTER_JIS,
        KEYS.TENKEY4 ,
        KEYS.TENKEY5 ,
        KEYS.TENKEY6 ,
        KEYS.TENKEY_PLUS,
    
        KEYS.SHIFT ,
        KEYS.Z ,
        KEYS.X ,
        KEYS.C ,
        KEYS.V ,
        KEYS.B ,
        KEYS.N ,
        KEYS.M ,
        KEYS.COMMA,
        KEYS.DOT,
        KEYS.SLASH,
        
        KEYS.BACKSLASH,
        KEYS.SHIFT,
        KEYS.UP,
        KEYS.NULL,
        
        KEYS.TENKEY1 ,
        KEYS.TENKEY2 ,
        KEYS.TENKEY3 ,
        KEYS.NULL,
    
        KEYS.CTRL  ,
        KEYS.NULL,
        KEYS.NULL,
        KEYS.NULL,
        KEYS.SPACE,
        KEYS.SPACE,
        KEYS.SPACE,
        KEYS.SPACE,
        KEYS.NULL,
        KEYS.NULL,
        KEYS.NULL,
        KEYS.NULL,
        KEYS.LEFT,
        KEYS.DOWN,
        KEYS.RIGHT,
        KEYS.TENKEY0,
        KEYS.TENKEY0,
        KEYS.TENKEY_DOT,
        KEYS.NULL,
    ];
    const layout= new Key_Layout("JIS",list);
    layout.setEnterKey(KEYS.ENTER_JIS);
    return Object.freeze( layout);
})();
const KEY_LAYOUT_US =(function(){
    const list =[    KEYS.ESC,
        KEYS._1 ,
        KEYS._2 ,
        KEYS._3 ,
        KEYS._4, 
        KEYS._5, 
        KEYS._6, 
        KEYS._7, 
        KEYS._8, 
        KEYS._9, 
        KEYS._0, 
        KEYS.MINUS,
        KEYS.EQUAL_JIS,
        KEYS.INSERT ,
        KEYS.BACK ,
        KEYS.HOME ,
        KEYS.END ,
        KEYS.PAGEUP ,
        KEYS.PAGEDOWN ,
    
        KEYS.TAB,
        KEYS.Q ,
        KEYS.W ,
        KEYS.E ,
        KEYS.R ,
        KEYS.T ,
        KEYS.Y ,
        KEYS.U ,
        KEYS.I ,
        KEYS.O ,
        KEYS.P ,
        KEYS.SQUARE_BRACKETS_OPEN,
        KEYS.SQUARE_BRACKETS_CLOSE, 
        KEYS.BACKSLASH,
        KEYS.NULL,
        KEYS.TENKEY7 ,
        KEYS.TENKEY8 ,
        KEYS.TENKEY9 ,
        KEYS.TENKEY_MINUS,
        KEYS.NULL,
        KEYS.A ,
        KEYS.S ,
        KEYS.D ,
        KEYS.F ,
        KEYS.G ,
        KEYS.H ,
    
        KEYS.J ,
        KEYS.K ,
        KEYS.L ,
        KEYS.SEMICOLON,
        KEYS.APOSTROPHE, 
        KEYS.ENTER_US,
        KEYS.ENTER_US,
        KEYS.ENTER_US,
        KEYS.TENKEY4 ,
        KEYS.TENKEY5 ,
        KEYS.TENKEY6 ,
        KEYS.TENKEY_PLUS,

        KEYS.SHIFT ,
        KEYS.Z ,
        KEYS.X ,
        KEYS.C ,
        KEYS.V ,
        KEYS.B ,
        KEYS.N ,
        KEYS.M ,
        KEYS.COMMA,
        KEYS.DOT,
        KEYS.SLASH,
        
        KEYS.NULL,
        KEYS.SHIFT,
        KEYS.UP,
        KEYS.NULL,
        
        KEYS.TENKEY1 ,
        KEYS.TENKEY2 ,
        KEYS.TENKEY3 ,
        KEYS.NULL,
        
        KEYS.CTRL  ,
        KEYS.NULL,
        KEYS.NULL,
        KEYS.NULL,
        KEYS.SPACE,
        KEYS.SPACE,
        KEYS.SPACE,
        KEYS.SPACE,
        KEYS.NULL,
        KEYS.NULL,
        KEYS.NULL,
        KEYS.NULL,
        KEYS.LEFT,
        KEYS.DOWN,
        KEYS.RIGHT,
        KEYS.TENKEY0,
        KEYS.TENKEY0,
        KEYS.TENKEY_DOT,
        KEYS.NULL,
    ];
    const layout =new Key_Layout("US",list);
    layout.setEnterKey(KEYS.ENTER_US);
    return Object.freeze( layout);
})();


class Window_KeyConfig_MA extends Window_InputConfigBase {
    mapper(){
        return this._map;
    }
    defaultMapper(){
        return Mano_InputConfig.defaultKeyMapper;
    }
    /**
     * @param {Rectangle} rect 
     */
    initialize(rect) {
        this.setMapper(Input.keyMapper);
        this.setKeyLayout(ConfigManager.keyLayout_MA);
        super.initialize(rect);
        this.initElementsSize();
        this.refresh();
        this.activate();
        this.select(0);
    }
    initElementsSize() {
        const x = Graphics.boxWidth;
        const p = this.textPadding();
        this._itemWidth = Math.round((x - p * 6) / this.maxCols());
    }

    lineHeight(){
        return setting.keyWindowLineHeight;
    }

    mainFontFace(){
        if(Utils.RPGMAKER_NAME ==="MV"){
            return this.standardFontFace();

        }
        return $gameSystem.mainFontFace();
    }
    resetFontSettings(){
        this.contents.fontFace = this.mainFontFace();
        this.contents.fontSize = this.lineHeight()-2;//$gameSystem.mainFontSize();
        this.resetTextColor();
    }

    /**
     * @param {Number} index 
     * @param {String} symbol 
     */
    changeKeyMap(index, symbol) {
        const keyNumber = this.keyNumber(index);
        this._map[keyNumber] = symbol;
        this.redrawItem(index);
    }
    setWASD_Move(){
        for (const key in WASD_KEYMAP) {
            if (WASD_KEYMAP.hasOwnProperty(key)) {
                const element = WASD_KEYMAP[key];
                this._map[key]=(element);
            }
        }
        this.refresh();
    }
    /**
     * @param {String} layoutText 
     */
    setKeyLayout(layoutText){
        this._layout = layoutText ==="JIS"? KEY_LAYOUT_JIS : KEY_LAYOUT_US;
    }
    getKeyLayout() {
        return this._layout._name;
    }
    setMapper(mapper) {
        this._map = objectClone(mapper);
    }
    itemTextAlign() {
        return 'center';
    }
    exitCommandIndex(){
        return CommandManager.exit()._index;
    }
    playJIS_US_ChangeSound(){
        this.playApplySound();
    }
    processChangeLayout() {
        this.playJIS_US_ChangeSound();
        const L = this.getKeyLayout();
        if (L !== 'JIS') {
            this.setKeyLayout('JIS');
        }
        else {
            this.setKeyLayout('US');
        }
        this.refresh();
    }
    processOk() {
        const index = this.index();
        if (index < 0) {
            return;
        }
        const item = this.item(index);
        if(!item){
            this.playBuzzerSound();
            return;
        }
        if(item.locked){
            this.playBuzzerSound();
            return;
        }
        if(item.handle==="ok"){
            this.playSymbolSetSound()
            this.updateInputData();
            this.deactivate();
            this.callOkHandler();
            return
        }
        this.callHandler(item.handle);
    }
    itemHeight() {
        return this.lineHeight() * 2;
    }
    itemWidth() {
        return this._itemWidth;
    }
    maxPageRows() {
        return 100;
    }
    maxCols() {
        return 19;
    }
    numVisibleRows() {
        return this._layout._list.length;
    }
    /**
     * @param {Number} index 
     */
    baseRect(index){
        return super.itemRect(index);
    }
    /**
     * @param {Number} index 
     */
    itemRect(index){
        const item = this.item(index);
        if(!item){
            return new Rectangle(Number.MIN_SAFE_INTEGER,Number.MIN_SAFE_INTEGER,0,0);
        }
        return item.rect(this,index);
    }
    buttonItems(){
        return this._layout.buttonItems();
    }
    maxItems() {
        return this._layout.list().length;
    }
    spacing() {
        return 0;
    }
    /**
     * @param {number}index
     * @return {String}
     */
    keyNumber(index) {
        return this.item(index).keycord;
    }
    currentKeyNumber() {
        return this.keyNumber(this.index());
    }
    keyName(index) {
        return this.item(index).char;
    }

    cursorUp(wrap) {
        if (wrap || this._index >= this.maxCols()) {
            this.cursorMoveCheck(-this.maxCols());
        }
    }
    cursorDown(wrap) {
        if (wrap || this._index < this.maxItems() - this.maxCols()) {
            this.cursorMoveCheck(this.maxCols());
        }
    }
    cursorLeft(wrap) {
        if (wrap || this._index > 0) {
            this.cursorMoveCheck(-1);
        }
    }
    cursorRight(wrap) {
        if (wrap || this._index < this.maxItems() - 1) {
            this.cursorMoveCheck(1);
        }
    }
    nextIndex(current, moveDir) {
        const maxItems = this.maxItems();
        return (current + moveDir + maxItems) % maxItems;
    }
    cursorMoveCheck(moveDir) {
        const current = this.index();
        let next = this.nextIndex(current, moveDir);
        const last = Math.abs(this.maxItems() / moveDir);
        for (var i = 0; i < last; ++i) {
            const itemA = this.item(current);
            const itemB = this.item(next);
            if (itemB === KEYS.NULL) {
                break;
            }
            if (itemA !== itemB) {
                break;
            }
            next = this.nextIndex(next, moveDir);
        }
        this.select(next);
    }
    symbolTextColor() {
        return this.textColor(4);
    }
    /**
     * @param {Key_Base} key
     * @param {I_SymbolDefine} inputDef 
     * @param {Rectangle} rect 
     */
    drawInputDefine(key,inputDef,rect){
        const backColor = inputDef ? inputDef.backColor() : SymbolColorManager.emptyColor();
        this.drawSymbolBack(rect,backColor);
        this.drawText(key.char,rect.x,rect.y,rect.width,"center");
        if(inputDef && !inputDef.isEmpty()){
            const symbolY = rect.y + this.lineHeight()-6;
            this.drawText(inputDef.displayName(),rect.x,symbolY,rect.width,"center");
        }
    }

    /**
     * @param {Number} index 
     * @returns {String}
     */
    symbol(index) {
        const keyNumber = this.keyNumber(index);
        return this._map[keyNumber];
    }
    symbolFromKeyNumber(keyNumber){
        const symbol = this._map[keyNumber];
        return symbolMapper.findSymbol(symbol);
    }
    
    /**
     * @param {Number} index 
     */
    symbolText(index) {
        const symbol = this.symbol(index);
        return symbol;
    }

    /**
     * @param {Number} index 
     */
    item(index){
        return this._layout.list()[index];
    }
    /**
     * @param {Number} index 
     */
    drawItem(index){
        const item = this.item(index);
        if(item){
            item.draw(this,index);
        }
    }
    redrawItem(index){
        const item = this.item(index);
        if(item){
            this.clearItem(index);
            item.redraw(this,index);
        }
    }
    // redrawApplyCommand(value){

    // }

    commandBackColor() {
        return getColorSrc(this).gaugeBackColor();
    }
    commandColor() {
        return getColorSrc(this).normalColor();
    }
    /**
     * @param {String} commandName 
     * @param {Rectangle} rect 
     */
    drawCommand(commandName, rect) {
        this.drawSymbolBack(rect, this.commandBackColor());
        this.changeTextColor(this.commandColor());
        this.drawText(commandName, rect.x, rect.y, rect.width, 'center');
    }
}

class Scene_KeyConfig_MA extends Scene_InputConfigBase_MA{
    symbolCenter() {
        return true;
    }
    helpWindowLines(){
        return 2;
    }
    create() {
        super.create();
        this.createHelpWindow();
        this.createKeyboradConfigWindow();
        this.createSymbolListWindow();
    }
    onConfigCancel() {
        SoundManager.playCancel();
        SceneManager.pop();
    }
    /**
     * @param {I_SymbolDefine} symbol 
     */
    changeSymbol(symbol) {
        const index = this._keyconfigWindow.index();
        this._keyconfigWindow.changeKeyMap(index, symbol.symbol());
    }
    onKeyLayoutOk(){
        this._keyconfigWindow.processChangeLayout();
    }
    configKey(){
        return MA_KEYBOARD_CONFIG;
    }
    saveMapper(){
        Input.keyMapper = this._keyconfigWindow.cloneMapper();
    }
    terminate() {
        ConfigManager.setKeyLayoutMA(this._keyconfigWindow.getKeyLayout());
        super.terminate();
    }
    setWASD_Move(){
        this._keyconfigWindow.setWASD_Move();
        this._keyconfigWindow.playApplySound();
    }
    keyconfigWindowRect(){
        return this.mainWindowRect();
        const x = 0;
        const y=this.mainAreaTop();
        const width = Graphics.boxWidth;
        const lines = Utils.RPGMAKER_NAME =="MV" ? 12:10;
        const height =this.calcKeyWindowHeight() //this.calcWindowHeight(lines,true);
        return new Rectangle(x,y,width,height);
    }
    calcKeyWindowHeight(){
        const lineHeight =0;
        return 12*24;
    }
    createKeyboradConfigWindow() {
        const rect = this.keyconfigWindowRect();
        const kcw = new Window_KeyConfig_MA(rect);
        kcw.setHandler('cancel', this.onConfigCancel.bind(this));
        kcw.setHandler('ok', this.onConfigOk.bind(this));
        kcw.setHandler(CommandManager.reset().handle, this.resetMapper.bind(this));
        kcw.setHandler(CommandManager.apply().handle, this.applyConfig.bind(this));
        kcw.setHandler(CommandManager.wasd().handle,this.setWASD_Move.bind(this));
        kcw.setHandler(CommandManager.keylayout().handle,this.onKeyLayoutOk.bind(this));
        kcw.setHandler(CommandManager.exit().handle,this.onConfigCancel.bind(this));
        kcw.setHelpWindow(this._helpWindow);
        this.addWindow(kcw);
        this._keyconfigWindow = kcw;
    }
    mainWidnow() {
        return this._keyconfigWindow;
    }
}
    Window_Options.prototype.addGamepadOptions_MA =function(){
        this.addCommand(setting.gamepadConfigCommandText.currentName(),MA_GAMEPAD_CONFIG);
    };
    Window_Options.prototype.addKeyboardConfig_MA=function(){
        this.addCommand(setting.keyConfigCommandText.currentName(),MA_KEYBOARD_CONFIG);
    };
    const Window_Options_addVolumeOptions=Window_Options.prototype.addVolumeOptions;
    Window_Options.prototype.addVolumeOptions=function(){
        Window_Options_addVolumeOptions.call(this);
        this.addGamepadOptions_MA();
        this.addKeyboardConfig_MA();
    }
    const Window_Options_statusText=Window_Options.prototype.statusText;
    Window_Options.prototype.statusText =function(index){
        if(this.isGamepadConfig(index)){
            return "";
        }
        if(this.isKeyboardConfig(index)){
            return "";
        }
        return Window_Options_statusText.call(this,index);
    }

    Window_Options.prototype.isGamepadConfig=function(index){
        const elem= this._list[index];
        if(elem &&elem.symbol ===MA_GAMEPAD_CONFIG){
            return true;
        }
        return false;
    }
    Window_Options.prototype.isKeyboardConfig=function(index){
        const elem= this._list[index];
        if(elem &&elem.symbol ===MA_KEYBOARD_CONFIG){
            return true;
        }
        return false;
    }
    
    const Window_Options_processOk = Window_Options.prototype.processOk;
    Window_Options.prototype.processOk =function(){
        if(this.isGamepadConfig(this._index)){
            this.playOkSound();
            Mano_InputConfig.gotoGamepad();
//            SceneManager.push(Scene_GamepadConfigMA);
            return;
        }
        if(this.isKeyboardConfig(this._index)){
            this.playOkSound();
            Mano_InputConfig.gotoKey();
//            SceneManager.push(Scene_KeyConfig_MA);
            return;
        }
        Window_Options_processOk.call(this);       
    };
const Scene_Boot_onDatabaseLoaded =Scene_Boot.prototype.onDatabaseLoaded ||(function(){});
Scene_Boot.prototype.onDatabaseLoaded =function(){  
    symbolMapper.onBoot();
    Mano_InputConfig.defaultGamepadMapper =Object.freeze( objectClone(Input.gamepadMapper));
    Mano_InputConfig.defaultKeyMapper= Object.freeze(objectClone(Input.keyMapper));
    Scene_Boot_onDatabaseLoaded.call(this);
};
if(Utils.RPGMAKER_NAME =="MV"){
    (function(){
        const Scene_Boot_start =Scene_Boot.prototype.start;
        Scene_Boot.prototype.start =function(){
            this.onDatabaseLoaded();

            Scene_Boot_start.call(this);
        };
        //MV workaround
        // Scene_InputConfigBase_MA.prototype.mainAreaTop = function(){
        //     return this._helpWindow.y + this._helpWindow.height;
        // };
        Window_Selectable_InputConfigVer.prototype.drawItemBackground =function(){};

        Window_Selectable_InputConfigVer.prototype.itemRectWithPadding = Window_Selectable_InputConfigVer.prototype.itemRectForText;
    })();
}else{
    PluginManager.registerCommand( PLUGIN_NAME,"IsGamepadValid",function(arg){
        const sid = (arg.switchId);
        const value = symbolMapper.isValidMapper(Input.gamepadMapper);
        $gameSwitches.setValue(sid,value);
    });
    PluginManager.registerCommand( PLUGIN_NAME,"IsKeyboardValid",function(arg){
        const sid = (arg.switchId);
        const value = symbolMapper.isValidMapper(Input.keyMapper);
        $gameSwitches.setValue(sid,value);
    });
}

const exportClass ={
    Scene_ConfigBase:Scene_InputConfigBase_MA,
    Scene_KeyConfig:Scene_KeyConfig_MA,
    Scene_GamepadConfig: Scene_GamepadConfigMA,
    Window_InputSymbolList:Window_InputSymbolList,
    Window_GamepadConfig:Window_GamepadConfig_MA,
    Window_KeyConfig:Window_KeyConfig_MA,
    symbolToButtonNumber:symbolToButtonNumber,
    defaultKeyMapper:{},
    defaultGamepadMapper:{},
    gotoKey:function(){
        SceneManager.push(Mano_InputConfig.Scene_KeyConfig );
    },
    gotoGamepad:function(){
        SceneManager.push(Mano_InputConfig.Scene_GamepadConfig  );
    },
};

return exportClass;
})();

{
    if(!!PluginManager.parameters("Yep_OptionCore")){
      //インポート情報を偽装し、GamepadConfig/KeybordConfigと認識させる
      Imported.GamepadConfig = true;
      Imported.YEP_KeyboardConfig = true;
      window["Scene_KeyConfig"] = Mano_InputConfig.Scene_KeyConfig;
      window["Scene_GamepadConfig"] =Mano_InputConfig.Scene_GamepadConfig;
      //何かよくわからない関数が追加されているので、適当に追加する
      Input.isControllerConnected =Input.isControllerConnected||function(){return true;};
    }
}
