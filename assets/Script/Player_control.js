
cc.Class({
    extends: cc.Component,

    properties: {
      
        bomb_Prefab: cc.Prefab,

    },


    onLoad () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyPressed, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyReleased, this);

        this.Rigid_Body = this.node.getComponent(cc.RigidBody);
        this.Direction = 0;
        this.Velocity_Max_X = 400;
        this.Walk_Force = 2000;
        this.Jump_Force = 90000;
        this.On_the_ground = false;
        this._friction = 1;

    },

    onKeyPressed(event) {
        let key_code = event.keyCode;
        switch(key_code) {
        
            case cc.macro.KEY.left:
                this.Direction = -1;
            break;

            case cc.macro.KEY.right:
                this.Direction = 1;
            break; 

            case cc.macro.KEY.up:
               if(this.On_the_ground) {
                    this.Rigid_Body.applyForceToCenter(cc.v2(0,this.Jump_Force), true);
                    this.On_the_ground = false;
               }
            break;

            case cc.macro.KEY.space:
               this.Throw_Bomb();
             break;
               
        }
    },

    onKeyReleased(event) {

        let key_code = event.keyCode;

        switch(key_code) {
        
            case cc.macro.KEY.left:
            case cc.macro.KEY.right:
                this.Direction = 0;
            break; 
        }

    },

    onBeginContact (selfCollider, otherCollider, contact) {
        if(otherCollider.tag == 2) {
            this.On_the_ground = true;
        }
    },

    update (dt) {

        if((this.Direction > 0 && this.Rigid_Body.linearVelocity.x < this.Velocity_Max_X) || (this.Direction < 0 && this.Rigid_Body.linearVelocity.x > -this.Velocity_Max_X) ) {
            this.Rigid_Body.applyForceToCenter(cc.v2 (this.Direction*this.Walk_Force, 0), true);
        }

    },

    Throw_Bomb () {

        let bomb = cc.instantiate(this.bomb_Prefab);
        bomb.parent = this.node.parent;
        let pos = this.node.getPosition();
        pos.x += 30;
        bomb.setPosition(pos);
        let rb = bomb.getComponent(cc.RigidBody);
        rb.applyForceToCenter(cc.v2(3500, 3500), true);

    }

});
