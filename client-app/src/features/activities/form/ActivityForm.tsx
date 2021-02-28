import React, { useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity'

interface Props {
  closeForm: () => void;
  activity: Activity | undefined;
}

const ActivityForm = ({closeForm, activity: selectedActivity}: Props) => {

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
  }

  return (
    <div>
      <Segment clearing>
        <Form>
        <Form.Input placeholder='Title'/>
        <Form.TextArea placeholder='Description'/>
        <Form.Input placeholder='Category'/>
        <Form.Input placeholder='Date'/>
        <Form.Input placeholder='City'/>
        <Form.Input placeholder='Venue'/>
        <Button floated='right' positive type='submit' content='submit'/>
        <Button onClick={() => closeForm()} floated='right' type='button' content='cancel'/>
        </Form>
      </Segment>
    </div>
  )
}

export default ActivityForm
