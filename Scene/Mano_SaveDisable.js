/*:
 * @plugindesc セーブ禁止状態でセーブ画面を開いた場合にも禁止する
 * @author しぐれん
 * 
 * @target MZ
 * 
 * @param helpText
 * @type string
 * @default ここではセーブできません
 * 
 * @help
 * ツクール標準のセーブ禁止はセーブ画面を開くのを禁止するのみで、
 * プラグインなどによって開いてしまった場合はセーブ可能です。
 * このプラグインはセーブ画面での決定を禁止することで、この問題を解決します。
*/

(function(){
    'use strict';
    /**
     * @type {String}
     */
    const  PLUGIN_NAME= ('Mano_SaveDisable');
    function getParam(){ return PluginManager.parameters(PLUGIN_NAME);  }
    
    const Window_SavefileList_isEnabled =Window_SavefileList.prototype.isEnabled ;
    Window_SavefileList.prototype.isEnabled =function(savefileId){
        if(this._mode ==="save"){
            if(!$gameSystem.isSaveEnabled()){
                return false;
            }
        }
        return Window_SavefileList_isEnabled.call(this,savefileId);
    };

    const Scene_Save_helpWindowText=Scene_Save.prototype.helpWindowText;
    Scene_Save.prototype.helpWindowText = function() {
        if($gameSystem.isSaveEnabled()){
            return Scene_Save_helpWindowText.call(this);
        }
        const param = getParam();
        return (param.helpText);
    };

}())

