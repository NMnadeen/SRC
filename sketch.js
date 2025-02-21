//KODE FRA ANDERS
//MANGO??
let P0 = {x: 50, y: 350, relativX: undefined, relativY: undefined};
let P1 = {x: 100, y: 50, relativX: undefined, relativY: undefined};
let P2 = {x: 300, y: 350, relativX: undefined, relativY: undefined};
let P3 = {x: 500, y: 650, relativX: undefined, relativY: undefined};
let P4 = {x: 550, y: 350, relativX: undefined, relativY: undefined};
let A = {x: undefined, y: undefined};
let B = {x: undefined, y: undefined};

let C = {x: undefined, y: undefined};
let D = {x: undefined, y: undefined};
//let E = {x: undefined, y: undefined};
let Q = {x: undefined, y: undefined};
let P = {x: undefined, y: undefined};

let t=0
let pd=15

let bezierPoints = [P0,P1,P2,P3,P4]

function setup() {
  createCanvas(1200, 700);
} 

function draw() {
  background(220);
  movePoint()
  calcD()
  for(let t=0; t<1; t+=0.001){
    calcBezier(t);
    //calcD();
    drawBezier();
  }
  text("Klik og hiv punkterne for at ændre bezierkurven",300,100)
  supportLines()
  drawPoints()
}

function calcBezier(t){
  A.x=lerp(P0.x,P1.x,t)
  A.y=lerp(P0.y,P1.y,t)
  B.x=lerp(P1.x,P2.x,t)
  B.y=lerp(P1.y,P2.y,t)
  C.x=lerp(P2.x,P3.x,t)
  C.y=lerp(P2.y,P3.y,t)
  D.x=lerp(P3.x,P4.x,t)
  D.y=lerp(P3.y,P4.y,t)
  Q.x=lerp(C.x,D.x,t)
  Q.y=lerp(C.y,D.y,t) 
  P.x=lerp(A.x,B.x,t)
  P.y=lerp(A.y,B.y,t)
}

//Hældningerne beregnes for de to kurver i punktet p__2, og teksten skriver 
//Ændring i x- og y- er taget fra formlen for b'(t)
function calcD(){
  t = 1 //t-værdi for endepunktet i P(t)
  PxMærke = (2*(1-t)*((P1.x)-(P0.x))+2*t*((P2.x)-(P1.x))) //Beregn ændring i x for den første kurve
  PyMærke = (2*(1-t)*((P1.y)-(P0.y))+2*t*((P2.y)-(P1.y))) //Beregn ændring i y for den første kurve
  PHældning = PyMærke/PxMærke //Beregn den første kurves hældning
  

  t = 0 //t-værdi for Begyndelsespunktet i Q(t)
  QxMærke = (2*(1-t)*((P3.x)-(P2.x))+2*t*((P4.x)-(P3.x))) //Beregn ændring i x for den anden kurve
  QyMærke = (2*(1-t)*((P3.y)-(P2.y))+2*t*((P4.y)-(P3.y))) //Beregn ændring i y for den anden kurve
  QHældning = QyMærke/QxMærke //Beregn den anden kurves hældning


  HældningTjek(PHældning,QHældning); //tjek om hældninger er ens

  text("P'(1) er "+PHældning,50,650) //skriv den første kurves hælding
  text("Q'(0) er "+QHældning,50,670) //skriv den anden kurves hældning


}

//Hvis hældningerne på det to kurver er ens, skiftes baggrundens farve til grøn og der kommer en text på skærmen som bekræfter det.
function HældningTjek(PHældning,QHældning){
  if(PHældning==QHældning){
    //console.log('true')   
    background(112, 212, 110)
    text("Hældningerne er ens, der er dannet en glat spline! :)",50,690)
  }
}

function supportLines(){
  line(P0.x,P0.y,P1.x,P1.y);
  line(P1.x,P1.y,P2.x,P2.y);
  line(P2.x,P2.y,P3.x,P3.y);  
  line(P3.x,P3.y,P4.x,P4.y);

}

function drawBezier(){
  circle(P.x,P.y,7);
  circle(Q.x,Q.y,7);
}

function drawPoints(){
  circle(P0.x,P0.y,pd);
  circle(P1.x,P1.y,pd);
  circle(P2.x,P2.y,pd);
  circle(P3.x,P3.y,pd);
  circle(P4.x,P4.y,pd);
}

function movePoint(){
  for(let i=0; i<bezierPoints.length;i++){
    if(bezierPoints[i].relativX!=undefined){
      bezierPoints[i].x=mouseX+bezierPoints[i].relativX
      bezierPoints[i].y=mouseY+bezierPoints[i].relativY
    }
  } 
}

function mousePressed(){
  for(let i=0; i<bezierPoints.length;i++){
    if(dist(bezierPoints[i].x,bezierPoints[i].y,mouseX,mouseY)<pd/2){
      bezierPoints[i].relativX=bezierPoints[i].x-mouseX
      bezierPoints[i].relativY=bezierPoints[i].y-mouseY
    }
  } 
}

function mouseReleased(){
  for(let i=0; i<bezierPoints.length;i++){
    bezierPoints[i].relativX=undefined
    bezierPoints[i].relativY=undefined
  } 
} 

/*
/////////// version til et virkårligt antal punkter || Bruges IKKE i SRC, men er gemt til eget brug
let points = [ [0, 128], [128, 0], [256, 0], [384, 128] ]
function drawDecasteljau(points){
  for(let i = 0; i < 1; i+=0.001){
    let ps = crlPtReduceDeCasteljau (points, i)
    circle(ps[ps.length-1][0][0],ps[ps.length-1][0][1],10)
  }
}

//https://en.wikipedia.org/wiki/De_Casteljau%27s_algorithm 
function crlPtReduceDeCasteljau(points, t) {
    let retArr = [ points.slice () ];
	while (points.length > 1) {
        let midpoints = [];
		for (let i = 0; i+1 < points.length; ++i) {
			let ax = points[i][0];
			let ay = points[i][1];
			let bx = points[i+1][0];
			let by = points[i+1][1];
            // a * (1-t) + b * t = a + (b - a) * t
			midpoints.push([
				ax + (bx - ax) * t,
				ay + (by - ay) * t,
			]);
		}
        retArr.push (midpoints)
		points = midpoints;
	}
	return retArr;
}
////////////////
*/

/*

function movePoint()
  for hvert kontrolpunkt i bezierPoints
    hvis relativX og relativY er defineret i punktet
      opdater punktets X position med musensX + relativX
      opdater punktets Y position med musensY + relativY

*/