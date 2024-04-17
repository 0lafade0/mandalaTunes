import React, { useEffect, useState } from 'react';
import Sketch from 'react-p5';

// let strokeW; //control with something?? could this be useful for time sig?
// let overlap, beziers, sym, layers, alph, strokeYN, ang, a1x, a1y, a2x, a2y, x1, x2, y1, y2, hSize, cush;

const Spirograph = ({
    acoust, dance, duration, energy, instrum,
    key, live, loud, mode, speech, tempo, time_sig, valence}) => {

    let strokeW; //control with something?? could this be useful for time sig?
    let overlap, beziers, sym, layers, alph, strokeYN, ang, a1x, a1y, a2x, a2y, x1, x2, y1, y2, hSize, cush;
    let size = 500;

      const setup = (p, canvasParentRef) => {
        // let size = 500;
        let canvas = p.createCanvas(size, size).parent(canvasParentRef);
        //canvas.position(10, 95);
        p.angleMode(p.DEGREES);
        // p.translate(canvas.width, canvas.height);
        hSize = size / 2;

        p.colorMode(p.HSB, 256, 100, 100, 100);
        p.noLoop();
      };

      const draw = (p) => {

        p.translate(size / 2, size / 2);
        // new thing definitions
        strokeW = p.round(p.map(time_sig,3,7,1,5));
        strokeYN = mode;

        p.background(0);
       
        sym = p.map(p.key,-1,11,8,30);
        //console.log("Key: " + key);
        console.log("Sym: " + sym);
        ang = 360 / sym;
     
        layers = p.round(p.map(dance,0,1,3,30));
        cush = (hSize / layers) * 0.9;
  
        let bAlph = p.round(p.map(loud,-60,0,25, 100));
        let vAlph = p.round(p.map(loud,-60,0,0, 25));
        alph = p.round(p.random(bAlph - vAlph, bAlph + vAlph));
       
          beziers = p.round(p.random(1)); //come back to this later?
  
          overlap = p.round(p.random(1));
       
        for (let j = 0; j < layers; j++) {
          x1 = p.random(hSize * 0.75 - j * cush, hSize * 0.85 - j * cush);
          y1 = 0;
          x2 = p.random(hSize * 0.9 - j * cush, hSize - j * cush);
          y2 = 0;
          a1x = p.random(x1 * 1.2, x2 * 0.4);
          a2x = p.random(x2 * 0.5, x2 * 0.9);

          if (overlap == 0) {
            a1y = a1x * p.tan(ang);
            let maxa2y = a2x * p.tan(ang);
            a2y = p.random(20 / j, maxa2y);
          } else {
            a1y = p.random(20 / j, 100 - j * cush);
            if (a1y < 1) { a1y = a1x * p.tan(ang) }
            a2y = p.random(20 / j, 150 - j * cush);
            if (a2y < 1) { a2y = p.random(20 / j, a2x * p.tan(ang)) }
          }
          let bHue = p.round(p.map(dance,0,1,0,256)); 
          let bSat = p.round(p.map(energy,0,1,70,100));
          let bBrt = p.round(p.map(valence,0,1,75,100));

          let vHue = p.round(p.map(dance,0,1,0,50)); 
          let vSat = p.round(p.map(energy,0,1,0,50));
          let vBrt = p.round(p.map(valence,0,1,0,50));

          let hue = p.round(p.random(bHue - vHue, bHue + vHue));
          let sat = p.round(p.random(bSat - vSat, bSat + vSat));
          let brt = p.round(p.random(bBrt - vBrt, bBrt + vBrt));

          p.fill(hue, sat, brt, alph);

          for (let i = 0; i < sym / 2; i++) {
            if (strokeYN == 1) {
              p.stroke(0);
              p.strokeWeight(strokeW);
            } else {
              p.noStroke();
            }
            if (beziers == 0) {
              p.beginShape();
              p.curveVertex(x1, 0);
              p.curveVertex(x1, 0);
              p.curveVertex(a1x, a1y);
              p.curveVertex(a2x, a2y);
              p.curveVertex(x2, 0);
              p.curveVertex(x2, 0);
              p.endShape();

              p.beginShape();
              p.curveVertex(x1, 0);
              p.curveVertex(x1, 0);
              p.curveVertex(a1x, -a1y);
              p.curveVertex(a2x, -a2y);
              p.curveVertex(x2, 0);
              p.curveVertex(x2, 0);
              p.endShape();
              if (strokeYN == 1) {
                p.stroke(hue, sat, brt, alph);
                p.line(x1, 0, x2, 0);
              }
            } else {
              p.bezier(x1, y1, a1x, a1y, a2x, a2y, x2, y2);
              p.bezier(x1, y1, a1x, -a1y, a2x, -a2y, x2, y2);
            }
            p.rotate(ang * 2);
          }
          p.rotate(ang);
        }
      }

      return <Sketch setup={setup} draw={draw} /> ;
};

export default Spirograph;