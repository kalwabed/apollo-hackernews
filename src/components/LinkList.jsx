import { gql, useQuery } from '@apollo/client'
import Link from './Link'

const FEED = gql`
  {
    feed {
      links {
        id
        url
        description
        createdAt
      }
    }
  }
`

const LinkList = () => {
  const { data } = useQuery(FEED)

  return <>{data && data.feed.links.map(link => <Link key={link.id} link={link} />)}</>
}

export default LinkList
