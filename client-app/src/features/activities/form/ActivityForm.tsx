import React from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'

const ActivityForm = () => {
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
        <Button floated='right' type='button' content='cancel'/>
        </Form>
      </Segment>
    </div>
  )
}

export default ActivityForm
