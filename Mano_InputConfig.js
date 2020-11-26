//=============================================================================
// Mano_InputConfig.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017-2017 Sigureya
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// ver 4.0 2020/08/23
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
 * @text 入力拡張/extendsMapper
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
 * 更新履歴
 * 2020/11/24 ver5.1
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
 * TODO
 * キーコンフィグの適正状態チェックを実装したら、ver5.0を公開
 * キーレイアウトの再実装が終わってない
 * これが終わってから公開
 */
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
 * @default ["{\"keys\":\"A\",\"button\":\"NaN\",\"mandatory\":\"false\",\"overwrite\":\"false\",\"name\":\"{\\\"jp\\\":\\\"\\\",\\\"en\\\":\\\"\\\",\\\"ch\\\":\\\"\\\",\\\"ko\\\":\\\"\\\",\\\"ge\\\":\\\"\\\",\\\"fr\\\":\\\"\\\",\\\"ru\\\":\\\"\\\"}\"}"]
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
  * @param move
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

var  MA_InputSymbols = MA_InputSymbols ||[];
var Imported = Imported || {};
if(Imported.Mano_InputConfig){
    throw new Error("Mano_InputConfig is Duplicate")
}
Imported.Mano_InputConfig = true;


var Mano_InputConfig=( function(){
    'use strict'
    const  PLUGIN_NAME='Mano_InputConfig';

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


class InputDefine{

    /**
     * @param {String} actionName 
     * @param {Number} buttonId 
     * @param {String} keys 
     */
    static create(actionName,buttonId,keys){
        const def = new InputDefine();
        def.setDefaultName(actionName);
        def.setKeys(keys);
        def.setPadButtonId(buttonId);
        def.loadSymbol();
        return def;
    }
    
    /**
     * @param {MultiLanguageText} mtext 
     */
    constructor(mtext){
        this.setMultiText(mtext ||new MultiLanguageText());
        this.setOverwriteEnabled(false);
        this.setDefaultName("")
        this.setKeys("")
        this.setPadButtonId(NaN);
        this.setSymbol("");
        this.setMandatory(false);
        this.setColor("#000000");
    }
    /**
     * 
     * @param {Boolean} value 
     */
    setMandatory(value){
        this._mandatory =value;
    }
    isMove(){
        return SymbolMapper_T.isMoveSymbol(this._symbol);
    }
    isMandatory(){
        return this._mandatory;
    }
    isEmpty(){
        return (!this._symbol);
    }
    /**
     * @param {MultiLanguageText} mtext 
     */
    setMultiText(mtext){
        this._mtext = mtext;
    }
    refreshLocal(){
        this._mtext.refresh();
    }
    /**
     * @param {Boolean} value 
     */
    setOverwriteEnabled(value){
        this._overwriteEnabled =value;
    }
    /**
     * @returns {String}
     */
    name(){
        return this._mtext.name();
    }
    /**
     * @param {String} symbol 
     */
    setUnknowSymbol(symbol){
        const _this=this;
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
        this.setDefaultName("?"+keys+":"+symbol);
        this.setSymbol(symbol);
        this.setKeys(keys);
        this.setPadButtonId(NaN);
    }
    /**
     * @param {String} symbol 
     */
    setSymbol(symbol){
        this._symbol =symbol;
    }
    symbol(){
        return this._symbol;
    }
    //TODO:将来的にキーコンフィグでのシンボル表示を改造できるようにするため
    //今のところは準備工事にとどめる
    displayName(){
        return this.symbol();
    }

    /**
     * @param {String} name 
     */
    setDefaultName(name){
        this._mtext.setDefaultName(name);
    }
    /**
     * @param {String} keys 
     */
    setKeys(keys){
        this._keys=keys;
    }
    /**
     * @param {Number} buttonId 
     */
    setPadButtonId(buttonId){
        this._buttonId =buttonId;
    }
    /**
     * @returns {String}
     */
    padSymbol(){
        return Input.gamepadMapper[this._buttonId];
    }
    loadSymbol(){
        if(!this._symbol){
            const symbol =(this.padSymbol() || this.firstKeySymbol());
            this.setSymbol(symbol);
        }
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
    fillSymbol(){
        if(!this._symbol){return;}
        if(!isNaN( this._buttonId)){
            gamepadMapperOverwrite(this._buttonId,this._symbol);
        }
        for (const iterator of this._keys) {
            keyMapperOverwrite(iterator,this._symbol);
        }
    }
    /**
     * @param {String} color 
     */
    setColor(color){
        this._color =color;
    }
    setupColor(){
        if(this.isEmpty()){
            this.setColor("#000000");
        }


        
    }
    backColor(){
        if(this.isMandatory()){
            return "#00e4e4"
        }
        if(this.isEmpty()){
            return "#000000";
        }
        return "#000000";
    }
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

class SymbolMapper_T{
    constructor(){
        /**
         * @type {InputDefine[]}
         */
        this._list = [];
    }

    loadBasicSymbol(){
        const param = getParam();
        const ok =createDefaultKeyMapperItem("ok",param.mapperOk);
        const cancel = createDefaultKeyMapperItem("cancel",param.mapperCancel);
        const shift = createDefaultKeyMapperItem("shift",param.mapperShift);
        const menu = createDefaultKeyMapperItem("menu",param.mapperMenu);
        const escape =createDefaultKeyMapperItem("escape",param.mapperEscape);

        const pageup =createDefaultKeyMapperItem("pageup",param.mapperPageup)
        const pagedonw =createDefaultKeyMapperItem("pagedown",param.mapperPagedown)
        this._list.push(ok,cancel,shift,menu,pageup,pagedonw,escape);
    }
    loadExtendsInput(){
        const param = getParam();
        /**
         * @type {String[]}
         */
        const textList = JSON.parse(param.extendsMapper);
        for (const iterator of textList) {
            const obj = JSON.parse(iterator);
            const mtext = MultiLanguageText.create(obj.name);
            const def = new InputDefine(mtext);
            def.setPadButtonId(Number(obj.button));
            def.setKeys(obj.keys);
            this._list.push(def);

        }


    }

    //インスタンスだけ先行して作成し、初期化は後にする
    onBoot(){
        if(this._list.length>0){
            throw(new Error("不明な操作でリストが変更されました"));
        }
        //ツクールの基本シンボルを読み込む
        this.loadBasicSymbol();
        //追加設定のボタン配置を確認する
        this.loadExtendsInput();

        //ボタン配置を利用して、シンボルを読み取る
        this.loadSymbols(); 
        //設定を見ながら、空いている場合のみシンボルを配置
        this.fillSymbol();
        //不明なシンボルを取り込む
        this.importUnknowSymbols();

        //「設定を消去」を追加
        this.makeRemoveSymbol();
        //現在の言語設定に応じて表示を切り替え
        this.refreshLocal();

    }
    fillSymbol(){
        for (const iterator of this._list) {
            iterator.fillSymbol();
        }
    }
    makeRemoveSymbol(){
        const param =getParam();
        const mtext = MultiLanguageText.create(param.mapperDelete)
        const remove = new InputDefine(mtext);
        remove.setSymbol(null);
        this._list.push(remove);
    }

    /**
     * @param {String} symbol 
     */
    actionName(symbol){
        if(!symbol){ return "";}
        const item = this.find(symbol);
        if(item){  return item.name();}
        return "unknow:"+symbol;
    }

    /**
     * @param {String} symbol 
     */
    find(symbol){
        return this._list.find(function(item){
            return item.symbol() ===symbol;
        });
    }
    /**
     * @param {String} symbol 
     */
    makeUnknow(symbol){
        const def = this.find(symbol);
        if(def){
            return;
        }
        const unknow = new InputDefine();
        unknow.setUnknowSymbol(symbol);
        this._list.push(unknow);
    }


    loadSymbols(){
        for (const iterator of this._list) {
            iterator.loadSymbol();
        }
    }
    importUnknowSymbols(){
        this.loadSymbols();
        const _this = this;
        keyMapperFor(function(key,value){
            if(!_this.isSystemSymbol(value)){
                _this.makeUnknow(value);                
            }
        });
    }
    /**
     * @param {String} symbol 
     */
    isSystemSymbol(symbol){
        return ["debug","control","tab","up","down","left","right"].includes(symbol);
    }
    static isMoveSymbol(symbol){
        return ["up","down","left","right"].includes(symbol);
    }
    refreshLocal(){
        for (const iterator of this._list) {
            iterator.refreshLocal();
        }
    }
    /**
     * @param {Number} index 
     */
    item(index){
        return this._list[index];
    }
    maxItems(){
        return this._list.length;
    }
    /**
     * @param {String} symbol 
     */
    indexOfSymbol(symbol){
        for (let i = 0; i < +this._list.length; i++) {
            const element = this._list[i];
            if(element.symbol()===symbol){
                return i;
            }
        }
        return -1;
    }
    /**
     * @param {String} symbol 
     */
    toButtonNumber(symbol){
        const def = this.find(symbol);
        return -1;
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
        return this._list.some(function(def){
            return def.isMandatory()  && def.symbol()===symbol;
        });
    }
    isValidMapper(mapper){
        return isValidMapper(mapper)
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
        ].map(function(g){return Object.freeze(g)});
        this._list = Object.freeze(buttons);
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
    buttonName(index){
        const b = this.button(index);
        if(b){ return b.name();}
        return "";
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
 * @returns {String[]}
 * @param {Object} mapper 
 * @param {String[]} KnownSymbolList 
 */
function unknowSymbols(mapper,KnownSymbolList){
    const result =[];
    const systemKeys =new Set(["debug","control","tab","up","down","left","right"]);
    for (const key in mapper) {
      if (mapper.hasOwnProperty(key)) {
        const value = mapper[key];
          if(!systemKeys.has(value)){
            if(!KnownSymbolList.contains(value)){
              result.push(value);
            }
          }
      }
    }
    return result;
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

function createDefaultKeyMapperItem(symbol,objText){
    const mtext = MultiLanguageText.create(objText);
    const def = new InputDefine(mtext);
    def.setSymbol(symbol);
    def.setMandatory(true);
    return def;
}

const setting = (function(){
    const params = getParam();

    const keyText ={
        up:"↑",
        down:"↓",
        right:"→",
        left:"←"
    };

    const result= {
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
        numVisibleRows:16,//Number(params.numVisibleRows),
        cols:2,
    };
    return result;
})();


/**
 * @param {*} target 
 * @param {String} key 
 * @param {String} symbol 
 */
function mapperOverwrite(target,key,symbol,targetName){

    if(symbol ===""){ return;}
    if(!symbol){ return;}
    if(setting.overwriteWarning){
        const preSymbor =target[key];
        if(!!preSymbor && preSymbor !==symbol ){
            // 警告機能
            console.log('overwriteWarning/キー上書き警告 \n'+targetName+'['+key+']('+preSymbor+')='+symbol);
        }
    }
    target[key] =symbol;
}
/**
 * @param {Number} key 
 * @param {String} symbol 
 */
function keyMapperOverwrite(key,symbol){
    mapperOverwrite(Input.keyMapper,key,symbol,"keyMapper");
}
/**
 * 
 * @param {String} buttonId 
 * @param {String} symbol 
 */
function gamepadMapperOverwrite(buttonId,symbol){
    mapperOverwrite(Input.gamepadMapper,buttonId,symbol,"gamepadMapper");
}

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

/**
 * @param {String} symbol
 * @returns {String}
 * @desc シンボルからゲームパッドのボタン名を返します
 */
function symbolToButtonName(symbol){
    //削除予定？
    return buttonName(symbolToButtonNumber(symbol));
}

/**
 * 
 * @param {String} symbol 
 * @return {string}
 */
function symbolToText(symbol){
    return symbolMapper.actionName(symbol);
};

/**
 * @return {string}
 * @param {number} buttonNumber 
 */
function buttonName(buttonNumber){
    return setting.buttonInfo[buttonNumber].buttonName;
}

const IS_Atsumaru = location.hostname==="html5.nicogame.jp";


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
    for(var key in mapper){
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

function isValidMapper(mapper){
    const len =setting.mandatorySymbols.length;
    for(var i=0; i < len;++i){
        if(!inputMapperHasSymbol( mapper , setting.mandatorySymbols[i])){
            return false;
        }
    }
    return true;
}

function playDefaultSound() {
    SoundManager.playEquip();
}
function playApplySound(){
    SoundManager.playEquip();
}
function playSymbolSetSound(){
    SoundManager.playOk();
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
        super.initialize(rect);
        this.deactivate();
        this.deselect();
    }

    currentSymbol_V2(){
        return this.symbol_V2(this.index());
    }
    /**
     * @param {Number} index 
     */
    symbol_V2(index){
        const item = symbolMapper.item(index);
        return item;
    }
    symbol(index){
        const item = symbolMapper.item(index);
        if(item){
            return item.symbol();
        }
        return null;
    }
    currentSymbol(){
        return this.symbol(this.index());
    }

    maxItems(){
        return symbolMapper.maxItems();
    }
    /**
     * @param {String} symbol 
     */
    selectSymbol(symbol){
        const index = symbolMapper.indexOfSymbol(symbol);
        if(index >=0){
            this.select(index);
        }else{
            this.select(0);
        }
    }
    backColor(index){
        this.colorSrc()
    }
    drawItem(index){
        const item = symbolMapper.item(index);
        if(item){
            const rect = this.itemRectWithPadding(index);
            this.drawText(item.name(), rect.x, rect.y, rect.width);
        }
    }
    moveCenter() {
        const x = Graphics.boxWidth / 2 - this.width / 2;
        const y = Graphics.boxHeight / 2 - this.height / 2;
        this.move(x, y, this.width, this.height);
    }
}

class Window_InputConfigBase extends Window_Selectable_InputConfigVer{

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
    isValidMapper(){
        return symbolMapper.isValidMapper(this.mapper());
    }
    mapper(){
        return {}
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
        this.setGamepadMapper(Input.gamepadMapper);
        this.makeCommandList();
        super.initialize( rect);
        this.defineNameWidth();
        this.defineSymbolTextWidth();
        this.select(0);
        this.refresh();
    }

    makeCommandList() {
        const  exit =CommandManager.exit();
        this._command =[
            CommandManager.reset(),//default_,
            CommandManager.apply(),
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

    /**
     * @param {String} padInfoText 
     */
    setPadInfoText(padInfoText){
        this._padInfoText =padInfoText
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
    
    playDefaultSound(){
        playDefaultSound();
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
    playSymbolSetSound(){
        playSymbolSetSound();
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

    setGamepadMapper(map) {
        this._map = objectClone(map);
    }
    mapper(){
        return this._map;
    }
    cloneGamepadMapper() {
        return createNormalizedInputMapper(this._map);
    }
    /**
     * @param {string}  buttonNumber
     * @return {string} actionKey
     */
    getAction(buttonNumber) {
        return this._map[buttonNumber];
    }
    currentSymbol() {
        return this.symbol(this.index());
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
    addButtonItem(buttonNumber_) {
        const index = this._list.length;
        this._list.push({
            name: buttonName(buttonNumber_),
            buttonNumber: buttonNumber_
        });
        this.setButtonItem(index, buttonNumber_);
    }
    setButtonItem(index, buttonNumber) {
        const action = this.getAction(buttonNumber);
        const text = symbolToText(action) || '';
        const item = this._list[index];
        item.action = action;
        item.text = text;
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
//        const commandIndex = this.commandIndex(index);
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
    //TODO:表示を1行当たり4個にする改修を今後行う
    //また、フォントサイズを小さくする
    drawButtonName(){

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
    /**
     * @return {boolean}
     */
    canApplySetting() {
        return isValidMapper(this._map);
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
    //シンボルを書き換えた場合の再描画で使う

    /**
     * @param {Boolean} value 
     */
    redrawApplyCommand(value) {
        this.clearItem(this.applyCommandIndex());
        this.drawItemBackground(this.applyCommandIndex());
        const index = this.applyCommandIndex();
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


    symbolListHeight(){
        return this.calcWindowHeight( symbolMapper.maxItems());
    }
    symbolListWidth(){
        return setting.windowCustom.symbolWidth;
    }

    /**
     * @param {Number} numLines
     */
    calcWindowHeight(numLines){
        return Window_Selectable.prototype.fittingHeight(Math.floor( numLines))
    }
    /**
     * @returns {Number}
     */
    helpWindowTop(){
        return this.mainAreaTop();
    }
    bottomAreaHeight(){
        return 20;
    }
    helpWindowInitParam(){
        if(Utils.RPGMAKER_NAME ==="MV"){
            return 3;
        }
        if(Utils.RPGMAKER_NAME ==="MZ"){
            const height = this.calcWindowHeight(3);
            const width = Graphics.boxWidth;
            const listWindowHeight = this.symbolListHeight();

            const y = Math.min(this.helpWindowTop(),  Graphics.boxHeight-listWindowHeight-height -this.bottomAreaHeight());
            return new Rectangle( 0,y,width,height );
        }
    }
    createHelpWindow(){
        this._helpWindow = new Window_Help(this.helpWindowInitParam());
        this.addWindow(this._helpWindow);
        const pad =createPadState(0);
        this._helpWindow.setText( createPadinfoText(pad));            
    }


    symbolListWindowRect() {
        const mainWidnow = this.mainWidnow();
        const width = this.symbolListWidth();
        const height = this.symbolListHeight();
        const x =mainWidnow.x + mainWidnow.width;
        const y=mainWidnow.y;
        return new Rectangle(x,y,width,height);
    }

    createSymbolListWindow() {
        const pos = this.symbolListWindowRect();
        const asw = new Window_InputSymbolList(pos);
        asw.setHandler('ok', this.onSymbolListOk.bind(this));
        asw.setHandler('cancel', this.onSymbolListCancel.bind(this));
        asw.hide();
        asw.refresh();
        if (this.symbolCenter()) {
            asw.moveCenter();
        }
        this.addWindow(asw);
        this._symbolListWindow = asw;
    }
    popScene(){
        this._popSceneMode=true;
    }

    playApplySound(){
        playApplySound();
    }
    applyConfig(){
        const mainWindow = this.mainWidnow();
        if(mainWindow.isValidMapper()){
            this.playApplySound();
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

    currentSymbol() {
        return '';
    }
    selectSymbol() {
        this._symbolListWindow.show();
        this._symbolListWindow.activate();
        this._symbolListWindow.selectSymbol(this.currentSymbol());
    }
    /**
     * @return {Window_InputConfigBase}
     */
    mainWidnow() {
        return null;
    }
    changeSymbol(symbol) {
    }


    /**
     * @param {InputDefine} symbol 
     */
    changeSymbol_V2(symbol){
        this.changeSymbol(symbol.symbol());
    }

    /**
     * @param {InputDefine} newSymbol 
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
     * @param {InputDefine} newSymbol 
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
        const newSymbol = this._symbolListWindow.currentSymbol_V2();
        const oldSymbol = this.mainWidnow().currentSymbol();
        if(newSymbol.symbol()!==oldSymbol){
            this.changeSymbol_V2(this._symbolListWindow.currentSymbol_V2());
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
    testMapperValid(){
        const symbols = symbolMapper.getMandatorySymbols();
        const mapper = this.mapper();
        for (const key in mapper) {
            if (mapper.hasOwnProperty(key)) {
                const element = mapper[key];
            }
        }
    }
}

class Scene_GamepadConfigMA extends Scene_InputConfigBase_MA{
    symbolCenter() {
        return false;
    }
    /**
     * @param {object} [gamepadMapper=null] 読み込むコンフィグデータ 無指定の場合、現在の設定値を読み込む
     */
    setGamepadMapper(gamepadMapper) {
        if (this._gamepadWindow) {
            this._gamepadWindow.setGamepadMapper(gamepadMapper);
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
    gamepadWindowRectV2(){
        const width = Graphics.boxWidth;//setting.windowCustom.gamepadWidth*setting.cols;
        const height = this.calcWindowHeight(setting.numVisibleRows/2);
        const x = 0;
        const y= this._helpWindow.y + this._helpWindow.height;
        return new Rectangle(x,y,width,height);
    }

    gamepadWindowRect(){
        const width = setting.windowCustom.gamepadWidth*setting.cols;
        const height = this.calcWindowHeight(setting.numVisibleRows/2);
        const x = (Graphics.boxWidth/2) -(width/2);
        const y= this._helpWindow.y + this._helpWindow.height;
        return new Rectangle(x,y,width,height);
    }

    createGamepadConfigWindow() {
        const rect = this.gamepadWindowRect();
        const gcw = new Window_GamepadConfig_MA(rect);
        gcw.setHandler('ok', this.onConfigOk.bind(this));
        gcw.setHandler('cancel', this.onConfigCancel.bind(this));
        gcw.setHandler(CommandManager.exit().handle, this.onConfigCancel.bind(this));
        gcw.setHandler(CommandManager.apply().handle, this.applyConfig.bind(this));
        gcw.setHandler(CommandManager.reset().handle, this.loadDefautConfig.bind(this));
        this._gamepadWindow = gcw;
        this.addWindow(gcw);
    }

    /**
     * @param {String} symbol 
     */
    changeSymbol(symbol) {
        const index = this._gamepadWindow.index();
        this._gamepadWindow.changeKeyMap(index, symbol);
    }
    mainWidnow() {
        return this._gamepadWindow;
    }
    currentSymbol() {
        return this._gamepadWindow.currentSymbol();
    }
    playDefaultSound(){
        playDefaultSound();
    }
    loadDefautConfig() {
        this.setGamepadMapper(Mano_InputConfig.defaultGamepadMapper);
        this.playDefaultSound();
        this._gamepadWindow.activate();
    }

    saveGamepadMapper(){
        Input.gamepadMapper = this._gamepadWindow.cloneGamepadMapper();
    }

    isAnyPressed(){
//        Input.
//        Input.
    }
    terminate() {
        super.terminate();
        if (this._applyOnExit) {
            this.saveGamepadMapper();
        }
    }
    onConfigOk() {
        this.selectSymbol();
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
        const rect = keyWindow.itemRect(index);
        //編集中のkeymapperから取り出す必要があるのでこうする
        const symbol = keyWindow.symbol(index);
        keyWindow.drawItemRect(!!symbol,rect);
        keyWindow.drawKeyName(this.char,rect);
        keyWindow.drawKeySymbol(index,rect);
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
    draw(keyWindow,index){
    }

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

const KEY_LAYOUT_JIS_V2=(function(){ 
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
const KEY_LAYOUT_US_V2 =(function(){
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
})()


class Window_KeyConfig_MA extends Window_InputConfigBase {


    mapper(){
        return this._map;
    }
    /**
     * @param {Rectangle} rect 
     */
    initialize(rect) {
        this.setKeyboradMapper(Input.keyMapper);
        this.setKeyLayout(ConfigManager.keyLayout_MA);
        super.initialize(rect);
        this.initElementsSize();
        this.refresh();
        this.activate();
        this.select(0);
        this.moveCenter();
    }
    initElementsSize() {
        const x = Graphics.boxWidth;
        const p = this.textPadding();
        this._itemWidth = Math.round((x - p * 6) / this.maxCols());
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
        this._layout = layoutText ==="JIS"? KEY_LAYOUT_JIS_V2 : KEY_LAYOUT_US_V2;
    }
    getKeyLayout() {
        return this._layout._name;
    }
    setKeyboradMapper(mapper) {
        this._map = objectClone(mapper);
    }
    canApplySetting() {
        return isValidMapper(this._map);
    }
    cloneMapper() {
        return createNormalizedInputMapper(this._map);
    }
    itemTextAlign() {
        return 'center';
    }
    moveCenter() {
        const x = Graphics.boxWidth / 2 - this.width / 2;
        const y = Graphics.boxHeight / 2 - this.height / 2;
        this.move(x, y, this.width, this.height);
    }

    exitCommandIndex(){
        return CommandManager.exit()._index;
    }


    playApplySound(){
        playApplySound();
    }

    playJIS_US_ChangeSound(){
        playApplySound();
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
    playSymbolSetSound(){
        playSymbolSetSound();
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


    /**
     * @param {Rectangle} rect
     */
    drawRect(rect, color) {
        this.changePaintOpacity(false);
        this.contents.fillRect(rect.x + 1, rect.y + 1, rect.width - 2, rect.height - 2, color);
        this.changePaintOpacity(true);
    }

    enabledKeyColor(){
        return "#ffd530" ;
    }

    drawItemRect(enabled, rect) {
        const color = enabled ? this.enabledKeyColor() :this.commandBackColor();
        this.drawRect(rect,color);
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
     * 
     * @param {String} keyname 
     * @param {Rectangle} rect 
     */
    drawKeyName(keyname,rect){
        this.changeTextColor(getColorSrc(this).normalColor());
        this.drawText(keyname, rect.x, rect.y, rect.width, 'center'); //,this.itemTextAlign());
        this.changeTextColor(getColorSrc(this).textColor(4));
    }
    /**
     * @param {Number} index
     * @param {Rectangle} rect 
     */
    drawKeySymbol(index,rect){
        const symbolText = this.symbolText(index);

        if(symbolText){
            this.drawText(symbolText, rect.x, rect.y + this.lineHeight(), rect.width, 'center');
        }
    }
    drawItemText(keyName, symobolText, x, y, width) {
        this.changeTextColor(getColorSrc(this).normalColor());
        this.drawText(keyName, x, y, width, 'center'); //,this.itemTextAlign());
        this.changeTextColor(getColorSrc(this).textColor(4));
        if (symobolText) {
            this.drawText(symobolText, x, y + this.lineHeight(), width, 'center');
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
    
    /**
     * @param {Number} index 
     */
    symbolText(index) {
        const symbol = this.symbol(index);
        return symbol;
    }

    item(index){
        return this._layout.list()[index];
        return this._list[index];
    }
    
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
    redrawApplyCommand(value){

    }

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
        this.drawRect(rect, this.commandBackColor());
        this.changeTextColor(this.commandColor());
        this.drawText(commandName, rect.x, rect.y, rect.width, 'center');
    }
}


Window_KeyConfig_MA.spaceItems =4;

class Scene_KeyConfig_MA extends Scene_InputConfigBase_MA{
    symbolCenter() {
        return true;
    }
    currentSymbol(){
        return this._keyconfigWindow.currentSymbol();
    }
    create() {
        Scene_MenuBase.prototype.create.call(this);
        this.createKeyboradConfigWindow();
        this.createSymbolListWindow();
    }
    onConfigCancel() {
        SoundManager.playCancel();
        SceneManager.pop();
    }
    changeSymbol(symbol) {
        const index = this._keyconfigWindow.index();
        this._keyconfigWindow.changeKeyMap(index, symbol);
    }
    onKeyLayoutOk(){
        this._keyconfigWindow.processChangeLayout();
    }
    onConfigOk() {
        this.selectSymbol();
    }
    onLoadDefaultOk(){
        playDefaultSound()
        this.loadDefaultConfig();
    }
    loadDefaultConfig() {
        this._keyconfigWindow.setKeyboradMapper(Mano_InputConfig.defaultKeyMapper);
        this._keyconfigWindow.refresh();
    }

    configKey(){
        return MA_KEYBOARD_CONFIG;
    }

    saveKeyMapper(){
        Input.keyMapper = this._keyconfigWindow.cloneMapper();
    }
    terminate() {
        super.terminate();
        ConfigManager.setKeyLayoutMA(this._keyconfigWindow.getKeyLayout());
        if (this._applyOnExit) {
            this.saveKeyMapper();
        }
    }
    setWASD_Move(){
        this._keyconfigWindow.setWASD_Move();
        this._keyconfigWindow.playApplySound();
    }
    keyconfigWindowRect(){
        const x = 0;
        const y=this.mainAreaTop();
        const width = Graphics.boxWidth;
        const lines = Utils.RPGMAKER_NAME =="MV" ? 12:10;
        const height = this.calcWindowHeight(lines,true);
        return new Rectangle(x,y,width,height);
    }
    createKeyboradConfigWindow() {
        const rect = this.keyconfigWindowRect();
        const kcw = new Window_KeyConfig_MA(rect);
        kcw.setHandler('cancel', this.onConfigCancel.bind(this));
        kcw.setHandler('ok', this.onConfigOk.bind(this));
        kcw.setHandler(CommandManager.reset().handle, this.onLoadDefaultOk.bind(this));
        kcw.setHandler(CommandManager.apply().handle, this.applyConfig.bind(this));
        kcw.setHandler(CommandManager.wasd().handle,this.setWASD_Move.bind(this));
        kcw.setHandler(CommandManager.keylayout().handle,this.onKeyLayoutOk.bind(this));
        kcw.setHandler(CommandManager.exit().handle,this.onConfigCancel.bind(this));
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
const Scene_Boot_onDatabaseLoaded =Scene_Boot.prototype.onDatabaseLoaded;
Scene_Boot.prototype.onDatabaseLoaded =function(){    
    symbolMapper.onBoot();
    Mano_InputConfig.defaultGamepadMapper =Object.freeze( objectClone(Input.gamepadMapper));
    Mano_InputConfig.defaultKeyMapper= Object.freeze(objectClone(Input.keyMapper));
    Scene_Boot_onDatabaseLoaded.call(this);
};
if(Utils.RPGMAKER_NAME =="MV"){
    (function(){
        //MV workaround
        Scene_InputConfigBase_MA.prototype.mainAreaTop = function(){
            return 0;
        };
        Window_Selectable_InputConfigVer.prototype.drawItemBackground =function(){};

        Window_Selectable_InputConfigVer.prototype.itemRectWithPadding = Window_Selectable_InputConfigVer.prototype.itemRectForText;
    })();
}


const exportClass ={
    Scene_ConfigBase:Scene_InputConfigBase_MA,
    Scene_KeyConfig:Scene_KeyConfig_MA,
    Scene_GamepadConfig: Scene_GamepadConfigMA,
    Window_InputSymbolList:Window_InputSymbolList,
    Window_GamepadConfig:Window_GamepadConfig_MA,
    Window_KeyConfig:Window_KeyConfig_MA,
    symbolToButtonName:symbolToButtonName,
    symbolToButtonNumber:symbolToButtonNumber,
    defaultKeyMapper:{},
    defaultGamepadMapper:{},
    gotoKey:function(){
        SceneManager.push(Mano_InputConfig.Scene_KeyConfig );
    },
    gotoGamepad:function(){
        SceneManager.push(Mano_InputConfig.Scene_GamepadConfig  );
    },
    unknowButtons:function(){
        return unknowSymbols(Input.gamepadMapper,setting.symbolList);
    },
    unknowKeys:function(){
        return unknowSymbols(Input.keyMapper,setting.symbolList);
    }
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
