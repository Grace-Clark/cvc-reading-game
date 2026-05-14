(() => {
  const $ = (id) => document.getElementById(id);

  const state = {
    prIndex: 0,
    p1Index: 0,
    p2Index: 0,
    score: 0,
    answered: 0,
    total: QUESTIONS.part1.length + QUESTIONS.part2.length,
    // Per-trial log used to build the end-of-game report.
    // Each entry: { part: 1 | 2, target: string, chosen: string, correct: boolean }
    answers: [],
  };

  // ------- Audio (Web Speech API) -------
  const synth = window.speechSynthesis;
  let voice = null;
  function pickVoice() {
    if (!synth) return;
    const voices = synth.getVoices();
    voice =
      voices.find((v) => /en[-_]US/i.test(v.lang) && /female|samantha|zira|google us english/i.test(v.name)) ||
      voices.find((v) => /en[-_]US/i.test(v.lang)) ||
      voices.find((v) => /^en/i.test(v.lang)) ||
      voices[0] ||
      null;
  }
  if (synth) {
    pickVoice();
    synth.onvoiceschanged = pickVoice;
  }
  function speak(text, opts = {}) {
    if (!synth) return Promise.resolve();
    synth.cancel();
    return new Promise((resolve) => {
      const u = new SpeechSynthesisUtterance(text);
      if (voice) u.voice = voice;
      u.lang = "en-US";
      u.rate = opts.rate ?? 0.85;
      u.pitch = opts.pitch ?? 1.05;
      u.onend = u.onerror = () => resolve();
      synth.speak(u);
    });
  }
  async function speakSequence(texts, gapMs = 300) {
    for (const t of texts) {
      await speak(t);
      await new Promise((r) => setTimeout(r, gapMs));
    }
  }

  // ------- Screen switching -------
  function showScreen(id) {
    document.querySelectorAll(".screen").forEach((s) => s.classList.remove("active"));
    $(id).classList.add("active");
    if (synth) synth.cancel();
  }

  // ------- Picture helper -------
  // Each option/picture is a standalone PNG in assets/words/. We simply place it
  // inside `el` with object-fit: contain so it scales without distortion regardless
  // of the source image's aspect ratio.
  function showPicture(el, image) {
    el.innerHTML = "";
    const img = document.createElement("img");
    img.src = `assets/words/${image}`;
    img.alt = "";
    img.className = "pic";
    el.appendChild(img);
  }

  // ------- Practice rendering -------
  function renderPractice() {
    if (state.prIndex >= QUESTIONS.practice.length) {
      renderPart1();
      return;
    }
    showScreen("screen-practice");
    const q = QUESTIONS.practice[state.prIndex];

    $("pr-count").textContent = `Practice — ${state.prIndex + 1} of ${QUESTIONS.practice.length}`;
    $("pr-next").classList.add("hidden");

    const grid = $("pr-options");
    grid.innerHTML = "";

    // Practice positions stay fixed: car on the left, ball on the right.
    q.options.forEach((opt) => {
      const card = document.createElement("button");
      card.className = "option";
      card.type = "button";
      card.dataset.word = opt.word;

      const crop = document.createElement("div");
      crop.className = "crop";
      showPicture(crop, opt.image);
      card.appendChild(crop);

      card.addEventListener("click", () => handlePracticePick(card, opt, q));
      grid.appendChild(card);
    });

    // Auto-play the prompt after a short delay so the user has time to see the cards
    setTimeout(() => speak(q.prompt), 350);
  }

  function handlePracticePick(card, opt, q) {
    if (card.classList.contains("locked")) return;
    const isCorrect = opt.word === q.target;
    const cards = document.querySelectorAll("#pr-options .option");
    cards.forEach((c) => {
      c.classList.add("locked");
      if (c !== card && c.dataset.word !== q.target) c.classList.add("dim");
    });
    card.classList.add(isCorrect ? "correct" : "incorrect");
    if (!isCorrect) {
      const correctCard = document.querySelector(`#pr-options .option[data-word="${q.target}"]`);
      if (correctCard) correctCard.classList.add("correct");
    }
    speak(isCorrect ? `Yes! That's the ${q.target}.` : `That was the ${opt.word}. The ${q.target} is here.`);
    $("pr-next").classList.remove("hidden");
  }

  // ------- Part 1 rendering -------
  function renderPart1() {
    if (state.p1Index >= QUESTIONS.part1.length) {
      startPart2();
      return;
    }
    const firstEntry = state.p1Index === 0;
    showScreen("screen-part1");
    const q = QUESTIONS.part1[state.p1Index];

    $("p1-count").textContent = `Part 1 — ${state.p1Index + 1} of ${QUESTIONS.part1.length}`;
    $("p1-score").textContent = `Score: ${state.score}/${state.answered}`;
    $("p1-target").textContent = q.target;
    $("p1-next").classList.add("hidden");

    // On first entry to Part 1 (right after the practice items), speak the
    // direction so the child hears what to do.
    if (firstEntry) {
      setTimeout(() => speak("Listen to the words. Select the picture that matches the word."), 250);
    }

    const grid = $("p1-options");
    grid.innerHTML = "";

    // Shuffle options so the correct one isn't always in the same spot
    const shuffled = shuffle(q.options.slice());

    shuffled.forEach((opt) => {
      const card = document.createElement("button");
      card.className = "option";
      card.type = "button";
      card.dataset.word = opt.word;

      const crop = document.createElement("div");
      crop.className = "crop";
      showPicture(crop, opt.image);
      card.appendChild(crop);

      const row = document.createElement("div");
      row.className = "row";
      const sp = document.createElement("span");
      sp.className = "option-speaker";
      sp.textContent = "🔊";
      sp.setAttribute("aria-label", `Hear ${opt.word}`);
      sp.addEventListener("click", (e) => {
        e.stopPropagation();
        speak(opt.speakAs || opt.word);
      });
      card.dataset.speakAs = opt.speakAs || opt.word;
      row.appendChild(sp);
      card.appendChild(row);

      card.addEventListener("click", () => handleP1Pick(card, opt, q));
      grid.appendChild(card);
    });
  }

  function handleP1Pick(card, opt, q) {
    if (card.classList.contains("locked")) return;
    const isCorrect = opt.word === q.target;
    state.answered += 1;
    if (isCorrect) state.score += 1;
    state.answers.push({ part: 1, target: q.target, chosen: opt.word, correct: isCorrect });

    const cards = document.querySelectorAll("#p1-options .option");
    cards.forEach((c) => {
      c.classList.add("locked");
      if (c !== card && c.dataset.word !== q.target) c.classList.add("dim");
    });
    card.classList.add(isCorrect ? "correct" : "incorrect");
    if (!isCorrect) {
      const correctCard = document.querySelector(`#p1-options .option[data-word="${q.target}"]`);
      if (correctCard) correctCard.classList.add("correct");
    }

    const targetOpt = q.options.find((o) => o.word === q.target);
    const sayChosen = opt.speakAs || opt.word;
    const sayTarget = (targetOpt && targetOpt.speakAs) || q.target;
    speak(isCorrect ? `Yes! ${sayTarget}.` : `That was ${sayChosen}. The word is ${sayTarget}.`);
    $("p1-score").textContent = `Score: ${state.score}/${state.answered}`;
    $("p1-next").classList.remove("hidden");
  }

  // ------- Part 2 rendering -------
  function startPart2() {
    state.p2Index = 0;
    renderPart2();
  }

  function renderPart2() {
    if (state.p2Index >= QUESTIONS.part2.length) {
      finish();
      return;
    }
    showScreen("screen-part2");
    const q = QUESTIONS.part2[state.p2Index];

    $("p2-count").textContent = `Part 2 — ${state.p2Index + 1} of ${QUESTIONS.part2.length}`;
    $("p2-score").textContent = `Score: ${state.score}/${state.answered}`;
    $("p2-next").classList.add("hidden");

    const pic = $("p2-target");
    showPicture(pic, q.picture.image);

    const grid = $("p2-options");
    grid.innerHTML = "";

    const shuffled = shuffle(q.options.slice());
    shuffled.forEach((word) => {
      const card = document.createElement("button");
      card.className = "word-option";
      card.type = "button";
      card.dataset.word = word;

      const txt = document.createElement("span");
      txt.className = "word-text";
      txt.textContent = word;
      card.appendChild(txt);

      card.addEventListener("click", () => handleP2Pick(card, word, q));
      grid.appendChild(card);
    });
  }

  function handleP2Pick(card, word, q) {
    if (card.classList.contains("locked")) return;
    const isCorrect = word === q.target;
    state.answered += 1;
    if (isCorrect) state.score += 1;
    state.answers.push({ part: 2, target: q.target, chosen: word, correct: isCorrect });

    const cards = document.querySelectorAll("#p2-options .word-option");
    cards.forEach((c) => {
      c.classList.add("locked");
      if (c !== card && c.dataset.word !== q.target) c.classList.add("dim");
    });
    card.classList.add(isCorrect ? "correct" : "incorrect");
    if (!isCorrect) {
      const correctCard = document.querySelector(`#p2-options .word-option[data-word="${q.target}"]`);
      if (correctCard) correctCard.classList.add("correct");
    }

    speak(isCorrect ? `Yes! ${q.target}.` : `That was ${word}. The word is ${q.target}.`);
    $("p2-score").textContent = `Score: ${state.score}/${state.answered}`;
    $("p2-next").classList.remove("hidden");
  }

  // ------- Finish -------
  function finish() {
    showScreen("screen-done");
    $("final-score").textContent = `${state.score} / ${state.total}`;
    const pct = state.score / state.total;
    let headline = "Nice work!";
    if (pct === 1) headline = "Perfect! 🏆";
    else if (pct >= 0.8) headline = "Great job!";
    else if (pct >= 0.5) headline = "Good try!";
    $("done-headline").textContent = headline;
    $("done-detail").textContent = `You answered ${state.score} of ${state.total} correctly.`;
    renderReport();
  }

  function renderReport() {
    const missed = state.answers.filter((a) => !a.correct);
    const reportEl = $("report");
    reportEl.innerHTML = "";

    if (missed.length === 0) {
      const p = document.createElement("p");
      p.className = "report-empty";
      p.textContent = "No missed trials — every answer was correct!";
      reportEl.appendChild(p);
      return;
    }

    const heading = document.createElement("h3");
    heading.className = "report-heading";
    heading.textContent = `Missed trials (${missed.length})`;
    reportEl.appendChild(heading);

    const table = document.createElement("table");
    table.className = "report-table";
    table.innerHTML = `
      <thead>
        <tr><th>Trial</th><th>Word</th><th>Picked</th></tr>
      </thead>
      <tbody></tbody>
    `;
    const tbody = table.querySelector("tbody");
    missed.forEach((a) => {
      const tr = document.createElement("tr");
      const partLabel = a.part === 1 ? "Part 1" : "Part 2";
      tr.innerHTML = `
        <td>${partLabel}</td>
        <td class="report-word">${a.target}</td>
        <td class="report-word report-wrong">${a.chosen}</td>
      `;
      tbody.appendChild(tr);
    });
    reportEl.appendChild(table);

    const copyBtn = document.createElement("button");
    copyBtn.type = "button";
    copyBtn.className = "ghost report-copy";
    copyBtn.textContent = "Copy report";
    copyBtn.addEventListener("click", async () => {
      const lines = [
        `CVC Reading Game — ${state.score}/${state.total} correct`,
        `Date: ${new Date().toLocaleString()}`,
        "",
        "Missed trials:",
        ...missed.map((a) => `  ${a.part === 1 ? "Part 1" : "Part 2"} — word: ${a.target} — picked: ${a.chosen}`),
      ];
      const text = lines.join("\n");
      try {
        await navigator.clipboard.writeText(text);
        copyBtn.textContent = "Copied!";
        setTimeout(() => (copyBtn.textContent = "Copy report"), 1500);
      } catch {
        copyBtn.textContent = "Press Ctrl+C";
        const r = document.createRange();
        const pre = document.createElement("pre");
        pre.textContent = text;
        pre.style.position = "fixed";
        pre.style.left = "-9999px";
        document.body.appendChild(pre);
        r.selectNode(pre);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(r);
        setTimeout(() => {
          window.getSelection().removeAllRanges();
          pre.remove();
          copyBtn.textContent = "Copy report";
        }, 3000);
      }
    });
    reportEl.appendChild(copyBtn);
  }

  // ------- Utilities -------
  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // ------- Wiring -------
  $("btn-start").addEventListener("click", () => {
    state.prIndex = 0;
    state.p1Index = 0;
    state.p2Index = 0;
    state.score = 0;
    state.answered = 0;
    state.answers = [];
    // Reshuffle question order so each play-through has a fresh sequence.
    // (Practice order stays fixed: car first, then ball.)
    shuffle(QUESTIONS.part1);
    shuffle(QUESTIONS.part2);
    // Many browsers require a user gesture before speechSynthesis works; "warm up" here.
    if (synth) {
      const u = new SpeechSynthesisUtterance(" ");
      synth.speak(u);
    }
    renderPractice();
  });

  $("title-hear").addEventListener("click", () => {
    speakSequence([
      "Reading Game.",
      "Instructions for caregivers.",
      "This is a reading test for your child. Please don't help them. We want to see what they know on their own.",
      "After each response, click Next to continue to the next question.",
    ], 200);
  });

  $("pr-next").addEventListener("click", () => {
    state.prIndex += 1;
    renderPractice();
  });

  $("pr-hear").addEventListener("click", () => {
    const q = QUESTIONS.practice[state.prIndex];
    speak(q.prompt);
  });

  $("p1-next").addEventListener("click", () => {
    state.p1Index += 1;
    renderPart1();
  });

  $("p2-next").addEventListener("click", () => {
    state.p2Index += 1;
    renderPart2();
  });

  $("p1-hear-all").addEventListener("click", () => {
    const cards = document.querySelectorAll("#p1-options .option");
    // Speak whatever order they're currently rendered in, using each card's
    // speakAs override (set in dataset) so e.g. "koosh" is pronounced correctly.
    const order = Array.from(cards).map((c) => c.dataset.speakAs || c.dataset.word);
    speakSequence(order);
  });

  $("p2-hear-pic").addEventListener("click", () => {
    const q = QUESTIONS.part2[state.p2Index];
    speak(q.pictureLabel || q.target);
  });

  $("btn-restart").addEventListener("click", () => {
    state.p1Index = 0;
    state.p2Index = 0;
    state.score = 0;
    state.answered = 0;
    showScreen("screen-title");
  });
})();
