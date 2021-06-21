export interface Word {
  data: string
  startTime: number
  endTime: number
}
export interface Sentence {
  words: [Word]
}

export interface Song {
  encodeId: string
  title: string
  thumbnail: string
  thumbnailM: string
  hasLyric: boolean
  mvLink: string
  artists: Artist[]
  artistsNames: string
  duration: number
}

export interface Artist {
  id: string
  name: string
  link: string
  spotlight: boolean
  playlistId: string
}

export interface Playlist {
  encodeId: string
  title: string
  thumbnail: string
  isoffical: string
  link: string
  isIndie: boolean
  thumbnailM: string
  isShuffle: boolean
  isPrivate: boolean
  isAlbum: boolean
  textType: string
  isSingle: boolean
  song: SongResult
}

interface SongResult {
  items: Song[]
  total: number
  totalDuration: number
}
