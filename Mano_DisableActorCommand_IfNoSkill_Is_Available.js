/*:
 * @plugindesc スキルが使用不能な状態ならコマンドを封じる
 * @author しぐれん(https://github.com/Sigureya/RPGmakerMV)
 * 
 * @target MZ
 * @help
 * 戦闘中のアクターコマンドに関する機能です。
 * コマンドに対応した使用可能なスキルが無い場合、コマンドを選択不能にします。
 * 
 * MITライセンスとします。
*/

(function(){
const Window_ActorCommand_addCommand=Window_ActorCommand.prototype.addCommand;
Window_ActorCommand.prototype.addCommand =function(name,symbol,enabled,ext){
    if(symbol ==="skill" && ext){
        const en2= this._actor.skills().some( (skill)=>{
            return skill.stypeId === ext && this._actor.canUse(skill);
        })
        Window_ActorCommand_addCommand.call(this,name,symbol,en2,ext);
    }else{
        Window_ActorCommand_addCommand.call(this,name,symbol,enabled,ext);
    }
}; 
}())