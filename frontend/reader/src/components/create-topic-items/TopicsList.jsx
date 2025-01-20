import './TopicsList.scss'

const TopicsList = ( {topics, children} ) => {
  return (
    <ul className='topics-list'>{children}</ul>
  )
}

export default TopicsList