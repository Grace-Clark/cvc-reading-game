// Each option's `crop` is {l, t, r, b} percentages clipped from each side of `image`.
// The visible region is what gets shown to the student.
//
// Crops are tuned to:
//   1. Exclude printed labels (so the student can't read the answer off the picture).
//   2. Keep visible regions large enough in source pixels that the displayed crop
//      isn't badly upscaled and pixelated.
// app.js's applyCrop() sets each card's aspect-ratio dynamically from the visible
// region's pixel dimensions, so no static container aspect causes stretching.

const QUESTIONS = {
  practice: [
    {
      target: "car",
      prompt: "Point to the car.",
      options: [
        { word: "car",  image: "image1.png", crop: { l: 14.013, t: 0.000,  r: 12.001, b: 72.366 } },
        { word: "ball", image: "image1.png", crop: { l: 11.331, t: 53.849, r: 17.586, b: 14.421 } }
      ]
    },
    {
      target: "ball",
      prompt: "Point to the ball.",
      options: [
        { word: "car",  image: "image1.png", crop: { l: 14.013, t: 0.000,  r: 12.001, b: 72.366 } },
        { word: "ball", image: "image1.png", crop: { l: 11.331, t: 53.849, r: 17.586, b: 14.421 } }
      ]
    }
  ],
  part1: [
    {
      target: "cat",
      options: [
        { word: "cot", image: "image2.png", crop: { l: 74.591, t: 1.500,  r: 5.646, b: 87.000 } },
        { word: "cat", image: "image2.png", crop: { l: 75.098, t: 27.000, r: 6.166, b: 61.000 } },
        { word: "can", image: "image2.png", crop: { l: 75.349, t: 52.500, r: 7.198, b: 35.500 } },
        { word: "rat", image: "image2.png", crop: { l: 74.318, t: 78.000, r: 6.176, b: 11.000 } }
      ]
    },
    {
      target: "jam",
      options: [
        { word: "jar", image: "image2.png", crop: { l: 40.962, t: 2.000,  r: 39.531, b: 87.000 } },
        { word: "ham", image: "image2.png", crop: { l: 43.279, t: 27.500, r: 41.065, b: 61.000 } },
        { word: "jam", image: "image2.png", crop: { l: 44.442, t: 53.500, r: 42.981, b: 35.500 } },
        // Zoomed in on a single green emerald gem so the picture clearly shows one gem.
        { word: "gem", image: "image2.png", crop: { l: 35.500, t: 79.000, r: 55.000, b: 13.500 } }
      ]
    },
    {
      target: "bed",
      options: [
        { word: "bed",  image: "image2.png", crop: { l: 6.205, t: 1.500,  r: 73.661, b: 87.000 } },
        { word: "beg",  image: "image2.png", crop: { l: 7.292, t: 27.000, r: 75.819, b: 61.000 } },
        { word: "red",  image: "image2.png", crop: { l: 2.201, t: 53.000, r: 72.260, b: 35.500 } },
        { word: "bead", image: "image2.png", crop: { l: 3.699, t: 78.500, r: 74.056, b: 11.000 } }
      ]
    },
    {
      target: "pen",
      options: [
        { word: "pen",  image: "image4.png", crop: { l: 81.371, t: 4.000,  r: 4.216,  b: 85.000 } },
        { word: "pin",  image: "image4.png", crop: { l: 80.557, t: 29.000, r: 3.219,  b: 60.500 } },
        { word: "men",  image: "image4.png", crop: { l: 82.710, t: 53.500, r: 5.123,  b: 35.500 } },
        // Original PPT crop here was very narrow (visW ~4%) because the PowerPoint
        // overlaid this cell with a separate peg image. We widen it so all three pegs
        // are visible in the cropped picture.
        { word: "pegs", image: "image4.png", crop: { l: 81.500, t: 78.000, r: 3.000,  b: 10.000 } }
      ]
    },
    {
      target: "fish",
      options: [
        { word: "fish",    image: "image4.png", crop: { l: 61.813, t: 5.500,  r: 25.695, b: 85.500 } },
        { word: "fin",     image: "image4.png", crop: { l: 63.139, t: 30.000, r: 25.081, b: 60.000 } },
        { word: "dish",    image: "image4.png", crop: { l: 62.989, t: 54.500, r: 24.786, b: 36.500 } },
        // Widened from the original PPT crop so both fidgets in the cell are visible.
        { word: "fidgets", image: "image4.png", crop: { l: 61.700, t: 78.000, r: 22.000, b: 10.000 } }
      ]
    },
    {
      target: "lid",
      options: [
        { word: "loud", image: "image4.png", crop: { l: 40.867, t: 5.500,  r: 43.104, b: 85.000 } },
        { word: "lips", image: "image4.png", crop: { l: 40.867, t: 30.000, r: 43.652, b: 61.500 } },
        { word: "lid",  image: "image4.png", crop: { l: 42.617, t: 53.000, r: 43.721, b: 36.500 } },
        { word: "kid",  image: "image4.png", crop: { l: 42.000, t: 78.500, r: 43.000, b: 10.000 } }
      ]
    },
    {
      target: "dog",
      options: [
        { word: "dig", image: "image4.png", crop: { l: 26.419, t: 5.000,  r: 64.165, b: 85.000 } },
        { word: "dog", image: "image4.png", crop: { l: 22.348, t: 29.000, r: 61.997, b: 60.500 } },
        { word: "log", image: "image4.png", crop: { l: 22.348, t: 54.000, r: 61.997, b: 35.500 } },
        { word: "dot", image: "image4.png", crop: { l: 22.348, t: 78.500, r: 61.997, b: 11.500 } }
      ]
    },
    {
      target: "chop",
      options: [
        { word: "chop",  image: "image4.png", crop: { l: 2.010, t: 4.500,  r: 81.766, b: 85.000 } },
        { word: "chip",  image: "image4.png", crop: { l: 3.197, t: 29.000, r: 83.158, b: 60.000 } },
        { word: "mop",   image: "image4.png", crop: { l: 3.855, t: 53.500, r: 81.495, b: 35.500 } },
        { word: "chalk", image: "image4.png", crop: { l: 2.152, t: 77.000, r: 81.738, b: 10.500 } }
      ]
    },
    {
      target: "rug",
      options: [
        { word: "rug", image: "image6.png", crop: { l: 51.841, t: 5.500,  r: 8.649,  b: 84.500 } },
        { word: "bug", image: "image6.png", crop: { l: 59.863, t: 28.500, r: 14.217, b: 60.000 } },
        { word: "rag", image: "image6.png", crop: { l: 57.980, t: 53.000, r: 11.630, b: 35.500 } },
        { word: "run", image: "image6.png", crop: { l: 59.699, t: 77.500, r: 10.668, b: 12.000 } }
      ]
    },
    {
      target: "sun",
      options: [
        { word: "sun",  image: "image6.png", crop: { l: 6.875,  t: 3.500,  r: 58.418, b: 84.500 } },
        { word: "sign", image: "image6.png", crop: { l: 8.054,  t: 29.500, r: 59.471, b: 60.000 } },
        { word: "suck", image: "image6.png", crop: { l: 11.084, t: 53.000, r: 62.399, b: 35.500 } },
        { word: "bun",  image: "image6.png", crop: { l: 5.316,  t: 78.000, r: 57.166, b: 12.500 } }
      ]
    }
  ],
  part2: [
    {
      target: "cake",
      picture: { image: "image8.png", crop: { l: 12.238, t: 1.500,  r: 9.417,  b: 89.000 } },
      pictureLabel: "cake",
      options: ["kick", "cape", "cake", "lake"]
    },
    {
      target: "cap",
      picture: { image: "image8.png", crop: { l: 15.607, t: 21.500, r: 14.311, b: 67.500 } },
      pictureLabel: "cap",
      options: ["cat", "map", "cup", "cap"]
    },
    {
      target: "sheep",
      picture: { image: "image8.png", crop: { l: 16.363, t: 43.000, r: 15.060, b: 46.000 } },
      pictureLabel: "sheep",
      options: ["sheep", "ship", "deep", "shear"]
    },
    {
      target: "sand",
      picture: { image: "image8.png", crop: { l: 19.940, t: 63.500, r: 19.339, b: 24.000 } },
      pictureLabel: "sand",
      options: ["sand", "sound", "sail", "band"]
    },
    {
      target: "night",
      picture: { image: "image8.png", crop: { l: 20.889, t: 85.500, r: 19.580, b: 3.500 } },
      pictureLabel: "night",
      options: ["knot", "night", "light", "knife"]
    }
  ]
};
