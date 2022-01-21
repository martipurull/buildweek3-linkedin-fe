import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import '../styles/jobs.css'

export default function SingleJob({ job }) {
  return (
        <Card>
            <Card.Body className='card-bg-white rounded'>
                <Link to={`/jobs/${job._id}`}><h5 className='mb-2'>{job.title} - {job.company}</h5></Link>
                <p className='text-muted mb-0'>{job.company}</p>
                <p className='text-muted mb-1'>{job.area}</p>
            </Card.Body>
        </Card>
  )
}
