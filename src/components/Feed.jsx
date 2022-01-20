import { useState, useEffect } from "react"
import NewPost from "./NewPost"
import SinglePost from "./SinglePost"
import LeftComponent from "./LeftComponent"
import { Col, Container, Row } from "react-bootstrap"
import RightComponent from "./RightComponent"
import Loading from "./Loading"
import Error from "./Error"
import useFetch from "../hooks/useFetch"

const Feed = () => {
  const [posts, setPosts] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const { data, error: postsError, loading: postsLoading } = useFetch('posts')

  useEffect(() => {
    setPosts(data)
    setError(postsError)
    setLoading(postsLoading)
  }, [data, postsError, postsLoading])

  if (error) return <Error />

  return (
    <Container>
      <Row>
        <Col xs={12} lg={6}>
          <NewPost />
          {posts && (posts.posts.map(post => <SinglePost key={post._id} post={post} />))}
        </Col>
        <Col xs={12} lg={{ order: "first" }}>
          <LeftComponent />
        </Col>
        <Col xs={12} lg={3}>
          <RightComponent />
        </Col>
      </Row>
    </Container>
  )
}

export default Feed
