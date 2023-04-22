import nltk
from nltk.stem.porter import PorterStemmer
stemmer = PorterStemmer()
# nltk.download('punkt')
# nltk.download('stopwords')
from nltk.corpus import stopwords
import numpy as np
import re
import cohere


def tokenize(sentence):
    return nltk.word_tokenize(sentence.lower())

def stem(word):
    return stemmer.stem(word.lower())

def bag_of_words(tokenized_sentence, all_words):
    # stem each word
    tokenized_sentence = [stem(w) for w in tokenized_sentence]
    # initialize bag with 0 for each word
    bag = np.zeros(len(all_words), dtype=np.float32)
    for idx, w in enumerate(all_words):
        if w in tokenized_sentence:
            bag[idx] = 1.0

    return bag

def word_frequency(tokens):
    word_frequencies = {}
    stop_words = stopwords.words('english')
    for word in tokens:
        if word.lower() not in stop_words:
            if word not in word_frequencies.keys():
                word_frequencies[word] = 1
            else:
                word_frequencies[word] += 1


                

def text_summarizer(text):
    tokenized = tokenize(text)
    split_text = text.split()
    # r = re.compile("[a-zA-Z0-9]+")
    # cleaned_text = list(filter(r.match, tokenized))
    bag = bag_of_words(tokenized, split_text)
    print(bag)

    c_text = re.sub(r"[^\w]", ' ', text) # cleaned text
    f = open("clean_transcribed.txt", "w", encoding="utf-8")
    f.write(c_text)
    f.close()

    f2 = open("dirty_transcribed.txt", "w", encoding="utf-8")
    f2.write(text)
    f2.close()

    return tokenized
    

#############################################################################

def generate_prompt(message):
    return """Generate 10 practice questions and answers on the subject {}""".format(message)

