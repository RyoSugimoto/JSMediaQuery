import MediaQuery from './media-query'

export default function $media(query: string) {
  return new MediaQuery(query)
}
