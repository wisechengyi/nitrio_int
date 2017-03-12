import json

from flask import Flask


class Judge:
  KNOWN_DICT_FILE = 'sowpods.txt'

  SCORES = {'A': 1, 'C': 3, 'B': 3, 'E': 1, 'D': 2, 'G': 2, 'F': 4, 'I': 1, 'H': 4, 'K': 5, 'J': 8, 'M': 3, 'L': 1,
            'O': 1, 'N': 1, 'Q': 10, 'P': 3, 'S': 1, 'R': 1, 'U': 1, 'T': 1, 'W': 4, 'V': 4, 'Y': 4, 'X': 8, 'Z': 10}

  def __init__(self):
    with open(self.KNOWN_DICT_FILE, 'r') as f:
      self._known_words = set(x.strip().upper() for x in f.readlines())

  def get_response(self, input):
    """
    valid: {"word":"fish", "valid":true, "score":10}
    invalid: {"word":"nitrio", "valid": false}

    :param input:
    :param upper_input:
    :return:
    """
    upper_input = input.upper()
    if upper_input in self._known_words:
      score = self.calculate_score(upper_input)
      return {"word": upper_input, "valid": True, "score": score}
    else:
      return {"word": upper_input, "valid": False}

  def calculate_score(self, word):
    return sum(self.SCORES[c] for c in word)


app = Flask(__name__)
judge = Judge()


@app.route('/score_word/<word>')
def response(word=None):
  return json.dumps(judge.get_response(word))


if __name__ == '__main__':
  # print()

  app.run(host='0.0.0.0')
