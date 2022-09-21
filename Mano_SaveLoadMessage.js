//=============================================================================
// Mano_PartyRotate.js
// ----------------------------------------------------------------------------
// Copyright (c) 2022-2022 Sigureya
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2022/09/21 
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/Sigureya/
//=============================================================================

/*:
 * @plugindesc セーブデータの読み書き時にメッセージを表示します。
 * @author しぐれん
 * @url https://github.com/Sigureya/RPGmakerMZ/blob/master/Mano_SaveLoadMessage.js
 * @target MZ
 * 
 * @command SaveWithMessage
 * @text セーブ画面を開く(メッセージ付き)
 * @desc セーブの実行結果に応じてメッセージを表示します。
 * 表示文章はプラグインパラメータで設定します。
 * 
 * @command SaveWithCustomMessage
 * @text セーブ画面を開く(特殊メッセージ)
 * @desc セーブの実行結果に応じてメッセージを表示します。
 * 追加パラメータで文章を変更できます。
 * 
 * @arg messageWhenLoad
 * @text メッセージ:読み込み時
 * @desc 空欄の場合、プラグインパラメータを参照します。
 * @type mulitline_string
 * 
 * @arg messageWhenSave
 * @text メッセージ:セーブした
 * @desc 空欄の場合、プラグインパラメータを参照します。
 * @type mulitline_string
 * 
 * @arg messageWhenDidNotSave
 * @text メッセージ:セーブしなかった
 * @desc 空欄の場合、プラグインパラメータを参照します。
 * @type mulitline_string
 * 
 * @command SaveWithStateCheck
 * @text セーブ画面を開く(結果を変数に書き込む)
 * @desc このコマンドの下に条件分岐を入れてください。
 * 読み込み成功:1,セーブ成功:2,セーブ失敗:3
 * 
 * 
 * @param saveStateVariable
 * @text セーブ状態検出変数
 * @desc セーブの直後に変数に以下の値を書き込みます。
 * 読み込み成功:1,セーブ成功:2,セーブ失敗:3
 * @type variable
 * @default 0
 * 
 * @param whenLoadMessage
 * @text メッセージ:読み込み時
 * @type mulitline_string
 * @default セーブデータを読み込み再開しました。
 * 
 * @param whenSaveMessage
 * @text メッセージ:セーブした
 * @type mulitline_string
 * @default セーブを行いました。
 * 
 * @param whenDidNotSaveMessage
 * @text メッセージ:セーブしなかった
 * @type mulitline_string
 * @default セーブを行いませんでした。
 * 
 * @help
 * セーブの読み書きの際に、専用のメッセージを表示します。
 * 表示する文章はプラグインパラメータで設定します。
 * セーブ画面を開くにはプラグインコマンドを使います。
 * 
*/
(function(){
/**
 * @typedef {object} EventCommand
 * @property {number} code
 * @property {number} indent
 * @property {any[]} parameters
 */

/**
 * @typedef {[string,number,number,number,string]} ShotTextParamator101
 */

/**
 * @type {String}
 */
const  PLUGIN_NAME= ('Mano_SaveLoadMessage');
function getParam(){ return PluginManager.parameters(PLUGIN_NAME);  }
const setting = (function(){
    const param =getParam();
    const result ={
        saveStateVariable:Number(param.saveStateVariable),
        messageWhenLoad:String(param.whenLoadMessage),
        messageWhenSave:String(param.whenSaveMessage),
        messageWhenDidNotSave:String(param.whenDidNotSaveMessage),
    };
    return result;
})();

const SAVEDATALOADED_MAGIC_NUMBER =-5861;
const ON_SAVEDATA_LOAD=1;
const ON_SAVEDATA_SAVE =2;
const ON_SAVEDATA_DIDNOT_SAVE =3;

const DataManager_extractSaveContents =DataManager.extractSaveContents;
DataManager.extractSaveContents =function(contents){
    DataManager_extractSaveContents.call(this,contents);
    $gameVariables.setValue(setting.saveStateVariable,SAVEDATALOADED_MAGIC_NUMBER);
};
const SAVE_WITH_STATE_CHECK ="SaveWithStateCheck";
/**
 * 
 * @param {string} msg1 
 * @param {string} msg2 
 * @param {string} msg3 
 * @param {ShotTextParamator101} showTextParam101 
 * @returns {EventCommand[]}
 */
function createSaveMessageCode(msg1,msg2,msg3,showTextParam101){
    const variableId =setting.saveStateVariable;
    return [
        {
            //セーブ画面を開く、プラグインコマンドを呼び出し
            code:357,
            indent:0,
            parameters:[PLUGIN_NAME,SAVE_WITH_STATE_CHECK,{}],
        },
        {
            //読み込みの場合
            code:111,
            indent:0,
            parameters:[1,variableId,0,ON_SAVEDATA_LOAD,0],
        },
        {
            code:101,
            indent:1,
            parameters:showTextParam101,
        },
        {
            code:401,
            indent:1,
            parameters:[msg1],
        },
        {
            //中断
            code:115,
            indent:1,
            parameters:[],
        },
        {
            //書き込みの場合
            code:111,
            indent:0,
            parameters:[1,variableId,0,ON_SAVEDATA_SAVE,0],
        },
        {
            code:101,
            indent:1,
            parameters:showTextParam101,
        },
        {
            code:401,
            indent:1,
            parameters:[msg2],
        },
        {
            //中断
            code:115,
            indent:1,
            parameters:[],
        },
        {
            code:101,
            indent:0,
            parameters:showTextParam101,
        },
        {
            code:401,
            indent:0,
            parameters:[msg3],
        },

    ];
}

function createSaveStateCode(){
    const variableId =setting.saveStateVariable;
    const lastSaveCount = $gameSystem.saveCount();
    /**
     * @type {EventCommand[]}
     */
    const code=[
        {
            //セーブ画面を開く
            code:352,
            indent:0,
            parameters:[],
        },
        {
            //セーブデータが読み込まれた場合
            code:111,
            indent:0,
            parameters:[1,variableId,0,SAVEDATALOADED_MAGIC_NUMBER,0],
        },
        {
            //分岐モードを「読み込み」に
            code:122,
            indent:1,
            parameters:[variableId,variableId,0,0,ON_SAVEDATA_LOAD],
        },
        {
            //イベント処理の中断
            code:115,
            indent:1,
            parameters:[],
        },
        {
            code:0,
            indent:1,
            parameters:[],
        },
        {
            //変数に最新のセーブ回数を書き込む
            code:122,
            indent:0,
            parameters:[variableId,variableId,0,3,7,6],
        },
        {
            //記録していたセーブ回数と異なる場合(書き込みした場合)
            code:111,
            indent:0,
            parameters:[1,variableId,0,lastSaveCount,5],
        },
        {
            //分岐モードを「書き込み」に
            code:122,
            indent:1,
            parameters:[variableId,variableId,0,0,ON_SAVEDATA_SAVE],
        },
        {
            //イベント処理の中断
            code:115,
            indent:1,
            parameters:[],
        },
        {
            code:0,
            indent:1,
            parameters:[],
        },
        {
            //分岐モードを「何もしなかった」に
            code:122,
            indent:0,
            parameters:[variableId,variableId,0,0,ON_SAVEDATA_DIDNOT_SAVE],
        },
        {
            code:0,
            indent:0,
            parameters:[],
        }
    ];

    return code;
}

PluginManager.registerCommand(PLUGIN_NAME,SAVE_WITH_STATE_CHECK,function(){
    const code =createSaveStateCode();
    this.setupChild(code,0);
});
PluginManager.registerCommand(PLUGIN_NAME,"SaveWithMessage",function(){
    const code = createSaveMessageCode(
        setting.messageWhenLoad,
        setting.messageWhenSave,
        setting.messageWhenDidNotSave,
        ["",0,0,2,""]
        );
    this.setupChild(code,0);

});
PluginManager.registerCommand(PLUGIN_NAME,"SaveWithCustomMessage",function(arg){
    const code = createSaveMessageCode(
        arg.messageWhenLoad || setting.messageWhenLoad,
        arg.messageWhenSave || setting.messageWhenSave,
        arg.messageWhenDidNotSave || setting.messageWhenDidNotSave,
        ["",0,0,2,""]
        );
    this.setupChild(code,0);

});

}())
