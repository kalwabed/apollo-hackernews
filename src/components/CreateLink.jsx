import { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { useHistory } from 'react-router'

const CREATE_LINK = gql`
  mutation CreatePost($url: String!, $description: String!) {
    post(url: $url, description: $description) {
      id
      createdAt
      description
      url
    }
  }
`

const CreateLink = () => {
  const [formState, setFormState] = useState({ url: '', description: '' })
  const history = useHistory()
  const [createLink] = useMutation(CREATE_LINK, {
    variables: { description: formState.description, url: formState.url },
    onCompleted: () => history.push('/')
  })

  function handleSubmit(e) {
    e.preventDefault()
    createLink()
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-column mt3">
          <input
            type="text"
            className="mb2"
            onChange={e => setFormState({ ...formState, description: e.target.value })}
            placeholder="Description"
          />
          <input
            type="text"
            className="mb2"
            onChange={e => setFormState({ ...formState, url: e.target.value })}
            placeholder="Url"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default CreateLink
