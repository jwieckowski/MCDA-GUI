const inverseMethods = ['VIKOR', 'SPOTIS']

const rankData = (preferences) => {
  const sorted = [...preferences].sort().reverse()
  return preferences.map(p => sorted.indexOf(p)+1)
}

const rankInverseData = (preferences) => {
  const sorted = [...preferences].sort()
  return preferences.map(p => sorted.indexOf(p)+1)
}

const getRankings = (method, results, alternatives) => {
  if (results.includes('NaN')) return Array(alternatives).fill(0)
  return inverseMethods.includes(method) 
    ? rankInverseData(results)
    : rankData(results)
}

export default getRankings