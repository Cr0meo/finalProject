document.routePoints = [
    [ 10, 10 ], [ 500, 10 ], [ 10, 500 ], [ 500, 500 ], [250,250]
]
var newPoints = [[ 10, 10 ], [ 1200, 500 ], [ 750, 500 ], [ 950, 10 ]]

var Personage = function ( params ) {
    this.element = document.createElement ( 'img' )
    this.element.src = !params || !params.imgURL ?
                  this.defaultPersonageImage : params.imgURL
    document.body.appendChild ( this.element )
    this.elementStyling ( this.element, this.personageStyle )

    this.pointImage = !params || !params.pointImage
                        ? this.defaultPointImage
                        : params.pointImage
    this.route =  !params || !params.routePoints ||
    						  !Array.isArray ( params.routePoints ) ?
                  this.defaultRoute : params.routePoints
    this.setRoutePoints ()
    this.nextPoint = 1
    this.currentPosition = this.route [0]
    this.velocity = !params || !params.velocity
                            || typeof params.velocity !== "number"
                            ? 5 : params.velocity
    this.delay = !params || !params.timeInterval
                         || typeof params.timeInterval !== "number"
                         ? 100 : params.timeInterval
    this.interval = setInterval ( this.mc_personage.bind ( this ), this.delay )
  }
Personage.prototype.setRoutePoints = function () {
    for ( var item of this.route ) {
    		if ( !Array.isArray ( item ) ||
        			typeof item [0] !== 'number' ||
              typeof item [1] !== 'number'
        ) continue
        var point = document.createElement ( 'figure' )
        this.elementStyling ( point,
                Object.assign ( this.pointStyle, {
                    left: item [0] + 'px',
                    top:  item [1] + 'px',
                    backgroundImage: "url(" + this.pointImage + ")"
                } )
        )
        document.body.appendChild ( point )
    }
}

Personage.prototype.elementStyling = function ( elem, styleObject ) {
    for ( var s of Object.keys ( styleObject ) ) {
        elem.style [s] = styleObject [s]
    }
}

Personage.prototype.getNextPointIndex = function () {
    this.nextPoint = this.nextPoint < this.route.length - 1 ?
                      this.nextPoint + 1 : 0
}
Personage.prototype.getNextPoint = function ( ind ) {
    return this.route [ this.nextPoint ][ind]
}
Personage.prototype.getDistance = function ( ind ) {
    return this.getNextPoint ( ind ) -
            this.currentPosition [ind]
}

Personage.prototype.mc_personage = function ( event ) {
       if (!isStop){
        var distance = []
        distance [0] = this.getDistance ( 0 )
        distance [1] = this.getDistance ( 1 )

      this.element.style.transform = distance [0] < 0 ?
                    "rotateY(180deg)" : "rotateY(0deg)"
      this.currentPosition [0] += distance [0] !== 0 ?
              Math.sign(distance [0]) * this.velocity : 0
      this.currentPosition[1] += distance [1] !== 0 ?
              Math.sign(distance [1]) * this.velocity : 0
      this.element.style.left = this.currentPosition [0] + 'px'
      this.element.style.top = this.currentPosition [1] + 'px'

      if ( distance [0] === 0 && distance [1] === 0 )
                            this.getNextPointIndex ()
                          }
}

Personage.prototype.defaultRoute = [
		[ 20, 20 ], [ 300, 300 ], [ 100, 300 ], [ 200, 50 ]
]
Personage.prototype.defaultPersonageImage = "./images/personage.gif"
Personage.prototype.defaultPointImage = "./images/tower.gif"

Personage.prototype.personageStyle = {
		position: "fixed",
    top: 0,
    left: 0,
    width: "100px",
    height: "auto"
}
Personage.prototype.pointStyle = {
		position: "fixed",
    top: 0,
    left: 0,
    width: "100px",
    height: "100px",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    backgroundPosition: "center center",
    backgroundImage: "url(" + this.defaultPointImage + ")"
}
var isStop = false;
var btn = document.createElement ( 'button' )
document.body.appendChild ( btn )
btn.innerHTML = "Стоп"
btn.style.position = "fixed"
btn.style.top = "50%"
btn.style.right = "55%"
btn.style.height = '30px'
btn.onclick = function ( e ) {
   e.preventDefault();
  isStop = true;
}

var btn = document.createElement ( 'button' )
document.body.appendChild ( btn )
btn.innerHTML = "Старт"
btn.style.position = "fixed"
btn.style.top = "50%"
btn.style.right = "45%"
btn.style.height = '30px'
btn.onclick = function ( e ) {
 e.preventDefault();
  isStop = false;
}
function start1stAnimation () {isStop = false;
  document.personage = new Personage ( {
      routePoints: document.routePoints
})}
function start2sndAnimation () {isStop = false;
  document.personage = new Personage ({
  routePoints:newPoints,imgURL:"./images/person2.gif"
  })
}
