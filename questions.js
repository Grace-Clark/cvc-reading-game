// Each option's `crop` is {l, t, r, b} percentages clipped from each side of `image`.
// The visible region is what gets shown to the student. Coordinates were extracted
// from the source PowerPoint (Modified Part I Reading Comprehension.pptx).

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
        { word: "cot", image: "image2.png", crop: { l: 74.591, t: 0.000,  r: 5.646, b: 84.555 } },
        { word: "cat", image: "image2.png", crop: { l: 75.098, t: 26.758, r: 6.166, b: 57.964 } },
        { word: "can", image: "image2.png", crop: { l: 75.349, t: 52.152, r: 7.198, b: 31.700 } },
        { word: "rat", image: "image2.png", crop: { l: 74.318, t: 78.891, r: 6.176, b: 6.888 } }
      ]
    },
    {
      target: "jam",
      options: [
        { word: "jar", image: "image2.png", crop: { l: 40.962, t: 0.720,  r: 39.531, b: 84.583 } },
        { word: "ham", image: "image2.png", crop: { l: 43.279, t: 27.043, r: 41.065, b: 58.735 } },
        { word: "jam", image: "image2.png", crop: { l: 44.442, t: 53.244, r: 42.981, b: 33.092 } },
        { word: "gems", image: "image2.png", crop: { l: 41.000, t: 78.500, r: 40.000, b: 7.000 } }
      ]
    },
    {
      target: "bed",
      options: [
        { word: "bed", image: "image2.png", crop: { l: 6.205, t: 0.000,  r: 73.661, b: 84.555 } },
        { word: "beg", image: "image2.png", crop: { l: 7.292, t: 26.493, r: 75.819, b: 58.604 } },
        { word: "red", image: "image2.png", crop: { l: 2.201, t: 52.518, r: 72.260, b: 32.785 } },
        { word: "bead", image: "image2.png", crop: { l: 3.699, t: 78.531, r: 74.056, b: 6.647 } }
      ]
    },
    {
      target: "pen",
      options: [
        { word: "pen",  image: "image4.png", crop: { l: 81.371, t: 3.750,  r: 4.216,  b: 81.851 } },
        { word: "pin",  image: "image4.png", crop: { l: 80.557, t: 28.343, r: 3.219,  b: 59.474 } },
        { word: "men",  image: "image4.png", crop: { l: 82.710, t: 52.705, r: 5.123,  b: 33.141 } },
        { word: "pegs", image: "image4.png", crop: { l: 83.701, t: 82.982, r: 12.039, b: 9.280 } }
      ]
    },
    {
      target: "fish",
      options: [
        { word: "fish",    image: "image4.png", crop: { l: 61.813, t: 5.002,  r: 25.695, b: 84.380 } },
        { word: "fin",     image: "image4.png", crop: { l: 63.139, t: 29.698, r: 25.081, b: 57.547 } },
        { word: "dish",    image: "image4.png", crop: { l: 62.989, t: 54.001, r: 24.786, b: 35.687 } },
        { word: "fidgets", image: "image4.png", crop: { l: 61.627, t: 80.537, r: 30.233, b: 9.288 } }
      ]
    },
    {
      target: "lid",
      options: [
        { word: "loud", image: "image4.png", crop: { l: 40.867, t: 4.871,  r: 43.104, b: 82.256 } },
        { word: "lips", image: "image4.png", crop: { l: 40.867, t: 29.321, r: 43.652, b: 60.073 } },
        { word: "lid",  image: "image4.png", crop: { l: 42.617, t: 52.180, r: 43.721, b: 34.339 } },
        { word: "kid",  image: "image4.png", crop: { l: 42.000, t: 78.000, r: 43.000, b: 8.000 } }
      ]
    },
    {
      target: "dog",
      options: [
        { word: "dig", image: "image4.png", crop: { l: 26.419, t: 4.177,  r: 64.165, b: 82.036 } },
        { word: "dog", image: "image4.png", crop: { l: 22.348, t: 27.633, r: 61.997, b: 58.010 } },
        { word: "log", image: "image4.png", crop: { l: 22.348, t: 53.287, r: 61.997, b: 33.828 } },
        { word: "dot", image: "image4.png", crop: { l: 22.348, t: 77.926, r: 61.997, b: 10.015 } }
      ]
    },
    {
      target: "chop",
      options: [
        { word: "chop",  image: "image4.png", crop: { l: 2.010, t: 3.602,  r: 81.766, b: 82.243 } },
        { word: "chip",  image: "image4.png", crop: { l: 3.197, t: 28.005, r: 83.158, b: 57.858 } },
        { word: "mop",   image: "image4.png", crop: { l: 3.855, t: 52.505, r: 81.495, b: 33.827 } },
        { word: "chalk", image: "image4.png", crop: { l: 2.152, t: 76.308, r: 81.738, b: 9.575 } }
      ]
    },
    {
      target: "rug",
      options: [
        { word: "rug", image: "image6.png", crop: { l: 51.841, t: 4.570,  r: 8.649,  b: 82.161 } },
        { word: "bug", image: "image6.png", crop: { l: 59.863, t: 27.294, r: 14.217, b: 58.000 } },
        { word: "rag", image: "image6.png", crop: { l: 57.980, t: 51.872, r: 11.630, b: 33.204 } },
        { word: "run", image: "image6.png", crop: { l: 59.699, t: 76.731, r: 10.668, b: 10.000 } }
      ]
    },
    {
      target: "sun",
      options: [
        { word: "sun",          image: "image6.png", crop: { l: 6.875,  t: 2.777,  r: 58.418, b: 82.084 } },
        { word: "sign", image: "image6.png", crop: { l: 8.054,  t: 28.283, r: 59.471, b: 58.448 } },
        { word: "suck",         image: "image6.png", crop: { l: 11.084, t: 52.038, r: 62.399, b: 34.310 } },
        { word: "bun",          image: "image6.png", crop: { l: 5.316,  t: 77.236, r: 57.166, b: 10.110 } }
      ]
    }
  ],
  part2: [
    {
      target: "cake",
      picture: { image: "image8.png", crop: { l: 12.238, t: 0.000,  r: 9.417,  b: 88.107 } },
      pictureLabel: "cake",
      options: ["kick", "cape", "cake", "lake"]
    },
    {
      target: "cap",
      picture: { image: "image8.png", crop: { l: 15.607, t: 21.720, r: 14.311, b: 66.245 } },
      pictureLabel: "cap",
      options: ["cat", "map", "cup", "cap"]
    },
    {
      target: "sheep",
      picture: { image: "image8.png", crop: { l: 16.363, t: 43.181, r: 15.060, b: 44.785 } },
      pictureLabel: "sheep",
      options: ["sheep", "ship", "deep", "shear"]
    },
    {
      target: "sand",
      picture: { image: "image8.png", crop: { l: 19.940, t: 64.037, r: 19.339, b: 23.288 } },
      pictureLabel: "sand",
      options: ["sand", "sound", "sail", "band"]
    },
    {
      target: "night",
      picture: { image: "image8.png", crop: { l: 20.889, t: 85.859, r: 19.580, b: 2.296 } },
      pictureLabel: "night",
      options: ["knot", "night", "light", "knife"]
    }
  ]
};
