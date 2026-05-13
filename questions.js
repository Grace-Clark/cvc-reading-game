// Each option's `crop` is {l, t, r, b} percentages clipped from each side of `image`.
// The visible region is what gets shown to the student. Coordinates were extracted
// from the source PowerPoint (Modified Part I Reading Comprehension.pptx).
//
// Crops were tightened from the original PPT values to ensure no printed labels or
// cell-border lines leak into the visible region. For grid images the rule of thumb
// is: visible y-range covers roughly the top 40-50% of each cell row, leaving the
// printed word labels (in the lower portion of each cell) safely cropped out.

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
        { word: "cot", image: "image2.png", crop: { l: 74.591, t: 2.000,  r: 5.646, b: 87.500 } },
        { word: "cat", image: "image2.png", crop: { l: 75.098, t: 28.000, r: 6.166, b: 61.500 } },
        { word: "can", image: "image2.png", crop: { l: 75.349, t: 53.500, r: 7.198, b: 36.000 } },
        { word: "rat", image: "image2.png", crop: { l: 74.318, t: 79.500, r: 6.176, b: 11.500 } }
      ]
    },
    {
      target: "jam",
      options: [
        { word: "jar", image: "image2.png", crop: { l: 40.962, t: 2.500,  r: 39.531, b: 87.500 } },
        { word: "ham", image: "image2.png", crop: { l: 43.279, t: 28.500, r: 41.065, b: 61.500 } },
        { word: "jam", image: "image2.png", crop: { l: 44.442, t: 54.500, r: 42.981, b: 36.500 } },
        // Zoomed in on a single green emerald gem so the picture clearly shows one gem.
        { word: "gem", image: "image2.png", crop: { l: 35.500, t: 79.000, r: 55.000, b: 13.500 } }
      ]
    },
    {
      target: "bed",
      options: [
        { word: "bed",  image: "image2.png", crop: { l: 6.205, t: 2.000,  r: 73.661, b: 87.500 } },
        { word: "beg",  image: "image2.png", crop: { l: 7.292, t: 28.000, r: 75.819, b: 61.500 } },
        { word: "red",  image: "image2.png", crop: { l: 2.201, t: 54.000, r: 72.260, b: 36.500 } },
        { word: "bead", image: "image2.png", crop: { l: 3.699, t: 80.000, r: 74.056, b: 11.500 } }
      ]
    },
    {
      target: "pen",
      options: [
        { word: "pen",  image: "image4.png", crop: { l: 81.371, t: 5.500,  r: 4.216,  b: 85.000 } },
        { word: "pin",  image: "image4.png", crop: { l: 80.557, t: 30.500, r: 3.219,  b: 62.500 } },
        { word: "men",  image: "image4.png", crop: { l: 82.710, t: 54.500, r: 5.123,  b: 36.500 } },
        { word: "pegs", image: "image4.png", crop: { l: 83.701, t: 84.000, r: 12.039, b: 12.500 } }
      ]
    },
    {
      target: "fish",
      options: [
        { word: "fish",    image: "image4.png", crop: { l: 61.813, t: 6.500,  r: 25.695, b: 87.500 } },
        { word: "fin",     image: "image4.png", crop: { l: 63.139, t: 31.500, r: 25.081, b: 61.000 } },
        { word: "dish",    image: "image4.png", crop: { l: 62.989, t: 55.500, r: 24.786, b: 38.500 } },
        { word: "fidgets", image: "image4.png", crop: { l: 61.627, t: 81.500, r: 30.233, b: 12.500 } }
      ]
    },
    {
      target: "lid",
      options: [
        { word: "loud", image: "image4.png", crop: { l: 40.867, t: 6.500,  r: 43.104, b: 85.000 } },
        { word: "lips", image: "image4.png", crop: { l: 40.867, t: 31.000, r: 43.652, b: 63.000 } },
        { word: "lid",  image: "image4.png", crop: { l: 42.617, t: 54.000, r: 43.721, b: 37.500 } },
        { word: "kid",  image: "image4.png", crop: { l: 42.000, t: 79.500, r: 43.000, b: 11.500 } }
      ]
    },
    {
      target: "dog",
      options: [
        { word: "dig", image: "image4.png", crop: { l: 26.419, t: 6.000,  r: 64.165, b: 85.000 } },
        { word: "dog", image: "image4.png", crop: { l: 22.348, t: 29.500, r: 61.997, b: 61.000 } },
        { word: "log", image: "image4.png", crop: { l: 22.348, t: 55.000, r: 61.997, b: 36.500 } },
        { word: "dot", image: "image4.png", crop: { l: 22.348, t: 79.500, r: 61.997, b: 13.000 } }
      ]
    },
    {
      target: "chop",
      options: [
        { word: "chop",  image: "image4.png", crop: { l: 2.010, t: 5.500,  r: 81.766, b: 85.000 } },
        { word: "chip",  image: "image4.png", crop: { l: 3.197, t: 30.000, r: 83.158, b: 61.000 } },
        { word: "mop",   image: "image4.png", crop: { l: 3.855, t: 54.500, r: 81.495, b: 36.500 } },
        { word: "chalk", image: "image4.png", crop: { l: 2.152, t: 78.000, r: 81.738, b: 12.500 } }
      ]
    },
    {
      target: "rug",
      options: [
        { word: "rug", image: "image6.png", crop: { l: 51.841, t: 6.500,  r: 8.649,  b: 85.000 } },
        { word: "bug", image: "image6.png", crop: { l: 59.863, t: 29.500, r: 14.217, b: 61.000 } },
        { word: "rag", image: "image6.png", crop: { l: 57.980, t: 54.000, r: 11.630, b: 36.500 } },
        { word: "run", image: "image6.png", crop: { l: 59.699, t: 78.500, r: 10.668, b: 13.000 } }
      ]
    },
    {
      target: "sun",
      options: [
        { word: "sun",  image: "image6.png", crop: { l: 6.875,  t: 4.500,  r: 58.418, b: 85.000 } },
        { word: "sign", image: "image6.png", crop: { l: 8.054,  t: 30.500, r: 59.471, b: 61.000 } },
        { word: "suck", image: "image6.png", crop: { l: 11.084, t: 54.000, r: 62.399, b: 36.500 } },
        { word: "bun",  image: "image6.png", crop: { l: 5.316,  t: 79.000, r: 57.166, b: 13.500 } }
      ]
    }
  ],
  part2: [
    {
      target: "cake",
      picture: { image: "image8.png", crop: { l: 12.238, t: 2.000,  r: 9.417,  b: 89.500 } },
      pictureLabel: "cake",
      options: ["kick", "cape", "cake", "lake"]
    },
    {
      target: "cap",
      picture: { image: "image8.png", crop: { l: 15.607, t: 22.500, r: 14.311, b: 69.500 } },
      pictureLabel: "cap",
      options: ["cat", "map", "cup", "cap"]
    },
    {
      target: "sheep",
      picture: { image: "image8.png", crop: { l: 16.363, t: 43.500, r: 15.060, b: 48.500 } },
      pictureLabel: "sheep",
      options: ["sheep", "ship", "deep", "shear"]
    },
    {
      target: "sand",
      picture: { image: "image8.png", crop: { l: 19.940, t: 64.500, r: 19.339, b: 27.500 } },
      pictureLabel: "sand",
      options: ["sand", "sound", "sail", "band"]
    },
    {
      target: "night",
      picture: { image: "image8.png", crop: { l: 20.889, t: 86.500, r: 19.580, b: 6.500 } },
      pictureLabel: "night",
      options: ["knot", "night", "light", "knife"]
    }
  ]
};
