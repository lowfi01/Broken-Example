import React from 'react'
import { Grid, GridColumn, List } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity'
import ActivityDetails from '../details/ActivityDetails'
import ActivityForm from '../form/ActivityForm'
import ActivityList from './ActivityList'

interface Props {
  activities: Activity[]
}

const ActivityDashboard = ({activities}: Props) => {
  return (
    <Grid>
      <Grid.Column width='10'>
        <List>
            <ActivityList activities={activities} />
          </List>
      </Grid.Column>
      <GridColumn width='6'>
        {activities && activities[0] && <ActivityDetails activity={activities[0]}/>}
        <ActivityForm />
      </GridColumn>
    </Grid>
  )
}

export default ActivityDashboard
