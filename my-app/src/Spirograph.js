import React, { useEffect, useState } from 'react';
import Sketch from 'react-p5';
import { prominent } from 'color.js';

const Spirograph = ({ track, disSize
 
  }) => {

    if (!track) {
      return <div>No track selected</div>;
    }

    let strokeW; 
    let overlap, beziers, sym, layers, alph, strokeYN, ang, a1x, a1y, a2x, a2y, x1, x2, y1, y2, hSize, cush;
    let size = disSize;

    let acoust = track.acousticness; 
    let dance = track.danceability;
    let duration = track.duration_ms;
    let energy = track.energy;
    let instrum = track.instrumentalness;
    let songKey = track.key;
    let live = track.liveness; 
    let loud = track.loudness; 
    let mode = track.mode; 
    let speech = track.speechiness;
    let tempo = track.tempo; 
    let time_sig = track.time_signature; 
    let valence = track.valence;
    
      const setup = (p, canvasParentRef) => {
        let canvas = p.createCanvas(size, size).parent(canvasParentRef);
        p.angleMode(p.DEGREES);
        hSize = size / 2;

        p.colorMode(p.HSB, 256, 100, 100, 100);
        p.noLoop();

      };

      const draw = (p) => {

        console.log("songkey. please: " + track.key);

        p.translate(size / 2, size / 2);
        // new thing definitions
        strokeW = p.round(p.map(time_sig,3,7,1,5));
        strokeYN = mode;

        
        p.background(0);
       
        sym = p.round(p.map(songKey,-1,11,8,30));
        // sym = 10;
        console.log("Track Key: " + track.key);
        console.log("Sym: " + sym);
        ang = 360 / sym;
     
        layers = p.round(p.map(dance,0,1,3,30));
        cush = (hSize / layers) * 0.9;
  
        let bAlph = p.round(p.map(acoust,0,1,100, 35));
        console.log('acoust: '+ acoust);
        console.log('bAlph: '+ bAlph);
        let vAlph = 0;
        alph = p.round(p.random(bAlph - vAlph, bAlph + vAlph));
        console.log('alph: ' + alph);
          beziers = 1; 
  
          overlap = 1; // 1  = more overlap, 0 = less overlap
       
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
                p.fill(hue, sat, brt, alph);
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

      return (
      <Sketch setup={setup} draw={draw} /> );
};

export default Spirograph;