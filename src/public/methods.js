import vikor from './assets/VIKOR.png'
import topsis from './assets/TOPSIS.png'
import prom1 from './assets/PROMETHEE_1.png'
import prom2 from './assets/PROMETHEE_2.png'
import prom3 from './assets/PROMETHEE_3.png'
import copras from './assets/COPRAS.png'
import spotis from './assets/SPOTIS.png'
import comet from './assets/COMET.png'

const methods = [
  {
    'id': 0,
    'method': 'TOPSIS',
    'abbreviation': 'The Technique for Order Preference by Similarity to an Ideal Solution',
    'images':  [topsis]
  },
  {
    'id': 1,
    'method': 'VIKOR',
    'abbreviation': '',
    'images': [vikor]
  },
  {
    'id': 2,
    'method': 'PROMETHEE',
    'abbreviation': 'The Preference Ranking Organization METHod for Enrichment of Evaluations',
    'images': [
      prom1,
      prom2,
      prom3
    ]
  },
  {
    'id': 3,
    'method': 'COPRAS',
    'abbreviation': 'The COmplex PRoportional ASsessment',
    'images': [copras]
  },
  {
    'id': 4,
    'method': 'SPOTIS',
    'abbreviation': 'The Stable Preference Ordering Towards Ideal Solution',
    'images': [spotis]
  },
  {
    'id': 5,
    'method': 'COMET',
    'abbreviation': 'The Characteristic Objects Method',
    'images': [comet]
  }
]

export default methods