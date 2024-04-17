import React, { useEffect, useState } from 'react';
import Sketch from "react-p5";

let strokeW = 5; //control with something?? could this be useful for time sig?
let overlap, beziers, sym, layers, alph, strokeYN, ang, a1x, a1y, a2x, a2y, x1, x2, y1, y2, hSize, cush;
// let petalSlider, layersSlider, alphaSlider, randomPetalsButton, randomLayersButton, randomAlphaButton, 
//     outlineButton, noOutlineButton, randOutButton, curve1Button, curve2Button, randCurveButton, overlapButton, 
//     noOverlapButton, randOverlapButton, newArtButton, printButton;
let pRand = -1;
let lRand = -1;
let aRand = -1;
let cRand = true;
let randOverl = true;

const Spirograph = (props) => {
  
      const setup = (p, canvasParentRef) => {
        let size = Math.min(window.innerWidth, window.innerHeight) - 110;
        p.createCanvas(size, size);
        p.angleMode(p.DEGREES);
        p.translate(p.width / 2, p.height / 2);

        // create user interface
        // let noPetals = p.createP("# of petals");
        // noPetals.position(40, 0);
        // petalSlider = p.createSlider(8, 30, 17);
        // petalSlider.position(10, 20);
        // let noLayers = p.createP("# of layers");
        // noLayers.position(175, 0);
        // layersSlider = p.createSlider(3, 30, 17);
        // layersSlider.position(150, 20);
        // let alpha = p.createP("alpha");
        // alpha.position(330, 0);
        // alphaSlider = p.createSlider(25, 100, 50);
        // alphaSlider.position(290, 20);

        // randomPetalsButton = p.createButton("random");
        // randomPetalsButton.position(40, 45);
        // randomPetalsButton.style("background-color", "lightgreen");
        // randomPetalsButton.mousePressed(petalsRandom);
        // randomLayersButton = p.createButton("random");
        // randomLayersButton.position(180, 45);
        // randomLayersButton.style("background-color", "lightgreen");
        // randomLayersButton.mousePressed(layersRandom);
        // randomAlphaButton = p.createButton("random");
        // randomAlphaButton.position(320, 45);
        // randomAlphaButton.style("background-color", "lightgreen");
        // randomAlphaButton.mousePressed(alphaRandom);

        // newArtButton = p.createButton("new art");
        // newArtButton.position(110, 70);
        // newArtButton.style("background-color", "yellow");
        // newArtButton.mousePressed(newArt);
        // printButton = p.createButton("save jpg");
        // printButton.position(250, 70);
        // printButton.style("background-color", "yellow");
        // printButton.mousePressed(saveJpg);

        // outlineButton = p.createButton("outline");
        // outlineButton.position(430, 0);
        // outlineButton.mousePressed(outline);
        // noOutlineButton = p.createButton("no outline");
        // noOutlineButton.position(500, 0);
        // noOutlineButton.mousePressed(noOutline);
        // randOutButton = p.createButton("random");
        // randOutButton.position(580, 0);
        // randOutButton.mousePressed(randOutline);
        randOutline();

        // curve1Button = p.createButton("style 1");
        // curve1Button.position(430, 30);
        // curve1Button.mousePressed(curve1);
        // curve2Button = p.createButton("style 2");
        // curve2Button.position(505, 30);
        // curve2Button.mousePressed(curve2);
        // randCurveButton = p.createButton("random");
        // randCurveButton.position(580, 30);
        // randCurveButton.mousePressed(randCurve);
        randCurve();

        // overlapButton = p.createButton("> overlap");
        // overlapButton.position(430, 60);
        // overlapButton.mousePressed(overlapYes);
        // noOverlapButton = p.createButton("< overlap");
        // noOverlapButton.position(505, 60);
        // noOverlapButton.mousePressed(noOverlap);
        // randOverlapButton = p.createButton("random");
        // randOverlapButton.position(580, 60);
        // randOverlapButton.mousePressed(randOverlap);
        randOverlap();

        p.colorMode(p.HSB, 256, 100, 100, 100);
        newArt();
      };

      const draw = (p) => {
        p.background(0);
        if (pRand == 1) {
          sym = petalSlider.value();
        } else {
          sym = p.random(8, 30);
        }
        ang = 360 / sym;
        if (lRand == 1) {
          layers = layersSlider.value();
        } else {
          layers = p.random(3, 30);
        }
        cush = (hSize / layers) * 0.9;
        if (aRand == 1) {
          alph = alphaSlider.value();
        } else {
          alph = p.random(25, 100);
        }
        if (strokeRand == 1) {
          strokeYN = p.round(p.random(1));
        }
        if (cRand == true) {
          beziers = p.round(p.random(1));
        }
        if (randOverl == true) {
          overlap = p.round(p.random(1));
        }
        let outlineNote
        if (strokeYN == 1) { outlineNote = "yes" }
        else { outlineNote = "no" }
        let overlapNote
        if (overlap == 0) { overlapNote = "less" }
        else { overlapNote = "more" }

        p.print('petals:', p.round(sym, 1), '; layers:', p.round(layers, 1), '; alpha:', p.round(alph), '; outline:', outlineNote, '; style:', beziers + 1, '; overlap:', overlapNote);

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
          let hue = p.random(256);
          let sat = p.random(70, 100);
          let brt = p.random(75, 100);
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

      // Button functions
      function petalsRandom() {
        pRand = pRand * -1;
        if (pRand == 1) {
          randomPetalsButton.style("background-color", "pink");
        } else {
          randomPetalsButton.style("background-color", "lightgreen");
        }
      }
      function layersRandom() {
        lRand = lRand * -1;
        if (lRand == 1) {
          randomLayersButton.style("background-color", "pink");
        } else {
          randomLayersButton.style("background-color", "lightgreen");
        }
      }
      function alphaRandom() {
        aRand = aRand * -1;
        if (aRand == 1) {
          randomAlphaButton.style("background-color", "pink");
        } else {
          randomAlphaButton.style("background-color", "lightgreen");
        }
      }
      function outline() {
        strokeYN = 1;
        strokeRand = 0;
        noOutlineButton.style("background-color", "pink");
        outlineButton.style("background-color", "lightgreen");
        randOutButton.style("background-color", "pink");
      }
      function noOutline() {
        strokeYN = 0;
        strokeRand = 0;
        noOutlineButton.style("background-color", "lightgreen");
        outlineButton.style("background-color", "pink");
        randOutButton.style("background-color", "pink");
      }
      function randOutline() {
        strokeRand = 1;
        noOutlineButton.style("background-color", "pink");
        outlineButton.style("background-color", "pink");
        randOutButton.style("background-color", "lightgreen");
      }
      function curve1() {
        beziers = 0;
        cRand = false;
        curve2Button.style("background-color", "pink");
        randCurveButton.style("background-color", "pink");
        curve1Button.style("background-color", "lightgreen");
      }
      function curve2() {
        beziers = 1;
        cRand = false;
        curve1Button.style("background-color", "pink");
        randCurveButton.style("background-color", "pink");
        curve2Button.style("background-color", "lightgreen");
      }
      function randCurve() {
        cRand = true;
        curve1Button.style("background-color", "pink");
        curve2Button.style("background-color", "pink");
        randCurveButton.style("background-color", "lightgreen");
      }
      function overlapYes() {
        overlap = 1;
        randOverl = false;
        overlapButton.style("background-color", "lightgreen");
        noOverlapButton.style("background-color", "pink");
        randOverlapButton.style("background-color", "pink");
      }
      function noOverlap() {
        overlap = 0;
        randOverl = false;
        overlapButton.style("background-color", "pink");
        noOverlapButton.style("background-color", "lightgreen");
        randOverlapButton.style("background-color", "pink");
      }
      function randOverlap() {
        randOverl = true;
        overlapButton.style("background-color", "pink");
        noOverlapButton.style("background-color", "pink");
        randOverlapButton.style("background-color", "lightgreen");
      }
      function saveJpg() {
        p.save("myCanvas.jpg");
      }

      p.windowResized = () => {
        let size = Math.min(window.innerWidth, window.innerHeight) - 110;
        p.resizeCanvas(size, size);
        hSize = size / 2;
        p.translate(p.width / 2, p.height / 2);
        p.newArt();
      };
    

      return <Sketch setup={setup} draw={draw} />;
};

export default Spirograph;