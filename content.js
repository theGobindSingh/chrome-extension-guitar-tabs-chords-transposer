// credits to Steven Spungin for transposing function
// https://stackoverflow.com/a/50702016

function transposeNote(note, semitones, useSharps) {
  // parse root followed by modifiers (# and b)
  const rx = /^([a-gA-G])([#b]*)$/;
  const m = rx.exec(note);
  if (!m) {
    return null;
  }
  // convert note from 0 to 11 based off of A
  let root;
  switch (m[1].toUpperCase()) {
    case "A":
      root = 0;
      break;
    case "B":
      root = 2;
      break;
    case "C":
      root = 3;
      break;
    case "D":
      root = 5;
      break;
    case "E":
      root = 7;
      break;
    case "F":
      root = 8;
      break;
    case "G":
      root = 10;
      break;
  }
  // modify root
  let mods = m[2];
  if (mods) {
    for (var i = 0; i < mods.length; i++) {
      if (mods.charAt(i) === "#") {
        root++;
      } else {
        root--;
      }
    }
  }
  // transpose note
  root = (root + semitones) % 12;

  if (root < 0) {
    root += 12;
  }

  // convert back to a note
  const sharps = [
    "A",
    "A#",
    "B",
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
  ];
  const flats = [
    "A",
    "Bb",
    "B",
    "C",
    "Db",
    "D",
    "Eb",
    "E",
    "F",
    "Gb",
    "G",
    "Ab",
  ];
  const transposedNote = useSharps ? sharps[root] : flats[root];
  return transposedNote;
}

function transposeChord(chord, semitones, useSharps) {
  const rx = /^([a-gA-G][#b]*)\s*([^\/]*)(\/[a-gA-G][#b]*)?$/;
  const m = rx.exec(chord);
  if (!m) {
    return null;
  }
  const root = transposeNote(m[1], semitones, useSharps);
  const quality = m[2] || "";
  let bass = m[3] || "";
  if (bass.length > 0) {
    bass = "/" + transposeNote(bass.substring(1), semitones, useSharps);
  }
  return root + quality + bass;
}

function mainFun() {
  chrome.storage.local.get(["trans_val", "trans_sharp"], (res) => {
    if (res.trans_val != undefined && res.trans_sharp != undefined) {
      var value = parseInt(res.trans_val);
      var sharp = res.trans_sharp;
      document
        .querySelectorAll(".fsG7q > span:nth-child(1) span")
        .forEach((chordElem) => {
          var chord = chordElem.textContent;
          if (chord != null) {
            var data = transposeChord(chord, value, sharp);
            var top = parseInt(chordElem.offsetTop);
            var left = parseInt(chordElem.offsetLeft);
            var elem = document.createElement("div");
            elem.textContent = data;
            elem.className = "inject-div";
            elem.style.position = "absolute";
            elem.style.top = top + "px";
            elem.style.left = left + 2 + "px";
            document.querySelector(".OnD3d.kmZt1").appendChild(elem);
          }
        });
    }
  });
}

var mainElem = document.querySelector("*");
try {
  document.querySelectorAll(".inject-div").forEach((div) => {
    div.remove();
  });
} catch {}
try {
  mainFun();
} catch {}
mainElem.addEventListener("click", function clickFun() {
  document.querySelectorAll(".inject-div").forEach((div) => {
    div.remove();
  });
  mainFun();
  //   mainElem.removeEventListener("click", clickFun);
});
