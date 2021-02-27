
import React from 'react'
import { Grid, GridColumn, List } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity'
import ActivityDetails from '../details/ActivityDetails'
import ActivityForm from '../form/ActivityForm'
import ActivityList from './ActivityList'

interface Props {
  activities: Activity[];
  selectedActivity: Activity | undefined;
  handleSelectedActitvity: (id: string) => void;
  handleCancelSelectedActitvity: () => void;
}

const ActivityDashboard = ({activities, selectedActivity, handleSelectedActitvity, handleCancelSelectedActitvity}: Props) => {
  return (
    <Grid>
      <Grid.Column width='10'>
        <List>
            <ActivityList activities={activities} handleSelectedActitvity={handleSelectedActitvity}/>
          </List>
      </Grid.Column>
      <GridColumn width='6'>
        {selectedActivity && <ActivityDetails activity={selectedActivity} handleCancelSelectedActitvity={handleCancelSelectedActitvity}/>}
        <ActivityForm />
      </GridColumn>
    </Grid>
  )
}

export default ActivityDashboard
