/*:
 * @plugindesc スキルが使用不能な状態ならコマンドを封じる
 * @author しぐれん(https://github.com/Sigureya/RPGmakerMV)
 * 
 * @target MZ
 * 
 * @param skillTypeList
 * @text 条件チェックを行うスキルタイプ
 * @type number[]
 * @default []
 * 
 * @help
 * 戦闘中のアクターコマンドに関する機能です。
 * コマンドに対応した使用可能なスキルが無い場合、コマンドを選択不能にします。
 * 
 * MITライセンスとします。
*/

(function(){
    /**
     * @type {String}
     */
    const  PLUGIN_NAME= ('Mano_DisableActorCommand_IfNoSkill_Is_Available');
    function getParam(){ return PluginManager.parameters(PLUGIN_NAME);  }
    
const setting = (function(){

    const param =getParam();
    /**
     * @type {string[]}
     */
    const skillTypeList = JSON.parse(param.skillTypeList||"[]");
    const skillTypeSet = new Set(skillTypeList.map(Number));
    const result ={
        skillTypes:skillTypeSet,
    };
    return result;
})();

const Window_ActorCommand_addCommand=Window_ActorCommand.prototype.addCommand;
Window_ActorCommand.prototype.addCommand =function(name,symbol,enabled,ext){
    if( enabled && symbol ==="skill" && setting.skillTypes.has(ext)){
        const en2= this._actor.skills().some( (skill)=>{
            return skill.stypeId === ext && this._actor.canUse(skill);
        })
        Window_ActorCommand_addCommand.call(this,name,symbol,en2,ext);
    }else{
        Window_ActorCommand_addCommand.call(this,name,symbol,enabled,ext);
    }
}; 
}())
