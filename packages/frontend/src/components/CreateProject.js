import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { FEED_QUERY } from './ProjectList'

const POST_MUTATION = gql`
  mutation PostMutation($title: String!, $description: String!) {
    createProject(title: $title, description: $description) {
      id
      title
      description
    }
  }
`

class CreateProject extends Component {
  state = {
    description: '',
    title: ''
  }

  render() {
    const { description, title } = this.state
    return (
      <div>
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={description}
            onChange={e => this.setState({ description: e.target.value })}
            type="text"
            placeholder="A description for the link"
          />
          <input
            className="mb2"
            value={title}
            onChange={e => this.setState({ title: e.target.value })}
            type="text"
            placeholder="The title for the link"
          />
        </div>
        <Mutation
          mutation={POST_MUTATION}
          onCompleted={() => this.props.history.push('/')}
          variables={{ description, title }}
          update={(store, { data: { project } }) => {
            const data = store.readQuery({ query: FEED_QUERY })
            data.feed.projects.unshift(project)
            store.writeQuery({
              query: FEED_QUERY,
              data
            })
          }}
        >
          {postMutation => <button onClick={postMutation}>Submit</button>}
        </Mutation>
      </div>
    )
  }
}

export default CreateProject
