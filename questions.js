// Each option just references a standalone PNG in assets/words/.
// To replace a picture, drop a new file at assets/words/<word>.png — same filename,
// no code changes needed. Filenames are lowercase and match the spoken `word` field.

const QUESTIONS = {
  practice: [
    {
      target: "car",
      prompt: "Point to the car.",
      options: [
        { word: "car",  image: "car.png" },
        { word: "ball", image: "ball.png" }
      ]
    },
    {
      target: "ball",
      prompt: "Point to the ball.",
      options: [
        { word: "car",  image: "car.png" },
        { word: "ball", image: "ball.png" }
      ]
    }
  ],
  part1: [
    {
      target: "cat",
      options: [
        { word: "cot", image: "cot.png" },
        { word: "cat", image: "cat.png" },
        { word: "can", image: "can.png" },
        { word: "rat", image: "rat.png" }
      ]
    },
    {
      target: "jam",
      options: [
        { word: "jar", image: "jar.png" },
        { word: "ham", image: "ham.png" },
        { word: "jam", image: "jam.png" },
        { word: "gem", image: "gem.png" }
      ]
    },
    {
      target: "bed",
      options: [
        { word: "bed",  image: "bed.png" },
        { word: "beg",  image: "beg.png" },
        { word: "red",  image: "red.png" },
        { word: "bead", image: "bead.png" }
      ]
    },
    {
      target: "pen",
      options: [
        { word: "pen",  image: "pen.png" },
        { word: "pin",  image: "pin.png" },
        { word: "men",  image: "men.png" },
        { word: "peg", image: "peg.png" }
      ]
    },
    {
      target: "fish",
      options: [
        { word: "fish",    image: "fish.png" },
        { word: "fin",     image: "fin.png" },
        { word: "dish",    image: "dish.png" },
        // The `speakAs` field overrides what speech synthesis says when the default
        // TTS pronunciation of `word` is wrong. Extra o's encourage the TTS to use
        // the long /uː/ vowel (the "oo" sound in "boo" / "douche").
        { word: "koosh", image: "koosh.png", speakAs: "koooosh" }
      ]
    },
    {
      target: "lid",
      options: [
        { word: "loud", image: "loud.png" },
        // Per-option speak overrides. `noEmphasize` skips the automatic /p/-ending
        // slowdown — for short words like "lip" the slowdown makes the /p/ sound
        // voiced (like "lib") instead of crisp.
        { word: "lip", image: "lip.png", speakOpts: { noEmphasize: true } },
        { word: "lid",  image: "lid.png" },
        { word: "kid",  image: "kid.png" }
      ]
    },
    {
      target: "dog",
      options: [
        { word: "dig", image: "dig.png" },
        { word: "dog", image: "dog.png" },
        { word: "log", image: "log.png" },
        { word: "dot", image: "dot.png" }
      ]
    },
    {
      target: "chop",
      options: [
        { word: "chop",  image: "chop.png" },
        { word: "chip",  image: "chip.png" },
        { word: "mop",   image: "mop.png" },
        { word: "chalk", image: "chalk.png" }
      ]
    },
    {
      target: "rug",
      options: [
        { word: "rug", image: "rug.png" },
        { word: "bug", image: "bug.png" },
        { word: "rag", image: "rag.png" },
        { word: "run", image: "run.png" }
      ]
    },
    {
      target: "sun",
      options: [
        { word: "sun",  image: "sun.png" },
        { word: "sign", image: "sign.png" },
        { word: "suck", image: "suck.png" },
        { word: "bun",  image: "bun.png" }
      ]
    }
  ],
  part2: [
    {
      target: "cake",
      picture: { image: "cake.png" },
      pictureLabel: "cake",
      options: ["kick", "cape", "cake", "lake"]
    },
    {
      target: "cap",
      picture: { image: "cap.png" },
      pictureLabel: "cap",
      options: ["cat", "map", "cup", "cap"]
    },
    {
      target: "sheep",
      picture: { image: "sheep.png" },
      pictureLabel: "sheep",
      options: ["sheep", "ship", "deep", "shear"]
    },
    {
      target: "sand",
      picture: { image: "sand.png" },
      pictureLabel: "sand",
      options: ["sand", "sound", "sail", "band"]
    },
    {
      target: "night",
      picture: { image: "night.png" },
      pictureLabel: "night",
      options: ["knot", "night", "light", "knife"]
    }
  ]
};
