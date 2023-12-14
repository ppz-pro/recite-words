interface Meta {
  id: string
}

type Functional_label = string
type Grammatical_label = string

interface Sound {
  audio: string
}

interface Pronunciation {
  ipa: string
  sound: Sound
}

interface Headword_info {
  hw: string // headword
  prs: Pronunciation[]
}

export
interface Paraphrase {
  meta: Meta
  fl: Functional_label
  gram: Grammatical_label
  hwi: Headword_info
  shortdef: string[]
}
