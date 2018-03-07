// The sounds to be played at the Computed Intervals

// EFFECTS
var reverb = new Tone.Freeverb(0.85, 3000).toMaster();
var chorus = new Tone.Chorus().connect(reverb);
var synth = new Tone.PolySynth({
  envelope: {
    attack: 0.01,
    decay: 0.1,
    sustain: 0.1,
    release: 2
  }
}).connect(chorus).toMaster();


// SOUND EVENTS
var shootEvents1 = new Tone.Part(function(time, value) {

      // DURATION
			// Calculated based total casualties in Shootings.js
      if (value.TOTAL >= 5 && value.TOTAL < 10) {
        duration = "4n";
      } else {
        if (value.TOTAL >= 10 && value.TOTAL < 20) {
          duration = "2n";
        } else {
          if (value.TOTAL >= 20 && value.TOTAL < 40) {
            duration = "1m";
          } else {
            if (value.TOTAL >= 40 && value.TOTAL < 100) {
              duration = "2m";
            } else {
              if (value.TOTAL >= 100) {
                duration = "9.5m"; // if 4 people === one 8n, then 604 ppl === 37.75 8n's === about 9.5 measures
              } else {
                duration = "8n";
              }
            }
          }
        }
      }
//   value.CHORD is taken from Shootings.js	
        synth.triggerAttackRelease(value.CHORD, duration, time)
      }, Shootings).start(0);

    Tone.Transport.start('+1')
