
cc.Class({
    extends: cc.Component,

    properties: {
       
        Player_Node: cc.Node,
        bg_layer_back:cc.Node,
        bg_layer_mid:cc.Node,
    },

    update (dt) {

        let target_position = this.Player_Node.getPosition();
        target_position.y = cc.misc.clampf(target_position.y,0,220);
        let current_position = this.node.getPosition();
        current_position.lerp(target_position, 0.1, current_position);
        this.node.setPosition(current_position);
        this.bg_layer_back.setPosition(current_position.x/2,current_position.y/2);
        this.bg_layer_mid.setPosition(current_position.x/4,current_position.y/4);

    },
});
