
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
  editMode: boolean;
  openForm: (id?: string) => void;
  closeForm: () => void;
  editOrActivity: (activity: Activity) => void;
}

const ActivityDashboard = ({activities, selectedActivity, handleSelectedActitvity, handleCancelSelectedActitvity,editMode, openForm, closeForm, editOrActivity}: Props) => {
  return (
    <Grid>
      <Grid.Column width='10'>
        <List>
            <ActivityList
              activities={activities} handleSelectedActitvity={handleSelectedActitvity}/>
          </List>
      </Grid.Column>
      <GridColumn width='6'>
        {selectedActivity && !editMode &&
          <ActivityDetails
            activity={selectedActivity}
            handleCancelSelectedActitvity={handleCancelSelectedActitvity}
            openForm={openForm}
          />}
          {editMode &&
            <ActivityForm
              closeForm={closeForm}
              activity={selectedActivity}
              editOrActivity={editOrActivity}
            />
          }
      </GridColumn>
    </Grid>
  )
}

export default ActivityDashboard
