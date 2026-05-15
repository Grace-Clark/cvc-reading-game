Audio overrides
===============

Drop recorded audio files in this folder, named after the option's word:

  koosh.mp3
  lip.mp3
  sheep.mp3
  ...

Naming
------
- Lowercase, matching the option word in questions.js exactly.
- The full list of supported names is the same as the picture files in
  ../words/ : ball, bead, bed, beg, bug, bun, cake, can, cap, car, cat,
  chalk, chip, chop, cot, dig, dish, dog, dot, fin, fish, gem, ham, jam,
  jar, kid, koosh, lid, lip, log, loud, men, mop, night, peg, pen, pin,
  rag, rat, red, rug, run, sand, sheep, sign, suck, sun.

Format
------
- .mp3 is preferred (universal browser support, small files).
- .m4a also works if .mp3 isn't present (Windows Voice Recorder default).

How it works
------------
When the student taps 🔊 on an option (or on the Part 2 picture), the
game tries `assets/audio/<word>.mp3` first. If that file doesn't exist,
it tries `<word>.m4a`. If neither exists, it falls back to the browser's
built-in text-to-speech voice.

So you can replace audio one word at a time — no all-or-nothing.
