import React, { ChangeEvent, useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity'

interface Props {
  closeForm: () => void;
  activity: Activity | undefined;
  editOrActivity: (activity: Activity) => void;
}

const ActivityForm = ({closeForm, activity: selectedActivity, editOrActivity}: Props) => {

  const initialState = selectedActivity ?? {
    id: '',
    title: '',
    date: '',
    description: '',
    category: '',
    city: '',
    venue: ''
  }

  const [activity, setActivity]  = useState(initialState);

  const handleSubmit = () => {
    console.log(activity);
    editOrActivity(activity)
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    setActivity({
      ...activity, // spread operator
      [name]: value // name = input element name, value = to input data
    })
  }

  return (
    <div>
      <Segment clearing>
        <Form onSubmit={handleSubmit} autoComplete='off'>
          <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChange}/>
          <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handleInputChange}/>
          <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handleInputChange}/>
          <Form.Input placeholder='Date' value={activity.date} name='date' onChange={handleInputChange}/>
          <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputChange}/>
          <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputChange}/>
          <Button floated='right' positive type='submit' content='submit'/>
          <Button onClick={() => closeForm()} floated='right' type='button' content='cancel'/>
        </Form>
      </Segment>
    </div>
  )
}

export default ActivityForm
