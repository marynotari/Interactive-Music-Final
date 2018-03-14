// In this version, Leon tried to help me hack my way to a partial loop of 2012-2018 

// EFFECTS
// // Distort the sounds more and more as time progresses
// var distort = new Tone.Distortion(map(value.YR, 1982, 2018, 0, 0.5))
//   .toMaster();

// Connect Synth to Chorus and Reverb before going to Master
var reverb = new Tone.Freeverb(0.8, 3000).toMaster();
var chorus = new Tone.Chorus().connect(reverb);
var synth = new Tone.PolySynth({
  envelope: {
    attack: 0.01,
    decay: 0.1,
    sustain: 0.1,
    release: 2
  }
}).connect(chorus).toMaster();


// DEFINE A CALLBACK TO DETERMINE WHAT THE SOUND WILL BE
function callbackFunction(time, value) {
  // event

  // CALCULATE THE INTERVAL BETWEEN FIRST AND SECOND PART
  // IF WE'RE ON THE FIRST OBJECT OF THE SHOOTINGS ARRRAY...
  if (value.FAT == 8) {
    //     ...THEN START THE SECOND PART
    let msFromNowWhenNextPartShouldStart = value.nextTime - value.time * 1000;
    //     ...SET A TIMEOUT TO START THE SECOND PART
    setTimeout(function() {
      //   Part2.start();
      shootEventsMain.start();
      //   console.log("Part 2 start!");
    }, msFromNowWhenNextPartShouldStart);
  }
  // PRINT A CONFIRMATION THAT THE RIGHT VALUE IS BEING PLAYED
  console.log("playing", value.index);

  // MAP THE DURATION OF THE NOTE TO THE # OF CASUALTIES
  duration = map(value.TOTAL, 1, 610, 0.5, 10);
  
  // TRIGGER THE SYNTH
  synth.triggerAttackRelease(value.CHORD, duration, time)
}

// DEFINE THE PROPERTIES OF THE FIRST PART AND CONNECT THE CALLBACK
let optionsIntro = {
  callback: callbackFunction,
  events: [Shootings[0], Shootings[1], Shootings[2]], //using only part of the array to test that it will play correctly
  // loop: true,
  // loop: true,
  // loopStart: '3m',
  // loopEnd: '5m'
}

// CREATE THE FIRST PART AND INCLUDE THE PROPERTIES DEFINED ABOVE
var shootEventsIntro = new Tone.Part(optionsIntro).start(0);

// DEFINE THE PROPERTIES OF THE SECOND PART AND CONNECT THE CALLBACK
// THIS IS THE PART I WANT TO LOOP INDEFINITELY
let optionsMain = {
  callback: callbackFunction,
  events: [Shootings[3], Shootings[4], Shootings[5]], //using only part of the array to test that it will play correctly
  loop: true,
  loopStart: 0,
  loopEnd: Shootings[5].time + 1
}

// CREATE THE SECOND PART AND INCLUDE THE PROPERTIES DEFINED ABOVE
var shootEventsMain = new Tone.Part(optionsMain);
// // shootEventsIntro.start();

// TRIED TO MAKE THE SECOND PART FIRE WHEN MOUSE IS PRESSED, FAILED
// function mousePressed(){
// 	shootEventsMain.start();
// }

// THE ORIGINAL, WE SPLIT IT UP WHEN WE COULDN'T FIGURE OUT HOW TO LOOP ONLY PART OF IT
// var shootEvents1 = new Tone.Part(function(time, value) {
//   // event

//   //   Map Duration to Total Casualties
//   duration = map(value.TOTAL, 1, 610, 0.5, 10);

//   synth.triggerAttackRelease(value.CHORD, duration, time)
// }, Shootings).start(0);

Tone.Transport.start('+1')
