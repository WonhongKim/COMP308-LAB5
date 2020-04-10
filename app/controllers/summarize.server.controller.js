const config = require("../../config/config");

exports.summarizeContents = function (req, res) {
  const compromise = require("compromise");
  const natural = require("natural");

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
    "Ontario reported 550 new cases of COVID-19, which is the biggest single-day increase so far. In total, there have been 5,276 lab-confirmed cases of the virus in Ontario. The province has confirmed 174 deaths linked to the virus so far but reporting from Ontario's 34 local public health units suggest the number is actually 204. Dr. Barbara Yaffe, Ontario’s associate chief medical officer of health, said the province is “working very hard” to ramp up testing. “I think the bottom line is we want to do more testing – we are working very hard now to increase the testing and expand the criteria and encourage clinicians to test people where they are concerned the person has symptoms that may be indicative of covid-19. We are very much hopeful that we will go up –we do have capacity we need more testing,” she said on Wednesday at a news conference alongside Dr. David Williams, the province’s top doctor. Williams said he doesn’t see the value of comparing Ontario to other province’s when it comes to testing numbers. “When you do rates and comparisons… it is not a very valuable thing to do because you would have to really compare us to a province of the same size on how that’s going. I can say, compared to pretty well all of the provinces, including the ones that have some better rates, we have processed more tests than any other province,” Williams said. “It is not a matter of who looks better. It is a matter of how collectively we are doing on a Canadian basis and are we together bending the curve for Canada because we are all in this and while my counterpart… in Quebec is dealing with a large surge at this time.” When asked if he felt the premier was critical of the decisions he has made regarding testing, Williams said he and Ford both want to increase testing.";
  const resultForTest1 = summarize(summarizableArticle, 3);
  res
    .status(200)
    .send({
      Status: "show",
      resultForTest1: resultForTest1,
    })
    .end();
};

exports.summarizeContentswithInput = function (req, res) {
  const compromise = require("compromise");
  const natural = require("natural");
  const summarizableArticle = req.body.article;

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

  const resultForTest1 = summarize(summarizableArticle, 3);
  res
    .status(200)
    .send({
      Status: "show",
      resultForTest1: resultForTest1,
    })
    .end();
};
