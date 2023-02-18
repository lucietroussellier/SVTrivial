import './Case.css'

const colorMapping = {
    0: 'grey',
    1: 'green',
    2: 'yellow',
    3: 'orange',
    4: 'pink',
    5: 'blue',
    6: 'purple'
}

const NormalCase = (props) => {
    console.log(props.type)
    console.log(props.size)
    console.log(props.angle)
    var x =  props.size / 2 + props.size / 2 * Math.cos(props.angle*Math.PI/180);
    var y =  props.size / 2 - props.size / 2 * Math.sin(props.angle*Math.PI/180);
    
    //x = x+20 // moitié de la width
    //y = y+40 // moitié de la height

    var a=14, b=25, c=1, d=2 , e=2, f=1
    /*
    if (props.camembert){
        a=12, b=30, c=10, d=12 , e=15, f=4
    }
    */
    /*
    a,b,c,d,e,f sont des var de tests pour trouver la bonne forme du clippath
    g,h,i,j,k,l pareil mais pour les grosses cases
    const clipPath = `polygon(50% 0, 100% 50%, 50% 100%, 0 50%)`;
    
    */
    const clipPath = `polygon(${a}% 0%, ${b}% ${c}%, 50% ${d}%, ${100-b}% ${c}%,${100-a}% 0%, 100% ${100-e}%, 75% ${100-f}%, 50% 100%, 25% ${100-f}%, 0 ${100-e}% )`;
  
    const style = {
      position: `absolute`,
      left: `${x}px`,
      top: `${y}px`,
      transformOrigin : 'top left',
      transform: `rotate( ${-90-props.angle}deg)`,
      clipPath: clipPath,
      width: `40px` ,
      height: `80px`,
      backgroundColor: colorMapping[props.category] 
      };
  
  
    return (
      <div className={`case ${props.type}`}  style={style} >
        {props.children}
      </div>
    );
    /*
    return (
      <div className="normal-case" style={props.style}>
        {props.children}
      </div>
    );
    */
  };

const CamembertCase = (props) => {
    var x =  props.size / 2 + props.size / 2 * Math.cos(props.angle*Math.PI/180);
    var y =  props.size / 2 - props.size / 2 * Math.sin(props.angle*Math.PI/180);
    
    x=x
    y=y+20
    var a=12, b=30, c=2, d=3 , e=10, f=2
    
    const clipPath = `polygon(${a}% 0%, ${b}% ${c}%, 50% ${d}%, ${100-b}% ${c}%,${100-a}% 0%, 100% ${100-e}%, 75% ${100-f}%, 50% 100%, 25% ${100-f}%, 0 ${100-e}% )`;
  
    const style = {
      position: `absolute`,
      left: `${x}px`,
      top: `${y}px`,
      transformOrigin : 'top left',
      transform: `rotate( ${-90-props.angle}deg)`,
      clipPath: clipPath,
      width: `80px` ,
      height: `80px`,
      backgroundColor: colorMapping[props.category] 
      };
return (
    <div className={`case ${props.type}`} style={style}>
    {props.children}
    </div>
);
};

const RectangleCase = (props) => {
return (
    <div className="rectangle-case" style={props.style}>
    {props.children}
    </div>
);
};
const Case = (props) => {
    
    
    
    if (props.type.indexOf('normal')>-1) {
      return <NormalCase {...props} />;
    } else if (props.type.indexOf('camembert')>-1) {
      return <CamembertCase {...props} />;
    } else if (props.type.indexOf('rect')>-1) {
      return <RectangleCase {...props} />;
    }
  };



  export default Case;