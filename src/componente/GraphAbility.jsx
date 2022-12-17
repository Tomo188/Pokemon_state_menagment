import { useRef,useEffect } from "react"

export const GraphAbilityPokemon=(props)=>{
    console.log(props)
    const canvasRef=useRef(null);
    const draw=(ctx,canvas)=>{
        canvas.height=300;
        canvas.width=300;
        console.log(canvas.width/2)
        ctx.strokeStyle = '#000000'
        ctx.translate(canvas.width/2,canvas.height/2)
        ctx.closePath()
        ctx.font = "12px Arial";
        ctx.strokeText("Attack", -150, 20);
        ctx.font = "12px Arial";
        ctx.strokeText("Defence", 105, 20);
        ctx.font = "12px Arial";
        ctx.strokeText("HP", 0, -140);
        ctx.font = "12px Arial";
        ctx.strokeText("Speed", 0, 140);
        ctx.font = "12px Arial";
        ctx.strokeText("0", 0, 0);
        ctx.closePath();
        ctx.beginPath()
        ctx.arc(0,0,150,0,2*Math.PI)
        ctx.stroke()
       
        
        drawLine(ctx,0,-150,0,150)
        drawLine(ctx,-150,0,150,0)
        drawLine(ctx,-props.data.attack,props.data.special_attack/2,0,-props.data.hp)
        drawLine(ctx,-props.data.attack,props.data.special_attack/2,0,props.data.speed)
        drawLine(ctx,props.data.defense,props.data.special_defense/2,0,-props.data.hp)
        drawLine(ctx,props.data.defense,props.data.special_defense/2,0,props.data.speed)
        
        
        
    }
    function drawLine(ctx,x,y,z,q){
        ctx.beginPath()
        ctx.moveTo(x,y)
        ctx.lineTo(z,q)
        ctx.closePath()
        ctx.stroke() 

    }
    
    useEffect(()=>{
        const canvas=canvasRef.current;
        const context=canvas.getContext("2d");
        draw(context,canvas);
    },[draw])
    return (<canvas ref={canvasRef}></canvas>)
}