var summarize = require("../controllers/summarize.server.controller");

const compromise = require("compromise");
const natural = require("natural");

[
  ["plate", "laser"],
  ["parachute", "parasail"],
  ["parachute", "panoply"],
].forEach(function (pair) {
  console.log(
    "Levenshtein distance between '" +
      pair[0] +
      "' and '" +
      pair[1] +
      "': " +
      natural.LevenshteinDistance.apply(null, pair)
  );
});

const simpleTokenizer = (text) =>
  text
    .toLowerCase()
    .replace(/(\w)'(\w)/g, "$1$2")
    .replace(/\W/g, " ")
    .split(" ")
    .filter((token) => token.length > 2);

const fulltextSearch = (query, documents) => {
  const db = new natural.TfIdf();
  documents.forEach((document) => db.addDocument(document));
  db.tfidfs(query, (docId, score) => {
    console.log("DocID " + docId + " has score: " + score);
  });
};
fulltextSearch("fashion style", [
  "i love cooking, it really relaxes me and makes me feel at home",
  "food and restaurants are basically my favorite things",
  "i'm not really a fashionable person",
  "that new fashion blogger has a really great style",
  "i don't love the cinematic style of that movie",
]);
const stemmedFulltextSearch = (query, documents) => {
  const db = new natural.TfIdf();
  const tokenizer = new natural.WordTokenizer();
  const stemmer = natural.PorterStemmer.stem;
  const stemAndTokenize = (text) =>
    tokenizer.tokenize(text).map((token) => stemmer(token));

  documents.forEach((document) => db.addDocument(stemAndTokenize(document)));
  db.tfidfs(stemAndTokenize(query), (docId, score) => {
    console.log("DocID " + docId + " has score: " + score);
  });
};

stemmedFulltextSearch("fashion style", [
  "i love cooking, it really relaxes me and makes me feel at home",
  "food and restaurants are basically my favorite things",
  "i'm not really a fashionable person",
  "that new fashion blogger has a really great style",
  "i don't love the cinematic style of that movie",
]);

const summarize = (article, maxSentences = 3) => {
  const sentences = compromise(article).sentences().out("array");
  const db = new natural.TfIdf();
  const tokenizer = new natural.WordTokenizer();
  const stemmer = natural.PorterStemmer.stem;
  const stemAndTokenize = (text) =>
    tokenizer.tokenize(text).map((token) => stemmer(token));
  const scoresMap = {};

  // Add each sentence to the document
  sentences.forEach((sentence) => db.addDocument(stemAndTokenize(sentence)));

  stemAndTokenize(article).forEach((token) => {
    db.tfidfs(token, (sentenceId, score) => {
      if (!scoresMap[sentenceId]) scoresMap[sentenceId] = 0;
      scoresMap[sentenceId] += score;
    });
  });

  // Convert our scoresMap into an array so that we can easily sort it
  let scoresArray = Object.entries(scoresMap).map((item) => ({
    score: item[1],
    sentenceId: item[0],
  }));
  // Sort the array by descending score
  scoresArray.sort((a, b) => (a.score < b.score ? 1 : -1));
  // Pick the top maxSentences sentences
  scoresArray = scoresArray.slice(0, maxSentences);
  // Re-sort by ascending sentenceId
  scoresArray.sort((a, b) =>
    parseInt(a.sentenceId) < parseInt(b.sentenceId) ? -1 : 1
  );
  // Return sentences
  return scoresArray.map((item) => sentences[item.sentenceId]).join(". ");
};

const summarizableArticle =
  "The next industrial revolution is already happening. Artificial intelligence (AI) is ushering in an era of technologies that are faster, more adaptable, more efficient, and making the world more digitally connected. AI is best described as complementary to human intelligence, delivering the computing power to crunch numbers too big for people and recognize patterns too tedious for the human eye. In a Harvard Business Review study of 1,500 companies, it was found that the most significant performance improvements were made when humans and machines worked together. As AI becomes one of society’s greatest assets, it’s especially helpful for solving problems that seem larger than life — like protecting our natural environment.Through machine learning, robotics, drones, and the internet of things (IoT), society can achieve better monitoring, understanding, and prevention of damage and stressors on Earth’s land, air, and water. Even technology already available today could reduce energy usage in the U.S. by 12 to 22 percent, according to The Information Technology Industry Council (ITI),When it comes to saving the planet, technology may even be the most important factor. “This is more about technology than politics,” said Jiang Kejun, one of the authors of the recent UN Intergovernmental Panel on Climate Change (IPCC) report that revealed just how urgent climate change is. The report — released in October — said there are only 12 years to keep Earth’s temperature at a maximum of 1.5C rise to avoid catastrophic disaster.In the face of this dire reality, the potential of technology to help meet this challenge is a rare source of optimism. According to a recent survey by Intel and the research firm Concentrix, 74 percent of business-decision makers working in environmental sustainability agree artificial intelligence (AI) will help solve long-standing environmental challenges; 64 percent agree the Internet of Things (IoT) will help solve these challenges.As the field of AI develops, so will the potential to protect the environment. From the land and air to both drinking and ocean water, AI is shaping up to be the key that governments, organizations, and individuals can tap to work toward a cleaner planet.";
console.log("3-sentence summary:");
console.log(summarize(summarizableArticle, 3));
console.log("5-sentence summary:");
console.log(summarize(summarizableArticle, 5));
