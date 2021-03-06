
import React from 'react'
import { Button, Item, Label, Segment } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity'

interface Props {
  activities: Activity[];
  handleSelectedActitvity: (id: string) => void;
  deleteActivity: (id: string) => void;
}

const ActivityList = ({activities, handleSelectedActitvity, deleteActivity}: Props) => {
  return (
    <Segment>
      <Item.Group divided>
        {activities.map(activity => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as='a'>{activity.title}</Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <Item.Description>
              <div>{activity.description}</div>
              <div>{activity.city}, {activity.venue}</div>
              </Item.Description>
              <Item.Extra>
              <Button onClick={() => handleSelectedActitvity(activity.id)} floated='right' content='view' color='blue'/>
              <Button onClick={() => deleteActivity(activity.id)} floated='right' content='delete' color='red'/>
                <Label basic content={activity.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  )
}

export default ActivityList

