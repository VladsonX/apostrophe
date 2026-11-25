import './CreateTopicElement.scss'
import TopicTitle from './TopicTitle'


const CreateTopicElement = ( {title, children} ) => {
  return (
    <div className='topic-element'>
      <TopicTitle title={title} />
      {children}
    </div>
  )
}

export default CreateTopicElement